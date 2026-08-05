# 🛍️ eCommerce App

A full-stack e-commerce web application built with **React + TypeScript** on the frontend and **Node.js + Express + MongoDB** on the backend. Includes product browsing, cart & checkout, order management, user authentication with JWT refresh tokens, and an admin panel for managing products, categories, and orders.

**🔗 Live Demo:** [e-commerce-app-ten-kohl.vercel.app](https://e-commerce-app-ten-kohl.vercel.app/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Data Models](#-data-models)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)

---

## ✨ Features

### For customers
- Browse products by category with search & filters
- Product details page with variants (size / color) and stock awareness
- Shopping cart and multi-step checkout flow
- Order history and order details tracking
- User registration, login, and profile management (with profile picture upload)
- Contact / support message form

### Admin capabilities (API-level)
- Role-based access control (`user` / `admin`)
- Endpoints to create, update, and delete products and categories (with image upload via Cloudinary)
- Endpoints to view all orders, order status counters, and update payment/delivery status

> ⚠️ These are currently backend endpoints only — there is **no admin dashboard UI** yet. See [Roadmap](#-roadmap) below.

### Platform
- JWT-based authentication with short-lived access tokens and automatic refresh via HTTP-only cookies
- Image uploads and hosting through Cloudinary
- Auto-incrementing, human-friendly order numbers
- CORS configured for local development and Vercel preview/production deployments

---

## 🧱 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Redux Toolkit, TanStack Query, React Router, Tailwind CSS, React Hook Form, Axios, SweetAlert2, Framer Motion (`motion`) |
| **Backend** | Node.js, Express 5, MongoDB with Mongoose |
| **Auth** | JSON Web Tokens (access + refresh), bcrypt password hashing, HTTP-only cookies |
| **File Storage** | Cloudinary + Multer |
| **Deployment** | Vercel (both client and server) |

---

## 📁 Project Structure

```
eCommerce-App/
├── client/                     # React + TypeScript frontend (Vite)
│   └── src/
│       ├── api/                # Axios instance & interceptors (token refresh)
│       ├── components/         # Reusable UI components
│       ├── Hooks/               # Custom hooks (React Query wrappers)
│       ├── Layouts/             # Auth & main app layouts
│       ├── pages/               # Route-level pages (Home, Shop, Cart, Checkout...)
│       ├── protectedRoutes/     # Route guards (auth / admin)
│       ├── Services/            # API service functions
│       ├── store/               # Redux store & slices
│       ├── utils/               # Types, helpers, constants
│       └── Routes.tsx           # App route definitions
│
├── server/                     # Express + MongoDB backend
│   └── src/
│       ├── config/              # DB connection & Cloudinary config
│       ├── controllers/         # Route handlers (Categories, Products, Orders, User, Contact)
│       ├── middlewares/         # Auth & admin guards
│       ├── models/              # Mongoose schemas (User, Product, Category, Order, Contact)
│       ├── Routers/             # Express routers
│       └── utils/               # SKU generator, sequence counter, shipping, payment simulation
│   └── app.mjs                  # Express app entry point
│
└── package.json                 # Root scripts (runs client & server concurrently)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/Rawaa-Ahmed-dotcom/eCommerce-App.git
cd eCommerce-App
```

### 2. Install dependencies

```bash
# Root (for the concurrently dev script)
npm install

# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 3. Configure environment variables

Create a `.env` file inside `server/` (see [Environment Variables](#-environment-variables) below), and optionally a `.env` inside `client/` to override the API base URL.

### 4. Run the app in development

From the project root:

```bash
npm run dev
```

This runs the client (Vite dev server) and the server (with `nodemon`) concurrently.

Or run them separately:

```bash
# Terminal 1 — backend
cd server
npm run server

# Terminal 2 — frontend
cd client
npm run client
```

The client will be available at `http://localhost:5173` and the API at `http://localhost:5000` by default.

### 5. Build for production

```bash
cd client
npm run build
```

---

## 🔑 Environment Variables

### `server/.env`

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign short-lived access tokens |
| `JWT_REFRESH_SECRET` | Secret used to sign long-lived refresh tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PORT` | Port for local development (defaults to `5000`) |
| `NODE_ENV` | `development` / `production` |

### `client/.env` (optional)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the API (e.g. `http://localhost:5000/api`) |

---

## 📡 API Reference

Base URL: `/api`

### Auth — `/api/auth`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login and receive access token + refresh cookie | Public |
| GET | `/refresh` | Refresh the access token | Public (cookie) |
| GET | `/logout` | Logout and clear refresh cookie | Public |
| GET | `/profile` | Get current user's profile | 🔒 User |
| PATCH | `/profile` | Update profile info | 🔒 User |
| PATCH | `/profile-picture` | Upload/update profile picture | 🔒 User |
| PATCH | `/change-password` | Change account password | 🔒 User |
| DELETE | `/profile` | Delete account | 🔒 User |

### Products — `/api/products`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | List all products | Public |
| GET | `/:slug` | Get a single product by slug | Public |
| POST | `/` | Create a product (with image uploads) | 🔒 Admin* |

### Categories — `/api/categories`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | List all categories | Public |
| GET | `/:slug` | Get a single category | Public |
| POST | `/` | Create a category (with image upload) | 🔒 Admin* |
| PATCH | `/:slug` | Update a category | 🔒 Admin* |
| DELETE | `/:slug` | Delete a category | 🔒 Admin* |

### Orders — `/api/orders`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/` | Create a new order | 🔒 User |
| GET | `/myorders` | Get the current user's orders | 🔒 User |
| GET | `/status-counts` | Get order counts grouped by status | 🔒 User |
| GET | `/:id` | Get a single order by ID | 🔒 User |
| GET | `/` | Get all orders | 🔒 Admin |
| PUT | `/:id/deliver` | Mark an order as delivered | 🔒 Admin |
| PUT | `/:id/pay` | Mark an order as paid | 🔒 Admin |

### Contact — `/api/contact`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/` | Send a contact/support message | 🔒 User |

> \* Product/category write routes currently mount `upload` middleware without the `adminMiddleware` guard in the router — verify this before deploying to production if admin-only writes are required.

---

## 🗄️ Data Models

- **User** — username, email, hashed password, role (`user`/`admin`), profile image, phone
- **Product** — title, slug, SKU, description, category ref, price/sale price, currency, gender, variants (size/color/stock), images, ratings, tags, status
- **Category** — title, slug, description, image
- **Order** — order number (auto-incremented), user ref, contact info, order items, shipping address, payment method, prices, paid/delivery status
- **Contact** — support messages linked to users

---

## ☁️ Deployment

Both the client and server are deployed on **Vercel**:
- **Frontend:** Vite build deployed as a static Vercel app
- **Backend:** Express app deployed as a Vercel serverless function (see `server/vercel.json`)

CORS on the server allows `localhost:5173` for local development and any `*.vercel.app` origin for previews/production.

---

## 🗺️ Roadmap

- [ ] **Admin Dashboard UI** — a dedicated frontend for admins to manage products, categories, and orders using the existing admin API endpoints
- [ ] Enforce `adminMiddleware` consistently on all product/category write routes

---

## 📄 License

ISC
