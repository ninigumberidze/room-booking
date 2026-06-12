import api from "./api";

export const authService = {
  register(data) {
    return api.post("/api/identity/register", data, {
      headers: {
        "Accept-Language": "en",
      },
    });
  },

  verifyEmailOtp(data) {
    return api.post("/api/identity/verifyEmailOtp", data);
  },

  resendEmailOtp(data) {
    return api.post("/api/identity/resend-email-otp", data);
  },

  login(data) {
    return api.post("/api/identity/login", data);
  },

  forgotPassword(data) {
    return api.post("/api/identity/forgotPassword", data);
  },

  resetPassword(data) {
    return api.post("/api/identity/reset-password", data);
  },

  logout() {
    return api.post("/api/identity/logout");
  },

  getProfile() {
    return api.get("/api/identity/profile/me");
  },
  resendPasswordResetOtp(data) {
    return api.post("/api/identity/resendPasswordResetOtpEndpoint", data);
  },
};
