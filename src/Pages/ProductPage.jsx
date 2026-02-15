// import React, { useState, useEffect } from "react";
// import {
//   Container, Row, Col, Card, Button, ListGroup, Form, Modal, Alert, Spinner, Badge
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Lightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";
// import "./ProductPage.css";

// const countryCodes = [
//   { code: "+1", country: "USA/Canada" },
//   { code: "+44", country: "UK" },
//   { code: "+91", country: "India" },
//   { code: "+61", country: "Australia" },
//   { code: "+49", country: "Germany" },
//   { code: "+81", country: "Japan" },
//   { code: "+971", country: "UAE" },
// ];

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState(["All"]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // Quote modal state
//   const [showModal, setShowModal] = useState(false);
//   const [quoteProduct, setQuoteProduct] = useState(null);
//   const [quoteData, setQuoteData] = useState({
//     name: "", email: "", phone: "", countryCode: "+91", company: "",
//   });
//   const [submissionStatus, setSubmissionStatus] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   // Lightbox state
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxImage, setLightboxImage] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/products");
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();
//         setProducts(data);
//         setCategories(["All", ...new Set(data.map((p) => p.category))]);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleGetQuote = (product, e) => {
//     if (e) e.stopPropagation();
//     setQuoteProduct(product);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setQuoteProduct(null);
//     setQuoteData({ name: "", email: "", phone: "", countryCode: "+91", company: "" });
//     setValidationErrors({});
//     setSubmissionStatus(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setQuoteData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!quoteData.name) errors.name = "Name is required.";
//     if (!quoteData.email) errors.email = "Email is required.";
//     else if (!/^\S+@\S+\.\S+$/.test(quoteData.email)) errors.email = "Invalid email.";
//     if (quoteData.phone && !/^\d{7,12}$/.test(quoteData.phone)) errors.phone = "7–12 digits.";
//     return errors;
//   };

//   const handleSubmitQuote = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     setValidationErrors(errors);
//     if (Object.keys(errors).length > 0) return;

//     setSubmissionStatus("submitting");
//     try {
//       const res = await fetch("http://localhost:5000/api/send-quote-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...quoteData,
//           phone: `${quoteData.countryCode}${quoteData.phone}`,
//           product: quoteProduct?.title || "",
//         }),
//       });
//       if (!res.ok) throw new Error();
//       setSubmissionStatus("success");
//       setTimeout(handleClose, 2500);
//     } catch {
//       setSubmissionStatus("error");
//     }
//   };

//   const filteredProducts = products.filter((p) => {
//     const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
//     const matchSearch = (p.title || "").toLowerCase().includes(searchTerm.toLowerCase());
//     return matchCategory && matchSearch;
//   });

//   if (loading) return (
//     <div className="loader-container">
//       <Spinner animation="border" variant="primary" />
//       <h6 className="mt-3 text-muted">Loading Catalog...</h6>
//     </div>
//   );

//   return (
//     <Container fluid className="product-page py-5 px-lg-5">
//       <Row>
//         {/* Sidebar */}
//         <Col lg={3} md={4} className="mb-4">
//           <div className="sidebar shadow-sm border-0">
//             <h5>Categories</h5>
//             <ListGroup variant="flush" className="mb-4">
//               {categories.map((cat, i) => (
//                 <ListGroup.Item
//                   key={i}
//                   active={selectedCategory === cat}
//                   className="category-item border-0"
//                   onClick={() => setSelectedCategory(cat)}
//                 >
//                   {cat}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>

//             <Form.Group className="search-section">
//               <Form.Label className="fw-bold small text-muted text-uppercase">Search Products</Form.Label>
//               <Form.Control
//                 className="search-input"
//                 placeholder="Type here..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </Form.Group>
//           </div>
//         </Col>

//         {/* Products Grid */}
//         <Col lg={9} md={8}>
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h3 className="fw-bold text-dark">{selectedCategory} <span className="text-muted fw-light">({filteredProducts.length})</span></h3>
//           </div>

//           <Row>
//             {filteredProducts.length ? (
//               filteredProducts.map((product) => (
//                 <Col xl={4} lg={6} md={12} sm={6} key={product._id} className="mb-4">
//                   <Card className="product-card border-0 shadow-sm" onClick={() => navigate(`/products/${product._id}`)}>
//                     <div className="product-image-container">
//                       <Card.Img
//                         src={product.image}
//                         className="product-image"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setLightboxImage([{ src: product.image }]);
//                           setLightboxOpen(true);
//                         }}
//                       />
//                       <div className="image-overlay">
//                         <span>🔍 Click to Preview</span>
//                       </div>
//                     </div>
//                     <Card.Body className="p-4">
//                       <Badge bg="light" text="dark" className="mb-2 border">{product.category}</Badge>
//                       <Card.Title className="fw-bold text-truncate">{product.title}</Card.Title>
//                       <Card.Text className="text-muted small mb-4">
//                         {product.description?.substring(0, 80)}...
//                       </Card.Text>
//                       <div className="d-flex gap-2">
//                         <Button variant="primary" className="w-100 py-2">Details</Button>
//                         <Button 
//                           variant="outline-info" 
//                           className="w-100 py-2" 
//                           onClick={(e) => handleGetQuote(product, e)}
//                         >
//                           Quote
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))
//             ) : (
//               <Col className="text-center py-5">
//                 <Alert variant="light" className="border">No products found for this criteria.</Alert>
//               </Col>
//             )}
//           </Row>
//         </Col>
//       </Row>

