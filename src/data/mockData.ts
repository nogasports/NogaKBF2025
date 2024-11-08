import { Team } from '../types/team';

export const mockTeam: Team = {
  id: '1',
  name: 'Ulinzi Warriors',
  logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
  founded: '1995',
  homeVenue: 'Nyayo Stadium',
  division: 'Premier',
  status: 'active',
  players: [
    {
      id: '1',
      name: 'John Doe',
      jerseyNumber: '23',
      position: 'Guard',
      dateOfBirth: '1995-05-15',
      nationality: 'Kenyan',
      height: '6\'2"',
      weight: '185',
      status: 'active',
    },
    {
      id: '2',
      name: 'James Smith',
      jerseyNumber: '15',
      position: 'Forward',
      dateOfBirth: '1997-08-22',
      nationality: 'Kenyan',
      height: '6\'5"',
      weight: '205',
      status: 'active',
    },
    {
      id: '3',
      name: 'Michael Johnson',
      jerseyNumber: '11',
      position: 'Center',
      dateOfBirth: '1994-03-10',
      nationality: 'Kenyan',
      height: '6\'8"',
      weight: '225',
      status: 'injured',
    },
  ],
  staff: [
    {
      id: '1',
      name: 'James Smith',
      role: 'Head Coach',
      nationality: 'Kenyan',
      dateOfBirth: '1975-03-20',
      licenseNumber: 'KBF-HC-001',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      role: 'Assistant Coach',
      nationality: 'Kenyan',
      dateOfBirth: '1982-06-15',
      licenseNumber: 'KBF-AC-002',
    },
    {
      id: '3',
      name: 'David Kimani',
      role: 'Team Physician',
      nationality: 'Kenyan',
      dateOfBirth: '1978-11-30',
      licenseNumber: 'KBF-TP-003',
    },
  ],
};