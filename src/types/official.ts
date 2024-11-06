export type OfficialRole = 'referee' | 'umpire' | 'scorer';
export type OfficialStatus = 'active' | 'inactive' | 'suspended';
export type LicenseLevel = 'international' | 'national' | 'regional';

export interface Official {
  id: string;
  name: string;
  photo?: string;
  role: OfficialRole;
  licenseNumber: string;
  licenseLevel: LicenseLevel;
  licenseExpiry: string;
  nationality: string;
  status: OfficialStatus;
  experience: number; // years
  contactNumber: string;
  email: string;
  assignedMatches?: number;
  completedMatches?: number;
  rating?: number;
}