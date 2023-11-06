// import jwt from "jsonwebtoken";

// // Function to check if a token is expired
// export function isTokenExpired(token: string) {
//   try {
//     const decoded : {

//     } = jwt.decode(token);

//     if (!decoded || !decoded.exp) {
//       return true; // Token is considered expired if it cannot be decoded or has no expiration claim
//     }

//     const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
//     return currentTime > decoded.exp;
//   } catch (error) {
//     return true; // Handle any decoding errors as an expired token
//   }
// }
