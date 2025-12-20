import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthSection from '../auth/AuthSection';
 
const NavMenu = () => {
  return (
    <Navbar expand="lg" className="navbar-modern">
      <Container fluid className="nav-container">
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="navbar-brand-custom"
        >
          ElderEase
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-toggle" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links mx-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/book" className="nav-link-custom">Book Appointment</Nav.Link>
            <Nav.Link as={Link} to="/myAppointments" className="nav-link-custom">My Appointments</Nav.Link>
            <Nav.Link as={Link} to="/createAvailableDay" className="nav-link-custom">Create Available Day</Nav.Link>
            <Nav.Link as={Link} to="/availableDays" className="nav-link-custom">Available Days</Nav.Link>
          </Nav>
          
          <div className="auth-section-wrapper">
            <AuthSection/>
          </div>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .navbar-modern {
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 0.5rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .nav-container {
          padding: 0 2rem;
        }
        
        .navbar-brand-custom {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0d6efd;
          text-decoration: none;
          padding: 0.5rem 0;
        }
        
        .nav-toggle {
          border: 2px solid #0d6efd;
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
        }
        
        .nav-toggle:focus {
          box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-link-custom {
          color: #495057 !important;
          font-weight: 600;
          padding: 0.75rem 1rem !important;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        
        .nav-link-custom:hover {
          color: #0d6efd !important;
          background: rgba(13, 110, 253, 0.1);
        }
        
        .nav-link-custom.active {
          color: #0d6efd !important;
          background: rgba(13, 110, 253, 0.15);
        }
        
        .auth-section-wrapper {
          border-left: 2px solid #dee2e6;
          padding-left: 1.5rem;
          margin-left: 1.5rem;
        }
        
        @media (max-width: 992px) {
          .nav-container {
            padding: 0 1rem;
          }
          
          .nav-links {
            margin: 1rem 0;
            flex-direction: column;
            align-items: stretch;
          }
          
          .nav-link-custom {
            padding: 0.75rem 1rem !important;
            margin: 0.25rem 0;
            text-align: left;
          }
          
          .auth-section-wrapper {
            border-left: none;
            border-top: 2px solid #dee2e6;
            padding-left: 0;
            margin-left: 0;
            padding-top: 1rem;
            margin-top: 1rem;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default NavMenu;