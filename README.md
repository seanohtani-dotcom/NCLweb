# Philippines NCL Cruises - Full Stack Web Application

A modern, responsive web application for Philippines NCL cruise destinations, built with Node.js, Express, and vanilla JavaScript.

## 🚢 Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive Tabs**: Dynamic content loading for different sections
- **Cruise Search & Booking**: Full booking system with payment processing
- **Destination Information**: Detailed information about Philippines cruise ports
- **User Management**: Registration, login, and profile management
- **Loyalty Program**: Points-based rewards system
- **RESTful API**: Complete backend API for all functionality
- **Real-time Updates**: Dynamic content updates without page refresh

## 🏗️ Project Structure

```
philippines-ncl-cruises/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # Frontend JavaScript
├── server.js               # Express server
├── package.json            # Node.js dependencies
├── .env.example            # Environment variables template
├── README.md               # Project documentation
└── routes/                 # API routes
    ├── cruises.js          # Cruise-related endpoints
    ├── destinations.js     # Destination information
    ├── bookings.js         # Booking management
    └── users.js            # User management
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   copy .env.example .env
   ```
   Edit the `.env` file with your configuration values.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Frontend Features

- **Homepage**: Browse Philippines cruise destinations
- **Cruise Search**: Filter cruises by duration, price, and dates
- **Destination Details**: Explore ports, activities, and highlights
- **Booking System**: Complete cruise booking with passenger details
- **User Account**: Register, login, and manage bookings

### API Endpoints

#### Cruises
- `GET /api/cruises` - Get all cruises
- `GET /api/cruises/:id` - Get specific cruise
- `GET /api/cruises/:id/availability` - Check availability
- `POST /api/cruises/search` - Search cruises

#### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get specific destination
- `GET /api/destinations/:id/weather` - Get weather info

#### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:reference` - Get booking details
- `PUT /api/bookings/:reference` - Update booking
- `POST /api/bookings/:reference/payment` - Process payment

#### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/bookings` - Get user bookings

## 🎨 Customization

### Styling
- Modify `styles.css` for visual changes
- Update color scheme in CSS custom properties
- Adjust responsive breakpoints for different devices

### Content
- Edit destination data in `routes/destinations.js`
- Update cruise information in `routes/cruises.js`
- Modify pricing in booking calculations

### Features
- Add new API endpoints in the `routes/` directory
- Extend frontend functionality in `script.js`
- Implement additional payment methods

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Adding New Features

1. **Backend**: Add new routes in the `routes/` directory
2. **Frontend**: Update `script.js` for new functionality
3. **Styling**: Add CSS in `styles.css`
4. **Documentation**: Update this README

## 🌐 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in your environment
2. Configure database connections
3. Set up payment gateway credentials
4. Configure email service for notifications

### Hosting Options
- **Heroku**: Easy deployment with Git integration
- **DigitalOcean**: VPS hosting with full control
- **AWS**: Scalable cloud hosting
- **Vercel/Netlify**: For static frontend deployment

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📊 Performance

- Compression middleware for faster loading
- Optimized images and assets
- Efficient database queries
- Caching strategies for static content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@philippines-ncl.com
- Phone: +63 2 8123 4567
- Documentation: Check this README and code comments

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced search filters
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Integration with external booking systems

---

**Built with ❤️ for Philippines NCL**