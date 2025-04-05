import { create } from "zustand";
interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string; // Optional
  gender: "Male" | "Female" | "Other";
  country?: string; // Optional
  city?: string; // Optional
  bio?: string; // Optional;
  ifpc: string;
}
interface ProfileState {
  profile: ProfileData;
  setProfile: (profile: Partial<ProfileData>) => void; // Partial updates
  resetProfile: () => void; // Reset to initial state
}

const initialProfile: ProfileData = {
  email: "",
  firstName: "",
  lastName: "",
  dateOfBirth: undefined,
  gender: "Other",
  country: undefined,
  city: undefined,
  bio: undefined,
  ifpc: "",
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: initialProfile,
  setProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),
  resetProfile: () =>
    set(() => ({
      profile: initialProfile,
    })),
    
}));
