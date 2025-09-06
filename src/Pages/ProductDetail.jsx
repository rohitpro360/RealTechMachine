import React from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();

  // Mock details now, replace with backend API later
  const product = {
    id,
    title: `Product ${id}`,
    description: "This is a detailed description of the product.",
    image: "https://via.placeholder.com/600x400",
    price: "$499",
    features: ["Feature 1", "Feature 2", "Feature 3"]
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm p-3">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="mb-3"
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h5>Price: {product.price}</h5>
          <ul>
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
