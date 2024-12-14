import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { addBook } from "../controllers/book.controller";
import { upload } from "../services/storage.service";
const router = Router();

router.post('/book', verifyAuth(['admin']), upload.single("image"), upload.single("pdf"), addBook)

export default router;