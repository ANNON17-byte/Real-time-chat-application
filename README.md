Real-Time Chat Application :

A real-time chat web application built using Node.js, Express, Socket.IO, and JWT authentication.
Users can communicate instantly through chat rooms and private messages with real-time updates, read receipts, and online presence tracking.

Features :

JWT-based user authentication (login)
Real-time messaging using Socket.IO (WebSockets)
Chat rooms
Enter-to-send messages
Browser notifications for new messages
Dark / Light mode (saved using localStorage)
Automatic cleanup on user disconnect

Tech Stack :
Frontend -

HTML
CSS
JavaScript

Backend -

Node.js
Express.js
Socket.IO
JSON Web Tokens (JWT)

Deployment -

Render

Project Structure
real-time-chat-app/
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── style.css
│
├── auth.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

Getting Started (Local Setup)
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/real-time-chat-app.git
cd real-time-chat-app

2. Install dependencies
npm install

3. Start the server
node server.js

4. Open in browser
http://localhost:3000

Live Demo

Deployed on Render:

https://real-time-chat-application-1-iu5p.onrender.com
