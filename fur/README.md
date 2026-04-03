

# 🛋️ FurnitureHub - Full Stack E-Commerce Platform

<img width="1918" height="829" alt="Screenshot 2026-04-03 102136" src="https://github.com/user-attachments/assets/8d3f550b-857f-4c1d-a3f5-287267c2dd46" />


## Introduction
**FurnitureHub** is a premium, full-stack e-commerce solution designed to provide a modern and seamless furniture shopping experience. Built using the **MERN stack**, this platform allows users to browse high-quality furniture collections, manage a dynamic shopping cart, and complete purchases through a secure payment gateway. It features a sophisticated User Frontend for shoppers and a powerful Admin Panel for inventory and order management.

## Problem Statement
Traditional furniture shopping often involves visiting multiple physical showrooms or dealing with outdated, non-responsive websites that lack real-time stock updates. Consumers frequently face challenges with fragmented ordering processes and a lack of transparency regarding order status. For business owners, managing a diverse inventory across different categories (Living Room, Bedroom, Office) without a centralized digital system leads to operational inefficiencies.

## Proposed Solution
The proposed solution is a centralized, high-performance web application that digitizes the entire furniture procurement lifecycle. By leveraging **React.js** for a fluid UI and **Node.js/Express** for a robust backend, the system ensures real-time data synchronization. The integration of **Stripe** provides a reliable payment infrastructure, while a dedicated **Admin Dashboard** empowers owners to manage their product catalog and track deliveries efficiently.

## Objectives
* **Secure User Onboarding:** Enable users to create accounts and login securely using encrypted credentials and Google OAuth.
* **Dynamic Product Discovery:** Implement category-based filtering and search functionality for diverse furniture items.
* **Persistent Shopping Cart:** Allow users to add, remove, and update furniture quantities within a seamless cart interface.
* **Transaction Integrity:** Ensure safe and PCI-compliant online payments using the Stripe API.
* **Order Lifecycle Management:** Provide real-time status updates (Processing, Shipped, Delivered) for both customers and admins.

## Scope
* **Customer Web App:** Features a landing page, product gallery, detailed item views, and a secure checkout flow.
* **Admin Management Portal:** A secure area for administrators to perform CRUD operations on furniture items and update global order statuses.
* **Backend Server:** A RESTful API to handle business logic, authentication, and communication between the database and the UI.
* **Database Schema:** A structured MongoDB database to store user profiles, product metadata, and transaction histories.

## Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens), Bcrypt.js |
| **Payment Gateway** | Stripe API |


## Project Management Tools
* **Version Control:** Git & GitHub for source code management and collaborative development.
* **API Development:** Postman for testing and documenting RESTful endpoints.
* **Planning & Tracking:** GitHub Projects for sprint planning and feature tracking.
* **Environment Management:** Dotenv for securing API keys and database URI strings.

## Security Plan
* **Credential Hashing:** Utilizing **Bcrypt.js** to hash user passwords before storage, ensuring data privacy in the event of a breach.
* **Token-Based Authorization:** Implementing **JWT** to secure private routes and prevent unauthorized access to the Admin Panel.
* **Secure Checkout:** Leveraging Stripe’s hosted payment pages to ensure no sensitive credit card data is processed or stored on our local server.
* **Middleware Protection:** Configuring CORS (Cross-Origin Resource Sharing) and Helmet.js to protect the API from common web vulnerabilities.
* **Data Validation:** Implementing server-side sanitization to prevent NoSQL injection and Cross-Site Scripting (XSS) attacks.

---

