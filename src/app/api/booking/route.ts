import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const {
      selectedDate,
      selectedTime,
      selectedTable,
      formData
    } = body

    // Validate required fields
    if (!selectedDate || !selectedTime || !selectedTable || !formData) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate formData fields
    if (!formData.name || !formData.email || !formData.phone || !formData.guests) {
      return NextResponse.json(
        { success: false, error: 'Missing required form fields' },
        { status: 400 }
      )
    }

    // Extract table number without the "table-" prefix
    const tableNumber = selectedTable.replace('table-', '')

    // Create booking with exact schema match
    const booking = await prisma.booking.create({
      data: {
        date: new Date(selectedDate),
        time: selectedTime,
        tableNumber: tableNumber,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
        specialRequests: formData.specialRequests || '',
        createdAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      booking
    }, {
      status: 201
    })

  } catch (error) {
    console.error('Booking error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error creating booking',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, {
      status: 500
    })
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      bookings
    })

  } catch (error) {
    console.error('Error fetching bookings:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error fetching bookings',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, {
      status: 500
    })
  }
}
