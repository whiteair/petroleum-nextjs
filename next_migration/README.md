# Next.js Migration Package

## 📦 What is This?

This folder contains **complete migration documentation** for converting the Ghana Petroleum Commission Management System from Laravel to Next.js.

Everything you need to build the Next.js application is documented here.

## 📁 Folder Structure

```
next_migration/
├── README.md                  ← You are here
├── docs/                      ← Page-by-page documentation
│   ├── 00-ROUTE-MAPPING.md   ← START HERE: Complete route mapping
│   ├── 01-ADMIN-DASHBOARD.md ← Admin dashboard specifications
│   ├── 02-COMPANY-DETAILS.md ← Company details page specs
│   └── 03-COMPANY-DASHBOARD.md ← Company dashboard specs
├── data/                      ← JSON data files (ready to use)
│   ├── dashboard-stats.json
│   ├── dashboard-submissions.json
│   ├── companies.json
│   └── internal-news.json
├── guides/                    ← Implementation guides
│   └── IMPLEMENTATION-GUIDE.md ← Detailed build instructions
└── assets/                    ← Additional resources
```

## 🚀 Quick Start

### For AI/Claude:

If you're Claude in a new environment building this project:

1. **Read Route Mapping First**
   - Start with `docs/00-ROUTE-MAPPING.md`
   - This shows the complete application structure

2. **Review Page Documentation**
   - Each page has detailed specs in `docs/`
   - Includes layout, components, data, and acceptance criteria

3. **Use the Data Files**
   - All hardcoded data is in `data/*.json`
   - Copy these files to `lib/data/` in your Next.js project
   - Import and use directly (no API needed for POC)

4. **Follow Implementation Guide**
   - `guides/IMPLEMENTATION-GUIDE.md` has code examples
   - Shows component structure and best practices
   - Includes TypeScript types

5. **Build in This Order**
   - Phase 1: Admin Dashboard (High Priority)
   - Phase 2: Company Details Page
   - Phase 3: Company Dashboard
   - Phase 4: Other pages as needed

### For Human Developers:

1. Read the **Implementation Guide** (`guides/IMPLEMENTATION-GUIDE.md`)
2. Check the **Route Mapping** (`docs/00-ROUTE-MAPPING.md`)
3. Copy **Data Files** to your Next.js project
4. Build pages following the **Page Docs**

## 📊 What's Documented

### Complete Documentation ✅

- [x] All routes mapped (Laravel → Next.js)
- [x] Admin dashboard (full specs)
- [x] Company details page (full specs)
- [x] Company dashboard (full specs)
- [x] All data structures in JSON format
- [x] Implementation guide with code examples
- [x] Component requirements
- [x] TypeScript type definitions
- [x] Layout specifications
- [x] Interactive element mappings
- [x] Acceptance criteria for each page

### Includes

- **10 submissions** in dashboard table
- **5 petroleum companies** with complete data
- **6 internal news items**
- **Dashboard statistics** (150 companies, 44 reports, etc.)
- **Company details** (employees, permits, contact info)
- **Status tracking** (application, payment, form, approval)

## 🎯 Migration Strategy

### POC Approach (Current)
- All data hardcoded in JSON files
- No database connections
- No real authentication
- Focus on UI/UX demonstration

### Production Approach (Future)
- Integrate Supabase for backend
- Replace JSON with API calls
- Implement real auth flow
- Add data validation and security

## 📋 Page Priority

### High Priority (Build First)
1. ✅ Login Page (DONE)
2. ✅ Register Page (DONE)
3. ⬜ Admin Dashboard
4. ⬜ Company Dashboard
5. ⬜ Company Details Page

### Medium Priority
6. ⬜ Companies List
7. ⬜ Submit Local Content Plan
8. ⬜ View Reports
9. ⬜ Application Form
10. ⬜ Payment Page

### Low Priority
11. ⬜ Contract Details
12. ⬜ Document Uploads
13. ⬜ Internal News Pages
14. ⬜ User Management

## 🎨 Design Language

### Colors
- **Blue**: Primary color (trust, petroleum industry)
- **Green**: Success, approved status
- **Yellow**: Pending status
- **Red**: Declined, urgent items
- **Pink**: Secondary actions
- **Purple**: Special status indicators

### Components (shadcn/ui)
- Card
- Button
- Input
- Table
- Tabs
- Badge
- Dropdown Menu
- Breadcrumb
- Alert

## 🔐 User Roles

### Admin
- Ghana Petroleum Commission staff
- Access to all companies
- Can view/approve submissions
- Dashboard with statistics

### Company
- Registered petroleum companies
- View own company data only
- Submit reports and applications
- Track application status

## 📦 Data Schema

All data structures are defined in the JSON files and documented in the Implementation Guide.

### Key Entities
- **Company**: Petroleum company details
- **Submission**: Report submissions
- **User**: Admin or company users
- **News**: Internal commission news
- **Status**: Application/payment/approval tracking

## ✅ What's Already Built

In the petroleum-frontend project:

- [x] Next.js 16 setup with App Router
- [x] TypeScript configuration
- [x] Tailwind CSS 4
- [x] shadcn/ui components (Button, Card, Input, Label)
- [x] Login page with background image
- [x] Registration page with background image
- [x] Global styles and layout
- [x] Logo and background assets

## 🚀 Next Steps

1. **Copy this entire `next_migration` folder** to the petroleum-frontend project
2. **Open petroleum-frontend in a new VS Code window**
3. **Use Claude in that environment** to build the remaining pages
4. **Reference these docs** for each page you build
5. **Import the data files** directly (no API needed)

## 📝 Example Usage

```typescript
// In your Next.js component
import { companies } from '@/lib/data/companies.json';
import { dashboardStats } from '@/lib/data/dashboard-stats.json';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Total Companies: {dashboardStats.statistics.totalCompanies}</h1>
      {companies.companies.map(company => (
        <div key={company.id}>{company.name}</div>
      ))}
    </div>
  );
}
```

## 🤝 For Claude/AI Assistants

**You are Claude in a new VS Code environment tasked with building this petroleum management system.**

**What you have:**
- ✅ Complete page specifications (docs/)
- ✅ All data in JSON format (data/)
- ✅ Implementation guide with code examples (guides/)
- ✅ Route mapping and structure (docs/00-ROUTE-MAPPING.md)
- ✅ Existing Next.js project with auth pages already built

**What to do:**
1. Read the Implementation Guide first
2. Build pages in priority order (Admin Dashboard → Company Dashboard → etc.)
3. Use the JSON data directly (import from data/)
4. Follow the component structure in the guide
5. Reference page docs for exact specifications
6. Match the layouts shown in the documentation
7. Use shadcn/ui components as specified
8. Ensure responsive design (mobile, tablet, desktop)

**Code Quality:**
- TypeScript for all components
- Use the types defined in Implementation Guide
- Follow Next.js 16 App Router conventions
- Implement proper error boundaries
- Add loading states
- Make it accessible (WCAG AA)

**Styling:**
- Use Tailwind CSS
- Match colors from the design system
- Keep it clean and professional
- Petroleum industry aesthetic

## 📞 Questions?

If you're Claude and unsure about something:
1. Check the specific page doc in `docs/`
2. Look at the data structure in `data/`
3. Review the Implementation Guide
4. The docs are comprehensive - everything is documented!

## 🎉 Success Criteria

The migration is successful when:
- [ ] All high-priority pages are built
- [ ] Data displays correctly from JSON files
- [ ] Navigation works between pages
- [ ] Role-based routing is implemented
- [ ] Design matches petroleum industry standards
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] Ready for stakeholder demo

---

**Let's build this! 🚀**
