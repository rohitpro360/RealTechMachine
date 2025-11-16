import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import "./Location.css";

function Location() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="main-content location-page">
      {/* Hero Section */}
      <section className="location-hero">
        <h1>📍 Visit Us</h1>
        <p>We’d love to welcome you to our office or hear from you online</p>
      </section>

      <Container className="my-5">
        <Row className="align-items-start g-4">
          {/* Address Section */}
          <Col xs={12} md={5}>
            <Card className="shadow-sm p-4 h-100 location-card">
              <h4 className="mb-3">Our Office</h4>
              <p>
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                Real Technologies Machines Pvt. Ltd. <br />
                Sahwas Society Line No 1, Flat No 16, <br />
                Dhanlaxmi Apprt, Karvenagar <br />
                Pune - 411052, Maharashtra, India
              </p>
              <p>
                <i className="fas fa-phone-alt me-2 text-primary"></i>
                +91 8047625991
              </p>
              <p>
                <i className="fas fa-envelope me-2 text-primary"></i>
                info@mycompany.com
              </p>
              <p>
                <i className="fas fa-clock me-2 text-primary"></i>
                Mon – Sat: 9:00 AM – 6:00 PM
              </p>

              <Button
                href="https://goo.gl/maps/FT2eJbExxx"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="mt-3 w-100"
              >
                Get Directions
              </Button>
            </Card>
          </Col>

          {/* Google Map Section */}
          <Col xs={12} md={7}>
            <div className="map-responsive shadow-sm">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3783.7420824152414!2d73.81767507385867!3d18.495338369947152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDI5JzQzLjIiTiA3M8KwNDknMTIuOSJF!5e0!3m2!1sen!2sin!4v1756324401293!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>

        {/* Contact Form Section */}
        <Row className="mt-5">
          <Col xs={12}>
            <Card className="p-4 shadow-sm contact-form-card">
              <h3 className="mb-3 text-center">💬 Get in Touch</h3>
              {submitted && (
                <Alert variant="success" className="text-center">
                  ✅ Thank you! Your message has been sent.
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" variant="primary" className="px-5">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Branch Section */}
        <Row className="mt-5">
          <Col xs={12}>
            <Card className="p-4 shadow-sm branch-card text-center">
              <h4>🌍 Branch Office</h4>
              <p>
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                Mumbai Office – Business Park, Andheri East, Mumbai
              </p>
              <p>
                <i className="fas fa-phone-alt me-2 text-primary"></i>
                +91 9876543210
              </p>
            </Card>
          </Col>
        </Row>

        {/* Social Media */}
        <Row className="mt-5 text-center">
          <Col>
            <h5>Connect with us</h5>
            <div className="location-social">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://wa.me/918047625991" target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Location;
