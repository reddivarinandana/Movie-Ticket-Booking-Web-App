# Movie-Ticket-Booking-Web-App
🎬 Movie Ticket Booking App
A full-stack movie ticket booking application with user/admin roles, seat selection, movie management, and booking history.

📂 Project Structure
bash
Copy
Edit
movie-ticket-booking/
├── backend/         # Node.js + Express Backend
├── frontend/        # ReactJS Frontend
└── README.md
🚀 Features
👤 Authentication & Authorization
JWT-based login

Role-based access (Admin/User)

🎫 For Users
View and search movies

Book movie tickets (seat selection in modal popup)

View, edit, and delete booking history

🎬 For Admin
Add/Delete Movies

Manage Theatres (if extended)

Delete any movie

🖥️ Frontend (ReactJS)
🔧 Setup
bash
Copy
Edit
cd frontend
npm install
npm start
🌟 Tech Stack
ReactJS

Axios

React Toastify

React Hooks (useState, useEffect, useRef)

Modular Component Structure

CSS for styling and modals

🛠️ Key Components
LoginModal: Modal login form

MovieGrid: Lists movies

MovieDetails: Shows full movie info + seat booking

SeatSelectionModal: Popup for seat selection

BookingHistory: User's past bookings

AdminDashboard: Optional admin view

AddMovieModal: Admin adds movies

🔙 Backend (Node.js + Express)
🔧 Setup
bash
Copy
Edit
cd backend
npm install
node index.js
Server will run on: http://localhost:5000

🛠️ Endpoints
🔐 Auth
POST /api/login → Login and get token

🎬 Movies
GET /api/movies → Get all movies

POST /api/movies → Add movie (Admin)

DELETE /api/movies/:id → Delete movie (Admin)

🎫 Bookings
POST /api/bookings → Book seats (User)

GET /api/bookings/:movieId → Get booked seats for a movie

GET /api/bookings/history → Get user booking history

PUT /api/bookings/:bookingId → Edit booking

DELETE /api/bookings/:bookingId → Cancel booking

🔒 Middleware
Auth middleware for protecting routes using JWT

Role-checking middleware (admin/user)

🧪 Sample Login Credentials
Role	Email	Password
Admin	admin@test.com	admin123
User	user@test.com	user123

📌 Notes
Seat selection popup appears on clicking "Book Ticket"

If not logged in, a toast warns to login

Logged-in user sees different options in the profile menu

Data is in-memory (can be switched to MongoDB if needed)

