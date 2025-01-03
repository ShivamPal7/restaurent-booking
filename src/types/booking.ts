export interface Booking {
    id: string
    date: Date
    time: string
    table: number
    guests: number
    name: string
  }
  
  export interface BookingFormData {
    name: string
    email: string
    phone: string
    guests: string
    specialRequests: string
  }
  
  