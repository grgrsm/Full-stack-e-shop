
# E-Commerce Clothing Store

A modern, full-stack e-commerce web application for a clothing store, built using a highly scalable and robust architecture. The project features a dynamic frontend interface, high-performance styling, secure authentication, and a structured backend API.

## Features

* **Responsive UI/UX:** Optimized for mobile, tablet, and desktop viewports.
* **Product Catalog:** Advanced filtering (by size, color, brand, price range) and sorting functionality.
* **Shopping Cart & Checkout:** Seamless item management (add, update, remove) with persistent cart states and an intuitive checkout flow.
* **User Authentication:** Secure JWT-based registration, login, and session persistence.
* **Interactive Dashboard:** Interactive charts and metrics tracking sales, top products, and user activity.
* **Admin Panel:** Role-based access control for managing products, categories, inventory, and tracking order statuses.
* **Visual Assets:** Rich dynamic layouts tailored for retail and fashion showcasing.

---

## Tech Stack

### Frontend

* **Core:** React 18+ (Functional Components & Hooks)
* **Language:** TypeScript (Strict type checking)
* **Styling:** Tailwind CSS (Utility-first, responsive design framework)
* **State Management:** Context API / Redux Toolkit *(choose your option)*

### Backend

* **Framework:** NestJS (Progressive Node.js framework)
* **Language:** TypeScript
* **Database:** PostgreSQL / MongoDB *(choose your option)* using TypeORM / Prisma

---

## Architecture

The project is split into two main decoupled modules:

1. **`/frontend`**: The user interface, client-side routing, global state, and UI components built with React and Tailwind CSS.
2. **`/backend`**: The RESTful API built with NestJS, following a modular architecture (`AppModule`, `AuthModule`, `ProductsModule`, `OrdersModule`).

---

## Getting Started

### Prerequisites

* Node.js (v18.x or higher)
* npm or yarn
* Database instance (PostgreSQL/MongoDB)

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/grgrsm/Full-stack-e-shop.git
cd Full-stack-e-shop

# Setup Frontend
yarn install
yarn run dev

# Setup Backend
cd ../backend
yarn install
# Configure your .env file with database credentials and JWT secret
yarn run start:dev

```

---

## Future Roadmap / TODOs

* [ ] Integrate Stripe/PayPal payment gateways.
* [ ] Implement advanced analytics widgets for the vendor dashboard.
* [ ] Add automated visual verification workflows for inventory management.
* [ ] Set up full CI/CD pipeline deployment.

---

## 📝 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
