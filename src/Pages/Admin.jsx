// import React, { useState } from "react";
// import { Container, Row, Button, Form, Modal } from "react-bootstrap";
// import Product from "./Product";

// function Admin() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState({});

//   // Add new product
//   const handleAddProduct = () => {
//     setCurrentProduct({ id: Date.now(), name: "", description: "" });
//     setShowModal(true);
//   };

//   // Edit product
//   const handleEdit = (product) => {
//     setCurrentProduct(product);
//     setShowModal(true);
//   };

//   // Delete product
//   const handleDelete = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//   };

//   // Save (Add or Update) product
//   const handleSave = () => {
//     if (products.some((p) => p.id === currentProduct.id)) {
//       // Update
//       setProducts(
//         products.map((p) =>
//           p.id === currentProduct.id ? currentProduct : p
//         )
//       );
//     } else {
//       // Add
//       setProducts([...products, currentProduct]);
//     }
//     setShowModal(false);
//   };

//   return (
//     <Container style={{ marginTop: "80px" }}>
//       <h2 className="mb-4">Admin Panel</h2>
//       <Button variant="success" className="mb-4" onClick={handleAddProduct}>
//         Add Product
//       </Button>

//       <Row>
//         {products.map((product) => (
//           <Product
//             key={product.id}
//             product={product}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             isAdmin={true}
//           />
//         ))}
//       </Row>

//       {/* Modal for Add/Edit */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {currentProduct.id ? "Edit Product" : "Add Product"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Product Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentProduct.name || ""}
//                 onChange={(e) =>
//                   setCurrentProduct({
//                     ...currentProduct,
//                     name: e.target.value,
//                   })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={currentProduct.description || ""}
//                 onChange={(e) =>
//                   setCurrentProduct({
//                     ...currentProduct,
//                     description: e.target.value,
//                   })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Image URL</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentProduct.image || ""}
//                 onChange={(e) =>
//                   setCurrentProduct({
//                     ...currentProduct,
//                     image: e.target.value,
//                   })
//                 }
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

// export default Admin;


import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Card,
  Alert,
} from "react-bootstrap";
import "./Admin.css"; // Reuse the same CSS file

function Admin() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  // Function to show a temporary alert
  const displayAlert = (message, variant = "success") => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
  };

  // Add new product
  const handleAddProduct = () => {
    setCurrentProduct({ id: null, name: "", description: "", image: "" });
    setShowModal(true);
  };

  // Edit product
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    displayAlert("Product deleted successfully!");
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the file to show a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct({ ...currentProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save (Add or Update) product
  const handleSave = () => {
    if (!currentProduct.name || !currentProduct.description || !currentProduct.image) {
      displayAlert("Please fill in all fields and upload an image.", "danger");
      return;
    }

    if (currentProduct.id) {
      // Update
      setProducts(
        products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
      displayAlert("Product updated successfully!");
    } else {
      // Add
      const newProduct = { ...currentProduct, id: Date.now() };
      setProducts([...products, newProduct]);
      displayAlert("Product added successfully!");
    }
    setShowModal(false);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Admin Panel</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="primary" onClick={handleAddProduct}>
          + Add New Product
        </Button>
      </div>

      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      {products.length === 0 ? (
        <div className="text-center text-muted">No products to display. Add a new one!</div>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4}>
              <Card className="product-card h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image || "https://via.placeholder.com/300x200.png?text=No+Image"}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {product.description}
                  </Card.Text>
                  <div className="mt-3 d-flex justify-content-between">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct.id ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={currentProduct.name || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={currentProduct.description || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* File upload input */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
            {/* Live Image Preview */}
            {currentProduct.image && (
              <div className="text-center mb-3">
                <p>Image Preview:</p>
                <img
                  src={currentProduct.image}
                  alt="Product Preview"
                  className="img-thumbnail"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;