import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Adjust as needed
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
}));

app.use(express.json());

// Serve static files from uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Image storage using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads', 'images');
        // Create directory if it doesn't exist
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Schema for creating products
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    new_price: {
        type: Number
    },
    available: {
        type: Boolean,
        default: true
    }
});

const Product = mongoose.model('Product', productSchema);

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);


// Add FrontendUser Schema
const frontendUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
    // Add any additional fields if necessary
});

const FrontendUser = mongoose.model('FrontendUser', frontendUserSchema);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// --- Authentication Endpoints ---

// User registration endpoint
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await FrontendUser.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username or email already exists' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create new user
        const newUser = new FrontendUser({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({ success: true, token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET || 'your-secret-key', 
        { expiresIn: '1h' }
      );
  
      res.json({ success: true, token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });


// User login endpoint using email
app.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await FrontendUser.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({ success: true, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Verify session endpoint
app.get('/verify-session', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.json({ authenticated: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        res.json({ authenticated: true });
    } catch (error) {
        res.json({ authenticated: false });
    }
});

// --- Product Management Endpoints ---

// Add Product Endpoint
app.post('/addproduct', upload.single('image'), async (req, res) => {
    try {
        const { name, category, old_price, new_price, available } = req.body;
        const imageFileName = req.file.filename;
        // Generate full image URL
        const imageUrl = `http://localhost:${PORT}/uploads/images/${imageFileName}`;
        
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const newProduct = new Product({
            id: newId,
            name: String(name),
            category: String(category),
            old_price: Number(old_price),
            new_price: new_price ? Number(new_price) : null,
            available: true,
            image: imageUrl
        });

        await newProduct.save();
        res.json({ success: true, product: newProduct });
    } catch (err) {
        console.error('Error adding product:', err);
        res.json({ success: false, message: 'Failed to add product.' });
    }
});

// Remove Product Endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findOneAndDelete({ id });
        if (product) {
            // Optionally remove the image file
            const imagePath = path.join(__dirname, 'uploads', 'images', path.basename(product.image));
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image:', err);
            });
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Product not found.' });
        }
    } catch (err) {
        console.error('Error removing product:', err);
        res.json({ success: false, message: 'Failed to remove product.' });
    }
});

// Get All Products Endpoint
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Error fetching products.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});