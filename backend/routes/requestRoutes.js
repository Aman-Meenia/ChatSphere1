import express from "express";
import {
  acceptRequest,
  getAllRequestSent,
  getAllRequestsReceived,
  rejectRequest,
  sendRequest,
  withdrawRequest,
} from "../controller/requesetController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/send", verifyJWT, sendRequest);
router.post("/reject", verifyJWT, rejectRequest);
router.post("/accept", verifyJWT, acceptRequest);
router.get("/receive", verifyJWT, getAllRequestsReceived);
router.get("/sent", verifyJWT, getAllRequestSent);
router.post("/withdraw", verifyJWT, withdrawRequest);

export default router;
