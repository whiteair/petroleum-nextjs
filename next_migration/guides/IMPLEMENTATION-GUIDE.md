# Next.js Migration Implementation Guide

## 🎯 Overview

This guide helps you build the Ghana Petroleum Commission Management System using the migration documentation and data files provided.

## 📁 Migration Package Structure

```
next_migration/
├── docs/                      # Page-by-page documentation
│   ├── 00-ROUTE-MAPPING.md   # Complete route mapping
│   ├── 01-ADMIN-DASHBOARD.md # Admin dashboard specs
│   ├── 02-COMPANY-DETAILS.md # Company details specs
│   └── 03-COMPANY-DASHBOARD.md # Company dashboard specs
├── data/                      # JSON data files
│   ├── dashboard-stats.json
│   ├── dashboard-submissions.json
│   ├── companies.json
│   └── internal-news.json
├── guides/                    # Implementation guides
│   └── IMPLEMENTATION-GUIDE.md (this file)
└── assets/                    # Additional resources
```

## 🚀 Quick Start

### Step 1: Review Documentation

1. Read `docs/00-ROUTE-MAPPING.md` to understand the complete route structure
2. Review each page doc in `docs/` folder for detailed specifications
3. Check `data/` folder for all JSON data structures

### Step 2: Set Up Data Layer

Create a `lib/data/` folder in your Next.js project and copy all JSON files:

```typescript
// lib/data/index.ts
import dashboardStats from './dashboard-stats.json';
import dashboardSubmissions from './dashboard-submissions.json';
import companies from './companies.json';
import internalNews from './internal-news.json';

export {
  dashboardStats,
  dashboardSubmissions,
  companies,
  internalNews
};
```

### Step 3: Create TypeScript Types

```typescript
// types/index.ts

export interface DashboardStats {
  totalCompanies: number;
  submittedReports: number;
  approvedReports: number;
  uncheckedReports: number;
}

export interface Submission {
  id: number;
  companyId: number;
  companyName: string;
  reportType: string;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface Company {
  id: number;
  name: string;
  registeredName: string;
  type: string;
  logo: string;
  email: string;
  address: string;
  telephone: string;
  website: string;
  registrationNumber: string;
  permitNumber: string;
  permitStatus: 'active' | 'inactive';
  tin: string;
  servicesProvided: string;
  incorporationDate: string;
  commencementDate: string;
  totalEmployees: number;
  ghanaianEmployees: number;
  status: string;
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  category: string;
}

export interface CompanyStatus {
  companyId: number;
  applicationStatus: 'not_submitted' | 'submitted' | 'under_review' | 'approved';
  paymentStatus: 'not_paid' | 'pending' | 'paid' | 'verified';
  formStatus: 'incomplete' | 'complete' | 'needs_revision';
  approvalStatus: 'not_approved' | 'pending' | 'approved' | 'rejected';
  lastUpdated: string;
}
```

## 📋 Implementation Priority

### Phase 1: Admin Dashboard (HIGH PRIORITY)

**File**: `app/admin/dashboard/page.tsx`

**Components Needed**:
1. StatCard component
2. SubmissionsTable component
3. NewsCard component

**Implementation Steps**:

```tsx
// components/dashboard/stat-card.tsx
export function StatCard({
  title,
  value,
  icon,
  color,
  link
}: StatCardProps) {
  return (
    <Card className={cn("...", color)}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="text-sm">{title}</p>
          </div>
          <icon className="h-12 w-12" />
        </div>
        <Link href={link} className="text-sm">
          More info →
        </Link>
      </CardContent>
    </Card>
  );
}
```

```tsx
// app/admin/dashboard/page.tsx
import { dashboardStats, dashboardSubmissions, internalNews } from '@/lib/data';
import { StatCard } from '@/components/dashboard/stat-card';
import { SubmissionsTable } from '@/components/dashboard/submissions-table';
import { NewsCard } from '@/components/dashboard/news-card';

export default function AdminDashboard() {
  return (
    <div className="container py-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Breadcrumb>
          <BreadcrumbItem>Petroleum</BreadcrumbItem>
          <BreadcrumbItem>Home</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Companies"
          value={dashboardStats.statistics.totalCompanies}
          icon={Building}
          color="bg-blue-500"
          link="/admin/companies"
        />
        <StatCard
          title="Submitted Reports"
          value={dashboardStats.statistics.submittedReports}
          icon={FileText}
          color="bg-pink-500"
          link="/admin/reports?status=submitted"
        />
        <StatCard
          title="Approved Reports"
          value={dashboardStats.statistics.approvedReports}
          icon={CheckCircle}
          color="bg-green-500"
          link="/admin/reports?status=approved"
        />
        <StatCard
          title="Unchecked Reports"
          value={dashboardStats.statistics.uncheckedReports}
          icon={XCircle}
          color="bg-red-500"
          link="/admin/reports?status=unchecked"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions Table (2/3 width) */}
        <div className="lg:col-span-2">
          <SubmissionsTable submissions={dashboardSubmissions.submissions} />
        </div>

        {/* News Sidebar (1/3 width) */}
        <div>
          <NewsCard news={internalNews.news} />
        </div>
      </div>
    </div>
  );
}
```

### Phase 2: Company Details Page

**File**: `app/admin/companies/[id]/page.tsx`

