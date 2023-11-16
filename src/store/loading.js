import { create } from "zustand";
export const useLoadingStore = create((set) => ({
  loading: {
    loading: 0,
    status: {},
  },
  setLoading: () => {
    return set((state) => ({
      loading: { ...state.loading, loading: state.loading + 1 },
    }));
  },
  setDone: () => {
    return set((state) => {
      let value = state.loading;
      if (state.loading > 0) {
        value -= 1;
      }
      return { loading: { ...state.loading, loading: value } };
    });
  },
}));
