import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Location.css";

function Location() {
    return (
        <div className="main-content">
        <Container className="my-5">
            <h2 className="text-center mb-4">📍 Our Location</h2>
            <Row className="align-items-center g-4">
                {/* Address Section */}
                <Col xs={12} md={5}>
                    <Card className="shadow-sm p-4 h-100">
                        <h4 className="mb-3">Our Office</h4>
                        <p>
                            <strong>Address:</strong> <br />
                            Real Technologies Machines Private Limited <br />
                            Sahwas Society Line No 1, Flat No 16, <br />Dhanlaxmi Apprt Karvenagar <br />
                            Pune - 411052, Maharashtra, India
                        </p>
                        <p>
                            <strong>Phone:</strong> +91 8047625991
                        </p>
                        <p>
                            <strong>Email:</strong> info@mycompany.com
                        </p>
                    </Card>
                </Col>

                {/* Google Map Section */}
                <Col xs={12} md={7}>
                    <div className="map-responsive shadow-sm">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3783.7420824152414!2d73.81767507385867!3d18.495338369947152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDI5JzQzLjIiTiA3M8KwNDknMTIuOSJF!5e0!3m2!1sen!2sin!4v1756324401293!5m2!1sen!2sin"
                            width="100%"
                            height="350"
                            style={{ border: 0, borderRadius: "10px" }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Location;
