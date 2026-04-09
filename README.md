# The Barbeque Company

A full-stack commercial website architected to streamline online business operations. This platform features secure payment processing, an automated customer messaging system, and a Headless CMS backend for seamless content management.

## ✨ Key Features

- **Secure Checkout & Payments:** Integrated with `Paytm` for fast, secure, and reliable transaction processing.
- **Automated Messaging:** Event-driven automated messaging to keep customers updated on their orders and inquiries in real-time.
- **Headless CMS Architecture:** Powered by `Strapi` to decouple the frontend from the backend, allowing non-technical administrators to easily update menus, content, and media.
- **Production-Ready DevOps:** Fully optimized hosting architecture with custom DNS routing, managed database infrastructure, and robust server configurations to ensure high availability.
- **Responsive UI:** Built with modern styling frameworks to ensure a flawless experience across all mobile and desktop devices.

## 🛠️ Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend & Content:** Node.js, Strapi
* **Integrations:** Paytm Payment Gateway, Pabbly Automated Messaging

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and your preferred package manager installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/pranansh-s/bbq-backup.git](https://github.com/pranansh-s/bbq-backup.git)
   cd bbq-backup
   ```

2. **Install dependencies:**
  ```bash
  npm install # or
  yarn install
  ```

3. **Environment Variables:**
  Create a .env.local file in the root directory and add the required API keys and database URIs.
  ```bash
  NEXT_PUBLIC_PAYMENT_KEY=your_key_here
  CMS_API_ENDPOINT=your_endpoint_here
  DATABASE_URL=your_db_uri
  MESSAGING_API_KEY=your_messaging_key
  ```

4. **Run the development server:**
  ```bash
  npm run dev # or
  yarn dev
  ```

Open http://localhost:3000 with your browser to see the result.
