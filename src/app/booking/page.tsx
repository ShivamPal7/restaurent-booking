'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, ClipboardList, CheckCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressSteps } from '@/components/booking/progress-steps'
import { CalendarView } from '@/components/booking/calendar-view'
import { TableSelection } from '@/components/booking/table-selection'
import { BookingForm } from '@/components/booking/booking-form'
import { BookingSummary } from '@/components/booking/booking-summary'
import { bookedDates, bookedTables, existingBookings } from '../../data/mock-data'
import type { BookingFormData } from '@/types/booking'

export default function BookingSystem() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedTable, setSelectedTable] = useState<string>()
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    guests: '',
    specialRequests: '',
  })

  const steps = [
    { number: 1, title: 'Select Date', icon: CalendarDays },
    { number: 2, title: 'Choose Table', icon: MapPin },
    { number: 3, title: 'Guest Details', icon: ClipboardList },
    { number: 4, title: 'Confirm', icon: CheckCircle },
  ]

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value)
  }

  const handleTableSelect = (tableId: string) => {
    if (!bookedTables.includes(tableId)) {
      setSelectedTable(tableId)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleBookingSubmit = async () => {
    try {
      if (!selectedDate || !selectedTime || !selectedTable || !formData) {
        toast.error('Please fill in all required fields')
        return
      }

      const bookingData = {
        selectedDate: selectedDate.toISOString(),
        selectedTime,
        selectedTable,
        formData: {
          ...formData,
          guests: formData.guests.toString()
        }
      }

      // Show loading toast
      const loadingToast = toast.loading('Creating your booking...')

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()

      // Dismiss loading toast
      toast.dismiss(loadingToast)

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to create booking')
      }

      // Show success toast
      toast.success('Booking created successfully!', {
        description: `Table ${selectedTable.split('-')[1]} booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
      })

      // Reset form
      setStep(1)
      setSelectedDate(undefined)
      setSelectedTime('')
      setSelectedTable(undefined)
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: '',
        specialRequests: '',
      })

    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred while booking')
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <Card className="mx-auto max-w-6xl">
        <CardHeader>
          <CardTitle>Restaurant Booking</CardTitle>
          <CardDescription>Book your table in a few simple steps</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressSteps step={step} steps={steps} />

          {step === 1 && (
            <CalendarView
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              selectedTime={selectedTime}
              onTimeChange={handleTimeChange}
            />
          )}

          {step === 2 && (
            <TableSelection
              selectedTable={selectedTable}
              selectedDate={selectedDate}
              onTableSelect={handleTableSelect}
            />
          )}

          {step === 3 && (
            <BookingForm
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}

          {step === 4 && (
            <BookingSummary
              selectedTime={selectedTime}
              selectedDate={selectedDate}
              selectedTable={selectedTable}
              formData={formData}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={step === 4 ? handleBookingSubmit : nextStep}
            disabled={
              (step === 1 && (!selectedDate || !selectedTime)) ||
              (step === 2 && !selectedTable) ||
              (step === 3 && (!formData.name || !formData.email || !formData.phone || !formData.guests))
            }
          >
            {step === 4 ? (
              'Confirm Booking'
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

