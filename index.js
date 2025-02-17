const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./schema');

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://nandhinims76:Nandhu_2004@cluster4.yxntz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// POST /menu: Create a new menu item
app.post('/menu', async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json({ message: 'Menu item created successfully', data: savedMenuItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error: error.message });
  }
});

// GET /menu: Fetch the entire list of menu items
app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json({message:"data retrieved",data:menuItems});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));