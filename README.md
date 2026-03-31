# Smart Chicken Shop 🍗

A full-stack digital platform for selling fresh chicken, meat products, and ready-to-cook items with online ordering and delivery.

## Architecture

- **MCP Server** - Central orchestration layer with tool-based architecture
- **Microservices Backend** - Auth, Product, Order, Delivery, Payment services
- **Next.js Web App** - Responsive modern UI with Tailwind CSS
- **React Native Mobile App** - Cross-platform iOS & Android app

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Start all services
npm run dev:all

# Or start individually
npm run dev:web      # Next.js web app (port 3000)
npm run dev:mcp      # MCP server (port 4000)
npm run dev:auth     # Auth service (port 5001)
npm run dev:product  # Product service (port 5002)
npm run dev:order    # Order service (port 5003)
npm run dev:delivery # Delivery service (port 5004)
npm run dev:payment  # Payment service (port 5005)
```

## Environment Variables

Copy `.env.example` to `.env` in each service directory and configure accordingly.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Web | Next.js + Tailwind CSS |
| Mobile App | React Native (Expo) |
| Backend | Node.js + Express.js |
| Orchestration | MCP Server |
| Database | MongoDB |
| Cache | Redis |
| Auth | JWT + OTP + Google OAuth |
| Payments | Razorpay |
