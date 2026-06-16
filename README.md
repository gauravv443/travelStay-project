# Travel Stay 🌍

Travel Stay is a full-stack web application inspired by Airbnb that enables users to discover, create, and manage travel accommodation listings. Users can register, log in, upload property images, save listings to their wishlist, leave reviews, and explore destinations through interactive maps.

# Features

- User Registration and Login
- Secure Authentication using Passport.js
- Session-Based Authentication & Authorization
- Create, Edit, and Delete Property Listings
- Upload and Manage Images using Cloudinary
- Interactive Maps with Location Visualization
- Geocoding Support for Property Locations
- Add, Edit, and Delete Reviews
- Wishlist Functionality
- Owner-Based Access Control
- Flash Messages for User Feedback
- Responsive User Interface
- RESTful Routing and MVC Architecture

# Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- Passport.js
- Express Session
- Connect Flash

### File Upload & Storage
- Cloudinary
- Multer

### Maps & Location Services
- openStreetMap
- GeoJSON

### Other Tools
- Method Override
- Dotenv
- 
# Project Structure

```bash
TravelStay
│
├── models
├── controllers
├── routes
├── middleware
├── views
├── public
├── utils
├── app.js
└── package.json
```

---

# Installation

### Clone the Repository

```bash
git clone https://github.com/gauravv443/travelStay-project.git
```

### Navigate to Project Directory

```bash
cd travelStay-project
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

```

### Run the Application

```bash
node app.js
```

or

```bash
nodemon app.js
```

Application runs on:

```bash
http://localhost:8080
```

---

## 🔒 Authentication & Authorization

Travel Stay uses Passport.js Local Strategy for authentication and session management.

Implemented security features:

- User Registration & Login
- Protected Routes
- Session Management
- Ownership Verification
- Review Authorization
- Wishlist Access for Authenticated Users

Only listing owners can modify or delete their listings, while authenticated users can create reviews and manage their wishlist.

---

## 🗺️ Maps & Location Services

Travel Stay integrates openStreetMap to provide interactive maps for listings. Geocoding is used to convert location names into geographic coordinates, helping users visualize properties on a map.

# ❤️ Wishlist Feature

Users can save their favorite listings to a personalized wishlist and access them later without searching again. This improves the overall user experience and helps users keep track of properties they are interested in.

# What I Learned

While building this project, I gained hands-on experience with:

- Full-Stack Web Development
- RESTful APIs
- MVC Architecture
- Authentication & Authorization
- MongoDB Data Modeling
- Middleware Development
- Cloud-Based Image Storage
- Geolocation & Maps Integration
- Session Management
- Error Handling & Validation

## 🔮 Future Enhancements

- Online Booking System
- Payment Gateway Integration
- User Profiles
- Email Verification
- Password Reset Functionality
- Advanced Search & Filters
- Property Availability Calendar


# Author

**Gaurav Gola**

GitHub:https://github.com/gauravv443

LinkedIn: https://www.linkedin.com/in/gaurav-gola-a322aa361
