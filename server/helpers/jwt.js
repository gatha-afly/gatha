import jwt from "jsonwebtoken";

/**
 * Handler for generating JWT token
 * @param {*} userId
 * @returns
 */
export const generateJwt = (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
  return token;
};

/**
 * Handler for verifying JWT token
 * @param {*} token
 * @returns
 */
export const verifyJwt = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
