import { Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface TableSelectionProps {
  selectedTable?: string
  bookedTables: string[]
  onTableSelect: (tableId: string) => void
}

export function TableSelection({ selectedTable, bookedTables, onTableSelect }: TableSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => {
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

