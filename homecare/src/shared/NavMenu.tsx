import { Navbar, Nav } from 'react-bootstrap';
type ViewType = 'home' | 'book' | 'myAppointments' | 'availableDays';

interface NavMenuProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ currentView, setCurrentView }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand className="ms-3">
        Homecare System
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link 
            onClick={() => setCurrentView('home')}
            style={{ 
              cursor: 'pointer', 
              color: currentView === 'home' ? 'white' : 'rgba(255,255,255,.55)',
              fontWeight: currentView === 'home' ? 'bold' : 'normal'
            }}
          >
            Hjem
          </Nav.Link>
          <Nav.Link 
            onClick={() => setCurrentView('book')}
            style={{ 
              cursor: 'pointer', 
              color: currentView === 'book' ? 'white' : 'rgba(255,255,255,.55)',
              fontWeight: currentView === 'book' ? 'bold' : 'normal'
            }}
          >
            Book Time
          </Nav.Link>
          <Nav.Link 
            onClick={() => setCurrentView('myAppointments')}
            style={{ 
              cursor: 'pointer', 
              color: currentView === 'myAppointments' ? 'white' : 'rgba(255,255,255,.55)',
              fontWeight: currentView === 'myAppointments' ? 'bold' : 'normal'
            }}
          >
            Mine Avtaler
          </Nav.Link>
          <Nav.Link 
            onClick={() => setCurrentView('availableDays')}
            style={{ 
              cursor: 'pointer', 
              color: currentView === 'availableDays' ? 'white' : 'rgba(255,255,255,.55)',
              fontWeight: currentView === 'availableDays' ? 'bold' : 'normal'
            }}
          >
            Tilgjengelige Dager
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}; export default NavMenu;