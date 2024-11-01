# SkyMate: Smart Weather & Community Platform

A personalized weather application that goes beyond basic forecasts to provide lifestyle recommendations, energy-saving tips, and a community platform for weather-related discussions.

## 🌟 Features

### Weather Information
- 3-day detailed weather forecasts
- Real-time air quality monitoring
- Weather-based activity recommendations
- Customized energy conservation tips
- Weather-appropriate recipe suggestions

### Community Platform
- User authentication & authorization
- Create and share weather-related posts
- Bookmark favorite posts
- Interact with community content
- Personalized user profiles

## 🛠️ Technologies

- **Frontend:**
  - React.js
  - Context API for state management
  - Responsive design for all devices

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - GROQ for efficient querying

- **Authentication & Security:**
  - OAuth 2.0
  - Bcrypt for password hashing
  - JWT for secure sessions

- **APIs:**
  - RESTful API architecture
  - Weather data integration
  - Air quality data integration

## 📋 Prerequisites

```bash
Node.js >= 14.x
MongoDB >= 4.x
npm >= 6.x
```

## 🚀 Installation

1. Clone the repository
```bash
git clone [your-repository-link]
cd weatherwise
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In server directory, create .env file
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
WEATHER_API_KEY=your_weather_api_key

# In client directory, create .env file
REACT_APP_API_URL=http://localhost:5000
```

4. Start the application
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend (from client directory)
npm start
```

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/logout - User logout
```

### Weather
```
GET /api/weather/forecast - Get 3-day forecast
GET /api/weather/air-quality - Get air quality data
GET /api/weather/suggestions - Get activity suggestions
```

### Community
```
GET /api/posts - Get all posts
POST /api/posts - Create new post
PUT /api/posts/:id - Update post
DELETE /api/posts/:id - Delete post
POST /api/posts/:id/bookmark - Bookmark post
```

