import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { BookingFormData } from '@/types/booking'

interface BookingFormProps {
  formData: BookingFormData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function BookingForm({ formData, onInputChange }: BookingFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={onInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={onInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={onInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            name="guests"
            type="number"
            placeholder="Enter number of guests"
            value={formData.guests}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          name="specialRequests"
          placeholder="Enter any special requests or dietary requirements"
          value={formData.specialRequests}
          onChange={onInputChange}
        />
      </div>
    </div>
  )
}

