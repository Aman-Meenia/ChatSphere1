import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/send", verifyJWT, sendMessage);
router.post("/get", verifyJWT, getAllMessages);

export default router;
