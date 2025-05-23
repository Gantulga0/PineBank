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
exports.createProfile = void 0;
const client_1 = require("@prisma/client");
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, userId, address, phone, image } = req.body;
        const prisma = new client_1.PrismaClient();
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const existingProfile = yield prisma.userProfile.findUnique({
            where: { userId: userId },
        });
        if (existingProfile) {
            return res.json({ message: "Profile is already existed" });
        }
        const profile = yield prisma.userProfile.create({
            data: {
                firstName,
                lastName,
                address,
                phone,
                image,
                user: {
                    connect: { id: userId }, // Connect the profile to the user
                },
            },
        });
        res.status(201).json({
            message: "Profile created successfully",
            profile,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Profile creation failed",
        });
    }
});
exports.createProfile = createProfile;
