import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PageSlider.css";

function PageSlider() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const cardsData = [
    {
      title: "Cleaning Machines",
      text: "Cranshaft Cabinet Type Cleaning Machine",
      img: "images/FilterationSystem.png",
    },
    {
      title: "Ultrasonic Cleaning Machine",
      text: "Usage: INDUSTRIAL LAB",
      img: "images/Ultrasonic.png",
    },
    {
      title: "Crate Washer",
      text: "Component Degreasing Machine",
      img: "images/Cratewasher.png",
    },
    {
      title: "Coolant Filtration System",
      text: "Component Degreasing Machine",
      img: "images/CoolantFilterationSystem.png",
    },
    {
      title: "Paperband Filtration System",
      text: "Component Degreasing Machine",
      img: "images/PaperFilterationSystem.png",
    },
    {
      title: "Rotary Basket Type Machine",
      text: "Component Degreasing Machine",
      img: "images/RotaryBasketTypeMachine.png",
    },
    {
      title: "Milipore Contaminate Oil Analysis Kit",
      text: "CDM",
      img: "images/MiliporeContaminate.png",
    },
    {
      title: "Electronics Component Cleaning Machine",
      text: "Component Degreasing Machine",
      img: "images/ElectronicsComponent.png",
    },
  ];

  // 🔥 Function to open Product Page
  const openProductPage = (data) => {
    navigate("/product", { state: data });
  };

  return (
    <div className="Pslider">
      <Container>
        <h2 className="text-center mb-5">Various Services</h2>

        <div className="mobile-scroll-wrapper">
          <Row className="scroll-row">
            {cardsData.map((card, index) => (
              <Col
                key={index}
                md={6}
                lg={3}
                className="mb-4 scroll-col"
                data-aos="fade-up"
              >
                <Card
                  className="h-100 shadow-sm card-hover tall-card"
                  onClick={() => openProductPage(card)} // 🔥 CLICK EVENT
                >
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