**Components Needed**:
1. CompanyProfile component
2. CompanyInfoCard component
3. Tabs component (shadcn/ui)
4. EmployeeStatsCard component

**Implementation Steps**:

```tsx
// app/admin/companies/[id]/page.tsx
import { companies } from '@/lib/data';
import { CompanyProfile } from '@/components/company/company-profile';
import { CompanyInfoCard } from '@/components/company/company-info-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const company = companies.companies.find(c => c.id === parseInt(params.id));

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="container py-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <Breadcrumb>
          <BreadcrumbItem>Company</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Profile & Info */}
        <div className="space-y-6">
          <CompanyProfile company={company} />
          <CompanyInfoCard company={company} />
        </div>

        {/* Main Content - Tabs */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="information">
            <TabsList>
              <TabsTrigger value="information">Company Information</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
            </TabsList>

            <TabsContent value="information">
              {/* Employee statistics cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <EmployeeStatsCard
                  title="Total Employees"
                  value={company.totalEmployees}
                  icon={Users}
                />
                <EmployeeStatsCard
                  title="Ghanaian Employees"
                  value={company.ghanaianEmployees}
                  icon={UserCheck}
                />
              </div>
            </TabsContent>

            <TabsContent value="submissions">
              {/* Submissions content */}
            </TabsContent>

            <TabsContent value="contracts">
              {/* Contracts content */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
```

### Phase 3: Company Dashboard

**File**: `app/company/dashboard/page.tsx`

**Components Needed**:
1. StatusCard component
2. InstructionsCard component

**Implementation Steps**:

```tsx
// app/company/dashboard/page.tsx
import { StatusCard } from '@/components/company/status-card';
import { InstructionsCard } from '@/components/company/instructions-card';

export default function CompanyDashboard() {
  // In production, fetch from API based on logged-in company
  const status = {
    applicationStatus: 'not_submitted',
    paymentStatus: 'not_paid',
    formStatus: 'incomplete',
    approvalStatus: 'not_approved'
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard
          title="Application Status"
          value="Not Submitted"
          icon={FileText}
          color="bg-blue-500"
        />
        <StatusCard
          title="Payment Status"
          value="Not Paid"
          icon={CreditCard}
          color="bg-red-500"
        />
        <StatusCard
          title="Form Status"
          value="Incomplete"
          icon={ClipboardCheck}
          color="bg-pink-500"
        />
        <StatusCard
          title="Commission Approval"
          value="Not Approved"
          icon={Ban}
          color="bg-purple-500"
        />
      </div>

      {/* Instructions */}
      <InstructionsCard />
    </div>
  );
}
```

## 🎨 Styling Guidelines

### Color Palette

Based on shadcn/ui with petroleum industry colors:

```css
/* tailwind.config.ts */
colors: {
  primary: {
    DEFAULT: '#3B82F6', // Blue - trust, professionalism
    foreground: '#FFFFFF',
  },
  success: '#10B981', // Green - approved
  warning: '#F59E0B', // Yellow - pending
  danger: '#EF4444',  // Red - declined/urgent
  info: '#06B6D4',    // Cyan - information
}
```

### Status Colors
- **Pending**: Yellow/Warning
- **Approved**: Green/Success
- **Declined**: Red/Danger
- **Active**: Green
- **Inactive**: Gray

## 📦 Additional Components to Build

### 1. Admin Sidebar Layout

```tsx
// app/admin/layout.tsx
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
```

### 2. Status Badge Component

```tsx
// components/ui/status-badge.tsx
export function StatusBadge({ status }: { status: string }) {
  const variants = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    declined: 'bg-red-100 text-red-800',
  };

  return (
    <span className={cn('px-2 py-1 rounded text-xs font-medium', variants[status])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
```

### 3. Data Table Component

Use shadcn/ui's data-table with TanStack Table for the submissions table.

## 🔐 Authentication Flow

### Route Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const role = request.cookies.get('user_role')?.value;

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect company routes
  if (request.nextUrl.pathname.startsWith('/company')) {
    if (!token || role !== 'company') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/company/:path*'],
};
```

## 📊 Data Management Strategy

### For POC (Current)
- Use JSON files from `data/` folder
- Import directly in components
- No API calls needed

### For Production (Future)
- Replace JSON imports with API calls
- Use React Query for caching
- Integrate with Supabase

```typescript
// Future: lib/api/dashboard.ts
export async function getDashboardStats() {
  const { data } = await supabase
    .from('statistics')
    .select('*')
    .single();
  return data;
}
```

## ✅ Testing Checklist

### Per Page
- [ ] Page renders without errors
- [ ] All data displays correctly
- [ ] Links navigate to correct routes
- [ ] Responsive on mobile, tablet, desktop
- [ ] Status badges show correct colors
- [ ] Icons display properly
- [ ] Forms submit (when applicable)
- [ ] Breadcrumb shows correct path

### Overall
- [ ] Auth flow works (login → correct dashboard)
- [ ] Role-based routing enforced
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Accessibility (WCAG AA)

## 🚢 Deployment

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Build Command

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
vercel --prod
```

## 📚 Additional Resources

- shadcn/ui docs: https://ui.shadcn.com
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev

## 🤝 Support

For questions about this migration:
1. Check the page docs in `docs/` folder
2. Review the route mapping in `00-ROUTE-MAPPING.md`
3. Examine the data structures in `data/` folder
4. Reference this implementation guide

---

**Happy Coding! 🚀**
