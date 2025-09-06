import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a4e64ff', color: '#fff', padding: '40px 0' }}>
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Real Technology Private LTD</h5>
            <p>Your trusted partner for awesome services and products.</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" style={{ color: '#fff' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" style={{ color: '#fff' }}>About</Nav.Link>

              <Nav.Link href="#!" style={{ color: '#fff' }}>Services</Nav.Link>
              <Nav.Link href="#!" style={{ color: '#fff' }}>Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Follow Us</h5>
            <Nav className="flex-column  ms-md-4 ms-lg-5" >
              <Nav.Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center text-white mb-2"
              >
                <i className="fab fa-facebook fa-lg me-2"></i> Facebook
              </Nav.Link>
              <Nav.Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center text-white mb-2"
              >
                <i className="fab fa-instagram fa-lg me-2"></i> Instagram
              </Nav.Link>
              <Nav.Link
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center text-white"
              >
                <i className="fab fa-whatsapp  fa-lg me-2"></i> WhatsApp
              </Nav.Link>
            </Nav>
          </Col>

        </Row>
        <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Real Technologies PVT LTD. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
