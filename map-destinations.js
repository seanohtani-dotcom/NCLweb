// Destination Data
const destinationsData = {
    destinations: [
        {
            id: 'manila',
            name: 'Manila',
            coordinates: [14.5995, 120.9842],
            description: 'The bustling capital city with rich history and modern attractions. Manila serves as the main embarkation port for Philippines NCL cruises.',
            attractions: ['Intramuros Historic District', 'Rizal Park', 'Manila Bay Sunset', 'National Museum'],
            image: 'https://images.unsplash.com/photo-1583421052928-1c6d8c7e1f2c?w=800',
            cruiseTypes: ['7-day', '10-day', '5-day'],
            isMainPort: true
        },
        {
            id: 'boracay',
            name: 'Boracay',
            coordinates: [11.9674, 121.9248],
            description: 'Famous for its powdery white sand beaches and vibrant nightlife. Boracay is a tropical paradise perfect for water sports and relaxation.',
            attractions: ['White Beach', 'Water Sports', 'Island Hopping', 'Sunset Sailing'],
            image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800',
            cruiseTypes: ['7-day', '10-day', '5-day'],
            isMainPort: false
        },
        {
            id: 'palawan',
            name: 'Palawan',
            coordinates: [9.8349, 118.7384],
            description: 'Home to the Underground River and stunning limestone cliffs. Palawan offers pristine beaches and world-class diving spots.',
            attractions: ['Underground River', 'El Nido', 'Coron Island', 'Bacuit Bay'],
            image: 'https://images.unsplash.com/photo-1583421052928-1c6d8c7e1f2c?w=800',
            cruiseTypes: ['7-day', '10-day', '5-day'],
            isMainPort: false
        },
        {
            id: 'bohol',
            name: 'Bohol',
            coordinates: [9.8500, 124.1435],
            description: 'Known for the Chocolate Hills and adorable tarsiers. Bohol combines natural wonders with rich cultural heritage.',
            attractions: ['Chocolate Hills', 'Tarsier Sanctuary', 'Loboc River', 'Panglao Beach'],
            image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800',
            cruiseTypes: ['7-day', '10-day'],
            isMainPort: false
        },
        {
            id: 'cebu',
            name: 'Cebu',
            coordinates: [10.3157, 123.8854],
            description: 'The Queen City of the South with Spanish colonial heritage. Cebu offers historical sites and beautiful beaches.',
            attractions: ["Magellan's Cross", 'Temple of Leah', 'Oslob Whale Sharks', 'Kawasan Falls'],
            image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800',
            cruiseTypes: ['7-day', '10-day'],
            isMainPort: false
        }
    ],
    routes: [
        {
            id: '7-day-highlights',
            name: '7-Day Philippines Island Hopping',
            destinations: ['manila', 'boracay', 'palawan', 'bohol', 'cebu', 'manila'],
            color: '#0066cc',
            duration: '7 days'
        },
        {
            id: '5-day-quick',
            name: '5-Day Philippines Highlights',
            destinations: ['manila', 'boracay', 'palawan', 'manila'],
            color: '#00bcd4',
            duration: '5 days'
        }
    ]
};

// Interactive Map Manager Class
class InteractiveMapManager {
    constructor() {
        this.map = null;
        this.destinations = new Map();
        this.markers = [];
        this.routeLines = [];
        this.activeInfoPanel = null;
    }

    initializeMap() {
        // Create map centered on Philippines
        this.map = L.map('map-container').setView([12.8797, 121.7740], 6);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            minZoom: 5
        }).addTo(this.map);

        // Load destinations
        this.loadDestinations();
        
        // Draw routes
        this.drawRoutes();

        // Setup info panel close button
        document.getElementById('close-panel').addEventListener('click', () => {
            this.hideInfoPanel();
        });
    }

    loadDestinations() {
        destinationsData.destinations.forEach(dest => {
            this.destinations.set(dest.id, dest);
            this.createMarker(dest);
        });
    }

    createMarker(destination) {
        // Create custom icon
        const iconHtml = destination.isMainPort 
            ? '<div style="background: #ff6b6b; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 20px;">🚢</div>'
            : '<div style="background: #0066cc; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 16px;">🏝️</div>';

        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        // Create marker
        const marker = L.marker(destination.coordinates, { icon: customIcon })
            .addTo(this.map)
            .bindTooltip(destination.name, {
                permanent: false,
                direction: 'top',
                offset: [0, -20]
            });

        // Add click event
        marker.on('click', () => {
            this.showInfoPanel(destination);
            this.map.flyTo(destination.coordinates, 8, {
                duration: 1
            });
        });

        this.markers.push(marker);
    }

    drawRoutes() {
        destinationsData.routes.forEach(route => {
            const coordinates = route.destinations
                .map(destId => this.destinations.get(destId))
                .filter(dest => dest)
                .map(dest => dest.coordinates);

            if (coordinates.length > 1) {
                const polyline = L.polyline(coordinates, {
                    color: route.color,
                    weight: 3,
                    opacity: 0.6,
                    dashArray: '10, 10',
                    smoothFactor: 1
                }).addTo(this.map);

                polyline.bindTooltip(route.name, {
                    sticky: true
                });

                this.routeLines.push(polyline);
            }
        });
    }

    showInfoPanel(destination) {
        const panel = document.getElementById('info-panel');
        const content = document.getElementById('info-content');

        // Build attractions list
        const attractionsList = destination.attractions
            .map(attr => `<li>${attr}</li>`)
            .join('');

        // Build content
        content.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}" onerror="this.src='https://via.placeholder.com/800x400?text=${destination.name}'">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <h4 style="color: #0066cc; margin-top: 1rem;">Top Attractions</h4>
            <ul>${attractionsList}</ul>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <strong>Available Cruises:</strong> ${destination.cruiseTypes.join(', ')}
            </div>
            <a href="/deals.html" class="btn-primary">View Available Cruises</a>
        `;

        panel.classList.add('active');
        this.activeInfoPanel = destination.id;
    }

    hideInfoPanel() {
        const panel = document.getElementById('info-panel');
        panel.classList.remove('active');
        this.activeInfoPanel = null;
    }
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if map container exists (only on destinations page)
    if (document.getElementById('map-container')) {
        const mapManager = new InteractiveMapManager();
        mapManager.initializeMap();
    }
});
