import testJWT from "./jwtTest";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found");
    return false;
  }

  const decoded = testJWT(token);
  if (!decoded) {
    console.log("Invalid or expired token");
    return false;
  }

  // Optionally, check if the token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp && decoded.exp < currentTime) {
    console.log("Token expired");
    return false;
  }

  console.log("User is authenticated");
  return true;
};
