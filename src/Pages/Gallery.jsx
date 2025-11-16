import React from "react";
import { Container, Tabs, Tab, Row, Col, Card } from "react-bootstrap";
import "./Gallery.css"; // optional for extra styling

const Gallery = () => {
  return (
    <Container className="gallery-page mt-5">
      <h2 className="text-center mb-4">Gallery</h2>

      <Tabs defaultActiveKey="photos" id="gallery-tabs" className="mb-3" fill>
        {/* Photos Tab */}
        <Tab eventKey="photos" title="Photos">
          <Row>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Col md={4} sm={6} xs={12} key={num} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`https://picsum.photos/400/250?random=${num}`}
                    alt={`Photo ${num}`}
                    className="gallery-image"
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* Videos Tab */}
        <Tab eventKey="videos" title="Videos">
          <Row>
            {[1, 2].map((num) => (
              <Col md={6} xs={12} key={num} className="mb-4">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title={`Video ${num}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* Events Tab */}
        <Tab eventKey="events" title="Events">
          <Row>
            {[1, 2, 3].map((num) => (
              <Col md={4} sm={6} xs={12} key={num} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Event {num}</Card.Title>
                    <Card.Text>
                      This is a description for Event {num}. You can add date,
                      location, and more details here.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Gallery;
