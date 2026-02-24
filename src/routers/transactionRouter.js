import express from "express"
import transactionController from "../controllers/transactionController.js"
import { clerkMiddleware } from "@clerk/express"
import authMiddleware from "../middlewares/authMiddleware.js"
import upload from "../middlewares/upload.js"

const transactionRouter = express.Router()

transactionRouter.post(
  "/",
  clerkMiddleware(),
  authMiddleware,
  transactionController.create,
)
transactionRouter.post(
  "/ocr",
  clerkMiddleware(),
  authMiddleware,
  upload.single("image"),
  transactionController.processOCR,
)

transactionRouter.put(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  transactionController.update,
)
transactionRouter.delete(
  "/:id",
  clerkMiddleware(),
  authMiddleware,
  transactionController.remove,
)
transactionRouter.get(
  "/",
  clerkMiddleware(),
  authMiddleware,
  transactionController.getAll,
)

export default transactionRouter
