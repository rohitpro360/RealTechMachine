import React, { useState, useRef, useEffect } from "react";
import API_URL from "../config";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";

const countryCodes = [
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+81", country: "Japan" },
  { code: "+971", country: "UAE" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    country: "",
    state: "",
    email: "",
    countryCode: "+91",
    phone: "",
    productName: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const firstErrorRef = useRef(null);

  // Scroll to first error on validation
  useEffect(() => {
    if (firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorRef.current.focus();
    }
  }, [validationErrors]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.surname) errors.surname = "Surname is required.";
    if (!formData.email) errors.email = "Email ID is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Invalid email address.";
    if (!formData.productName)
      errors.productName = "Product Name is required.";

    if (formData.phone) {
      const phoneRegex = /^\d{7,12}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = "Phone must be 7–12 digits (exclude + / country code).";
      }
    }
    return errors;
  };

  // Handle form submit -> call backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmissionStatus("error");

      const firstErrorKey = Object.keys(errors)[0];
      firstErrorRef.current = document.querySelector(`[name="${firstErrorKey}"]`);

      setTimeout(() => setSubmissionStatus(null), 3000);
      return;
    }

    setSubmissionStatus("submitting");

    try {
      const response = await fetch(`${API_URL}/api/send-contact-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          country: formData.country,
          state: formData.state,
          productName: formData.productName,
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      const data = await response.json();
      console.log("✅ Email response:", data);

      setSubmissionStatus("success");
      setFormData({
        name: "",
        surname: "",
        country: "",
        state: "",
        email: "",
        countryCode: "+91",
        phone: "",
        productName: "",
        message: "",
      });
      setValidationErrors({});
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setSubmissionStatus("error");
    } finally {
      setTimeout(() => setSubmissionStatus(null), 4000);
    }
  };

  return (
    <Container
      fluid="sm"
      className="my-5 p-4 p-md-5 bg-white shadow-lg rounded"
    >
      <h2 className="text-center mb-3 fw-bold text-primary">Contact Us</h2>
      <p className="text-center mb-4 text-muted">
        Fill out the form below and we’ll get back to you shortly.
      </p>

      {submissionStatus === "success" && (
        <Alert variant="success" className="text-center">
          ✅ Thank you! Your message has been sent successfully.
        </Alert>
      )}
      {submissionStatus === "error" && (
        <Alert variant="danger" className="text-center">
          ❌ Please correct the errors and try again.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              autoComplete="given-name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!validationErrors.name}
              className="rounded-pill"
              style={{ minHeight: "48px" }}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Surname *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your surname"
              name="surname"
              autoComplete="family-name"
              value={formData.surname}
              onChange={handleChange}
              isInvalid={!!validationErrors.surname}
              className="rounded-pill"
              style={{ minHeight: "48px" }}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.surname}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Row 2 */}
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., India"
              name="country"
              autoComplete="country-name"
              value={formData.country}
              onChange={handleChange}
              className="rounded-pill"
              style={{ minHeight: "48px" }}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Maharashtra"
              name="state"
              autoComplete="address-level1"
              value={formData.state}
              onChange={handleChange}
              className="rounded-pill"
              style={{ minHeight: "48px" }}
            />
          </Form.Group>
        </Row>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!validationErrors.email}
            className="rounded-pill"
            style={{ minHeight: "48px" }}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Row>
            <Col xs={4} md={3}>
              <Form.Select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="rounded-pill"
                style={{ minHeight: "48px" }}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.country} ({c.code})
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={8} md={9}>
              <Form.Control
                type="tel"
                inputMode="numeric"
                placeholder="Enter phone number"
                name="phone"
                autoComplete="tel-national"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!validationErrors.phone}
                className="rounded-pill"
                style={{ minHeight: "48px" }}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.phone}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        {/* Product Name */}
        <Form.Group className="mb-3">
          <Form.Label>Product Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            isInvalid={!!validationErrors.productName}
            className="rounded-pill"
            style={{ minHeight: "48px" }}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.productName}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Message */}
        <Form.Group className="mb-4">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write your message..."
            name="message"
            autoComplete="off"
            value={formData.message}
            onChange={handleChange}
            className="rounded"
            style={{ minHeight: "60px" }}
          />
        </Form.Group>

        <div className="d-grid">
          <Button
            variant="primary"
            type="submit"
            className="py-3 rounded-pill fw-semibold text-lg shadow-sm"
            style={{ minHeight: "52px" }}
            disabled={submissionStatus === "submitting"}
          >
            {submissionStatus === "submitting" ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" /> Sending...
              </>
            ) : ( 
              "Submit"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Contact;
