export type MembershipStatus = 'active' | 'expired' | 'suspended' | 'pending';
export type MembershipType = 'player' | 'official' | 'coach' | 'team' | 'fan';

export interface Membership {
  id: string;
  memberId: string;
  type: MembershipType;
  name: string;
  photo?: string;
  dateOfBirth: string;
  nationality: string;
  email: string;
  phone: string;
  status: MembershipStatus;
  validFrom: string;
  validUntil: string;
  team?: string;
  role?: string;
  licenseNumber?: string;
  qrCode: string;
}