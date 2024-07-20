import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";

export type ApiErrorType = {
  status: number;
  message: string;
  errors: string[];
};

export default function (
  err: ApiErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res
    .status(500)
    .json({ message: "Непредвиденная ошибка на стороне сервера" });
}
