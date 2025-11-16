// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   ListGroup,
//   Form,
//   Modal,
//   Alert,
//   Spinner,
// } from "react-bootstrap";
// import "./ProductPage.css";
// import Lightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";

// // Dummy product data
// const products = [
//   { id: 1, title: "Washing Machine", description: "High quality washing machine", image: "https://picsum.photos/600/400?random=1", category: "Cleaning machine" },
//   { id: 2, title: "Refrigerator", description: "Energy saving fridge", image: "https://picsum.photos/600/400?random=2", category: "Ultrasonic Machine" },
//   { id: 3, title: "Mobile Phone", description: "Latest smartphone", image: "https://picsum.photos/600/400?random=3", category: "Crankshaft component" },
//   { id: 4, title: "Laptop", description: "High performance laptop", image: "https://picsum.photos/600/400?random=4", category: "Conveyorsized component" },
//   { id: 5, title: "Office Chair", description: "Comfortable office chair", image: "https://picsum.photos/600/400?random=5", category: "Robotic cleaning machine" },
// ];

// const categories = ["All", ...new Set(products.map((p) => p.category))];

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
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Quote modal state
//   const [showModal, setShowModal] = useState(false);
//   const [quoteProduct, setQuoteProduct] = useState(null);

//   // Form state
//   const [quoteData, setQuoteData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     countryCode: "+91",
//     company: "",
//   });
//   const [submissionStatus, setSubmissionStatus] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   // Lightbox
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxImage, setLightboxImage] = useState(null);

//   const handleGetQuote = (product) => {
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

//   // Validation
//   const validateForm = () => {
//     const errors = {};
//     if (!quoteData.name) errors.name = "Name is required.";
//     if (!quoteData.email) errors.email = "Email is required.";
//     else if (!/^\S+@\S+\.\S+$/.test(quoteData.email)) errors.email = "Invalid email.";
//     if (quoteData.phone && !/^\d{7,12}$/.test(quoteData.phone))
//       errors.phone = "Phone must be 7–12 digits.";
//     return errors;
//   };

//   // Submit Quote
//   const handleSubmitQuote = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     setValidationErrors(errors);

//     if (Object.keys(errors).length > 0) {
//       setSubmissionStatus("error");
//       setTimeout(() => setSubmissionStatus(null), 3000);
//       return;
//     }

//     setSubmissionStatus("submitting");

//     try {
//       const response = await fetch("http://localhost:5000/api/send-quote-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...quoteData,
//           phone: `${quoteData.countryCode}${quoteData.phone}`,
//           product: quoteProduct?.title || "",
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to send quote request");

//       setSubmissionStatus("success");
//       setQuoteData({ name: "", email: "", phone: "", countryCode: "+91", company: "" });
//       setTimeout(() => handleClose(), 3000);
//     } catch (err) {
//       console.error(err);
//       setSubmissionStatus("error");
//     }
//   };

//   // Filter products
//   const filteredProducts = products.filter((p) => {
//     const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
//     const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <Container fluid className="product-page py-5">
//       <Row>
//         {/* Sidebar */}
//         <Col md={3} className="sidebar mb-4 mb-md-0">
//           <h4 className="mb-3">Categories</h4>
//           <ListGroup>
//             {categories.map((cat, idx) => (
//               <ListGroup.Item
//                 key={idx}
//                 action
//                 active={selectedCategory === cat}
//                 onClick={() => {
//                   setSelectedCategory(cat);
//                   setSelectedProduct(null);
//                 }}
//                 className="category-item"
//               >
//                 {cat}
//               </ListGroup.Item>
//             ))}
//           </ListGroup>

//           {/* Search bar */}
//           <Form className="mt-4">
//             <Form.Control
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Form>
//         </Col>

