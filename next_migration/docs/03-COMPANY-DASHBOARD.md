# Company Dashboard Page

## 📍 Route Information

| Laravel | Next.js |
|---------|---------|
| `/registration/dashboard` | `/company/dashboard` |

## 🎯 Purpose

Landing page for company users after login. Shows registration and application status, with instructions for completing the registration process.

## 👤 User Role

**Company only** - Registered petroleum companies

## 📊 Page Sections

### 1. Page Header
- **Title**: "Dashboard"
- **Breadcrumb**: Petroleum > Home

### 2. Status Cards (4 cards in row)

#### Card 1: Application Status
- **Value**: "Not Submitted"
- **Label**: "Application Status"
- **Color**: Blue (bg-primary)
- **Icon**: fas fa-home

#### Card 2: Payment Status
- **Value**: "Not Paid"
- **Label**: "Payment Status"
- **Color**: Red (bg-danger)
- **Icon**: fas fa-hand-holding-usd

#### Card 3: Form Status
- **Value**: "Incomplete"
- **Label**: "Form Status"
- **Color**: Pink (bg-pink)
- **Icon**: fas fa-clipboard-check

#### Card 4: Commission Approval
- **Value**: "Not Approved"
- **Label**: "Commission Approval"
- **Color**: Purple (bg-purple)
- **Icon**: fa fa-ban

### 3. Instructions Card

**Card Title**: "Instructions"

**Content**: 4 numbered instruction blocks (Lorem ipsum placeholder text)

**Footer Button**: "Start Application" (green button → `/registration/application`)

## 🔗 Interactive Elements

### Links
1. "Start Application" button → `/company/application`

### Status Values
Status cards show different states:
- Application: "Not Submitted" / "Submitted" / "Under Review" / "Approved"
- Payment: "Not Paid" / "Pending" / "Paid" / "Verified"
- Form: "Incomplete" / "Complete" / "Needs Revision"
- Approval: "Not Approved" / "Pending" / "Approved" / "Rejected"

## 📱 Layout

```
┌─────────────────────────────────────────────────────────┐
│ Header: Dashboard                    Breadcrumb         │
├─────────────────────────────────────────────────────────┤
│ [Application] [Payment] [Form] [Commission Approval]    │
│ Not Submitted  Not Paid  Incomplete  Not Approved       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Instructions Card                                       │
│  ┌────────────────────────────────────────────────┐     │
│  │ 1. Lorem Ipsum Dolor                           │     │
│  │ (Instruction text)                             │     │
│  │                                                │     │
│  │ 2. Aliquam tempor quis sapien...              │     │
│  │ (Instruction text)                             │     │
│  │                                                │     │
│  │ 3. Lorem Ipsum Dolor                           │     │
│  │ (Instruction text)                             │     │
│  │                                                │     │
│  │ 4. Aliquam tempor quis sapien...              │     │
│  │ (Instruction text)                             │     │
│  │                                                │     │
│  │ [Start Application]                            │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## 🎨 Design Notes

### Colors
- **Blue**: Application status
- **Red**: Payment status (indicates action needed)
- **Pink**: Form status
- **Purple**: Final approval status
- **Green**: Action button

### Status Progression
The dashboard shows the typical flow:
1. Complete Application
2. Make Payment
3. Fill Forms
4. Await Approval

## 📦 Required Components (shadcn/ui)

1. **Card** - Status cards, instructions card
2. **Button** - Start application action
3. **Breadcrumb** - Navigation path
4. **Alert** or **Callout** - For instruction sections

## 🔢 Data Requirements

```typescript
interface CompanyStatus {
  companyId: number;
  applicationStatus: 'not_submitted' | 'submitted' | 'under_review' | 'approved';
  paymentStatus: 'not_paid' | 'pending' | 'paid' | 'verified';
  formStatus: 'incomplete' | 'complete' | 'needs_revision';
  approvalStatus: 'not_approved' | 'pending' | 'approved' | 'rejected';
  lastUpdated: string;
}

interface Instruction {
  id: number;
  title: string;
  content: string;
  order: number;
}
```

## 🚀 Implementation Notes

### Dynamic Status
- Status should update based on company's progress
- Colors should change based on completion
- Show progress percentage

### Instructions
- Instructions should be editable by admin
- Support markdown formatting
- Can be personalized per company type

### Next Actions
- Show "Next Step" based on current status
- Disable/enable buttons based on completion
- Show estimated time to complete

## 📋 Data Source

See: `data/company-status.json`
See: `data/registration-instructions.json`

## ✅ Acceptance Criteria

- [x] Page shows 4 status cards with current state
- [x] Instructions card displays all steps
- [x] "Start Application" button navigates correctly
- [x] Status cards use correct colors
- [x] Layout is responsive (cards stack on mobile)
- [x] Breadcrumb shows current location
- [x] Cards update when status changes
