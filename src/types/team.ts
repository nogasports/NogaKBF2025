export interface Player {
  id: string;
  name: string;
  jerseyNumber: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  height: string;
  weight: string;
  status: 'active' | 'injured' | 'suspended';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  nationality: string;
  dateOfBirth: string;
  licenseNumber: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  founded: string;
  homeVenue: string;
  players: Player[];
  staff: Staff[];
  division: string;
  status: 'active' | 'inactive';
}