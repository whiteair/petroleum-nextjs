# Company Details Page

## 📍 Route Information

| Laravel | Next.js |
|---------|---------|
| `/companies/{id}` | `/admin/companies/[id]` |

## 🎯 Purpose

Display detailed information about a specific petroleum company including profile, statistics, submissions, and contracts.

## 👤 User Role

**Admin only**

## 📊 Page Sections

### 1. Page Header
- **Title**: Company Name (e.g., "Tullow Ghana")
- **Breadcrumb**: Company > Details

### 2. Left Sidebar (3 columns width)

#### Profile Card
- Company logo (circular image)
- Company name
- Company type
- Contact information:
  - Address
  - Telephone
  - Website
- "Send Email" button (green, mailto link)

#### Company Information Card
- Registered Company Name
- Company Registration Number
- Petroleum Commission Permit Number (with status badge)
- Tax Identification Number (TIN)
- Services Provided
- Date of Incorporation
- Date of Commencement of Business

### 3. Main Content Area (9 columns width)

#### Tab Navigation
1. **Company Information** (default active)
2. **Submissions**
3. **Contracts**

#### Submit Report Dropdown (top right)
- **Annual Submissions**:
  - Procurement Plan
  - Local Content Plan
  - Performance Report
- **Quarterly Submissions**:
  - Procurement Plan

### 4. Company Information Tab Content

#### Statistics Cards (4 cards)
1. **Total Employees**: 300 (blue icon: fas fa-users)
2. **Ghanaian Employees**: 180 (teal icon: fas fa-user-friends)
3. **Management Positions**: 65 (shown in full view)
4. **Senior Management**: 12 (shown in full view)

## 🔗 Interactive Elements

### Links
1. Email button → `mailto:{company.email}`
2. Submit Report dropdown → Various submission pages
3. Tab navigation → Different content views
4. Website → External company website

### Tabs
- Company Information (statistics and details)
- Submissions (list of submitted reports)
- Contracts (petroleum contracts)

## 📱 Layout

```
┌──────────────────────────────────────────────────────────┐
│ Header: Tullow Ghana                    Breadcrumb       │
├────────────────┬─────────────────────────────────────────┤
│  ┌──────────┐ │                              [Submit ▼] │
│  │   Logo   │ │  [Company Info] [Submissions] [Contracts]│
│  └──────────┘ │                                           │
│  Company Name  │  ┌──────────────────────────────────┐   │
│  Company Type  │  │  Statistics Cards (4)            │   │
│                │  │  [Employees] [Ghanaian] [Mgmt]   │   │
│  Address       │  └──────────────────────────────────┘   │
│  Tel           │                                           │
│  Website       │  Additional company details...            │
│  [Send Email]  │                                           │
│                │                                           │
│  Info Card:    │                                           │
│  - Reg Name    │                                           │
│  - Reg Number  │                                           │
│  - Permit #    │                                           │
│  - TIN         │                                           │
│  - Services    │                                           │
│  - Dates       │                                           │
└────────────────┴───────────────────────────────────────────┘
```

## 🎨 Design Notes

### Colors
- **Green**: Success/Active status, email button
- **Blue**: Primary statistics
- **Teal**: Secondary statistics
- **Yellow/Warning**: Inactive permit status

### Badges
- Permit status shown with colored badge
- TIN shown in danger tag

## 📦 Required Components (shadcn/ui)

1. **Card** - Profile card, info card, statistics
2. **Tabs** - Content navigation
3. **Badge** - Status indicators
4. **Button** - Email, submit actions
5. **Avatar** - Company logo display
6. **DropdownMenu** - Submit report options
7. **Breadcrumb** - Navigation path

## 🔢 Data Requirements

```typescript
interface Company {
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
```

## 📋 Data Source

See: `data/companies.json`

## ✅ Acceptance Criteria

- [x] Company profile displayed with logo and contact info
- [x] All company details shown in sidebar card
- [x] Statistics cards display employee counts
- [x] Tabs allow switching between different views
- [x] Submit report dropdown shows all options
- [x] Email button opens mail client
- [x] Permit status badge shows correct color
- [x] Page is responsive on mobile devices
