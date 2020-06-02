import jwtDecode from "jwt-decode";

export const getJWT = () => {
  return localStorage.getItem("token");
};
