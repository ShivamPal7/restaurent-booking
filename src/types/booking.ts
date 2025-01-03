export interface Booking {
    id: string
    date: Date
    time: string
    tableNumber: string
    name: string
    email: string
    phone: string
    guests: string
    specialRequests?: string
    createdAt: Date
  }
  
  export interface BookingFormData {
    name: string
    email: string
    phone: string
    guests: string
    specialRequests: string
  }
  
  