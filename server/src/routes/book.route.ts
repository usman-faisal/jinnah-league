import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { addBook, getBook, getBooks, getIssuedBooks, issueBook } from "../controllers/book.controller";
import { upload } from "../services/storage.service";
const router = Router();

router.get('/books', getBooks)
router.get('/books/:id', getBook)
router.post('/books/:id/issue',verifyAuth(['user']), issueBook)
router.get('/issued-books', verifyAuth(['user']), getIssuedBooks)
router.post('/books', verifyAuth(['admin']), upload.single("image"), upload.single("pdf"), addBook)

export default router;