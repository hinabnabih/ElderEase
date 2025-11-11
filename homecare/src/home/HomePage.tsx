import { Card, Container, Row, Col, Button } from 'react-bootstrap';

type ViewType = 'home' | 'book' | 'myAppointments' | 'availableDays';

interface HomePageProps {
  setCurrentView: (view: ViewType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentView }) => {
  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="display-4">Velkommen til Homecare System</h1>
        <p className="lead">Administrer omsorgsavtaler og tilgjengelige dager</p>
        
        <div className="mt-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="me-3"
            onClick={() => setCurrentView('book')}
          >
            Book Time
          </Button>
          <Button 
            variant="outline-primary" 
            size="lg"
            onClick={() => setCurrentView('myAppointments')}
          >
            Se Mine Avtaler
          </Button>
        </div>
      </div>

      <Container>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 text-center">
              <Card.Body>
                <Card.Title>📅 Book Time</Card.Title>
                <Card.Text>
                  Bestill omsorgstime med våre kvalifiserte omsorgspersoner
                </Card.Text>
                <Button 
                  variant="primary"
                  onClick={() => setCurrentView('book')}
                >
                  Book nå
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center">
              <Card.Body>
                <Card.Title>👥 Mine Avtaler</Card.Title>
                <Card.Text>
                  Se oversikt over dine bookede avtaler og status
                </Card.Text>
                <Button 
                  variant="outline-primary"
                  onClick={() => setCurrentView('myAppointments')}
                >
                  Se avtaler
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center">
              <Card.Body>
                <Card.Title>📊 Tilgjengelighet</Card.Title>
                <Card.Text>
                  Se tilgjengelige tider for alle omsorgspersoner
                </Card.Text>
                <Button 
                  variant="outline-primary"
                  onClick={() => setCurrentView('availableDays')}
                >
                  Se tilgjengelighet
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}; export default HomePage;