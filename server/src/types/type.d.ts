import { Document, PaginateModel, Schema } from "mongoose";
import { ROLES } from "../utils/constants";

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface IUser extends Document {
  email: string;
  password: string;
  phone: string;
  address?: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
  hasNotifications: boolean;
  isEmailVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
}

export enum BookCategory {
  Fiction = "Fiction",
  NonFiction = "Non-Fiction",
  Science = "Science",
  Technology = "Technology",
  Mystery = "Mystery",
  Thriller = "Thriller",
  Romance = "Romance",
  Horror = "Horror",
  Fantasy = "Fantasy",
  Adventure = "Adventure",
  Biography = "Biography",
  Autobiography = "Autobiography",
  SelfHelp = "Self-Help",
  Health = "Health",
  History = "History",
  Travel = "Travel",
  Guide = "Guide",
  Children = "Children",
  Comics = "Comics",
  GraphicNovels = "Graphic Novels",
  Poetry = "Poetry",
  Drama = "Drama",
  Action = "Action",
  Suspense = "Suspense",
  Dystopian = "Dystopian",
  ScienceFiction = "Science Fiction",
  Humor = "Humor",
  Satire = "Satire",
  Anthology = "Anthology",
  Encyclopedias = "Encyclopedias",
  Dictionaries = "Dictionaries",
  Cookbooks = "Cookbooks",
  Diaries = "Diaries",
  Journals = "Journals",
  PrayerBooks = "Prayer Books",
  Series = "Series",
  Trilogy = "Trilogy",
  Guidebook = "Guidebook",
  Textbook = "Textbook",
  Manual = "Manual",
  Reference = "Reference",
  Almanac = "Almanac",
  Atlas = "Atlas",
  Dictionary = "Dictionary",
  Encyclopedia = "Encyclopedia",
  Handbook = "Handbook",
  Thesaurus = "Thesaurus",
  Bible = "Bible",
  Quran = "Quran",
  Vedas = "Vedas",
  Upanishads = "Upanishads",
  Puranas = "Puranas",
  Ramayana = "Ramayana",
  Mahabharata = "Mahabharata",
  BhagavadGita = "Bhagavad Gita",
  YogaSutras = "Yoga Sutras",
  Sutras = "Sutras",
  Agamas = "Agamas",
  Tantras = "Tantras",
  Samhitas = "Samhitas",
  Brahmanas = "Brahmanas",
}

export interface IBook extends Document {
  title: string;
  author: string;
  cover: string;
  url: string;
  issuedBy?: IUser;
  issuedAt?: Date;
  category: BookCategory;
}

export interface INotification extends Document {
  content: string;
  fromUser: IUser;
  toUser: IUser;
  read: IUser[];
}