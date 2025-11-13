# StudyMate — Find Your Perfect Study Partner

### Live Links
Client:  https://assaignment-10-auth.web.app/ 

Server:  https://assaignment-10-server-nu.vercel.app/

-----------------

## About This Project
StudyMate is a MERN Stack web application where students can find their perfect study partners based on subject, study mode, and experience level.  
It is built using React, Node.js, Express, and MongoDB with Firebase authentication.  
The project supports light and dark mode using DaisyUI.

-----------------

## Features Implemented

- Firebase Authentication (Email/Password + Google Login)
- Private Routes for Logged-in Users
- Create Partner Profile (Create Operation)
- Find Partners Page (Read Operation)
- My Connections Page (Update and Delete)
- Partner Details Page (Private)
- Partner Request System (UI ready)
- Custom Toast Notifications
- Loading Spinner while fetching data
- Dark and Light Theme Supported
- Responsive Navbar and Footer
- Creative 404 Page with Home Navigation
- Responsive for all devices

---------------

## Pages Overview

### Home Page
- Navbar with dynamic routes (Login/Register or Profile/Logout)
- Hero Section
- Top Study Partners (Based on Rating)
- How It Works
- Testimonials
- Footer with social links

### Find Partners Page
- Displays all partner profiles from MongoDB
- Includes search and sort UI
- Each card shows name, subject, study mode, experience level
- "View Profile" button for full details

### Create Partner Profile Page
- Form for logged-in users to create a study partner profile
- Includes Name, Photo, Subject, Study Mode, Availability, Location, Experience, Rating, Email
- Shows success toast after creation

### Partner Details Page
- Shows full information of a selected partner
- Includes "Send Partner Request" button
- Toast confirms request sent 

### My Connections Page
- Table view of all partner requests sent
- Each row has Update and Delete buttons
- Update opens modal with editable form
- Delete shows confirmation and then delete the data

### Profile Page
- Shows current user info 
- "Edit Profile" button 

### 404 Page
- Creative design with animated illustration
- "Back to Home" button

--------------

## Technologies Used

Frontend: React, React Router, Tailwind CSS, DaisyUI, Framer Motion , SweetAlert2, React icon 
Backend: Node.js, Express.js  
Database: MongoDB  
Authentication: Firebase  
Notifications:  SweetAlert2
Deployment: firebase (Client), Vercel (Server)

--------------

## Developed By
Rahat Murshed
Web Developer (MERN Stack)
