import { Types } from "mongoose";
import { CampaignModel, OrganizationModel } from "../models";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const createOrganization = async (input: any) => {
    return await OrganizationModel.create({ ...input, profile: new Types.ObjectId(input.profile) });
};

export const getOrganizationByProfile = async (profileId: string | Types.ObjectId, raiseException=true) => {
    const organization = await OrganizationModel.findOne({ profile: new Types.ObjectId(profileId) });
    if (!organization && raiseException) 
        throw new NotAuthorizedError("You do not have an organization yet. Create an organization to continue");
    return organization;
}

export const createCampaign = async (input: any, organization: string | Types.ObjectId) => {
    return await CampaignModel.create({ ...input, organization: new Types.ObjectId(organization) })
}

export const getCampaignsForOrganization = async (organization: string | Types.ObjectId) => {
    return await CampaignModel.find({ organization: new Types.ObjectId(organization) }).populate('organization');
}

export const getCampaigns = async () => {
    return await CampaignModel.find().populate({ path: 'organization', populate: { path: 'profile' } });
}

export default {
    createOrganization,
    getOrganizationByProfile,
    createCampaign,
    getCampaignsForOrganization,
    getCampaigns
};
