import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  accessToken: localStorage.getItem("accessToken") || null,

  refreshToken: localStorage.getItem("refreshToken") || null,

  expiresAtUtc: localStorage.getItem("expiresAtUtc") || null,

  login: (data) => {
    localStorage.setItem("accessToken", data.accessToken);

    localStorage.setItem("refreshToken", data.refreshToken);

    localStorage.setItem("expiresAtUtc", data.expiresAtUtc);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    set({
      user: data.user || null,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAtUtc: data.expiresAtUtc,
    });
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    set({ user });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAtUtc");
    localStorage.removeItem("user");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresAtUtc: null,
    });
  },
}));

export default useAuthStore;
export const useUser = () => useAuthStore((state) => state.user);
export const useLogout = () => useAuthStore((state) => state.logout);
