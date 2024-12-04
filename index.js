const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

const menuItems = [];
const orders = [];
const orderStatusQueue = [];
const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];
const generateId = () => Math.random().toString(36).substring(2, 10);

app.get('/', (req, res) => {
    res.send('Welcome to the  Udupi Restuarant ');
});


let nextMenuId = 1; 

app.post('/menu', (req, res) => {
    const { name, price, category } = req.body;
    if (!name || price == null || !category) {
        return res.status(400).json({ status: 'error', error: 'Missing required fields' });
    }
    if (price <= 0) {
        return res.status(400).json({ status: 'error', error: 'Price must be positive' });
    }
    if (!categories.includes(category)) {
        return res.status(400).json({ status: 'error', error: `Invalid category. Must be one of: ${categories.join(', ')}` });
    }
    const existingItem = menuItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.price = price;
        existingItem.category = category;
        return res.json({ status: 'success', data: existingItem });
    }
  
    const newItem = { id: nextMenuId++, name, price, category };
    menuItems.push(newItem);
    res.status(201).json({ status: 'success', data: newItem });
});





app.get('/menu', (req, res) => {
    res.json({ status: 'success', data: menuItems });
});

app.post('/orders', (req, res) => {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ status: 'error', error: 'Order must include at least one menu item ID' });
    }
    const invalidItems = items.filter(id => !menuItems.find(item => item.id === id));
    if (invalidItems.length > 0) {
        return res.status(400).json({ status: 'error', error: `Invalid menu item IDs: ${invalidItems.join(', ')}` });
    }
    const newOrder = {
        id: generateId(),
        items,
        status: 'Preparing',
        createdAt: new Date()
    };
    orders.push(newOrder);
    orderStatusQueue.push(newOrder.id);
    res.status(201).json({ status: 'success', data: newOrder });
});

app.get('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id, 10); 
    if (isNaN(orderId)) {
        return res.status(400).json({ status: 'error', error: 'Invalid order ID format' });
    }

    const order = orders.find(order => order.id === orderId); 
    if (!order) {
        return res.status(404).json({ status: 'error', error: 'Order not found' });
    }

    res.json({ status: 'success', data: order });
});


cron.schedule('*/1 * * * *', () => {
    for (let i = 0; i < orderStatusQueue.length; i++) {
        const orderId = orderStatusQueue[i];
        const order = orders.find(order => order.id === orderId);
        if (order) {
            if (order.status === 'Preparing') {
                order.status = 'Out for Delivery';
            } else if (order.status === 'Out for Delivery') {
                order.status = 'Delivered';
                orderStatusQueue.splice(i, 1);
                i--;
            }
        }
    }
    console.log('Order statuses updated');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Food Delivery Backend running on port ${PORT}`);
});
