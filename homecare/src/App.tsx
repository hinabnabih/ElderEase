import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './home/HomePage';
import AvailableDayListPage from './availableDay/AvailableDayListPage';
import BookAppointmentPage from './appointments/BookAppointmentPage';
import MyAppointmentsPage from './appointments/MyAppointmentsPage';
import NavMenu from './shared/NavMenu';

type ViewType = 'home' | 'book' | 'myAppointments' | 'availableDays';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage setCurrentView={setCurrentView} />;
      case 'availableDays':
        return <AvailableDayListPage />;
      case 'book':
        return <BookAppointmentPage />;
      case 'myAppointments':
        return <MyAppointmentsPage />;
      default:
        return <HomePage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="App">
      <NavMenu currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mt-4">
        {renderCurrentView()}
      </main>
    </div>
  );
}export default App;