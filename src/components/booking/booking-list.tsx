import { format } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Clock, Users } from 'lucide-react'

interface Booking {
  id: string
  date: Date
  time: string
  table: number
  guests: number
  name: string
}

interface BookingListProps {
  bookings: Booking[]
  selectedDate?: Date
}

export function BookingList({ bookings, selectedDate }: BookingListProps) {
  const filteredBookings = selectedDate
    ? bookings.filter(
        (booking) =>
          format(booking.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
    : bookings

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">
          {selectedDate
            ? `Bookings for ${format(selectedDate, 'MMMM d, yyyy')}`
            : 'All Bookings'}
        </h3>
        <Badge variant="secondary">{filteredBookings.length} bookings</Badge>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-lg border bg-card p-4 text-card-foreground"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{booking.name}</span>
                <Badge>Table {booking.table}</Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {format(booking.date, 'MMMM d, yyyy')} at {booking.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{booking.guests} guests</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
