import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { addBook, getBook, getBooks, getIssuedBooks, issueBook } from "../controllers/book.controller";
import { upload } from "../services/storage.service";
const router = Router();

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/:id/issue', verifyAuth(['user']), issueBook)
router.get('/issued-books', verifyAuth(['user']), getIssuedBooks)
router.post('/', verifyAuth(['admin']), upload.single("image"), upload.single("pdf"), addBook)

export default router;