"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flashCardController_1 = require("../controllers/flashCardController");
const router = express_1.default.Router();
router.get('/get-flash-cards', flashCardController_1.getAllCards);
router.post('/add-flash-card', flashCardController_1.addFlashCard);
router.put('/edit-flash-card/:id', flashCardController_1.editCard);
router.delete('/delete-flash-card/:id', flashCardController_1.deleteCard);
exports.default = router;