//         {/* Product Section */}
//         <Col md={9} xs={12} className="products-section">
//           {selectedProduct ? (
//             <Card className="shadow-sm p-3 product-detail">
//               <Row>
//                 <Col md={6}>
//                   <Card.Img
//                     src={selectedProduct.image}
//                     alt={selectedProduct.title}
//                     className="product-detail-img"
//                     onClick={() => {
//                       setLightboxImage([{ src: selectedProduct.image }]);
//                       setLightboxOpen(true);
//                     }}
//                     style={{ cursor: "zoom-in" }}
//                   />
//                 </Col>
//                 <Col md={6}>
//                   <Card.Body>
//                     <Card.Title className="fw-bold">{selectedProduct.title}</Card.Title>
//                     <Card.Text>{selectedProduct.description}</Card.Text>
//                     <Card.Text>
//                       <strong>Category:</strong> {selectedProduct.category}
//                     </Card.Text>
//                     <div className="d-flex gap-2 mt-3">
//                       <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
//                         Back
//                       </Button>
//                       <Button variant="info" onClick={() => handleGetQuote(selectedProduct)}>
//                         Get Quote
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Col>
//               </Row>
//             </Card>
//           ) : (
//             <Row>
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
//                     <Card className="h-100 shadow-sm product-card">
//                       <Card.Img
//                         variant="top"
//                         src={product.image}
//                         alt={product.title}
//                         className="product-image"
//                         onClick={() => {
//                           setLightboxImage([{ src: product.image }]);
//                           setLightboxOpen(true);
//                         }}
//                         style={{ cursor: "zoom-in" }}
//                       />
//                       <Card.Body>
//                         <Card.Title>{product.title}</Card.Title>
//                         <Card.Text className="text-muted small">
//                           {product.description}
//                         </Card.Text>
//                         <div className="d-flex justify-content-between mt-3">
//                           <Button
//                             variant="primary"
//                             size="sm"
//                             onClick={() => setSelectedProduct(product)}
//                           >
//                             View Details
//                           </Button>
//                           <Button
//                             variant="outline-info"
//                             size="sm"
//                             onClick={() => handleGetQuote(product)}
//                           >
//                             Get Quote
//                           </Button>
//                         </div>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))
//               ) : (
//                 <p className="text-muted">No products found.</p>
//               )}
//             </Row>
//           )}
//         </Col>
//       </Row>

//       {/* 🔹 Quote Modal */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Get Quote</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {submissionStatus === "success" && (
//             <Alert variant="success">✅ Your quote request was sent successfully!</Alert>
//           )}
//           {submissionStatus === "error" && (
//             <Alert variant="danger">❌ Please fix errors or try again later.</Alert>
//           )}

//           <Form onSubmit={handleSubmitQuote}>
//             <Form.Group className="mb-3">
//               <Form.Label>Your Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={quoteData.name}
//                 onChange={handleChange}
//                 isInvalid={!!validationErrors.name}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email Address *</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={quoteData.email}
//                 onChange={handleChange}
//                 isInvalid={!!validationErrors.email}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Phone</Form.Label>
//               <Row>
//                 <Col xs={4}>
//                   <Form.Select
//                     name="countryCode"
//                     value={quoteData.countryCode}
//                     onChange={handleChange}
//                   >
//                     {countryCodes.map((c) => (
//                       <option key={c.code} value={c.code}>
//                         {c.country} ({c.code})
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//                 <Col xs={8}>
//                   <Form.Control
//                     type="text"
//                     name="phone"
//                     value={quoteData.phone}
//                     onChange={handleChange}
//                     isInvalid={!!validationErrors.phone}
//                   />
//                 </Col>
//               </Row>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Company</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="company"
//                 value={quoteData.company}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Product</Form.Label>
//               <Form.Control type="text" value={quoteProduct?.title || ""} disabled />
//             </Form.Group>

//             <Button
//               variant="info"
//               type="submit"
//               className="w-100"
//               disabled={submissionStatus === "submitting"}
//             >
//               {submissionStatus === "submitting" ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" /> Sending...
//                 </>
//               ) : (
//                 "Submit Quote Request"
//               )}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* 🔹 Lightbox */}
//       {lightboxImage && (
//         <Lightbox
//           open={lightboxOpen}
//           close={() => setLightboxOpen(false)}
//           slides={lightboxImage}
//           plugins={[Thumbnails]}
//         />
//       )}
//     </Container>
//   );
// };

