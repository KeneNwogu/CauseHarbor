import { Types } from "mongoose";
import { DonorModel, DonationModel, CampaignModel } from "../models";
import axios from "axios";
import { BadRequestError } from "../errors/bad-request-error";
import profileService from "./profile.service";


export const createDonation = async (campaign: Types.ObjectId, amount: number, 
    donor: string, email: string) => {
    const initializePaystackLink = "https://api.paystack.co/transaction/initialize";
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    const response = await axios.post(initializePaystackLink, {
        email,
        amount: amount * 100,
    }, { headers: { Authorization: `Bearer ${paystackSecretKey}` } });

    const { data } = response.data;
    const trxRef = data.reference;

    const paymentLink = data.authorization_url;

    await DonationModel.create({ campaign, amount, trxRef, donor: new Types.ObjectId(donor) });

    return paymentLink;
}

export const verifyDonation = async (trxRef: string) => {
    const verifyPaystackLink = `https://api.paystack.co/transaction/verify/${trxRef}`;
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    const response = await axios.get(verifyPaystackLink, { headers: { Authorization: `Bearer ${paystackSecretKey}` } });
    const { data } = response.data;

    let donation = await getDonationByTrxRef(trxRef);

    if(!donation) throw new BadRequestError("Donation not found");
    if(data.status !== "success") throw new BadRequestError("Invalid donation status");
    if(data.amount <= donation.amount) throw new BadRequestError("Invalid donation amount");


    donation.verified = true;
    await donation.save();

    let donor = await profileService.getProfileById(donation.donor.toString());
    donor.amountDonated += data.amount;

    let campaign = await getCampaignById(donation.campaign.toString());
    campaign.amountDonated += data.amount;

    await campaign.save();
    await donor.save();

    return true;
}

export const getCampaignById = async (id: string) => {
    return await CampaignModel.findById(id);
}

export const getDonationsByDonor = async (donor: Types.ObjectId) => {
    return await DonorModel.find({ donor });
}

export const getDonationByTrxRef = async (trxRef: string) => {
    return await DonationModel.findOne({ trxRef });
}

export const getDonations = async (campaign: Types.ObjectId | string) => {
    return await DonationModel.find({ campaign: new Types.ObjectId(campaign), verified: true });
}

export default {
    createDonation,
    verifyDonation,
    getDonationsByDonor,
    getDonations
};


