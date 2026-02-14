const express = require('express');
const router = express.Router();

// Mock destinations data
const destinationsData = [
    {
        id: 1,
        name: 'Manila',
        country: 'Philippines',
        region: 'Luzon',
        description: 'The bustling capital city of the Philippines, Manila is a vibrant metropolis that seamlessly blends rich history with modern urban life.',
        highlights: [
            'Intramuros - Historic walled city',
            'Rizal Park - National hero monument',
            'Manila Bay sunset views',
            'National Museum complex',
            'Chinatown (Binondo)',
            'Manila Cathedral'
        ],
        activities: [
            'Historical walking tours',
            'Cultural site visits',
            'Shopping at malls and markets',
            'Filipino cuisine tasting',
            'River cruise along Pasig',
            'Nightlife in Makati'
        ],
        bestTimeToVisit: 'November to April',
        averageTemperature: '26-32°C',
        currency: 'Philippine Peso (PHP)',
        language: 'Filipino, English',
        timezone: 'GMT+8',
        portInfo: {
            dockingLocation: 'Manila South Harbor',
            distanceToCity: '2 km',
            transportOptions: ['Taxi', 'Jeepney', 'Bus', 'Grab']
        },
        images: [
            '/assets/manila-intramuros.jpg',
            '/assets/manila-bay.jpg',
            '/assets/manila-skyline.jpg'
        ]
    },
    {
        id: 2,
        name: 'Boracay',
        country: 'Philippines',
        region: 'Visayas',
        description: 'World-famous for its pristine white sand beaches and crystal-clear waters, Boracay is a tropical paradise perfect for relaxation and water activities.',
        highlights: [
            'White Beach - 4km of powdery white sand',
            'Puka Beach - Shell-covered shoreline',
            'Mount Luho - Highest point with panoramic views',
            'Willy\'s Rock - Iconic rock formation',
            'D\'Mall - Shopping and dining hub',
            'Sunset sailing'
        ],
        activities: [
            'Beach lounging and swimming',
            'Water sports (kitesurfing, parasailing)',
            'Island hopping tours',
            'Scuba diving and snorkeling',
            'Sunset paraw sailing',
            'Beach parties and nightlife',
            'Spa and wellness treatments',
            'ATV adventures'
        ],
        bestTimeToVisit: 'November to April',
        averageTemperature: '25-30°C',
        currency: 'Philippine Peso (PHP)',
        language: 'Filipino, English',
        timezone: 'GMT+8',
        portInfo: {
            dockingLocation: 'Caticlan Jetty Port',
            distanceToCity: '15 minutes by boat',
            transportOptions: ['Tricycle', 'E-jeepney', 'Motorbike']
        },
        images: [
            '/assets/boracay-white-beach.jpg',
            '/assets/boracay-sunset.jpg',
            '/assets/boracay-activities.jpg'
        ]
    },
    {
        id: 3,
        name: 'Palawan',
        country: 'Philippines',
        region: 'MIMAROPA',
        description: 'Known as the "Last Frontier" of the Philippines, Palawan boasts stunning limestone cliffs, underground rivers, and some of the world\'s most beautiful lagoons.',
        highlights: [
            'Puerto Princesa Underground River',
            'El Nido limestone cliffs and lagoons',
            'Coron Island and shipwreck diving',
            'Tubbataha Reefs Natural Park',
            'Balabac Island mouse-deer sanctuary',
            'Honda Bay island hopping'
        ],
        activities: [
            'Underground river tour',
            'Island hopping in El Nido',
            'Wreck diving in Coron',
            'Kayaking through lagoons',
            'Wildlife watching',
            'Cave exploration',
            'Snorkeling and diving',
            'Firefly watching'
        ],
        bestTimeToVisit: 'November to May',
        averageTemperature: '24-31°C',
        currency: 'Philippine Peso (PHP)',
        language: 'Filipino, English',
        timezone: 'GMT+8',
        portInfo: {
            dockingLocation: 'Puerto Princesa Port',
            distanceToCity: '5 km',
            transportOptions: ['Tricycle', 'Van', 'Jeepney', 'Habal-habal']
        },
        images: [
            '/assets/palawan-underground-river.jpg',
            '/assets/palawan-el-nido.jpg',
            '/assets/palawan-coron.jpg'
        ]
    },
    {
        id: 4,
        name: 'Bohol',
        country: 'Philippines',
        region: 'Central Visayas',
        description: 'Famous for its unique Chocolate Hills and adorable tarsiers, Bohol offers a perfect blend of natural wonders and cultural heritage.',
        highlights: [
            'Chocolate Hills - 1,268 cone-shaped hills',
            'Tarsier Sanctuary - World\'s smallest primates',
            'Loboc River cruise',
            'Blood Compact Monument',
            'Baclayon Church - Historic stone church',
            'Panglao Island beaches'
        ],
        activities: [
            'Chocolate Hills viewing',
            'Tarsier watching',
            'River cruise with cultural show',
            'Historical site tours',
            'Beach activities in Panglao',
            'Diving at Balicasag Island',
            'Zip-lining adventures',
            'Butterfly garden visits'
        ],
        bestTimeToVisit: 'December to May',
        averageTemperature: '25-30°C',
        currency: 'Philippine Peso (PHP)',
        language: 'Boholano, Filipino, English',
        timezone: 'GMT+8',
        portInfo: {
            dockingLocation: 'Tagbilaran Port',
            distanceToCity: '1 km',
            transportOptions: ['Tricycle', 'Jeepney', 'Habal-habal', 'Van']
        },
        images: [
            '/assets/bohol-chocolate-hills.jpg',
            '/assets/bohol-tarsier.jpg',
            '/assets/bohol-loboc-river.jpg'
        ]
    },
    {
        id: 5,
        name: 'Cebu',
        country: 'Philippines',
        region: 'Central Visayas',
        description: 'The Queen City of the South, Cebu is rich in Spanish colonial history and serves as the gateway to numerous beautiful islands and diving spots.',
        highlights: [
            'Magellan\'s Cross - Historic landmark',
            'Basilica del Santo Niño',
            'Temple of Leah - Roman-inspired temple',
            'Fort San Pedro - Triangular fort',
            'Heritage Monument',
            'Oslob whale shark watching'
        ],
        activities: [
            'Historical city tours',
            'Whale shark swimming in Oslob',
            'Canyoneering in Kawasan Falls',
            'Island hopping to nearby islands',
            'Diving and snorkeling',
            'Cultural performances',
            'Local market visits',
            'Guitar factory tours'
        ],
        bestTimeToVisit: 'December to May',
        averageTemperature: '24-30°C',
        currency: 'Philippine Peso (PHP)',
        language: 'Cebuano, Filipino, English',
        timezone: 'GMT+8',
        portInfo: {
            dockingLocation: 'Cebu International Port',
            distanceToCity: '3 km',
            transportOptions: ['Taxi', 'Jeepney', 'Habal-habal', 'Grab']
        },
        images: [
            '/assets/cebu-magellan-cross.jpg',
            '/assets/cebu-temple-leah.jpg',
            '/assets/cebu-oslob-whale-shark.jpg'
        ]
    }
];

