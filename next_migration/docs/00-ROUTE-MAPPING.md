# Route Mapping: Laravel → Next.js

Complete mapping of all Laravel routes to Next.js App Router structure.

## 📋 Route Comparison Table

| Laravel Route | Method | Next.js Route | Purpose | User Role | Priority |
|--------------|--------|---------------|---------|-----------|----------|
| `/` | GET | `/` | Login page | Public | ✅ DONE |
| `/registration` | GET | `/register` | Company registration | Public | ✅ DONE |
| `/login` | POST | API: `/api/auth/login` | Login authentication | Public | High |
| `/register` | POST | API: `/api/auth/register` | User registration | Public | High |
| `/logout` | GET | API: `/api/auth/logout` | User logout | Auth | High |
| `/home` | GET | `/admin/dashboard` | Admin dashboard | Admin | High |
| `/companies/{id}` | GET | `/admin/companies/[id]` | Company details | Admin | High |
| `/companies/local_content_plan/{id}` | GET | `/admin/reports/local-content/[id]` | View local content plan | Admin | Medium |
| `/companies/contract_details/{id}` | GET | `/admin/contracts/[id]` | View contract details | Admin | Medium |
| `/submit` | GET | `/company/submit` | Submit report page | Company | Medium |
| `/submit/local_content_plan` | GET | `/company/submit/local-content` | Submit local content | Company | Medium |
| `/registration/dashboard` | GET | `/company/dashboard` | Company dashboard | Company | High |
| `/registration/payment` | GET | `/company/payment` | Payment status | Company | Medium |
| `/registration/application` | GET | `/company/application` | Application form | Company | Medium |

## 🗂️ Next.js File Structure

```
app/
├── (auth)/                    # Public auth pages
│   ├── page.tsx              # Login (/) ✅
│   ├── register/
│   │   └── page.tsx          # Registration ✅
│   └── forgot-password/
│       └── page.tsx          # Password reset
│
├── admin/                     # Admin-only pages
│   ├── layout.tsx            # Admin layout with sidebar
│   ├── dashboard/
│   │   └── page.tsx          # Admin home (/admin/dashboard)
│   ├── companies/
│   │   ├── page.tsx          # Companies list
│   │   └── [id]/
│   │       ├── page.tsx      # Company details
│   │       └── loading.tsx   # Loading state
│   ├── reports/
│   │   └── local-content/
│   │       └── [id]/
│   │           └── page.tsx  # View local content plan
│   └── contracts/
│       └── [id]/
│           └── page.tsx      # Contract details
│
├── company/                   # Company user pages
│   ├── layout.tsx            # Company layout
│   ├── dashboard/
│   │   └── page.tsx          # Company dashboard
│   ├── application/
│   │   └── page.tsx          # Application form
│   ├── payment/
│   │   └── page.tsx          # Payment status
│   └── submit/
│       ├── page.tsx          # Submit options
│       └── local-content/
│           └── page.tsx      # Submit local content
│
├── api/                       # API routes
│   └── auth/
│       ├── login/
│       │   └── route.ts      # POST /api/auth/login
│       ├── register/
│       │   └── route.ts      # POST /api/auth/register
│       └── logout/
│           └── route.ts      # POST /api/auth/logout
│
└── layout.tsx                 # Root layout
```

## 🔐 Authentication & Authorization

### User Roles
- **Admin** - Ghana Petroleum Commission staff
- **Company** - Registered petroleum companies

### Route Protection

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')
  const role = request.cookies.get('user_role')

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || role !== 'admin') {
      return NextResponse.redirect('/login')
    }
  }

  // Protect company routes
  if (request.nextUrl.pathname.startsWith('/company')) {
    if (!token || role !== 'company') {
      return NextResponse.redirect('/login')
    }
  }
}
```

## 📊 Data Flow

### Laravel (Current)
```
Route → Controller → Blade View (with hardcoded data)
```

### Next.js (New)
```
Route → Page Component → Data from JSON files → UI Components
```

## 🎯 Implementation Priority

### Phase 1: Authentication (✅ DONE)
- [x] Login page
- [x] Registration page
- [ ] API routes for auth
- [ ] Middleware for route protection

### Phase 2: Admin Dashboard (HIGH PRIORITY)
- [ ] Admin layout with sidebar
- [ ] Dashboard page with statistics
- [ ] Companies list page

### Phase 3: Company Management (HIGH PRIORITY)
- [ ] Company dashboard
- [ ] Application status tracking
- [ ] Payment status page

### Phase 4: Reports & Submissions (MEDIUM PRIORITY)
- [ ] Submit local content plan
- [ ] View submissions
- [ ] Report status tracking

### Phase 5: Advanced Features (LOW PRIORITY)
- [ ] Contract details
- [ ] Document uploads
- [ ] Email notifications

## 🔗 Cross-References

- See `docs/` folder for detailed page documentation
- See `data/` folder for JSON data schemas
- See `guides/IMPLEMENTATION-GUIDE.md` for build instructions
