import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "123456", (error, data) => {
      if (error) {
        console.log(error);
        if (error.name == "TokenExpiredError") {
          return res.status(400).json({ message: "Token het han" });
        } else if (error.name == "JsonWebTokenError") {
          return res.status(400).json({ message: "Token khong hop le" });
        }
      }
      next();
    });
  }
  //   next();
};
