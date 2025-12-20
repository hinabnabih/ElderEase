import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from './home/HomePage';
import AvailableDayListPage from './Pages/AvailableDayPages/AvailableDayListPage';
import BookAppointmentPage from './Pages/AppointmentPages/BookAppointmentPage';
import MyAppointmentsPage from './Pages/AppointmentPages/MyAppointmentsPage';
import CreateAvailableDay from './Pages/AvailableDayPages/CreateAvailableDay';
import UpdateAvailableDayPage from './Pages/AvailableDayPages/UpdateAvailableDayPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import NavMenu from './shared/NavMenu';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavMenu />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            
            <Route element={<ProtectedRoute/>}>
              <Route path="/availableDays" element={<AvailableDayListPage />} />
              <Route path="/book" element={<BookAppointmentPage />} />
              <Route path="/myAppointments" element={<MyAppointmentsPage />} />
              <Route path="/createAvailableDay" element={<CreateAvailableDay />} />
              <Route path="/available-days" element={<AvailableDayListPage />} />
              <Route path="/available-days/create" element={<CreateAvailableDay />} />
              <Route path="/available-days/edit/:id" element={<UpdateAvailableDayPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  )
}

export default App;