import { Request, Response } from 'express';
import { createProfile } from '../services/profile.service';
import { BadRequestError } from '../errors/bad-request-error';
import { emailVerificationTemplate, sendMail } from '../utils/email';
import organizationService from '../services/organization.service';
import profileService from '../services/profile.service';
import { Readable } from 'stream';
import cloudinary, { uploadImage } from '../utils/cloudinary';
import { dateToUTCDate } from '../utils/date';
import { NotFoundError } from '../errors/not-found-error';

// GET /organizations
export const listOrganizations = async (req: Request, res: Response) => {
    // Logic to fetch organizations from the database
    return res.json({message: "List organizations"});
};

// POST /organizations
export const createOrganization = async (req: Request, res: Response) => {
    // Logic to create a new organization in the database
    const { missionStatement, organizationGoals, } = req.body;

    if(await organizationService.getOrganizationByProfile(req.user.id, false)) 
        throw new BadRequestError("You already have an organization");

    if(!req.files['logo']) throw new BadRequestError("logo is required")

    const logo = req.files['logo'][0]
    
    const introVideo = (req.files['introVideo'] || [])[0]

    // if (!logo) throw new BadRequestError("logo is required")

    // const upload = await cloudinary.uploader.upload(String(logo.path), {
    //     folder: "cause-harbour",
    // });
    const upload: any = await uploadImage(logo.buffer);

    let logoUrl = upload.secure_url;

    let introVideoUrl = null;
    if(introVideo) introVideoUrl = (await uploadImage(introVideo.buffer)).secure_url;

    const organization = 
    await organizationService.createOrganization({ missionStatement, organizationGoals, 
        organizationLogo: logoUrl, introductionVideo: introVideoUrl, profile: req.user.id
    });

    const token = profileService.createProfileLoginToken(req.user);
    const profile = await profileService.getProfileById(req.user.id);

    return res.status(201).json({ organization, token, profile, message: "Organization created successfully" });
};

export const createCampaign =async (req: Request, res: Response) => {
    const { targetBudget, title, description, goals } = req.body

    if(!req.file) throw new BadRequestError("campaign image is required")

    let campaignImage: any = req.file

    campaignImage = await uploadImage(campaignImage.buffer);

    campaignImage = campaignImage.secure_url

    const organization = await organizationService.getOrganizationByProfile(req.user.id);

    const campaign = await organizationService.createCampaign({
        targetBudget, title, description, goals, date: dateToUTCDate(), 
        campaignImage
    }, organization._id);

    return res.json({ campaign });
}

export const organizationDashboard = async (req: Request, res: Response) => {
    const organization = await organizationService.getOrganizationByProfile(req.user.id);

    const campaigns = await organizationService.getCampaignsForOrganization(organization._id);

    return res.json({ organization, campaigns });
}

export const listCampaigns = async (req: Request, res: Response) => {
    const campaigns = await organizationService.getCampaigns();
    return res.json({ campaigns });
}

export const listCampaignsForOrganization = async (req: Request, res: Response) => {
    let organization = null
    if(req.params.organizationId){
        organization = await organizationService.getOrganizationById(req.user.id);
    }

    else {
        organization = await organizationService.getOrganizationByProfile(req.user.id);
    }

    if(!organization) throw new NotFoundError("no organization was found");

    const campaigns = await organizationService.getCampaignsForOrganization(organization._id);
    return res.json({ campaigns });
}

export const getCampaignDetails = async (req: Request, res: Response) => {
    const campaign = await organizationService.getCampaignById(req.params.campaignId);
    if(!campaign) throw new NotFoundError("no campaign found");
    return res.json({ campaign })
}
