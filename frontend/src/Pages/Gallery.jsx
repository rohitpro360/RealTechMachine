import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Tabs, Tab, Row, Col, Card, Button } from "react-bootstrap";
import "./Gallery.css";
import "animate.css";

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Fetch gallery from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/api/gallery`)
      .then((res) => setGallery(res.data))
      .catch((err) => console.error("Gallery Load Error:", err));
  }, []);

  // === FILTER PHOTOS ONLY ===
  const filteredPhotos = gallery.filter(
    (item) =>
      item.type === "photo" &&
      (filter === "all" || item.category === filter)
  );

  const videos = gallery.filter((item) => item.type === "video");
  const events = gallery.filter((item) => item.type === "event");

  return (
    <Container className="gallery-page mt-5">
      <h2 className="text-center mb-4">Gallery</h2>

      <Tabs defaultActiveKey="photos" className="mb-4" fill>
        {/* ====================== PHOTOS TAB ====================== */}
        <Tab eventKey="photos" title="Photos">
          <div className="gallery-filters text-center mb-4">
            {["all", "office", "events", "factory", "staff", "general"].map(
              (cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? "primary" : "outline-primary"}
                  className="mx-1"
                  onClick={() => setFilter(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              )
            )}
          </div>

          
          <Row>
            {filteredPhotos.map((photo) => (
              <Col
                md={4}
                sm={6}
                xs={12}
                key={photo._id}
                className="mb-4 animate__animated animate__fadeInUp"
              >
                <Card
                  className="h-100 shadow-sm"
                  onClick={() => setLightbox(photo.imageUrl)}
                >
                  <Card.Img
                    src={photo.imageUrl}
                    alt="gallery-img"
                    className="gallery-image"
                    loading="lazy"
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

       
        <Tab eventKey="videos" title="Videos">
          <Row>
            {videos.length > 0 ? (
              videos.map((video) => (
                <Col
                  md={6}
                  xs={12}
                  key={video._id}
                  className="mb-4 animate__animated animate__fadeIn"
                >
                  <div className="ratio ratio-16x9 video-frame">
                    <iframe
                      src={
                        video.videoUrl.includes("watch?v=")
                          ? video.videoUrl.replace("watch?v=", "embed/")
                          : video.videoUrl.includes("youtu.be")
                            ? video.videoUrl.replace("youtu.be/", "youtube.com/embed/")
                            : video.videoUrl
                      }
                      title={video.title || "Video"}
                      allowFullScreen
                    ></iframe>
                  </div>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No videos available.</p>
            )}
          </Row>
        </Tab>


        {/* ====================== EVENTS TAB ====================== */}
        <Tab eventKey="events" title="Events">
          <Row>
            {events.length > 0 ? (
              events.map((event) => (
                <Col
                  md={4}
                  sm={6}
                  xs={12}
                  key={event._id}
                  className="mb-4 animate__animated animate__fadeInUp"
                >
                  <Card className="h-100 shadow-sm">
                    {event.imageUrl && (
                      <Card.Img
                        src={event.imageUrl}
                        className="gallery-image"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{event.title || "Event"}</Card.Title>
                      <Card.Text>
                        {event.description || "Event details coming soon."}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No events found.</p>
            )}
          </Row>
        </Tab>
      </Tabs>

      {/* ====================== LIGHTBOX ====================== */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Zoomed" className="lightbox-img" />
        </div>
      )}
    </Container>
  );
};

export default Gallery;
