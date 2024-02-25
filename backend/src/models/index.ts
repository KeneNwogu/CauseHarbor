import mongoose, { Types, Model } from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },
    amountDonated: { type: Number, required: false, default: 0 },
    
    // check if they have verified their email address
    verificationCode: { type: String, required: false },
    verificationCodeExpiresAt: { type: Date, required: false },
    verified: { type: Boolean, default: false },
})

export const ProfileModel = mongoose.model('Profile', ProfileSchema);

const OrganizationSchema = new mongoose.Schema({
    missionStatement: { type: String, required: false },
    organizationLogo: { type: String, required: false },
    organizationGoals: { type: [String], required: false },
    introductionVideo: { type: String, required: false },
    profile: { ref: "Profile", type: Types.ObjectId, required: true },
    totalDonationsReceived: { type: Number, default: 0 },
    verified: { type: Boolean, default: false }
})

export const OrganizationModel = mongoose.model('Organization', OrganizationSchema)

const CampaignSchema = new mongoose.Schema({
    targetBudget: { type: Number, required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    campaignImage: { type: String, required: false },
    socialMediaLinks: { type: [String], required: false },
    goals: { type: [String], required: true },
    organization: { ref: "Organization", type: Types.ObjectId },
    verified: { type: Boolean, default: false },
    amountDonated: { type: Number, required: false, default: 0 },
})

export const CampaignModel = mongoose.model('Campaign', CampaignSchema)

const DonorSchema = new mongoose.Schema({
    profile: { ref: "Profile", type: Types.ObjectId },
    // campaigns: { ref: "Campaign", type: [Types.ObjectId] },
    amountDonated: { type: Number, required: true },
    date: { type: Date, required: true },
})

export const DonorModel = mongoose.model('Donor', DonorSchema)

const DonationSchema = new mongoose.Schema({
    campaign: { ref: "Campaign", type: Types.ObjectId },
    amount: { type: Number, required: true },
    trxRef: { type: String, required: true, unique: true },
    status: { type: String, enum: ["successful", "failed", "cancelled", "pending"], default: "pending" },
    verified: { type: Boolean, default: false },
    donor: { ref: "Profile", type: Types.ObjectId }
})

export const DonationModel = mongoose.model('Donation', DonationSchema)