//       {/* Quote Modal */}
//       <Modal show={showModal} onHide={handleClose} centered backdrop="static" className="quote-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Request Quote</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="p-4">
//           {submissionStatus === "success" && <Alert variant="success" className="border-0">Request sent successfully!</Alert>}
//           {submissionStatus === "error" && <Alert variant="danger" className="border-0">Could not send request.</Alert>}

//           <Form onSubmit={handleSubmitQuote}>
//             <Form.Group className="mb-3">
//               <Form.Label className="small fw-bold">Selected Item</Form.Label>
//               <Form.Control value={quoteProduct?.title || ""} disabled className="bg-light" />
//             </Form.Group>
            
//             <Form.Group className="mb-3">
//               <Form.Control
//                 placeholder="Full Name *"
//                 name="name"
//                 value={quoteData.name}
//                 onChange={handleChange}
//                 isInvalid={!!validationErrors.name}
//               />
//               <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 placeholder="Email Address *"
//                 name="email"
//                 value={quoteData.email}
//                 onChange={handleChange}
//                 isInvalid={!!validationErrors.email}
//               />
//               <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
//             </Form.Group>

//             <Row className="mb-3">
//               <Col xs={4}>
//                 <Form.Select name="countryCode" value={quoteData.countryCode} onChange={handleChange}>
//                   {countryCodes.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
//                 </Form.Select>
//               </Col>
//               <Col xs={8}>
//                 <Form.Control
//                   placeholder="Phone"
//                   name="phone"
//                   value={quoteData.phone}
//                   onChange={handleChange}
//                   isInvalid={!!validationErrors.phone}
//                 />
//               </Col>
//             </Row>

//             <Form.Group className="mb-4">
//               <Form.Control
//                 placeholder="Company Name"
//                 name="company"
//                 value={quoteData.company}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button type="submit" className="w-100 py-2 fw-bold" disabled={submissionStatus === "submitting"}>
//               {submissionStatus === "submitting" ? <Spinner size="sm" /> : "Send Inquiry"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {lightboxImage && (
//         <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={lightboxImage} plugins={[Thumbnails]} />
//       )}
//     </Container>
//   );
// };

// export default ProductPage;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Form, Modal, Alert, Spinner, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setCategories(["All", ...new Set(data.map(p => p.category))]);
        setLoading(false);
      });
  }, []);

  // Helper to keep cards uniform
  const renderDescription = (text, id, limit = 100) => {
    if (text.length <= limit) return text;
    return (
      <>
        {text.substring(0, limit)}...{" "}
        <span 
          className="know-more-link" 
          onClick={(e) => { e.stopPropagation(); navigate(`/products/${id}`); }}
        >
          Know More
        </span>
      </>
    );
  };

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) return <div className="loader-container"><Spinner animation="border" variant="primary" /></div>;

  return (
    <Container fluid className="product-page py-5 px-lg-5">
      <Row>
        <Col md={3}>
          <div className="sidebar shadow-sm">
            <h5>Categories</h5>
            <ListGroup variant="flush">
              {categories.map((cat, i) => (
                <ListGroup.Item 
                  key={i} 
                  active={selectedCategory === cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className="category-item"
                >
                  {cat}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Control 
              className="mt-4 search-input" 
              placeholder="Search..." 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </Col>

        <Col md={9}>
          <Row>
            {filteredProducts.map(product => (
              <Col lg={4} sm={6} key={product._id} className="mb-4">
                <Card className="product-card border-0 shadow-sm h-100">
                  <div className="img-wrapper" onClick={() => navigate(`/products/${product._id}`)}>
                    <Card.Img variant="top" src={product.image} className="product-image" />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Badge bg="light" text="dark" className="mb-2 border align-self-start">{product.category}</Badge>
                    <Card.Title className="fw-bold h6">{product.title}</Card.Title>
                    <Card.Text className="small text-muted flex-grow-1">
                      {renderDescription(product.description, product._id)}
                    </Card.Text>
                    <div className="d-flex gap-2 mt-3">
                      <Button variant="primary" size="sm" className="w-100" onClick={() => navigate(`/products/${product._id}`)}>View</Button>
                      <Button variant="outline-info" size="sm" className="w-100">Quote</Button>
                    </div>
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