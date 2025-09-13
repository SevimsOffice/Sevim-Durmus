
export interface User {
  id: string;
  email: string;
  name: string;
  partnerName: string;
  profile: {
    communicationStyle: string;
    attachmentType: string;
    sharedGoals: string[];
  };
}

export interface DailyRitual {
  conversationStarter: string;
  appreciationMessage: string;
  sharedActivity: string;
}

export interface JournalEntry {
  id: string;
  author: string;
  date: string;
  mood: 'joyful' | 'content' | 'neutral' | 'sad' | 'anxious';
  content: string;
}

export interface WeeklyCheckIn {
  analysis: string;
  experiments: string[];
}

export interface LibraryConcept {
  id: string;
  title: string;
  category: string;
}
