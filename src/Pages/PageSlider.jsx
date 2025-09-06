import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PageSlider.css";

function PageSlider() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const cardsData = [
    {
      title: "Card 1",
      text: "This is card 1.",
      img: "images/Img1.png"
    },
    {
      title: "Card 2",
      text: "This is card 2.",
      img: "https://via.placeholder.com/300x200"
    },
    {
      title: "Card 3",
      text: "This is card 3.",
      img: "https://via.placeholder.com/300x200"
    },
    {
      title: "Card 4",
      text: "This is card 4.",
      img: "https://via.placeholder.com/300x200"
    }
  ];

  const moreCards = [
    {
      title: "Card 5",
      text: "This is card 5.",
      img: "https://via.placeholder.com/300x200"
    },
    {
      title: "Card 6",
      text: "This is card 6.",
      img: "https://via.placeholder.com/300x200"
    },
    {
      title: "Card 7",
      text: "This is card 7.",
      img: "https://via.placeholder.com/300x200"
    },
    {
      title: "Card 8",
      text: "This is card 8.",
      img: "https://via.placeholder.com/300x200"
    }
  ];

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "2rem 0" }}>
      <Container>
        <h2 className="text-center mb-5">Various services</h2>

        {/* First 4 Cards - Scrollable on Mobile */}
        <div className="mobile-scroll-wrapper">
          <Row className="scroll-row">
            {cardsData.map((card, index) => (
              <Col key={index} md={6} lg={3} className="mb-4 scroll-col" data-aos="fade-up">
                <Card className="h-100 shadow-sm card-hover tall-card">
                  <Card.Img variant="top" src={card.img} alt={card.title} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* More 4 Cards - Scrollable on Mobile */}
        <div className="mobile-scroll-wrapper mt-4">
          <Row className="scroll-row">
            {moreCards.map((card, index) => (
              <Col key={index} md={6} lg={3} className="mb-4 scroll-col" data-aos="fade-up">
                <Card className="h-100 shadow-sm card-hover tall-card">
                  <Card.Img variant="top" src={card.img} alt={card.title} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default PageSlider;

