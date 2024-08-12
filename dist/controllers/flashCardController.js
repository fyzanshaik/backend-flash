"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.editCard = exports.addFlashCard = exports.getAllCards = void 0;
const client_1 = require("@prisma/client");
const zod_type_1 = require("../zod-type");
const prisma = new client_1.PrismaClient();
const fc = prisma.flashCard;
// Get all flashcards
const getAllCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcards = yield fc.findMany({
            orderBy: {
                id: 'asc',
            },
        });
        res.status(200).json(flashcards);
    }
    catch (error) {
        console.error('Error fetching flashcards:', error);
        res.status(500).json({ error: 'An error occurred while fetching flashcards.' });
    }
});
exports.getAllCards = getAllCards;
// Add a new flashcard
const addFlashCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Title, Answer } = req.body;
        const validatedFlashcard = zod_type_1.flashcardSchema.parse({ Title, Answer });
        const newFlashcard = yield fc.create({
            data: validatedFlashcard,
        });
        res.status(201).json(newFlashcard);
    }
    catch (error) {
        console.error('Error adding flashcard:', error);
        res.status(500).json({ error: 'An error occurred while adding the flashcard.' });
    }
});
exports.addFlashCard = addFlashCard;
// Edit an existing flashcard
const editCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { Title, Answer } = req.body;
        const validatedFlashcard = zod_type_1.flashcardSchema.parse({ Title, Answer });
        const updatedFlashcard = yield fc.update({
            where: { id: Number(id) },
            data: validatedFlashcard,
        });
        res.status(200).json(updatedFlashcard);
    }
    catch (error) {
        console.error(`Error updating flashcard with id ${id}:`, error);
        res.status(500).json({ error: `An error occurred while updating the flashcard with id ${id}.` });
    }
});
exports.editCard = editCard;
// Delete a flashcard
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedFlashcard = yield fc.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(deletedFlashcard);
    }
    catch (error) {
        console.error(`Error deleting flashcard with id ${id}:`, error);
        res.status(500).json({ error: `An error occurred while deleting the flashcard with id ${id}.` });
    }
});
exports.deleteCard = deleteCard;
