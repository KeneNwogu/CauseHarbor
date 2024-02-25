import { ProfileModel } from "../models";
import { Types } from "mongoose";
import organizationService from "./organization.service";
import { createVerificationCode } from "../utils/encrypt";
import { dateToUTCDate } from "../utils/date";
import { BadRequestError } from "../errors/bad-request-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createProfile = async (input: any) => {
    const existingProfile = await ProfileModel.findOne({ $or: [{ email: input.email }, { name: input.name }] });
    if(existingProfile && existingProfile.verified) throw new BadRequestError("Email already exists");

    if(existingProfile) return existingProfile;
    
    const verificationCode = createVerificationCode();
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 40);

    const verificationCodeExpiresAt = dateToUTCDate(expiresIn);

    const profile = await ProfileModel.create({ ...input, 
        verificationCode, verificationCodeExpiresAt,
        password: bcrypt.hashSync(input.password, 10)
    });

    return profile;
};

export const getProfileByEmail = async (email: string) => {
    return await ProfileModel.findOne({ email });
}

export const getProfileById = async (id: string | Types.ObjectId) => {
    return await ProfileModel.findById(id);
}

export const loginProfile = async (email: string, password: string) => {
    const profile = await getProfileByEmail(email);
    if(!profile) throw new BadRequestError("Invalid login credentials");

    const isPasswordValid = bcrypt.compareSync(password, profile.password);
    if(!isPasswordValid) throw new BadRequestError("Invalid login credentials");

    const token = jwt.sign(
        { id: profile.id, email: profile.email, role: profile.role },
        process.env.JWT_SECRET_KEY,
        // 10 minutes expiration time
        { expiresIn: "1h" }
    );

    if (profile.role === "organization") {
        const organization = await organizationService.getOrganizationByProfile(profile.id);
        return { profile, token, organization };
    }

    // if (profile.role === "donor") {
    //     const donor = await donorService.getDonorByProfile(profile.id);
    //     return { profile, token, donor };
    // }

    return { profile, token };
}

export const createProfileLoginToken = (profile: any) => {
    return jwt.sign(
        { id: profile.id, email: profile.email, role: profile.role },
        process.env.JWT_SECRET_KEY,
        // 10 minutes expiration time
        { expiresIn: "6h" }
    );
}

export default {
    createProfile,
    getProfileByEmail,
    loginProfile,
    getProfileById,
    createProfileLoginToken
}