import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { BookingList } from './booking-list'
import type { Booking } from '@/types/booking'

interface CalendarViewProps {
  selectedDate?: Date
  onDateSelect: (date: Date | undefined) => void
  bookedDates: string[]
  existingBookings: Booking[]
}

export function CalendarView({
  selectedDate,
  onDateSelect,
  bookedDates,
  existingBookings,
}: CalendarViewProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className=" md:col-span-2 rounded-lg border p-4 flex">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="mx-auto w-full"
            modifiers={{
              booked: (date) => bookedDates.includes(format(date, 'yyyy-MM-dd')),
            }}
            modifiersStyles={{
              booked: {
                backgroundColor: 'rgb(239 68 68 / 0.1)',
                color: 'rgb(239 68 68)',
              },
            }}
            disabled={(date) =>
              date < new Date() || bookedDates.includes(format(date, 'yyyy-MM-dd'))
            }
          />
        </div>
        <div className="md:col-span-3 rounded-lg border p-4">
          <BookingList bookings={existingBookings} selectedDate={selectedDate} />
        </div>
      </div>
      {selectedDate && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Selected: {format(selectedDate, 'MMMM d, yyyy')}
          </Badge>
        </div>
      )}
    </div>
  )
}

