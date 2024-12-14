import { Schema, models, model, Model } from "mongoose";
import { BookCategory, IBook } from "../types/type";


const BookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            unique: true,
        },
        cover: {
            type: String,
            required: [true, "Cover is required"],
            trim: true,
        },
        url: {
            type: String,
            required: [true, "URL is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            enum: Object.values(BookCategory),
            validate: {
                validator: function (v: string) {
                    return Object.values(BookCategory).includes(v as BookCategory);
                },
                message: (props) => `${props.value} is not a valid category`,
            }
        },
        issuedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        issuedAt: {
            type: Date,
        }
    },

)

export const Book: Model<IBook> = models.Book || model("Book", BookSchema);
