import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Form, Modal, Alert, Spinner, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", message: "" });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    
    fetch(`${apiUrl}/api/products`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setCategories(["All", ...new Set(data.map(p => p.category))]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Memoized filtered products for better performance
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                          p.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, debouncedSearch]);

  // Handle quote modal
  const handleQuoteClick = useCallback((e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowQuoteModal(true);
    setQuoteSubmitted(false);
  }, []);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the quote request to your backend
    console.log("Quote request:", { product: selectedProduct, ...quoteForm });
    setQuoteSubmitted(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  // Render description with "Know More" link
  const renderDescription = (text, id, limit = 100) => {
    if (text.length <= limit) return text;
    return (
      <>
        {text.substring(0, limit)}...{" "}
        <button 
          className="know-more-link" 
          onClick={(e) => { e.stopPropagation(); navigate(`/products/${id}`); }}
          aria-label={`Read more about ${text.substring(0, 30)}...`}
        >
          Know More
        </button>
      </>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <Alert.Heading>Oops! Something went wrong</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container fluid className="product-page py-5 px-lg-5">
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <div className="sidebar shadow-sm">
              <h5 className="sidebar-title">Categories</h5>
              <ListGroup variant="flush">
                {categories.map((cat, i) => (
                  <ListGroup.Item 
                    key={i} 
                    active={selectedCategory === cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className="category-item"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && setSelectedCategory(cat)}
                    aria-label={`Filter by ${cat}`}
                  >
                    {cat} 
                    {cat !== "All" && (
                      <Badge bg="secondary" className="ms-2">
                        {products.filter(p => p.category === cat).length}
                      </Badge>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <Form.Control 
                className="mt-4 search-input" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                aria-label="Search products"
              />
              
              {searchTerm && (
                <Button 
                  variant="link" 
                  size="sm" 
                  className="mt-2 p-0 text-muted"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </Button>
              )}
            </div>
          </Col>

          {/* Products Grid */}
          <Col md={9}>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-5">
                <div className="empty-state">
                  <h4 className="text-muted">No products found</h4>
                  <p className="text-muted">
                    Try adjusting your filters or search term
                  </p>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="text-muted mb-0">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </h5>
                </div>
                
                <Row>
                  {filteredProducts.map(product => (
                    <Col lg={4} sm={6} key={product._id} className="mb-4">
                      <Card 
                        className="product-card border-0 shadow-sm h-100"
                        role="article"
                      >
                        <div 
                          className="img-wrapper" 
                          onClick={() => navigate(`/products/${product._id}`)}
                          role="button"
                          tabIndex={0}
                          onKeyPress={(e) => e.key === 'Enter' && navigate(`/products/${product._id}`)}
                          aria-label={`View ${product.title}`}
                        >
                          <Card.Img 
                            variant="top" 
                            src={product.image} 
                            className="product-image"
                            alt={product.title}
                            loading="lazy"
                          />
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <Badge bg="light" text="dark" className="mb-2 border align-self-start">
                            {product.category}
                          </Badge>
                          <Card.Title className="fw-bold h6">{product.title}</Card.Title>
                          <Card.Text className="small text-muted flex-grow-1">
                            {renderDescription(product.description, product._id)}
                          </Card.Text>
                          <div className="d-flex gap-2 mt-3">
                            <Button 
                              variant="primary" 
                              size="sm" 
                              className="w-100" 
                              onClick={() => navigate(`/products/${product._id}`)}
                              aria-label={`View details for ${product.title}`}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="outline-info" 
                              size="sm" 
                              className="w-100"
                              onClick={(e) => handleQuoteClick(e, product)}
                              aria-label={`Request quote for ${product.title}`}
                            >
                              Get Quote
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>

      {/* Quote Modal */}
      <Modal 
        show={showQuoteModal} 
        onHide={() => setShowQuoteModal(false)}
        centered
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Request a Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {quoteSubmitted ? (
            <Alert variant="success">
              <Alert.Heading>Quote Request Sent!</Alert.Heading>
              <p>We'll get back to you soon regarding: <strong>{selectedProduct?.title}</strong></p>
            </Alert>
          ) : (
            <Form onSubmit={handleQuoteSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Control 
                  type="text" 
                  value={selectedProduct?.title || ""} 
                  disabled 
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Your Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name"
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email"
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  placeholder="Any specific requirements?"
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => setShowQuoteModal(false)} className="w-50">
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="w-50">
                  Submit Request
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductPage;