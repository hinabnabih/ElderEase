import { Button, Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const Image1 = "/images/image.png";      
  const Image2 = "/images/image2.png"; 
  const Image3 = "/images/image3.png";

  const services = [
    {
      title: "Help with Daily Tasks",
      description: "Personal care and support in everyday life",
      icon: "🧹"
    },
    {
      title: "Medication Reminders",
      description: "Never forget important medicine",
      icon: "💊"
    },
    {
      title: "Social Interaction",
      description: "Companionship and support",
      icon: "👥"
    },
    {
      title: "Shopping and Housework",
      description: "Practical help in everyday life",
      icon: "🛒"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Book Appointment",
      description: "Choose service and time that suits you"
    },
    {
      step: 2,
      title: "Meet Caregiver",
      description: "Professional caregiver comes to your home"
    },
    {
      step: 3,
      title: "Receive Care",
      description: "Get the help you need in your own home"
    }
  ];

  const testimonials = [
    {
      name: "Anna L.",
      role: "Patient's Daughter",
      text: "Fantastic service! My mother feels safe and well taken care of.",
      rating: 5
    },
    {
      name: "Ola N.",
      role: "Patient",
      text: "Professional and caring staff. Highly recommended!",
      rating: 5
    },
    {
      name: "Kari S.",
      role: "Caregiver",
      text: "Meaningful work with flexible hours and good support.",
      rating: 5
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <h1 className="hero-title">
                Professional Home Care Services
              </h1>
              <p className="hero-subtitle">
                We offer a wide range of health services in your home. 
                Quality-assured care when you need it.
              </p>
              
              <div className="rating-section mb-4">
                <div className="stars">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <span className="rating-text">500+ satisfied users</span>
              </div>

              <div className="hero-buttons">
                <Button
                  variant="primary"
                  size="lg"
                  className="cta-button"
                  onClick={() => navigate('/book')}
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="ms-3"
                  onClick={() => navigate('/availableDays')}
                >
                  View Availability
                </Button>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="hero-image-wrapper">
                <Image 
                  src={Image1} 
                  fluid 
                  rounded 
                  className="hero-main-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Services Tailored to Your Needs</h2>
            <p className="section-subtitle">
              We offer a wide range of health services in your home
            </p>
          </div>

          <Row className="g-4">
            {services.map((service, index) => (
              <Col md={3} key={index}>
                <Card className="service-card h-100 text-center border-0">
                  <Card.Body>
                    <div className="service-icon mb-3">
                      {service.icon}
                    </div>
                    <Card.Title className="mb-3">{service.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {service.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Three simple steps to better home care
            </p>
          </div>

          <Row className="justify-content-center">
            {howItWorks.map((step, index) => (
              <Col lg={4} key={index} className="mb-4">
                <div className="step-card text-center">
                  <div className="step-number">{step.step}</div>
                  <h4 className="step-title mb-3">{step.title}</h4>
                  <p className="step-description text-muted">{step.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Gallery/Testimonials Section */}
      <section className="gallery-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Home Care in Practice</h2>
            <p className="section-subtitle">
              Moments that matter to our users
            </p>
          </div>

          <Row className="g-4 mb-5">
            <Col md={4}>
              <div className="gallery-item">
                <Image 
                  src={Image1}
                  fluid
                  rounded
                  className="gallery-image"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="gallery-item">
                <Image 
                  src={Image2}
                  fluid
                  rounded
                  className="gallery-image"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="gallery-item">
                <Image 
                  src={Image3}
                  fluid
                  rounded
                  className="gallery-image"
                />
              </div>
            </Col>
          </Row>

          {/* Testimonials */}
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col lg={4} key={index}>
                <Card className="testimonial-card h-100">
                  <Card.Body>
                    <div className="testimonial-rating mb-3">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                    </div>
                    <Card.Text className="testimonial-text mb-4">
                      "{testimonial.text}"
                    </Card.Text>
                    <div className="testimonial-author">
                      <strong>{testimonial.name}</strong>
                      <p className="text-muted mb-0">{testimonial.role}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Card className="cta-card text-center border-0">
            <Card.Body className="p-5">
              <h2 className="cta-title mb-3">Ready to Get Started?</h2>
              <p className="cta-text mb-4">
                Book your first appointment and share your experience
              </p>
              
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="cta-button"
                  onClick={() => navigate('/book')}
                >
                  Book New Appointment
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate('/availableDays')}
                >
                  View Availability
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer py-4">
        <Container>
          <div className="text-center">
            <h3 className="footer-title mb-2">ElderEase</h3>
            <p className="footer-subtitle mb-3">
              Modern Home Care for Elderly Users
            </p>
            <p className="footer-copyright">
              © 2025 ElderEase. Exam Project.
            </p>
          </div>
        </Container>
      </footer>

      <style>{`
        .home-page {
          overflow-x: hidden;
        }
      
        .hero-section {
        background: linear-gradient(100deg, #f8f9fa 0%, #e9ecef 100%);
        padding-top: 0rem;
        padding-bottom: 0rem;
        }
        
        .hero-content {
          padding-right: 3rem;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #0d6efd;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: #495057;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 90%;
        }
        
        .rating-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .stars {
          display: flex;
          gap: 0.25rem;
        }
        
        .star {
          color: #ffc107;
          font-size: 1.2rem;
        }
        
        .rating-text {
          color: #495057;
          font-weight: 600;
        }
        
        .hero-buttons {
          margin-top: 3rem;
        }
        
        .cta-button {
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
        }
        
        .hero-image-wrapper {
          position: relative;
        }
        
        .hero-main-image {
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transform: perspective(1000px) rotateY(-5deg);
          transition: transform 0.5s ease;
        }
        
        .hero-main-image:hover {
          transform: perspective(1000px) rotateY(0deg);
        }
        
        /* Section Common Styles */
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0d6efd;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Services Section */
        .service-card {
          background: white;
          border-radius: 15px;
          padding: 2rem 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .service-icon {
          font-size: 3rem;
        }
        
        /* How It Works */
        .step-card {
          padding: 2rem;
        }
        
        .step-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
        }
        
        .step-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0d6efd;
        }
        
        /* Gallery Section */
        .gallery-item {
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .gallery-item:hover {
          transform: scale(1.03);
        }
        
        .gallery-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        
        /* Testimonials */
        .testimonial-card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .testimonial-rating {
          color: #ffc107;
        }
        
        .testimonial-text {
          font-style: italic;
          line-height: 1.6;
        }
        
        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
        }
        
        .cta-card {
          background: white;
          border-radius: 20px;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0d6efd;
        }
        
        .cta-text {
          font-size: 1.2rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Footer */
        .footer {
          background: #f8f9fa;
          border-top: 1px solid #dee2e6;
        }
        
        .footer-title {
          color: #0d6efd;
          font-weight: 700;
          font-size: 1.5rem;
        }
        
        .footer-subtitle {
          color: #6c757d;
        }
        
        .footer-copyright {
          color: #6c757d;
          font-size: 0.9rem;
          margin: 0;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-content {
            padding-right: 0;
            text-align: center;
            margin-bottom: 3rem;
          }
          
          .hero-subtitle {
            max-width: 100%;
          }
          
          .rating-section {
            justify-content: center;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .service-card {
            margin-bottom: 1.5rem;
          }
          
          .hero-buttons .btn {
            display: block;
            width: 100%;
            margin-bottom: 1rem;
          }
          
          .hero-buttons .btn.ms-3 {
            margin-left: 0 !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 4rem 0;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;