const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Middleware
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname)));
app.use('/js', express.static(path.join(__dirname)));

// API Routes
app.use('/api/cruises', require('./routes/cruises'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));

// Serve main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Basic page routes - destinations now integrated into main page

// Serve dedicated HTML pages for navigation with cache-busting
app.get('/explore', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.sendFile(path.join(__dirname, 'explore.html'));
});

app.get('/deals', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.sendFile(path.join(__dirname, 'deals.html'));
});

app.get('/about', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/manage', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.sendFile(path.join(__dirname, 'manage.html'));
});

app.get('/help', (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.sendFile(path.join(__dirname, 'help.html'));
});

// Simple booking inquiry endpoint
app.post('/api/booking-inquiry', (req, res) => {
    const { name, email, phone, passengers, cruiseId } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !passengers) {
        return res.status(400).json({
            success: false,
            error: 'Missing required information'
        });
    }
    
    // Generate booking reference
    const bookingRef = `PHLNCL-${Date.now()}`;
    
    // In a real application, you would save this to a database
    console.log('New booking inquiry:', { bookingRef, name, email, phone, passengers, cruiseId });
    
    res.json({
        success: true,
        message: 'Booking inquiry received successfully',
        bookingReference: bookingRef,
        nextSteps: 'Our team will contact you within 24 hours'
    });
});

// API endpoint for cruise data
app.get('/api/philippines-cruises', (req, res) => {
    const cruiseData = {
        destination: 'Philippines',
        cruises: [
            {
                id: 1,
                name: '7-Day Philippines Island Hopping',
                duration: 7,
                ports: ['Manila', 'Boracay', 'Palawan', 'Bohol', 'Cebu'],
                price: {
                    from: 89900,
                    currency: 'PHP'
                },
                highlights: [
                    'White sand beaches of Boracay',
                    'Underground River in Palawan',
                    'Chocolate Hills in Bohol',
                    'Cultural sites in Manila'
                ],
                availability: {
                    nextSailing: '2024-12-15',
                    spotsAvailable: 45
                }
            },
            {
                id: 2,
                name: '10-Day Philippines & Southeast Asia',
                duration: 10,
                ports: ['Manila', 'Boracay', 'Palawan', 'Singapore', 'Kuala Lumpur'],
                price: {
                    from: 129900,
                    currency: 'PHP'
                },
                highlights: [
                    'Extended Philippines exploration',
                    'Singapore city experience',
                    'Malaysian culture in KL',
                    'Multiple UNESCO sites'
                ],
                availability: {
                    nextSailing: '2024-11-20',
                    spotsAvailable: 23
                }
            },
            {
                id: 3,
                name: '5-Day Philippines Highlights',
                duration: 5,
                ports: ['Manila', 'Boracay', 'Palawan'],
                price: {
                    from: 59900,
                    currency: 'PHP'
                },
                highlights: [
                    'Perfect introduction cruise',
                    'Best beaches and islands',
                    'Cultural immersion',
                    'Snorkeling and diving'
                ],
                availability: {
                    nextSailing: '2024-11-30',
                    spotsAvailable: 67
                }
            }
        ],
        destinations: [
            {
                name: 'Manila',
                description: 'The bustling capital city with rich history and modern attractions',
                highlights: ['Intramuros', 'Rizal Park', 'Manila Bay sunset'],
                image: '/assets/manila.jpg'
            },
            {
                name: 'Boracay',
                description: 'Famous for its powdery white sand beaches and vibrant nightlife',
                highlights: ['White Beach', 'Water sports', 'Island hopping'],
                image: '/assets/boracay.jpg'
            },
            {
                name: 'Palawan',
                description: 'Home to the Underground River and stunning limestone cliffs',
                highlights: ['Underground River', 'El Nido', 'Coron Island'],
                image: '/assets/palawan.jpg'
            },
            {
                name: 'Bohol',
                description: 'Known for the Chocolate Hills and adorable tarsiers',
                highlights: ['Chocolate Hills', 'Tarsier Sanctuary', 'Loboc River'],
                image: '/assets/bohol.jpg'
            },
            {
                name: 'Cebu',
                description: 'The Queen City of the South with Spanish colonial heritage',
                highlights: ['Magellan\'s Cross', 'Temple of Leah', 'Oslob whale sharks'],
                image: '/assets/cebu.jpg'
            }
        ],
        bestTimeToVisit: {
            season: 'Dry Season',
            months: ['November', 'December', 'January', 'February', 'March', 'April'],
            weather: 'Sunny and dry with calm seas, perfect for cruising'
        },
        activities: [
            'Snorkeling and diving',
            'Island hopping',
            'Cultural tours',
            'Beach relaxation',
            'Water sports',
            'Wildlife watching',
            'Local cuisine tasting',
            'Shopping for souvenirs'
        ]
    };
    
    res.json(cruiseData);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Philippines NCL Cruises API'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚢 Philippines NCL Cruises server running on port ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;