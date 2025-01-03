import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { format } from 'date-fns'
import type { BookingFormData } from '@/types/booking'

interface BookingSummaryProps {
  selectedDate?: Date
  selectedTable?: string
  formData: BookingFormData
  selectedTime?: string
}

export function BookingSummary({ selectedDate, selectedTable, formData, selectedTime }: BookingSummaryProps) {

  console.log(formData)

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-semibold">Booking Summary</h3>
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>Date: {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Time: {selectedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Table: {selectedTable?.split('-')[1]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Guests: {formData.guests}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {formData.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {formData.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {formData.phone}
            </p>
          </div>
        </div>
        {formData.specialRequests && (
          <div className="mt-4">
            <p className="font-medium">Special Requests:</p>
            <p className="text-sm text-muted-foreground">{formData.specialRequests}</p>
          </div>
        )}
      </div>
    </div>
  )
}

