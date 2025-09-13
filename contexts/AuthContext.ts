
import React from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});


export const mockUser: User = {
  id: 'user123',
  email: 'alex@example.com',
  name: 'Alex',
  partnerName: 'Jordan',
  profile: {
    communicationStyle: 'Collaborative Problem-Solver',
    attachmentType: 'Secure',
    sharedGoals: ['Travel more', 'Improve communication', 'Save for a house']
  }
};
