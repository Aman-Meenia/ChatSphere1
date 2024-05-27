import express from "express";
import { getFriends } from "../controller/friendController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/get", verifyJWT, getFriends);

export default router;
