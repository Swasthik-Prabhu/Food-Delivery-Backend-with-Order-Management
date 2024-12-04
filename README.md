# Food Delivery Backend with Order Management

## Overview
This project is a backend for a food delivery system built using Node.js and Express. It includes features for managing the restaurant's menu, handling customer orders, and updating order statuses automatically every minute. The backend is capable of adding menu items, placing orders, and tracking order statuses with automatic updates.

## Features
- Add Menu Items: Add new items to the restaurant's menu with metadata (name, price, category).
- Place Orders: Place orders by selecting menu items and tracking the status of the order.
- Order Status Updates: Order status transitions automatically from "Preparing" to "Out for Delivery" and finally "Delivered" every minute using cron jobs.

## Endpoints

### 1. POST /menu
Add a new menu item to the restaurant.

**Request Body**:
```json
{
  "name": "Paneer Butter Masala",
  "price": 12.5,
  "category": "Main Course"
}



{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Paneer Butter Masala",
    "price": 12.5,
    "category": "Main Course"
  }
}

### 2.GET /menu
Get a list of all items

Response :
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Paneer Butter Masala",
      "price": 12.5,
      "category": "Main Course"
    }
  ]
}
3. POST /orders
Place a new order with selected menu items.

Request Body :
{
  "items": [1, 2]
}
Response :
{
  "status": "success",
  "data": {
    "id": "random-id",
    "items": [1, 2],
    "status": "Preparing",
    "createdAt": "2024-12-04T10:00:00.000Z"
  }
}

4.GET /orders/id
Get a details of an order by id

GET http://localhost:5000/orders/1

Response :
{
  "status": "success",
  "data": {
    "id": "random-id",
    "items": [1, 2],
    "status": "Preparing",
    "createdAt": "2024-12-04T10:00:00.000Z"
  }
}

Requirements :

Node.js
Express.js
Body-Parser for handling JSON requests
node-cron for scheduling order status updates

How to Run the Application

1. Clone the Repository
clone the reposritory to your local machine

git clone https://github.com/Swasthik-Prabhu/Food-Delivery-Backend-with-Order-Management.git

2.Install Dependencies

cd Food-Delivery-Backend-with-Order-Management
npm install


3.Start the Server
Start the Express server

npm start
The server will be running on http://localhost:5000.

Testing with Postman

1.Add a menu item(POST /menu)
  Open Postman and select the POST method.
  Enter the URL: http://localhost:5000/menu.
  Set the Body to raw and choose JSON format.
  Add a JSON payload like this:
{
  "name": "Paneer Butter Masala",
  "price": 12.5,
  "category": "Main Course"
}
5.Hit Send to create the menu item. You should receive a response with the item details.

2.Place an order (POST /orders)
  Open Postman and select the POST method.
  Enter the URL: http://localhost:5000/orders.
  Set the Body to raw and choose JSON format.
  Add a JSON payload like this:
{
  "items": [1, 2]
}

Hit Send to place the order. You should receive a response with the order details.

3.Get the order details (GET /orders/id)

  Open Postman and select the GET method.
  Enter the URL: http://localhost:5000/orders/1 (replace 1 with the desired order ID).
  Hit Send to retrieve the order details.

Cron Jobs
The order status will be automatically updated every minute using the following cron schedule:
  Preparing → Out for Delivery → Delivered
This update is handled by the node-cron module running on the server. Each order status will transition every minute based on its current status.

Technologies used

Node.js: JavaScript runtime for server-side code.
Express.js: Web framework to handle API requests.
Body-Parser: Middleware to parse incoming request bodies.
node-cron: To schedule tasks (e.g., order status updates).

License

This project is open-source and available for use, modification, and distribution by anyone. It is not explicitly licensed, but feel free to use it under the terms of the MIT License or any other open-source license of your choice.

This version keeps everything in a simple, easy-to-read format without bold text. Let me know if you need further adjustments!

