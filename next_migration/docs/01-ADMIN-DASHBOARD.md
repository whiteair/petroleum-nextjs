# Admin Dashboard Page

## 📍 Route Information

| Laravel | Next.js |
|---------|---------|
| `/home` | `/admin/dashboard` |

## 🎯 Purpose

Main landing page for admin users after login. Provides overview of system statistics and recent submissions.

## 👤 User Role

**Admin only** - Ghana Petroleum Commission staff members

## 📊 Page Sections

### 1. Page Header
- **Title**: "Dashboard"
- **Breadcrumb**: Petroleum > Home

### 2. Statistics Cards (4 cards in row)

#### Card 1: Total Companies
- **Value**: 150
- **Label**: "Companies"
- **Color**: Blue (bg-primary)
- **Icon**: fas fa-home
- **Link**: "More info" (currently #)
- **Purpose**: Total registered petroleum companies

#### Card 2: Submitted Reports
- **Value**: 44
- **Label**: "Submitted Reports"
- **Color**: Pink (bg-pink)
- **Icon**: fas fa-file-alt
- **Link**: "More info" (currently #)
- **Purpose**: Reports awaiting review

#### Card 3: Approved Reports
- **Value**: 53
- **Label**: "Approved Reports"
- **Color**: Green (bg-green)
- **Icon**: fas fa-clipboard-check
- **Link**: "More info" (currently #)
- **Purpose**: Reports that have been approved

#### Card 4: Unchecked Reports
- **Value**: 65
- **Label**: "Unchecked Reports"
- **Color**: Red (bg-danger)
- **Icon**: fa fa-ban
- **Link**: "More info" (currently #)
- **Purpose**: Reports not yet reviewed

### 3. Submissions Table (Main Content - 9 column width)

**Table Title**: "Submitted Data"

**Columns**:
1. # (5% width) - Row number
2. Company (40% width) - Company name with link
3. Report Type (30% width) - Type of submission
4. Date Submitted (15% width) - Submission date
5. Status (10% width) - Approval status badge

**Table Rows** (10 entries shown):
See `data/dashboard-submissions.json` for complete data

**Footer Button**: "View All Submissions"

### 4. Internal News Sidebar (3 column width)

**Card Title**: "Internal News"

**News Items** (6 items):
- Each item has:
  - Image: default-150x150.png
  - Title: Clickable headline
  - Description: Brief summary

**Footer Link**: "View All"

## 🔗 Interactive Elements

### Links
1. Company names → `/companies/{id}`
2. Report types → `/companies/local_content_plan/{id}`
3. "More info" on stat cards → Should link to filtered views
4. "View All Submissions" → Should link to full submissions page
5. News items → Should link to news details
6. "View All" news → Should link to all news page

### No Forms
This is a read-only dashboard

## 📱 Layout

```
┌─────────────────────────────────────────────────────────┐
│ Header: Dashboard                    Breadcrumb         │
├─────────────────────────────────────────────────────────┤
│ [Companies] [Submitted] [Approved] [Unchecked]          │
│    150         44          53          65               │
├──────────────────────────────────────┬──────────────────┤
│                                      │                  │
│  Submitted Data Table                │  Internal News   │
│  ┌────────────────────────────────┐  │  ┌────────────┐  │
│  │ # │ Company │ Type │ Date │ St│  │  │ News Item 1│  │
│  ├────────────────────────────────┤  │  ├────────────┤  │
│  │   │         │      │      │   │  │  │ News Item 2│  │
│  │   │ 10 rows of data          │  │  │ News Item 3│  │
│  │   │         │      │      │   │  │  │ News Item 4│  │
│  └────────────────────────────────┘  │  │ News Item 5│  │
│  [View All Submissions]              │  │ News Item 6│  │
│                                      │  └────────────┘  │
│                                      │  [View All]      │
└──────────────────────────────────────┴──────────────────┘
```

## 🎨 Design Notes

### Colors
- **Blue**: Primary color for Companies stat
- **Pink**: Submitted reports
- **Green**: Approved status
- **Red/Danger**: Declined/Unchecked
- **Yellow**: Pending status

### Status Badges
- **Pending**: Yellow badge
- **Approved**: Green badge
- **Declined**: Red badge

## 📦 Required Components (shadcn/ui)

1. **Card** - For stat cards, table card, news card
2. **Table** - For submissions table
3. **Badge** - For status indicators
4. **Button** - For "More info" and "View All" links
5. **Breadcrumb** - For navigation path

## 🔢 Data Requirements

### Statistics Data
```typescript
interface DashboardStats {
  totalCompanies: number;
  submittedReports: number;
  approvedReports: number;
  uncheckedReports: number;
}
```

### Submissions Data
```typescript
interface Submission {
  id: number;
  companyId: number;
  companyName: string;
  reportType: string;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'declined';
}
```

### News Data
```typescript
interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
}
```

## 🚀 Implementation Notes

### State Management
- Statistics should be fetched from API or JSON
- Submissions table should support pagination
- News items should be real-time or frequently updated

### Performance
- Lazy load news items
- Paginate submissions table (currently showing 10 of many)
- Cache statistics data

### Accessibility
- Use semantic HTML for table
- Proper ARIA labels on stat cards
- Keyboard navigation for links

## 📋 Data Source

See: `data/dashboard-submissions.json`
See: `data/dashboard-stats.json`
See: `data/internal-news.json`

## ✅ Acceptance Criteria

- [x] Page shows 4 stat cards with correct values
- [x] Table displays 10 submissions with proper formatting
- [x] Status badges show correct colors
- [x] News sidebar shows 6 items
- [x] All links navigate to correct pages
- [x] Layout is responsive (stat cards stack on mobile)
- [x] Breadcrumb shows current location
