import { jwtDecode } from "jwt-decode";

const testJWT = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};

export default testJWT;
