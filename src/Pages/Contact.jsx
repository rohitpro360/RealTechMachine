import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Navbar from './Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    country: '',
    state: '',
    email: '',
    phone: '',
    productName: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && value !== '' && !/^\d*$/.test(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        phone: 'Phone number must contain only digits.',
      }));
    } else {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Send data to backend
  const sendEmailToAdmin = async (data) => {
    setSubmissionStatus('submitting');
    console.log('Sending to backend:', data);

    try {
      // IMPORTANT: point to your backend server
      const response = await fetch('http://localhost:5000/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        setSubmissionStatus('success');
        setFormData({
          name: '',
          surname: '',
          country: '',
          state: '',
          email: '',
          phone: '',
          productName: '',
        });
        setValidationErrors({});
      } else {
        const errorData = await response.json();
        console.error('Backend error:', errorData);
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Network/Server error:', error);
      setSubmissionStatus('error');
    } finally {
      setTimeout(() => setSubmissionStatus(null), 5000);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.surname) errors.surname = 'Surname is required.';
    if (!formData.email) errors.email = 'Email ID is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email ID is invalid.';
    if (!formData.productName) errors.productName = 'Product Name is required.';
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10–15 digits.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus(null), 3000);
      return;
    }

    sendEmailToAdmin(formData);
  };

  return (
    <Container fluid="sm" className="my-5 p-3 p-md-5 bg-white shadow rounded">
      <h2 className="text-center mb-4 text-3xl font-semibold text-gray-800">Contact Us</h2>
      <p className="text-center mb-5 text-gray-600">
        Please fill out the form below to get in touch with us.
      </p>

      {submissionStatus === 'submitting' && (
        <Alert variant="info" className="text-center">Sending your message...</Alert>
      )}
      {submissionStatus === 'success' && (
        <Alert variant="success" className="text-center">
          Thank you for your message! We will get back to you soon.
        </Alert>
      )}
      {submissionStatus === 'error' && (
        <Alert variant="danger" className="text-center">
          Failed to send your message. Please correct the errors and try again.
          {Object.keys(validationErrors).length > 0 && (
            <ul className="list-disc list-inside text-left mt-2">
              {Object.values(validationErrors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="formGridName">
            <Form.Label>Name <span className="text-red-500">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!validationErrors.name}
              className="rounded-md"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Surname <span className="text-red-500">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              isInvalid={!!validationErrors.surname}
              className="rounded-md"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.surname}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Location (Country)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., India"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="rounded-md"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Location (State)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Maharashtra"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="rounded-md"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email ID <span className="text-red-500">*</span></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!validationErrors.email}
            className="rounded-md"
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPhone">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number (digits only)"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!validationErrors.phone}
            className="rounded-md"
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formGridProductName">
          <Form.Label>Product Name <span className="text-red-500">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the product name you are interested in"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            isInvalid={!!validationErrors.productName}
            className="rounded-md"
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.productName}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="submit"
            className="w-full py-2 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300"
            disabled={submissionStatus === 'submitting'}
          >
            {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Contact;
