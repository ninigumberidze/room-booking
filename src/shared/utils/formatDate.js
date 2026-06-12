export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("ka-GE");
}

export function formatDateForApi(date) {
  if (!date) return undefined;
  return date;
}
