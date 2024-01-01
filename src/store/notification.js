import { create } from "zustand";
import { request } from "../utils/request";

export const useNotification = create((set) => ({
  data: {},
  status: { success: false, error: false, code: 200, message: "" },
  isLoading: false,
  getNotification: async () => {
    set({ isLoading: true });

    try {
      const response = await request({
        url: "/perusahaan/get_notif",
        method: "get",
      });

      set((state) => ({
        isLoading: false,
        data: response.data.data,
        status: {
          success: true,
          error: false,
          code: response.status,
          message: response.data.info,
        },
      }));
    } catch (e) {
      console.error(e);
      const response = e.response;
      set((state) => ({
        isLoading: false,
        data: {},
        status: {
          success: false,
          error: true,
          code: response?.status,
          message: response?.data?.info,
        },
      }));
    }
  },
}));
