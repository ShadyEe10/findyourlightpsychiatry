# Find Your Light Psychiatry PLLC

> **Compassionate, Evidence-Based Care for Mind, Body, and Soul**

A modern, full-stack website for Find Your Light Psychiatry PLLC, a psychiatric practice led by April Casselman, PMHNP-BC, providing comprehensive mental health services throughout Washington State.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [SEO & Performance](#seo--performance)
- [License](#license)

---

## 🌟 Overview

Find Your Light Psychiatry's website is a production-ready, HIPAA-compliant web application designed to:

- **Educate** patients about psychiatric services and mental health resources
- **Connect** patients with April Casselman, PMHNP-BC through an intuitive contact form
- **Inform** about insurance options, payment plans, and appointment types
- **Showcase** specialized services including SPRAVATO® treatment, TMS therapy, ADHD testing, and more
- **Provide** mental health resources, crisis hotlines, and educational content

**Live Site:** [https://www.findyourlightpsychiatry.org](https://www.findyourlightpsychiatry.org)

---

## 📸 Screenshots (to add)

Place screenshots in `public/images/screenshots/` and update the README links below once captured:

- Home hero + services grid: `public/images/screenshots/home.png`
- Contact form with a validation message: `public/images/screenshots/contact.png`
- Services overlay section: `public/images/screenshots/services.png`
- SPRAVATO® hero/section: `public/images/screenshots/spravato.png`

(*You can capture these after the responsive pass and drop them in; the README can link to these paths directly.*)

---

## ✨ Features

### Core Functionality
- ✅ **Responsive Design** - Mobile-first, fully responsive across all devices
- ✅ **Contact Form** - Secure, validated appointment request system with email notifications
- ✅ **SEO Optimized** - Comprehensive meta tags, structured data, sitemap, and robots.txt
- ✅ **Accessibility** - WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- ✅ **Performance** - Optimized images, code splitting, and React 19 compiler
- ✅ **Security** - Rate limiting, CSRF protection, honeypot spam prevention, and security headers

### Pages
- **Home** - Practice overview, philosophy, and services highlight
- **About** - April Casselman's biography, education, and certifications
- **Services** - Comprehensive list of psychiatric services offered
- **SPRAVATO®** - Detailed information about esketamine treatment
- **Insurance & Payments** - Accepted insurance plans and private pay options
- **Contact** - Appointment request form with validation
- **Resources** - Crisis hotlines, mental health education, and self-care tools
- **Blog** - Mental health articles and insights

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16.0.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://react.dev/)** - UI library with React Compiler enabled
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Google Fonts](https://fonts.google.com/)** - Great Vibes (script) & Playfair Display (serif)

### Backend & APIs
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints
- **[Resend](https://resend.com/)** - Email delivery service for contact form

### Development & Testing
- **[Jest](https://jestjs.io/)** - Unit and integration testing
- **[React Testing Library](https://testing-library.com/react)** - Component testing
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Bundle size analysis

### Deployment & Hosting
- **[Vercel](https://vercel.com/)** (recommended) - Optimized for Next.js
- Supports any Node.js hosting platform

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **pnpm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShadyEe10/findyourlightpsychiatry.git
   cd findyourlightpsychiatry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your actual values (see [Environment Variables](#environment-variables) section).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

The application requires the following environment variables. Create a `.env.local` file in the root directory:

### Required Variables

```bash
# Resend Email API (required for contact form)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM="Find Your Light Psychiatry <noreply@findyourlightpsychiatry.org>"
CONTACT_EMAIL=april@findyourlightpsychiatry.org

# Site Configuration
NEXT_PUBLIC_BASE_URL=https://www.findyourlightpsychiatry.org
```

### Optional Variables

```bash
# Business Contact Information (with defaults)
NEXT_PUBLIC_PHONE_NUMBER=(425) 780-7460
NEXT_PUBLIC_PHONE_LINK=tel:+14257807460
NEXT_PUBLIC_CONTACT_EMAIL=contact@findyourlightpsychiatry.org
NEXT_PUBLIC_LOCATION=Seattle, Washington

# Pricing (with defaults)
NEXT_PUBLIC_PRICE_INITIAL=$325
NEXT_PUBLIC_PRICE_FOLLOWUP=$175
```

### Getting API Keys

- **Resend API Key**: Sign up at [resend.com](https://resend.com/) and create an API key
- **Email Domain**: Verify your domain in Resend to send emails from your domain

---

## 📁 Project Structure

```
findyourlightpsychiatry/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── api/contact/              # Contact form API route
│   ├── blog/                     # Blog page
│   ├── contact/                  # Contact page
│   ├── insurance-payments/       # Insurance & payments page
│   ├── resources/                # Mental health resources page
│   ├── services/                 # Services page
│   ├── spravato/                 # SPRAVATO® treatment page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Homepage
│   ├── robots.ts                 # Robots.txt configuration
│   └── sitemap.ts                # Sitemap configuration
├── components/                   # React components
│   ├── spravato/                 # SPRAVATO® page components
│   ├── BlogPostCard.tsx          # Blog post card component
│   ├── ContactForm.tsx           # Contact form with validation
│   ├── ErrorBoundary.tsx         # Error boundary component
│   ├── ErrorBoundaryWrapper.tsx  # Error boundary wrapper
│   ├── Footer.tsx                # Site footer
│   ├── Hero.tsx                  # Hero section component
│   ├── LoadingSkeleton.tsx       # Loading skeleton component
│   ├── Navbar.tsx                # Navigation bar
│   └── StructuredData.tsx        # JSON-LD structured data
├── data/                         # Static data
│   ├── blogPosts.ts              # Blog post data
│   └── resources.tsx             # Mental health resources data
├── lib/                          # Utility libraries
│   ├── config.ts                 # App configuration
│   ├── email.ts                  # Email sending logic
│   ├── logger.ts                 # Logging utility
│   └── rateLimit.ts              # Rate limiting for API routes
├── public/                       # Static assets
│   └── images/                   # Image assets
├── __tests__/                    # Jest unit tests
├── e2e/                          # Playwright E2E tests
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint configuration
├── jest.config.js                # Jest configuration
├── jest.setup.js                 # Jest setup file
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── playwright.config.ts          # Playwright configuration
├── README.md                     # This file
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Building
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run Jest unit tests
npm run test:watch   # Run Jest in watch mode
npm run test:e2e     # Run Playwright E2E tests

# Code Quality
npm run lint         # Run ESLint

# Analysis
npm run analyze      # Analyze bundle size
```

### Development Workflow

1. **Create a new branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test locally
   ```bash
   npm run dev
   npm run test
   npm run lint
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

---

## 🧪 Testing

### Unit Tests (Jest)

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npx playwright test --ui

# Run specific test file
npx playwright test e2e/homepage.spec.ts
```

### Test Coverage

- **Components**: Contact form, Navbar, Blog cards
- **Pages**: Homepage, Contact page, SPRAVATO® page
- **API Routes**: Contact form submission
- **E2E Flows**: Navigation, form submission, responsive design

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Import project to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add environment variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables from `.env.local`

4. **Deploy**
   - Vercel will automatically deploy on every push to `main`
   - Preview deployments are created for pull requests

### Deploy to Other Platforms

The site can be deployed to any platform that supports Node.js:

- **Netlify**: Use the Next.js plugin
- **AWS Amplify**: Configure build settings for Next.js
- **DigitalOcean App Platform**: Deploy as a Node.js app
- **Self-hosted**: Build and run with `npm run build && npm run start`

### Custom Domain Setup

1. Add your domain in your hosting platform's settings
2. Update DNS records to point to your hosting provider
3. Update `NEXT_PUBLIC_BASE_URL` environment variable
4. Verify domain in Resend for email sending

---

## ⚡ SEO & Performance

### SEO Features

- ✅ **Meta Tags** - Comprehensive title, description, and Open Graph tags on all pages
- ✅ **Structured Data** - JSON-LD schema for Organization, LocalBusiness, and services
- ✅ **Sitemap** - Auto-generated XML sitemap at `/sitemap.xml`
- ✅ **Robots.txt** - Configured at `/robots.txt`
- ✅ **Canonical URLs** - Proper canonical tags to prevent duplicate content
- ✅ **Semantic HTML** - Proper heading hierarchy and semantic elements
- ✅ **Alt Text** - All images have descriptive alt text

### Performance Optimizations

- ✅ **React 19 Compiler** - Automatic optimization of React components
- ✅ **Image Optimization** - Next.js Image component with AVIF/WebP support
- ✅ **Code Splitting** - Automatic code splitting per route
- ✅ **Font Optimization** - Google Fonts with display swap
- ✅ **Compression** - Gzip/Brotli compression enabled
- ✅ **Caching** - Aggressive caching for static assets
- ✅ **Security Headers** - CSP, HSTS, X-Frame-Options, etc.

### Performance Metrics

- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Passing all metrics
- **Bundle Size**: Optimized with tree shaking and code splitting

---

## 📝 License

Copyright © 2024 Find Your Light Psychiatry PLLC. All rights reserved.

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

---

## 🤝 Contributing

This is a private project for Find Your Light Psychiatry PLLC. If you're a team member:

1. Follow the [Development Workflow](#development-workflow)
2. Ensure all tests pass before submitting PR
3. Follow existing code style and conventions
4. Write meaningful commit messages

---

## 📞 Support

For questions or issues related to this project:

- **Technical Issues**: Contact the development team
- **Content Updates**: Contact April Casselman, PMHNP-BC
- **Website**: [www.findyourlightpsychiatry.org](https://www.findyourlightpsychiatry.org)

---

## 🙏 Acknowledgments

- **April Casselman, PMHNP-BC** - Founder and content provider
- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment platform
- **Resend** - For reliable email delivery

---

**Built with ❤️ for mental health and wellness**

