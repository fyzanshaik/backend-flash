"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardSchema = void 0;
const zod_1 = require("zod");
exports.flashcardSchema = zod_1.z.object({
    Title: zod_1.z.string(),
    Answer: zod_1.z.string(),
});
