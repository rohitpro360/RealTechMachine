import React from "react";
import { Container, Card } from "react-bootstrap";

function Support() {
  return (
    <Container className="my-5 main-content">
      <h2 className="text-center mb-4">🛠️ Support</h2>
      <Card className="shadow-sm p-4">
        <h4>How can we help you?</h4>
        <p>
          If you’re facing any issues with our products or services, feel free
          to reach out to us. Our support team is always ready to assist.
        </p>
        <p>
          <strong>Email:</strong> support@mycompany.com <br />
          <strong>Phone:</strong> +91 98765 43211
        </p>
      </Card>
    </Container>
  );
}

export default Support;
