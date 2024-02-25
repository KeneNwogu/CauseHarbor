import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { emailVerificationTemplate, sendMail } from '../utils/email';
import organizationService from '../services/organization.service';
import profileService from '../services/profile.service';
import { Readable } from 'stream';
import cloudinary, { uploadImage } from '../utils/cloudinary';
import { dateToUTCDate } from '../utils/date';
import donorService from '../services/donor.service';


export const createDonation = async (req: Request, res: Response) => {
    // Logic to create a new donation in the database
    const { campaign, amount } = req.body;

    const paymentLink = await donorService.createDonation(campaign, amount, req.user.id, req.user.email);
    return res.status(201).json({ paymentLink });
}

export const verifyDonation = async (req: Request, res: Response) => {
    // Logic to verify a donation
    const { trxRef } = req.body;

    const verified = await donorService.verifyDonation(trxRef);
    return res.json({ verified });
}

export const listDonations = async (req: Request, res: Response) => {
    // Logic to list donations
    const donations = await donorService.getDonations(req.params.campaignId);
    return res.json({ donations });
}