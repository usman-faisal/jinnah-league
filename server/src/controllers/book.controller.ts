import { NextFunction, Request, Response } from "express";
import { validateBookCategory } from "../utils/helpers";
import { Book } from "../models/book.model";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getImageUrl, uploadFile } from "../services/storage.service";

export const getBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { category } = req.query;
        if (category && typeof category === "string") {
            if (validateBookCategory(category)) {
                const books = await Book.find({ category });
                return res.status(200).json({
                    success: true,
                    message: "Books fetched successfully",
                    data: books.map(book => {
                        return {
                            ...book,
                            url: getImageUrl(book.url),
                            cover: getImageUrl(book.cover)
                        }
                    })
                })
            }
        }
        return Book.find().then((books) => {
            return res.status(200).json({
                success: true,
                message: "Books fetched successfully",
                data: books.map(book => {
                    return {
                        ...book,
                        url: getImageUrl(book.url),
                        cover: getImageUrl(book.cover)
                    }
                })
            })
        })
    } catch (error) {
        return next(error);
    }
}

export const getBook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: book
        })
    } catch (error) {
        return next(error);
    }
}

export const updateBook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { id } = req.params;
        const { title, author, category } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }

        book.title = title;
        book.author = author;
        book.category = category;

        await book.save()

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        })
    } catch (error) {
        return next(error);
    }
}

export const addBook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { title, author, category } = req.body;
        const image = (req as any).image as Express.Multer.File
        const pdf = (req as any).pdf as Express.Multer.File
        console.log(req.body, image, pdf)

        const { filename: cover, response: responseImage } = await uploadFile(image)
        const { filename: url, response: responsePdf } = await uploadFile(pdf)

        if (!responseImage || !responsePdf) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image or pdf"
            })
        }
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const book = await Book.create({ title, cover, url, author, category });
        return res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: book
        })
    } catch (error) {
        return next(error);
    }
}

export const issueBook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const book = await Book
            .findById(id)
            .populate("issuedBy", "name email phone");

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }

        if (book.issuedBy) {
            return res.status(400).json({
                success: false,
                message: `Book already issued at ${book.issuedAt ?? ""}`
            })
        }

        book.issuedBy = user;
        book.issuedAt = new Date();

        await book.save()

        return res.status(200).json({
            success: true,
            message: "Book issued successfully",
            data: book
        })
    }
    catch (error) {
        return next(error)
    }
}


export const getIssuedBooks = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const books = await Book.find({ issuedBy: user })
        return res.status(200).json({
            success: true,
            message: "Issued books fetched successfully",
            data: books
        })
    } catch (error) {
        return next(error);
    }
}