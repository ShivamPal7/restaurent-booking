import { format } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Clock, Users } from 'lucide-react'
import type { Booking } from '@/types/booking'

interface BookingListProps {
  bookings: Booking[]
  selectedDate?: Date
}

export function BookingList({ bookings, selectedDate }: BookingListProps) {
  const filteredBookings = selectedDate
    ? bookings.filter(
        (booking) =>
          format(new Date(booking.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
    : bookings

  // Sort bookings by date and time
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime()
    if (dateCompare === 0) {
      return a.time.localeCompare(b.time)
    }
    return dateCompare
  })

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">
          {selectedDate
            ? `Bookings for ${format(selectedDate, 'MMMM d, yyyy')}`
            : 'All Bookings'}
        </h3>
        <Badge variant="secondary">{sortedBookings.length} bookings</Badge>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {sortedBookings.length > 0 ? (
            sortedBookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-lg border bg-card p-4 text-card-foreground"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{booking.name}</span>
                  <Badge>Table {booking.tableNumber}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(new Date(booking.date), 'MMMM d, yyyy')} at {booking.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{booking.guests} guests</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p>No bookings found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
