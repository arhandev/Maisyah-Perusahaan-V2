import Cookies from "js-cookie";
import { create } from "zustand";
export const useUserStore = create((set) => ({
  userData: {},
  isLoggedIn: false,
  setIsLoggedIn: (data) => {
    return set((state) => ({ ...state, isLoggedIn: !data }));
  },
  setUser: (data) => {
    return set((state) => ({ ...state, userData: data }));
  },
  deleteUser: () => {
    Cookies.remove("user_perusahaan");
    Cookies.remove("token_perusahaan");
    return set((state) => ({ ...state, userData: {} }));
  },
}));
