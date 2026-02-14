const express = require('express');
const router = express.Router();

// Mock database - in production, this would connect to a real database
const cruisesData = [
    {
        id: 1,
        name: '7-Day Philippines Island Hopping',
        duration: 7,
        ship: 'Philippines NCL Spirit',
        ports: [
            { name: 'Manila', country: 'Philippines', arrivalTime: '08:00', departureTime: '18:00' },
            { name: 'Boracay', country: 'Philippines', arrivalTime: '07:00', departureTime: '17:00' },
            { name: 'Palawan', country: 'Philippines', arrivalTime: '08:00', departureTime: '16:00' },
            { name: 'Bohol', country: 'Philippines', arrivalTime: '09:00', departureTime: '18:00' },
            { name: 'Cebu', country: 'Philippines', arrivalTime: '07:00', departureTime: '19:00' }
        ],
        price: {
            interior: { from: 59900, currency: 'PHP' },
            oceanview: { from: 79900, currency: 'PHP' },
            balcony: { from: 99900, currency: 'PHP' },
            suite: { from: 149900, currency: 'PHP' }
        },
        inclusions: [
            'All meals and snacks',
            'Entertainment and shows',
            'Pool and fitness facilities',
            'Kids club activities',
            'Wi-Fi (basic package)',
            'Philippines NCL exclusive amenities'
        ],
        highlights: [
            'White sand beaches of Boracay',
            'Underground River in Palawan',
            'Chocolate Hills in Bohol',
            'Cultural sites in Manila',
            'Diving and snorkeling opportunities'
        ],
        sailingDates: [
            '2024-11-15', '2024-11-29', '2024-12-13', '2024-12-27',
            '2025-01-10', '2025-01-24', '2025-02-07', '2025-02-21'
        ]
    },
    {
        id: 2,
        name: '10-Day Philippines & Southeast Asia',
        duration: 10,
        ship: 'Philippines NCL Jade',
        ports: [
            { name: 'Manila', country: 'Philippines', arrivalTime: '08:00', departureTime: '18:00' },
            { name: 'Boracay', country: 'Philippines', arrivalTime: '07:00', departureTime: '17:00' },
            { name: 'Palawan', country: 'Philippines', arrivalTime: '08:00', departureTime: '16:00' },
            { name: 'Singapore', country: 'Singapore', arrivalTime: '06:00', departureTime: '23:00' },
            { name: 'Kuala Lumpur', country: 'Malaysia', arrivalTime: '08:00', departureTime: '18:00' }
        ],
        price: {
            interior: { from: 89900, currency: 'PHP' },
            oceanview: { from: 119900, currency: 'PHP' },
            balcony: { from: 149900, currency: 'PHP' },
            suite: { from: 219900, currency: 'PHP' }
        },
        inclusions: [
            'All meals and snacks',
            'Entertainment and shows',
            'Pool and fitness facilities',
            'Kids club activities',
            'Wi-Fi (premium package)',
            'Philippines NCL premium services',
            'Shore excursion credits'
        ],
        highlights: [
            'Extended Philippines exploration',
            'Singapore Gardens by the Bay',
            'Malaysian cultural experience',
            'Multiple UNESCO World Heritage sites',
            'Diverse culinary experiences'
        ],
        sailingDates: [
            '2024-11-20', '2024-12-05', '2024-12-20',
            '2025-01-05', '2025-01-20', '2025-02-05'
        ]
    }
];

// GET all cruises
router.get('/', (req, res) => {
    try {
        const { duration, priceRange, departure } = req.query;
        let filteredCruises = [...cruisesData];

        // Filter by duration
        if (duration) {
            filteredCruises = filteredCruises.filter(cruise => 
                cruise.duration === parseInt(duration)
            );
        }

        // Filter by price range
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filteredCruises = filteredCruises.filter(cruise => 
                cruise.price.interior.from >= min && cruise.price.interior.from <= max
            );
        }

        // Filter by departure date
        if (departure) {
            filteredCruises = filteredCruises.filter(cruise => 
                cruise.sailingDates.some(date => date.startsWith(departure))
            );
        }

        res.json({
            success: true,
            count: filteredCruises.length,
            data: filteredCruises
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cruises',
            message: error.message
        });
    }
});

// GET single cruise by ID
router.get('/:id', (req, res) => {
    try {
        const cruise = cruisesData.find(c => c.id === parseInt(req.params.id));
        
        if (!cruise) {
            return res.status(404).json({
                success: false,
                error: 'Cruise not found'
            });
        }

        res.json({
            success: true,
            data: cruise
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cruise',
            message: error.message
        });
    }
});

// GET cruise availability
router.get('/:id/availability', (req, res) => {
    try {
        const cruise = cruisesData.find(c => c.id === parseInt(req.params.id));
        
        if (!cruise) {
            return res.status(404).json({
                success: false,
                error: 'Cruise not found'
            });
        }

        // Mock availability data
        const availability = cruise.sailingDates.map(date => ({
            date,
            available: Math.floor(Math.random() * 100) + 10,
            price: {
                interior: cruise.price.interior.from + Math.floor(Math.random() * 20000),
                oceanview: cruise.price.oceanview.from + Math.floor(Math.random() * 20000),
                balcony: cruise.price.balcony.from + Math.floor(Math.random() * 20000),
                suite: cruise.price.suite.from + Math.floor(Math.random() * 30000)
            }
        }));

        res.json({
            success: true,
            data: availability
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch availability',
            message: error.message
        });
    }
});

// POST search cruises
router.post('/search', (req, res) => {
    try {
        const { 
            destination, 
            duration, 
            departureDate, 
            passengers, 
            priceRange 
        } = req.body;

        let results = [...cruisesData];

        // Apply search filters
        if (destination) {
            results = results.filter(cruise => 
                cruise.ports.some(port => 
                    port.name.toLowerCase().includes(destination.toLowerCase())
                )
            );
        }

        if (duration) {
            results = results.filter(cruise => cruise.duration === duration);
        }

        if (departureDate) {
            results = results.filter(cruise => 
                cruise.sailingDates.some(date => date >= departureDate)
            );
        }

        res.json({
            success: true,
            searchCriteria: req.body,
            count: results.length,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Search failed',
            message: error.message
        });
    }
});

module.exports = router;