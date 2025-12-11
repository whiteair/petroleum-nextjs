export interface DashboardStats {
  totalCompanies: number;
  submittedReports: number;
  approvedReports: number;
  uncheckedReports: number;
}

export type SubmissionStatus = 'pending' | 'approved' | 'declined';

export interface Submission {
  id: number;
  companyId: number;
  companyName: string;
  reportType: string;
  dateSubmitted: string;
  status: SubmissionStatus;
}

export type PermitStatus = 'active' | 'inactive';
export type CompanyType = 'International Oil Company' | 'Local Oil Company' | 'Service Company' | 'National Oil Company';

export interface Company {
  id: number;
  name: string;
  registeredName: string;
  type: CompanyType;
  logo: string;
  email: string;
  address: string;
  telephone: string;
  website: string;
  registrationNumber: string;
  permitNumber: string;
  permitStatus: PermitStatus;
  tin: string;
  servicesProvided: string;
  incorporationDate: string;
  commencementDate: string;
  totalEmployees: number;
  ghanaianEmployees: number;
  status: string;
  contracts?: {
    total: number;
    active: number;
    past: number;
  };
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  category: string;
}

export type ApplicationStatus = 'not_submitted' | 'submitted' | 'under_review' | 'approved';
export type PaymentStatus = 'not_paid' | 'pending' | 'paid' | 'verified';
export type FormStatus = 'incomplete' | 'complete' | 'needs_revision';
export type ApprovalStatus = 'not_approved' | 'pending' | 'approved' | 'rejected';

export interface CompanyStatus {
  companyId: number;
  applicationStatus: ApplicationStatus;
  paymentStatus: PaymentStatus;
  formStatus: FormStatus;
  approvalStatus: ApprovalStatus;
  lastUpdated: string;
}

export interface MasterData {
  statistics: DashboardStats;
  companies: Company[];
  submissions: Submission[];
  news: NewsItem[];
  companyTypes: CompanyType[];
  statusTypes: SubmissionStatus[];
}
