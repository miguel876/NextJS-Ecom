# Migstore

Migstore is an ecommerce website template created with NextJS and ShadCN.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Stripe](#stripe)
- [License](#license)

## Features

- Product listing with pagination and filters by URL so it can be easily shared.
- Modern design using ShadCN components.
- Contact form using the React Resend library.
- Stripe integration for payment processing and checkout.
- Basic user sign in with Google and theme switch.
- Responsive design.

## Technologies

- [NextJS](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [ShadCN](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Neon DB](https://neon.tech/)
- [Resend](https://react.email/docs/introduction)

## Deployment

This project is deployed on [Vercel](https://vercel.com/). It also uses Github actions for CI/CD. You can view the live application at [https://next-js-ecom-neon.vercel.app/](https://next-js-ecom-neon.vercel.app/).

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo-name
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:

   Create a `.env.local` file in the root of your project and add the following variables:

   ```plaintext
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_public_key
   STRIPE_SECRET_KEY=your_secret_key
   RESEND_KEY=your_resend_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

## Usage

To start the development server, run:

```bash
npm run dev
# or
yarn start
```

## Stripe

In order to conclude a purchase using stripe, please use the following card data for test mode:

- Card Number: 4242 4242 4242 4242
- Date: 12/34
- CCV 123

## License

[MIT](https://choosealicense.com/licenses/mit/)