// export default ProductPage;










//Test
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const countryCodes = [
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+81", country: "Japan" },
  { code: "+971", country: "UAE" },
];

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Quote modal state
  const [showModal, setShowModal] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);

  // Form state
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    company: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        setProducts(data);
        setCategories(["All", ...new Set(data.map((p) => p.category))]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleGetQuote = (product) => {
    setQuoteProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setQuoteProduct(null);
    setQuoteData({ name: "", email: "", phone: "", countryCode: "+91", company: "" });
    setValidationErrors({});
    setSubmissionStatus(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!quoteData.name) errors.name = "Name is required.";
    if (!quoteData.email) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(quoteData.email)) errors.email = "Invalid email.";
    if (quoteData.phone && !/^\d{7,12}$/.test(quoteData.phone))
      errors.phone = "Phone must be 7–12 digits.";
    return errors;
  };

  // Submit Quote
  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmissionStatus("error");
      setTimeout(() => setSubmissionStatus(null), 3000);
      return;
    }

    setSubmissionStatus("submitting");

    try {
      const response = await fetch("http://localhost:5000/api/send-quote-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quoteData,
          phone: `${quoteData.countryCode}${quoteData.phone}`,
          product: quoteProduct?.title || "",
        }),
      });

      if (!response.ok) throw new Error("Failed to send quote request");

      setSubmissionStatus("success");
      setQuoteData({ name: "", email: "", phone: "", countryCode: "+91", company: "" });
      setTimeout(() => handleClose(), 3000);
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = (p.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="product-page py-5">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar mb-4 mb-md-0">
          <h4 className="mb-3">Categories</h4>
          <ListGroup>
            {categories.map((cat, idx) => (
              <ListGroup.Item
                key={idx}
                action
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className="category-item"
              >
                {cat}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Search bar */}
          <Form className="mt-4">
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Col>

        {/* Product Section */}
        <Col md={9} xs={12} className="products-section">
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col md={4} sm={6} xs={12} key={product._id} className="mb-4">
                  <Card className="h-100 shadow-sm product-card">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                      onClick={() => {
                        setLightboxImage([{ src: product.image }]);
                        setLightboxOpen(true);
                      }}
                      style={{ cursor: "zoom-in" }}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text className="text-muted small">
                        {product.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between mt-3">
                        {/* ✅ Navigate to ProductDetail page */}
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/products/${product._id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => handleGetQuote(product)}
                        >
                          Get Quote
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-muted">No products found.</p>
            )}
          </Row>
        </Col>
      </Row>

      {/* 🔹 Quote Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Get Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submissionStatus === "success" && (
            <Alert variant="success">✅ Your quote request was sent successfully!</Alert>
          )}
          {submissionStatus === "error" && (
            <Alert variant="danger">❌ Please fix errors or try again later.</Alert>
          )}

          <Form onSubmit={handleSubmitQuote}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={quoteData.name}
                onChange={handleChange}
                isInvalid={!!validationErrors.name}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={quoteData.email}
                onChange={handleChange}
                isInvalid={!!validationErrors.email}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Row>
                <Col xs={4}>
                  <Form.Select
                    name="countryCode"
                    value={quoteData.countryCode}
                    onChange={handleChange}
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.country} ({c.code})
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={quoteData.phone}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.phone}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={quoteData.company}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control type="text" value={quoteProduct?.title || ""} disabled />
            </Form.Group>

            <Button
              variant="info"
              type="submit"
              className="w-100"
              disabled={submissionStatus === "submitting"}
            >
              {submissionStatus === "submitting" ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Sending...
                </>
              ) : (
                "Submit Quote Request"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* 🔹 Lightbox */}
      {lightboxImage && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImage}
          plugins={[Thumbnails]}
        />
      )}
    </Container>
  );
};

export default ProductPage;
