Healthcare Appointment Management System
📋 Introduction
A full-stack web application designed for elderly users and healthcare workers to manage appointments and available time slots. The system features separate dashboards for:

Elderly users: View, create, update, and delete appointments

Healthcare workers: Manage available days and time slots

Admin panel: Oversight of all users and appointments

✨ Features
User Authentication: Secure login/registration with input validation

Role-Based Access: Different dashboards for elderly users, healthcare workers, and admin

Appointment Management: CRUD operations for appointments

Availability Calendar: Healthcare workers can manage their available time slots

Protected Routes: Authentication required for sensitive operations

Responsive Design: Accessible on various devices

🛠️ Technologies Used
Frontend:
React with TypeScript

CSS Modules / Styled Components

Axios for API calls

Backend:
.NET Core / ASP.NET Core

Entity Framework Core

SQL Server / SQLite

Other:
JWT for authentication

Input validation with regex

Protected routing

🚀 How to Run the Application
Prerequisites:
.NET SDK (version 7.0 or higher)

Node.js and npm

SQL Server (or SQLite for development)

Step-by-step:
Clone the repository:

bash
git clone [repository-url]
cd [project-name]
Set up the backend:

bash
cd api
dotnet restore
dotnet build
dotnet run
The backend will start on https://localhost:5001 or http://localhost:5000

Set up the frontend (in a new terminal):

bash
cd homecare
npm install
npm run build
npm run dev
The frontend will start on http://localhost:3000

Access the application:
Open your browser and navigate to http://localhost:3000

🔐 User Authentication
Registration:
Navigate to the registration page

Provide username and password

Password requirements:

Minimum 8 characters

At least one uppercase letter

At least one number

At least one special character

Login:
Enter your registered username and password

Successful login grants access to the dashboard

Test Credentials:
You can use the following test account:

Username: test

Password: Test123!
