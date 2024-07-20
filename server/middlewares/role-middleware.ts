import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function (roleRequired: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const token = authHeader.split(" ")[1];
      console.log(token);
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const secret = process.env.JWT_ACCESS_SECRET;
      if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not defined");
      }
      const { role } = jwt.verify(token, secret) as { role: string };
      console.log(role);
      if (role == roleRequired) {
        next();
      } else {
        res.status(403).json({
          message: "Доступ запрещен. У пользователя недостаточно прав.",
        });
      }
    } catch (error) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
}
