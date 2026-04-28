import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedDoc: null,
  currentStep: 0, // 0 = Page 1, 1 = Page 2, 2 = Page 3
  
  setSelectedDoc: (doc) => set({ selectedDoc: doc, currentStep: 0 }),
  setCurrentStep: (step) => set({ currentStep: step }),
  reset: () => set({ selectedDoc: null, currentStep: 0 }),
}));