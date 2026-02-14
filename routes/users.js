const express = require('express');
const router = express.Router();

// Mock users database
let usersData = [];
let userIdCounter = 1;

// POST register new user
router.post('/register', (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            nationality,
            password
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Missing required registration information'
            });
        }

        // Check if user already exists
        const existingUser = usersData.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User with this email already exists'
            });
        }

        // Create new user
        const newUser = {
            id: userIdCounter++,
            firstName,
            lastName,
            email,
            phone: phone || null,
            dateOfBirth: dateOfBirth || null,
            nationality: nationality || null,
            preferences: {
                newsletter: true,
                promotions: true,
                language: 'en'
            },
            loyaltyProgram: {
                level: 'Bronze',
                points: 0,
                memberSince: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // In production, password would be hashed
        newUser.passwordHash = `hashed_${password}`;

        usersData.push(newUser);

        // Remove password from response
        const { passwordHash, ...userResponse } = newUser;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Registration failed',
            message: error.message
        });
    }
});

// POST user login
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Find user
        const user = usersData.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // In production, you would verify the hashed password
        if (user.passwordHash !== `hashed_${password}`) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Generate mock JWT token
        const token = `jwt_token_${user.id}_${Date.now()}`;

        // Remove password from response
        const { passwordHash, ...userResponse } = user;

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: userResponse,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Login failed',
            message: error.message
        });
    }
});

// GET user profile
router.get('/:id', (req, res) => {
    try {
        const user = usersData.find(u => u.id === parseInt(req.params.id));

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Remove password from response
        const { passwordHash, ...userResponse } = user;

        res.json({
            success: true,
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user profile',
            message: error.message
        });
    }
});

// PUT update user profile
router.put('/:id', (req, res) => {
    try {
        const userIndex = usersData.findIndex(u => u.id === parseInt(req.params.id));

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Update user data
        const updatedUser = {
            ...usersData[userIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        // Don't allow updating certain fields
        delete updatedUser.id;
        delete updatedUser.createdAt;
        delete updatedUser.loyaltyProgram;

        usersData[userIndex] = { ...usersData[userIndex], ...updatedUser };

        // Remove password from response
        const { passwordHash, ...userResponse } = usersData[userIndex];

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update profile',
            message: error.message
        });
    }
});

// GET user bookings
router.get('/:id/bookings', (req, res) => {
    try {
        const user = usersData.find(u => u.id === parseInt(req.params.id));

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Mock user bookings - in production, this would query the bookings database
        const userBookings = [
            {
                bookingReference: 'PHLNCL-1234567890',
                cruiseName: '7-Day Philippines Island Hopping',
                sailingDate: '2024-12-15',
                status: 'confirmed',
                totalAmount: 119800,
                currency: 'PHP'
            },
            {
                bookingReference: 'PHLNCL-0987654321',
                cruiseName: '5-Day Philippines Highlights',
                sailingDate: '2024-11-30',
                status: 'completed',
                totalAmount: 79800,
                currency: 'PHP'
            }
        ];

        res.json({
            success: true,
            data: userBookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user bookings',
            message: error.message
        });
    }
});

// POST update user preferences
router.post('/:id/preferences', (req, res) => {
    try {
        const userIndex = usersData.findIndex(u => u.id === parseInt(req.params.id));

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Update preferences
        usersData[userIndex].preferences = {
            ...usersData[userIndex].preferences,
            ...req.body
        };
        usersData[userIndex].updatedAt = new Date().toISOString();

        res.json({
            success: true,
            message: 'Preferences updated successfully',
            data: usersData[userIndex].preferences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update preferences',
            message: error.message
        });
    }
});

// GET user loyalty program status
router.get('/:id/loyalty', (req, res) => {
    try {
        const user = usersData.find(u => u.id === parseInt(req.params.id));

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const loyaltyDetails = {
            ...user.loyaltyProgram,
            benefits: getLoyaltyBenefits(user.loyaltyProgram.level),
            nextLevelRequirement: getNextLevelRequirement(user.loyaltyProgram.level)
        };

        res.json({
            success: true,
            data: loyaltyDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch loyalty program status',
            message: error.message
        });
    }
});

// Helper functions
function getLoyaltyBenefits(level) {
    const benefits = {
        Bronze: ['Priority boarding', 'Welcome gift'],
        Silver: ['Priority boarding', 'Welcome gift', '5% discount on excursions', 'Free Wi-Fi (1 hour)'],
        Gold: ['Priority boarding', 'Welcome gift', '10% discount on excursions', 'Free Wi-Fi (3 hours)', 'Complimentary specialty dining'],
        Platinum: ['Priority boarding', 'Welcome gift', '15% discount on excursions', 'Free Wi-Fi (unlimited)', 'Complimentary specialty dining', 'Suite upgrades (subject to availability)']
    };
    return benefits[level] || benefits.Bronze;
}

function getNextLevelRequirement(currentLevel) {
    const requirements = {
        Bronze: { nextLevel: 'Silver', pointsNeeded: 2500 },
        Silver: { nextLevel: 'Gold', pointsNeeded: 7500 },
        Gold: { nextLevel: 'Platinum', pointsNeeded: 15000 },
        Platinum: { nextLevel: null, pointsNeeded: null }
    };
    return requirements[currentLevel];
}

module.exports = router;