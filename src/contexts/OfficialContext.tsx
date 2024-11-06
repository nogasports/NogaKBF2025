import React, { createContext, useContext, useState } from 'react';
import { Official } from '../types/official';

// Mock data for demonstration
const mockOfficial: Official = {
  id: '1',
  name: 'John Smith',
  role: 'referee',
  licenseNumber: 'KBF-REF-001',
  licenseLevel: 'international',
  licenseExpiry: '2024-12-31',
  nationality: 'Kenyan',
  status: 'active',
  experience: 8,
  contactNumber: '+254 712 345 678',
  email: 'john.smith@kbf.co.ke',
  assignedMatches: 45,
  completedMatches: 42,
  rating: 4.8,
};

interface OfficialContextType {
  currentOfficial: Official;
  setCurrentOfficial: (official: Official) => void;
}

const OfficialContext = createContext<OfficialContextType | undefined>(undefined);

export const OfficialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOfficial, setCurrentOfficial] = useState<Official>(mockOfficial);

  return (
    <OfficialContext.Provider value={{ currentOfficial, setCurrentOfficial }}>
      {children}
    </OfficialContext.Provider>
  );
};

export const useOfficial = () => {
  const context = useContext(OfficialContext);
  if (context === undefined) {
    throw new Error('useOfficial must be used within an OfficialProvider');
  }
  return context;
};