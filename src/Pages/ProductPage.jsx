import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import "./ProductPage.css";

// Dummy product data
const products = [
  { id: 1, title: "Washing Machine", description: "High quality washing machine", image: "https://via.placeholder.com/150", category: "Appliances" },
  { id: 2, title: "Refrigerator", description: "Energy saving fridge", image: "https://via.placeholder.com/150", category: "Appliances" },
  { id: 3, title: "Mobile Phone", description: "Latest smartphone", image: "https://via.placeholder.com/150", category: "Electronics" },
  { id: 4, title: "Laptop", description: "High performance laptop", image: "https://via.placeholder.com/150", category: "Electronics" },
  { id: 5, title: "Office Chair", description: "Comfortable office chair", image: "https://via.placeholder.com/150", category: "Furniture" },
];

// Extract unique categories
const categories = ["All", ...new Set(products.map((p) => p.category))];

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate(); // 👈 useNavigate hook

  // Filter products based on category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <Container fluid className="product-page">
      <Row>
        {/* Sidebar (fixed) */}
        <Col md={3} className="d-none d-md-block sidebar">
          <h4>Categories</h4>
          <ListGroup>
            {categories.map((cat, idx) => (
              <ListGroup.Item
                key={idx}
                action
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ cursor: "pointer" }}
              >
                {cat}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Products Section (scrollable) */}
        <Col md={9} xs={12} className="products-section">
          <Row>
            {filteredProducts.map((product) => (
              <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
                <Card className="h-100 shadow-sm product-card">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
