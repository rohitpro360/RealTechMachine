

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Resend } from "resend";
// import mongoose from "mongoose";
// import tls from "tls";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// tls.DEFAULT_MIN_VERSION = "TLSv1.2";
// dotenv.config();

// // ✅ Initialize Express
// const app = express();

// // ✅ CORS Configuration
// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL || "http://localhost:5173", // frontend dev
//       process.env.ADMIN_URL || "http://localhost:5174", // admin dev
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ✅ Resend setup
// const resend = new Resend(process.env.RESEND_API_KEY);

// // ✅ MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// /* ------------------- CLOUDINARY (Image Upload Setup) ------------------- */

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "realtech-products", // Cloudinary folder name
//     allowed_formats: ["jpg", "png", "jpeg", "webp"],
//   },
// });

// const upload = multer({ storage });

// /* ------------------- MAIL ROUTES ------------------- */

// // 📩 Contact form
// app.post("/api/send-contact-email", async (req, res) => {
//   const { name, surname, email, phone, productName, country, state } = req.body;

//   try {
//     await resend.emails.send({
//       from: "RealTech <onboarding@resend.dev>",
//       to: process.env.ADMIN_EMAIL,
//       subject: "📩 New Contact Form Submission",
//       html: `
//         <h2>📩 New Contact Request</h2>
//         <p><b>Name:</b> ${name} ${surname}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Country:</b> ${country}</p>
//         <p><b>State:</b> ${state}</p>
//         <p><b>Product:</b> ${productName}</p>
//       `,
//     });

//     await resend.emails.send({
//       from: "RealTech <onboarding@resend.dev>",
//       to: email,
//       subject: "✅ We received your request!",
//       html: `
//         <h2>Hello ${name},</h2>
//         <p>Thank you for contacting <b>RealTech Pvt Ltd</b>.</p>
//         <p>We have received your request regarding <b>${productName}</b>.</p>
//         <p>Our team will get back to you shortly.</p>
//         <br/>
//         <p>Best regards,<br/>RealTech Pvt Ltd Team</p>
//       `,
//     });

//     res.status(200).json({ message: "Contact email sent successfully!" });
//   } catch (error) {
//     console.error("❌ Error sending contact email:", error);
//     res.status(500).json({ error: "Failed to send contact email" });
//   }
// });

// // 💼 Quote request
// app.post("/api/send-quote-email", async (req, res) => {
//   const { name, email, phone, company, product } = req.body;

//   try {
//     await resend.emails.send({
//       from: "RealTech <onboarding@resend.dev>",
//       to: process.env.ADMIN_EMAIL,
//       subject: "💼 New Quote Request",
//       html: `
//         <h2>💼 New Quote Request</h2>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Company:</b> ${company || "N/A"}</p>
//         <p><b>Product:</b> ${product}</p>
//       `,
//     });

//     await resend.emails.send({
//       from: "RealTech <onboarding@resend.dev>",
//       to: email,
//       subject: "✅ Quote Request Received",
//       html: `
//         <h2>Hello ${name},</h2>
//         <p>Thank you for requesting a quote for <b>${product}</b>.</p>
//         <p>Our team at <b>RealTech Pvt Ltd</b> will contact you shortly.</p>
//         <br/>
//         <p>Best regards,<br/>RealTech Pvt Ltd Team</p>
//       `,
//     });

//     res.status(200).json({ message: "Quote email sent successfully!" });
//   } catch (error) {
//     console.error("❌ Error sending quote email:", error);
//     res.status(500).json({ error: "Failed to send quote email" });
//   }
// });

// /* ------------------- PRODUCT SCHEMA + CRUD ROUTES ------------------- */

// const productSchema = new mongoose.Schema(
//   {
//     productId: { type: String, required: true, unique: true },
//     title: { type: String, required: true },
//     category: { type: String, required: true },
//     description: { type: String },
//     image: { type: String }, // Cloudinary image URL
//   },
//   { collection: "product" }
// );

// const Product = mongoose.model("Product", productSchema);

// // ✅ Upload route for product images (Cloudinary)
// app.post("/api/upload", upload.single("image"), (req, res) => {
//   try {
//     res.json({ imageUrl: req.file.path }); // Cloudinary gives HTTPS link
//   } catch (error) {
//     console.error("❌ Cloudinary upload failed:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// // ✅ Get all products
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: "❌ Failed to fetch products" });
//   }
// });

// // ✅ Get single product
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ error: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: "❌ Failed to fetch product" });
//   }
// });

// // ✅ Add new product
// app.post("/api/products", async (req, res) => {
//   try {
//     const { productId, title, category, description, image } = req.body;
//     if (!productId || !title || !category) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newProduct = new Product({ productId, title, category, description, image });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error("❌ Failed to add product:", error);
//     res.status(500).json({ error: "❌ Failed to add product" });
//   }
// });

// // ✅ Update product
// app.put("/api/products/:id", async (req, res) => {
//   try {
//     const { title, category, description, image } = req.body;
//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       { title, category, description, image },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (error) {
//     console.error("❌ Failed to update product:", error);
//     res.status(500).json({ error: "❌ Failed to update product" });
//   }
// });

// // ✅ Delete product
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "✅ Product deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "❌ Failed to delete product" });
//   }
// });

// /* ------------------- START SERVER ------------------- */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// });






//The above one is imp and previos change...do not delete it


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import mongoose from "mongoose";
import tls from "tls";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

