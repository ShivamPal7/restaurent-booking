import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { BookingList } from './booking-list'
import type { Booking } from '@/types/booking'

interface CalendarViewProps {
  selectedDate?: Date
  onDateSelect: (date: Date | undefined) => void
  selectedTime: string
  onTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function CalendarView({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeChange,
}: CalendarViewProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bookedDates, setBookedDates] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/booking')
        const data = await response.json()
        
        if (data.success) {
          // Convert date strings to Date objects
          const formattedBookings = data.bookings.map((booking: any) => ({
            ...booking,
            date: new Date(booking.date)
          }))
          setBookings(formattedBookings)
          
          // Get unique booked dates
          const dates = Array.from(new Set(formattedBookings.map((booking: Booking) => 
            format(new Date(booking.date), 'yyyy-MM-dd')
          ))) as string[]
          setBookedDates(dates)
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex gap-6 md:flex-row flex-col">
        {/* Date and Time Block */}
        <div className="rounded-lg border p-4 flex flex-col md:flex-col sm:flex-row gap-2">
          {/* Calendar Section */}
          <div className="rounded-lg border p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              className="mx-auto w-full"
              modifiers={{
                booked: (date) =>
                  bookedDates.includes(format(date, 'yyyy-MM-dd')),
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: 'rgb(239 68 68 / 0.1)',
                  color: 'rgba(33, 33, 33, 1)',
                },
              }}
              disabled={(date) => date < new Date()}
            />
          </div>

          {/* Time Section */}
          <div className="rounded-lg border p-4 flex flex-col items-center w-full">
            <div className="flex justify-center align-center">
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold p-2">Select Time</h2>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={onTimeChange}
                  className="border rounded px-3 py-2 text-sm w-full h-full"
                />
                {selectedDate && selectedTime && (
                  <Badge variant="outline" className="text-sm mt-4">
                    {`Selected: ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedTime}`}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Booking List Block */}
        <div className="rounded-lg border p-4 w-full">
          {isLoading ? (
            <div className="text-center text-gray-500">
              <p>Loading bookings...</p>
            </div>
          ) : (
            <BookingList
              bookings={bookings}
              selectedDate={selectedDate}
            />
          )}
        </div>
      </div>
    </div>
  )
}
