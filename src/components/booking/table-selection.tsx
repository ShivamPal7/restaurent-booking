import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import type { Booking } from '@/types/booking'

interface TableSelectionProps {
  selectedTable?: string
  selectedDate?: Date
  onTableSelect: (tableId: string) => void
}

export function TableSelection({ selectedTable, selectedDate, onTableSelect }: TableSelectionProps) {
  const [bookedTables, setBookedTables] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookedTables = async () => {
      if (!selectedDate) return

      try {
        const response = await fetch('/api/booking')
        const data = await response.json()

        if (data.success) {
          // Filter bookings for selected date and extract table numbers
          const tablesForDate = data.bookings
            .filter((booking: Booking) => 
              format(new Date(booking.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
            )
            .map((booking: Booking) => `table-${booking.tableNumber}`)

          setBookedTables(tablesForDate)
        }
      } catch (error) {
        console.error('Error fetching booked tables:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookedTables()
  }, [selectedDate])

  if (!selectedDate) {
    return (
      <div className="text-center text-muted-foreground">
        Please select a date first
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground">
        Loading available tables...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => {
          const tableId = `table-${i + 1}`
          const isBooked = bookedTables.includes(tableId)
          const isSelected = selectedTable === tableId

          return (
            <button
              key={tableId}
              onClick={() => onTableSelect(tableId)}
              disabled={isBooked}
              className={`relative aspect-square rounded-lg border-2 p-4 transition-all ${
                isBooked
                  ? 'cursor-not-allowed border-destructive/50 bg-destructive/10'
                  : isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-muted hover:border-primary/50 hover:bg-muted'
              }`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <Users className={isBooked ? 'text-destructive' : 'text-primary'} />
                <span className={isBooked ? 'text-destructive' : ''}>Table {i + 1}</span>
                {isBooked && <Badge variant="destructive">Booked</Badge>}
              </div>
            </button>
          )
        })}
      </div>
      {selectedTable && (
        <Badge variant="outline" className="text-sm">
          Selected: Table {selectedTable.split('-')[1]}
        </Badge>
      )}
    </div>
  )
}

