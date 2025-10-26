# Ghana Petroleum Commission Management System

A modern, full-stack web application for managing petroleum companies, submissions, and compliance with local content regulations in Ghana.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts (ready to use)
- **Backend** (Future): Supabase

## ✨ Features

### ✅ Implemented

- **Modern Authentication Pages** (Login/Register)
- **Admin Dashboard** with animated statistics cards
- **Submissions Table** with status tracking
- **Internal News Feed** with beautiful cards
- **Company Details Page** with tabbed interface
- **Employee Statistics** and local content metrics
- **Company User Dashboard** with status tracking
- **Getting Started Instructions** for new companies
- **Responsive Design** (Mobile, Tablet, Desktop)
- **Smooth Animations** powered by Framer Motion
- **Type-Safe** TypeScript throughout

### 🚧 Planned

- Companies List Page
- Submit Local Content Plan
- Report Viewing and Approval
- Application Form
- Payment Integration
- Contract Management
- Full Authentication with Supabase

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project folder:
   ```bash
   cd petroleum-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
petroleum-frontend/
├── app/                          # Next.js App Router
│   ├── admin/
│   │   ├── dashboard/           # Admin dashboard ✅
│   │   └── companies/[id]/      # Company details ✅
│   ├── company/
│   │   └── dashboard/           # Company user dashboard ✅
│   ├── page.tsx                 # Login page ✅
│   ├── register/                # Registration ✅
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles (Tailwind v4)
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   └── breadcrumb.tsx
│   ├── dashboard/               # Dashboard components
│   │   ├── stat-card.tsx        # Animated stat cards
│   │   ├── submissions-table.tsx # Data table
│   │   └── news-card.tsx        # News feed
│   └── company/                 # Company components
│       ├── company-profile.tsx
│       ├── company-info-card.tsx
│       └── status-card.tsx
│
├── lib/
│   ├── data/
│   │   └── master-data.json     # Single source of truth ✅
│   └── utils.ts                 # Utilities
│
├── types/
│   └── index.ts                 # TypeScript type definitions
│
├── public/
│   └── images/                  # Static assets
│
└── next_migration/              # Migration documentation
    ├── docs/                    # Page specifications
    ├── data/                    # Original data files
    └── guides/                  # Implementation guides
```

## 🎨 Design System

The application uses shadcn/ui components with a custom color scheme inspired by the petroleum industry:

- **Primary**: Blue tones representing trust and professionalism
- **Typography**: Source Sans Pro for body text
- **Images**: Petroleum facility backgrounds for auth pages
- **Logo**: Ghana Petroleum Commission official branding

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication (POC)

Currently, auth pages are UI-only for demonstration purposes. No real authentication is implemented yet. Future integration with Supabase will handle:

- User registration and login
- Role-based access (Admin/Company)
- Session management
- Password reset

## 📊 Data Management

### Master Data File

All application data is centralized in **[lib/data/master-data.json](lib/data/master-data.json)** - a single source of truth containing:

```json
{
  "statistics": {
    "totalCompanies": 150,
    "submittedReports": 44,
    "approvedReports": 53,
    "uncheckedReports": 65
  },
  "companies": [...],      // 5 petroleum companies with full details
  "submissions": [...],    // 10 submission records
  "news": [...],           // 6 news items
  "companyTypes": [...],
  "statusTypes": [...]
}
```

### Data Structure

- **Companies**: 5 fully populated petroleum companies including:
  - Tullow Oil Ghana (International)
  - Saida Oil and Gas (Local)
  - Genesis Oil & Gas Services (Service)
  - Bayfield Oil Services (Service)
  - Ghana Oil Company (National)

- **Submissions**: 10 report submissions with status tracking
- **News**: 6 internal news items for the admin dashboard
- **Statistics**: Real dashboard metrics

### TypeScript Types

All data types are defined in [types/index.ts](types/index.ts) for full type safety:
- `DashboardStats`, `Company`, `Submission`, `NewsItem`
- `CompanyStatus`, `ApplicationStatus`, `PaymentStatus`
- Union types for status values

### Future API Integration

The current JSON-based approach allows for easy API migration:
```typescript
// Current: Static JSON
import masterData from '@/lib/data/master-data.json';

// Future: API calls
const data = await fetch('/api/dashboard/stats');
```

## 🌐 Pages

### ✅ Implemented Pages

1. **Login Page** - `/`
   - Email and password authentication
   - Link to registration
   - Forgot password link
   - Beautiful petroleum facility background

2. **Registration Page** - `/register`
   - Company registration form
   - Email and password setup
   - Terms acceptance
   - Different background for visual distinction

3. **Admin Dashboard** - `/admin/dashboard`
   - 4 animated statistics cards
   - Submissions table with 10 entries
   - Internal news feed with 6 items
   - Breadcrumb navigation
   - Responsive grid layout

4. **Company Details** - `/admin/companies/[id]`
   - Company profile card with logo
   - Detailed company information
   - 4 employee statistics cards
   - Tabbed interface (Information, Submissions, Contracts)
   - Dynamic routing for all 5 companies

5. **Company Dashboard** - `/company/dashboard`
   - 4 status tracking cards
   - Step-by-step getting started guide
   - Quick action buttons
   - Application/Payment/Form/Approval status

### 🚧 Planned Pages

- `/admin/companies` - Companies list view
- `/admin/reports` - Report submissions
- `/company/application` - Application form
- `/company/payment` - Payment tracking
- `/company/submit/local-content` - Submit local content plan
- `/admin/news` - News management

## 🤝 Contributing

This is a proof of concept for contract approval. Development will continue based on client feedback.

## 📄 License

© 2025 Ghana Petroleum Commission. All rights reserved.

## 📞 Contact

For questions or feedback about this POC, please contact the development team.
