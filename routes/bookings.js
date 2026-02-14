const express = require('express');
const router = express.Router();

// Mock bookings database
let bookingsData = [];
let bookingIdCounter = 1;

// POST create new booking
router.post('/', (req, res) => {
    try {
        const {
            cruiseId,
            sailingDate,
            passengers,
            cabinType,
            specialRequests,
            contactInfo
        } = req.body;

        // Validate required fields
        if (!cruiseId || !sailingDate || !passengers || !cabinType || !contactInfo) {
            return res.status(400).json({
                success: false,
                error: 'Missing required booking information'
            });
        }

        // Create new booking
        const newBooking = {
            id: bookingIdCounter++,
            bookingReference: `PHLNCL-${Date.now()}`,
            cruiseId,
            sailingDate,
            passengers: passengers.map(p => ({
                firstName: p.firstName,
                lastName: p.lastName,
                dateOfBirth: p.dateOfBirth,
                nationality: p.nationality,
                passportNumber: p.passportNumber,
                specialNeeds: p.specialNeeds || null
            })),
            cabinType,
            specialRequests: specialRequests || null,
            contactInfo: {
                email: contactInfo.email,
                phone: contactInfo.phone,
                address: contactInfo.address
            },
            pricing: calculateBookingPrice(cruiseId, cabinType, passengers.length),
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        bookingsData.push(newBooking);

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: newBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create booking',
            message: error.message
        });
    }
});

// GET booking by reference
router.get('/:reference', (req, res) => {
    try {
        const booking = bookingsData.find(b => 
            b.bookingReference === req.params.reference
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch booking',
            message: error.message
        });
    }
});

// PUT update booking
router.put('/:reference', (req, res) => {
    try {
        const bookingIndex = bookingsData.findIndex(b => 
            b.bookingReference === req.params.reference
        );

        if (bookingIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        const updatedBooking = {
            ...bookingsData[bookingIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        bookingsData[bookingIndex] = updatedBooking;

        res.json({
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update booking',
            message: error.message
        });
    }
});

// DELETE cancel booking
router.delete('/:reference', (req, res) => {
    try {
        const bookingIndex = bookingsData.findIndex(b => 
            b.bookingReference === req.params.reference
        );

        if (bookingIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        // Update status to cancelled instead of deleting
        bookingsData[bookingIndex].status = 'cancelled';
        bookingsData[bookingIndex].updatedAt = new Date().toISOString();

        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            data: bookingsData[bookingIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to cancel booking',
            message: error.message
        });
    }
});

// POST confirm booking payment
router.post('/:reference/payment', (req, res) => {
    try {
        const { paymentMethod, paymentDetails } = req.body;
        
        const bookingIndex = bookingsData.findIndex(b => 
            b.bookingReference === req.params.reference
        );

        if (bookingIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        // Mock payment processing
        const paymentResult = {
            transactionId: `TXN-${Date.now()}`,
            status: 'completed',
            amount: bookingsData[bookingIndex].pricing.total,
            currency: 'PHP',
            paymentMethod,
            processedAt: new Date().toISOString()
        };

        // Update booking with payment info
        bookingsData[bookingIndex].payment = paymentResult;
        bookingsData[bookingIndex].status = 'confirmed';
        bookingsData[bookingIndex].updatedAt = new Date().toISOString();

        res.json({
            success: true,
            message: 'Payment processed successfully',
            data: {
                booking: bookingsData[bookingIndex],
                payment: paymentResult
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Payment processing failed',
            message: error.message
        });
    }
});

// GET booking confirmation details
router.get('/:reference/confirmation', (req, res) => {
    try {
        const booking = bookingsData.find(b => 
            b.bookingReference === req.params.reference
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        if (booking.status !== 'confirmed') {
            return res.status(400).json({
                success: false,
                error: 'Booking is not confirmed'
            });
        }

        const confirmationDetails = {
            bookingReference: booking.bookingReference,
            cruiseDetails: {
                cruiseId: booking.cruiseId,
                sailingDate: booking.sailingDate,
                cabinType: booking.cabinType
            },
            passengers: booking.passengers,
            totalAmount: booking.pricing.total,
            checkInInstructions: [
                'Arrive at port 2 hours before departure',
                'Bring valid passport and booking confirmation',
                'Complete online check-in 24 hours prior',
                'Download Philippines NCL mobile app for updates'

            ],
            emergencyContact: '+63 2 8123 4567',
            confirmationDate: booking.updatedAt
        };

        res.json({
            success: true,
            data: confirmationDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch confirmation details',
            message: error.message
        });
    }
});

// Helper function to calculate booking price
function calculateBookingPrice(cruiseId, cabinType, passengerCount) {
    // Mock pricing calculation
    const basePrices = {
        interior: 59900,
        oceanview: 79900,
        balcony: 99900,
        suite: 149900
    };

    const basePrice = basePrices[cabinType] || basePrices.interior;
    const subtotal = basePrice * passengerCount;
    const taxes = subtotal * 0.12; // 12% VAT
    const fees = 2500 * passengerCount; // Port fees per person
    const total = subtotal + taxes + fees;

    return {
        basePrice,
        passengerCount,
        subtotal,
        taxes,
        fees,
        total,
        currency: 'PHP'
    };
}

module.exports = router;