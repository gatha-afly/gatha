import cookie from "cookie";
import jwt from "jsonwebtoken";

const socketAuthMiddleware = (socket, next) => {
  const cookieFromHeaders = socket.handshake.headers.cookie;

  if (cookieFromHeaders) {
    const cookies = cookie.parse(socket.handshake.headers.cookie);
    jwt.verify(cookies.userToken, process.env.SECRET_KEY, function (err, user) {
      if (err) return next(new Error("Authentication error"));
      socket.user = user;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
};

export default socketAuthMiddleware;