// GET all destinations
router.get('/', (req, res) => {
    try {
        const { region, activity } = req.query;
        let filteredDestinations = [...destinationsData];

        if (region) {
            filteredDestinations = filteredDestinations.filter(dest => 
                dest.region.toLowerCase() === region.toLowerCase()
            );
        }

        if (activity) {
            filteredDestinations = filteredDestinations.filter(dest => 
                dest.activities.some(act => 
                    act.toLowerCase().includes(activity.toLowerCase())
                )
            );
        }

        res.json({
            success: true,
            count: filteredDestinations.length,
            data: filteredDestinations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch destinations',
            message: error.message
        });
    }
});

// GET single destination by ID
router.get('/:id', (req, res) => {
    try {
        const destination = destinationsData.find(d => d.id === parseInt(req.params.id));
        
        if (!destination) {
            return res.status(404).json({
                success: false,
                error: 'Destination not found'
            });
        }

        res.json({
            success: true,
            data: destination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch destination',
            message: error.message
        });
    }
});

// GET destination by name
router.get('/name/:name', (req, res) => {
    try {
        const destination = destinationsData.find(d => 
            d.name.toLowerCase() === req.params.name.toLowerCase()
        );
        
        if (!destination) {
            return res.status(404).json({
                success: false,
                error: 'Destination not found'
            });
        }

        res.json({
            success: true,
            data: destination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch destination',
            message: error.message
        });
    }
});

// GET weather information for destination
router.get('/:id/weather', (req, res) => {
    try {
        const destination = destinationsData.find(d => d.id === parseInt(req.params.id));
        
        if (!destination) {
            return res.status(404).json({
                success: false,
                error: 'Destination not found'
            });
        }

        // Mock weather data
        const weatherData = {
            destination: destination.name,
            current: {
                temperature: Math.floor(Math.random() * 8) + 25,
                condition: 'Partly Cloudy',
                humidity: Math.floor(Math.random() * 30) + 60,
                windSpeed: Math.floor(Math.random() * 15) + 5
            },
            forecast: Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                high: Math.floor(Math.random() * 8) + 28,
                low: Math.floor(Math.random() * 5) + 23,
                condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)]
            }))
        };

        res.json({
            success: true,
            data: weatherData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather data',
            message: error.message
        });
    }
});

module.exports = router;