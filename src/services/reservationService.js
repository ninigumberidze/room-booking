import api from "./api";

export const reservationService = {
  getFilters() {
    return api.get("/api/reservations/filters");
  },

  getRooms(params) {
    return api.get("/api/reservations/rooms", {
      params,
    });
  },

  getAvailability(roomId, date) {
    return api.get(`/api/reservations/rooms/${roomId}/availability`, {
      params: { date },
    });
  },

  createReservation(data) {
    return api.post("/api/reservations", data);
  },

  createRecurringReservation(data) {
    return api.post("/api/reservations/recurring", data);
  },

  getMyReservations() {
    return api.get("/api/reservations/me");
  },

  getReservation(id) {
    return api.get(`/api/reservations/${id}`);
  },

  deleteReservation(id) {
    return api.delete(`/api/reservations/${id}`);
  },

  deleteReservationManagement(reservationId) {
    return api.delete(`/api/reservations/management/${reservationId}`);
  },

  deleteSeriesManagement(reservationSeriesId) {
    return api.delete(
      `/api/reservations/management/series/${reservationSeriesId}`,
    );
  },
};
