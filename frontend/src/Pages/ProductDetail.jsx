import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

import API_URL from "../config";

const countryCodes = [
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+81", country: "Japan" },
  { code: "+971", country: "UAE" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    company: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // ✅ Fetch product by ID from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setShowModal(false);
    setQuoteData({ name: "", email: "", phone: "", countryCode: "+91", company: "" });
    setValidationErrors({});
    setSubmissionStatus(null);
  };

  const validateForm = () => {
    const errors = {};
    if (!quoteData.name) errors.name = "Name is required.";
    if (!quoteData.email) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(quoteData.email)) errors.email = "Invalid email.";
    if (quoteData.phone && !/^\d{7,12}$/.test(quoteData.phone))
      errors.phone = "Phone must be 7–12 digits.";
    return errors;
  };

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmissionStatus("error");
      setTimeout(() => setSubmissionStatus(null), 3000);
      return;
    }

    setSubmissionStatus("submitting");

    try {
      const response = await fetch("http://localhost:5000/api/send-quote-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quoteData,
          phone: `${quoteData.countryCode}${quoteData.phone}`,
          product: product.title,
        }),
      });

      if (!response.ok) throw new Error("Failed to send quote request");

      setSubmissionStatus("success");
      setTimeout(() => handleClose(), 3000);
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading product...</p>;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;
  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  return (
    <Container className="mt-5 pt-5">
      <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
        <Row className="g-0">
          {/* Product Image */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center bg-light"
          >
            <Card.Img
              src={product.image}
              alt={product.title}
              className="img-fluid p-3"
              style={{ maxHeight: "420px", objectFit: "contain" }}
            />
          </Col>

          {/* Product Info */}
          <Col md={6}>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-3">{product.title}</h2>

              <p className="text-muted">{product.description}</p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>

              {/* 💸 Price Display */}
              <p
                className="fw-bold fs-5 mb-4"
                style={{
                  background: "linear-gradient(to right, #145da0, #91b9e0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0px 0px 8px rgba(145,185,224,0.4)",
                }}
              >
                💸 Price: ₹
                {product.price
                  ? product.price.toLocaleString()
                  : "Not available"}
              </p>

              <Button
                variant="info"
                size="lg"
                className="shadow-sm"
                onClick={() => setShowModal(true)}
              >
                Get Quote
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* 🔹 Quote Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request a Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submissionStatus === "success" && (
            <Alert variant="success">✅ Your quote request was sent successfully!</Alert>
          )}
          {submissionStatus === "error" && (
            <Alert variant="danger">❌ Please fix errors or try again later.</Alert>
          )}

          <Form onSubmit={handleSubmitQuote}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={quoteData.name}
                onChange={handleChange}
                isInvalid={!!validationErrors.name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={quoteData.email}
                onChange={handleChange}
                isInvalid={!!validationErrors.email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Row>
                <Col xs={4}>
                  <Form.Select
                    name="countryCode"
                    value={quoteData.countryCode}
                    onChange={handleChange}
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.country} ({c.code})
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={quoteData.phone}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.phone}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={quoteData.company}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control type="text" value={product.title} disabled />
            </Form.Group>

            <Button
              variant="info"
              type="submit"
              className="w-100"
              disabled={submissionStatus === "submitting"}
            >
              {submissionStatus === "submitting" ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Sending...
                </>
              ) : (
                "Submit Quote Request"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetail;
