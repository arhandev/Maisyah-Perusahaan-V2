import { create } from "zustand";
export const useCandidateStore = create((set) => ({
  candidateData: {},
  setCandidate: (data) => {
    return set((state) => ({ ...state, candidateData: data }));
  },
  deleteCandidate: () => {
    return set((state) => ({ ...state, candidateData: {} }));
  },
}));
