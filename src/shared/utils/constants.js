export const USER_TYPE = {
  Student: 0,
  Lecturer: 1,
  Moderator: 2,
  Admin: 3,
};

export const USER_TYPE_LABEL = {
  0: "სტუდენტი",
  1: "ლექტორი",
  2: "მოდერატორი",
  3: "ადმინისტრატორი",
};

export const GENDER = {
  Male: 0,
  Female: 1,
};

export const ROOM_TYPE = {
  Lecture: 1,
  LibraryStudyRoom: 2,
  Laboratory: 3,
  Practical: 4,
};

export const ROOM_TYPE_LABEL = {
  1: "სალექციო",
  2: "საბიბლიოთეკო",
  3: "სალაბორატორიო",
  4: "პრაქტიკული",
};

export const WEEK_DAYS = [
  { value: "monday", label: "ორშაბათი" },
  { value: "tuesday", label: "სამშაბათი" },
  { value: "wednesday", label: "ოთხშაბათი" },
  { value: "thursday", label: "ხუთშაბათი" },
  { value: "friday", label: "პარასკევი" },
];

export const BOOKING_TYPE = {
  Single: "single",
  Semester: "semester",
};
