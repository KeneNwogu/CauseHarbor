import { Request, Response } from 'express';
import profileService from '../services/profile.service';
import { BadRequestError } from '../errors/bad-request-error';
import { emailVerificationTemplate, sendMail } from '../utils/email';
import jwt from "jsonwebtoken";

// POST /profile
export const initializeProfile = async (req: Request, res: Response) => {
    // Logic to create a new organization in the database
    const { name, email, phone, password, role } = req.body;

    const profile = await profileService.createProfile({ name, email, phone, password, role });
    await sendMail(email, "Email Verification", emailVerificationTemplate(name, profile.verificationCode));
    return res.status(201).json({ profile });
};

export const verifyProfile = async (req: Request, res: Response) => {
    // Logic to verify an profile
    const { email, verificationCode } = req.body;

    const profile = await profileService.getProfileByEmail(email);
    if(!profile) throw new BadRequestError("Invalid email address");

    if(profile.verificationCode !== verificationCode) throw new BadRequestError("Invalid verification code");
    
    profile.verified = true;
    await profile.save();

    const token = jwt.sign(
        { id: profile.id, email: profile.email, role: profile.role },
        process.env.JWT_SECRET_KEY,
        // 10 minutes expiration time
        { expiresIn: "1h" }
    );

    return res.json({ profile, token });
}

export const loginProfile = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const profile = await profileService.loginProfile(email, password);
    return res.json(profile);
}