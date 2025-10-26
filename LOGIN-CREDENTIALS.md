# E-Portal Login Credentials

## Quick Login Badges

The login page now has 4 quick login badges for easy access:

### 1. Admin (Blue Badge)
- **Icon**: Shield
- **Email**: admin@gpc.gov.gh
- **Password**: admin123
- **Role**: admin
- **Redirects to**: `/admin/dashboard`
- **Description**: Ghana Petroleum Commission administrator with full system access

### 2. Operator (Green Badge)
- **Icon**: UserCog
- **Email**: operator@gpc.gov.gh
- **Password**: operator123
- **Role**: operator
- **Redirects to**: `/company/dashboard`
- **Description**: GPC operator with limited administrative access

### 3. Contractor (Purple Badge)
- **Icon**: Briefcase
- **Email**: contractor@company.com
- **Password**: contractor123
- **Role**: contractor
- **Redirects to**: `/company/dashboard`
- **Description**: Contractor company user

### 4. Service Company (Orange Badge)
- **Icon**: Wrench
- **Email**: service@company.com
- **Password**: service123
- **Role**: service
- **Redirects to**: `/company/dashboard`
- **Description**: Service company user

## Usage

### Quick Login (Recommended)
1. Click any of the 4 role badges on the login page
2. Credentials auto-populate
3. Automatically logs in after 300ms
4. Redirects to appropriate dashboard

### Manual Login
1. Enter email and password manually
2. Click "Sign In" button
3. System validates credentials
4. Redirects to appropriate dashboard

## Branding Updates

- **System Name**: E-Portal (formerly "Ghana Petroleum Commission Management System")
- **Subtitle**: Ghana Petroleum Commission
- **Copyright**: Removed from login and registration pages

## Mock Authentication

This is a **mock authentication system** for development and demo purposes:
- No real authentication backend
- Credentials stored in localStorage
- No session expiry
- No password encryption
- Not production-ready

## Login Page Features

✅ 4 Quick login role badges with icons and colors
✅ Auto-populate credentials on badge click
✅ Manual email/password login
✅ Form validation
✅ "Forgot password?" link
✅ Link to registration page
✅ Beautiful petroleum facility background
✅ Glass-morphism card design
✅ Responsive layout

## Role-Based Routing

- **Admin** → `/admin/dashboard`
- **Operator, Contractor, Service** → `/company/dashboard`

## Future Enhancements

For production, you would need to:
- [ ] Implement real authentication (JWT, Supabase, etc.)
- [ ] Add password hashing
- [ ] Implement session management
- [ ] Add token refresh
- [ ] Implement password reset flow
- [ ] Add 2FA/MFA
- [ ] Role-based access control middleware
- [ ] Audit logging

---

**Quick Test**:
Visit http://localhost:3000 and click any of the 4 role badges to instantly login!
