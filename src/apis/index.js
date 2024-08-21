export const baseUrl = "https://gapi.beetkom.org/";

export const routes = {
  // auth
  sign_up: "api/auth/register",
  login: "api/auth/login",
  sendOtp: "api/auth/sendOtp",
  verify_otp: "api/auth/verifyOtp",
  resetPassword: "api/auth/resetPassword",
  forgotPassword: "api/auth/forgotPassword",

  // read
  read_properties: "api/read/Properties",
  postRating: "api/write/postRating",
  editReview: "api/editRating",
  deleteRating: "api/deleteRating",
  getRating: "api/read/getRating",
  getAllRatings: "api/read/getAllRatings",
  getAvgRating: "api/read/getAvgRating",
};
