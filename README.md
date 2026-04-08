

# 🛋️ New Sisira Furniture Shop - Full Stack E-Commerce Platform

<img width="1918" height="829" alt="Screenshot 2026-04-03 102136" src="https://github.com/user-attachments/assets/8d3f550b-857f-4c1d-a3f5-287267c2dd46" />

---

## 1. Introduction
The **New Sisira Furniture E-commerce Platform** is a premium, full-stack digital solution designed to provide a modern and seamless furniture shopping experience. Built using the **MERN stack**, this platform allows customers to browse the shop's high-quality collections, manage a dynamic shopping cart, and complete purchases through a secure payment gateway. It features a sophisticated User Frontend for shoppers and a powerful Admin Panel for New Sisira staff to handle inventory and order management.

## 2. Problem Statement
Traditional furniture shopping at **New Sisira Furniture** currently relies on physical showroom visits or manual inquiries, which can be restrictive for modern consumers. 
* **Accessibility:** Customers lack a way to view the full inventory or check stock availability in real-time without visiting the shop.
* **Operational Inefficiency:** Managing a diverse inventory across different categories (Living Room, Bedroom, Office) without a centralized digital system leads to manual errors and fragmented record-keeping.
* **Order Transparency:** There is currently no automated way for customers to track their order status from payment to delivery.

## 3. Proposed Solution
The proposed solution is a centralized, high-performance web application that digitizes the entire furniture procurement lifecycle for **New Sisira Furniture**. By leveraging **React.js** for a fluid UI and **Node.js/Express** for a robust backend, the system ensures real-time data synchronization. The integration of **Stripe** provides a reliable payment infrastructure, while a dedicated **Admin Dashboard** empowers the owners to manage their product catalog and track deliveries efficiently.

## 4. Objectives
* **Secure User Onboarding:** Enable users to create accounts and login securely using encrypted credentials and Google OAuth.
* **Dynamic Product Discovery:** Implement category-based filtering (e.g., Teak, Mahogany, Office) and search functionality.
* **Persistent Shopping Cart:** Allow users to add, remove, and update furniture quantities within a seamless interface.
* **Transaction Integrity:** Ensure safe and PCI-compliant online payments using the Stripe API.
* **Order Lifecycle Management:** Provide real-time status updates (Processing, Shipped, Delivered) for both customers and admins.

## 5. Scope
* **Customer Web App:** Branded landing page, product gallery, detailed item views, and a secure checkout flow tailored to New Sisira’s inventory.
* **Admin Management Portal:** A secure area for the New Sisira team to perform CRUD operations on furniture items and update global order statuses.
* **Backend Server:** A RESTful API to handle business logic, authentication, and communication between the database and the UI.
* **Database Schema:** A structured MongoDB database to store user profiles, product metadata, and transaction histories.

---

## 6. Technical Specifications

### Technology Stack
| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens), Bcrypt.js |
| **Payment Gateway** | Stripe API |

### Project Management Tools
* **Version Control:** Git & GitHub for source code management.
* **API Development:** Postman for testing and documenting RESTful endpoints.
* **Environment Management:** Dotenv for securing private API keys and database strings.

---

## 7. Security Plan
* **Credential Hashing:** Utilizing **Bcrypt.js** to hash user passwords before storage.
* **Token-Based Authorization:** Implementing **JWT** to secure private routes and protect the Admin Panel from unauthorized access.
* **Secure Checkout:** Leveraging Stripe’s hosted payment pages to ensure no sensitive credit card data is stored on local servers.
* **Middleware Protection:** Configuring CORS and **Helmet.js** to protect the API from common web vulnerabilities.
* **Data Validation:** Implementing server-side sanitization to prevent NoSQL injection and Cross-Site Scripting (XSS) attacks.