tls.DEFAULT_MIN_VERSION = "TLSv1.2";
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ CORS Configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
      process.env.ADMIN_URL || "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Resend setup
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ------------------- CLOUDINARY (Image Upload Setup) ------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "realtech-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

/* ------------------- SCHEMAS ------------------- */

// 📦 Product Schema (✅ updated with price)
const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    image: String, // Cloudinary image URL
    price: { type: Number, required: false, default: 0 }, // ✅ Added price field
  },
  { collection: "product" }
);
const Product = mongoose.model("Product", productSchema);

// 📧 Email Schema
const emailSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    phone: String,
    productName: String,
    country: String,
    state: String,
    company: String,
    type: { type: String, enum: ["contact", "quote"], default: "contact" },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "emails" }
);
const Email = mongoose.model("Email", emailSchema);

/* ------------------- MAIL ROUTES ------------------- */

// 📩 Contact Form
app.post("/api/send-contact-email", async (req, res) => {
  const { name, surname, email, phone, productName, country, state } = req.body;

  try {
    // Email to admin
    await resend.emails.send({
      from: "RealTech <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Form Submission",
      html: `
        <h2>📩 New Contact Request</h2>
        <p><b>Name:</b> ${name} ${surname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Country:</b> ${country}</p>
        <p><b>State:</b> ${state}</p>
        <p><b>Product:</b> ${productName}</p>
      `,
    });

    // Auto reply to user
    await resend.emails.send({
      from: "RealTech <onboarding@resend.dev>",
      to: email,
      subject: "✅ We received your request!",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting <b>RealTech Pvt Ltd</b>.</p>
        <p>We have received your request regarding <b>${productName}</b>.</p>
        <p>Our team will get back to you shortly.</p>
        <br/>
        <p>Best regards,<br/>RealTech Pvt Ltd Team</p>
      `,
    });

    // ✅ Save to MongoDB
    await new Email({
      name,
      surname,
      email,
      phone,
      productName,
      country,
      state,
      type: "contact",
    }).save();

    res.status(200).json({ message: "Contact email sent & saved!" });
  } catch (error) {
    console.error("❌ Error sending contact email:", error);
    res.status(500).json({ error: "Failed to send contact email" });
  }
});

// 💼 Quote Request
app.post("/api/send-quote-email", async (req, res) => {
  const { name, email, phone, company, product } = req.body;

  try {
    // Send to admin
    await resend.emails.send({
      from: "RealTech <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "💼 New Quote Request",
      html: `
        <h2>💼 New Quote Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company || "N/A"}</p>
        <p><b>Product:</b> ${product}</p>
      `,
    });

    // Auto-reply to user
    await resend.emails.send({
      from: "RealTech <onboarding@resend.dev>",
      to: email,
      subject: "✅ Quote Request Received",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for requesting a quote for <b>${product}</b>.</p>
        <p>Our team at <b>RealTech Pvt Ltd</b> will contact you shortly.</p>
        <br/>
        <p>Best regards,<br/>RealTech Pvt Ltd Team</p>
      `,
    });

    // ✅ Save to MongoDB
    await new Email({
      name,
      email,
      phone,
      company,
      productName: product,
      type: "quote",
    }).save();

    res.status(200).json({ message: "Quote email sent & saved!" });
  } catch (error) {
    console.error("❌ Error sending quote email:", error);
    res.status(500).json({ error: "Failed to send quote email" });
  }
});

/* ------------------- EMAIL MANAGEMENT ROUTES ------------------- */

app.get("/api/emails", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

app.get("/api/emails/unread", async (req, res) => {
  try {
    const count = await Email.countDocuments({ isRead: false });
    res.json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch unread count" });
  }
});

app.put("/api/emails/:id/read", async (req, res) => {
  try {
    await Email.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: "Email marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark email as read" });
  }
});

/* ------------------- PRODUCT ROUTES ------------------- */

// ✅ Upload image (Cloudinary)
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ Get all products (with price)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    const formatted = products.map((p) => ({
      _id: p._id,
      productId: p.productId,
      title: p.title,
      category: p.category,
      description: p.description,
      image: p.image,
      price: p.price || 0, // ✅ Include price safely
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Universal Product Fetch
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product =
      (await Product.findById(id)) || (await Product.findOne({ productId: id }));
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ✅ Add new product (with price)
app.post("/api/products", async (req, res) => {
  try {
    const { productId, title, category, description, image, price } = req.body;
    const newProduct = new Product({ productId, title, category, description, image, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// ✅ Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ✅ Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

/* ------------------- START SERVER ------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});








/* ------------------- GALLERY SCHEMA ------------------- */

const gallerySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["photo", "video", "event"], required: true },
    
    // For photos
    imageUrl: { type: String },

    // For videos
    videoUrl: { type: String },

    // For events
    title: { type: String },
    description: { type: String },

    // Common
    category: { type: String, default: "general" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "gallery" }
);

const Gallery = mongoose.model("Gallery", gallerySchema);




/* ------------------- GALLERY ROUTES ------------------- */

// Upload image for gallery (Cloudinary)
app.post("/api/gallery/upload", upload.single("image"), (req, res) => {
  try {
    res.json({ imageUrl: req.file.path });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// GET all gallery items
app.get("/api/gallery", async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

// ADD gallery item (photo/video/event)
app.post("/api/gallery", async (req, res) => {
  try {
    const newItem = new Gallery(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add gallery item" });
  }
});

// UPDATE gallery item
app.put("/api/gallery/:id", async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update gallery item" });
  }
});

// DELETE gallery item
app.delete("/api/gallery/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});
