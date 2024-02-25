import router from ".";
import { createCampaign, createOrganization, listCampaigns, listCampaignsForOrganization } from "../controllers/organization.controller";
import { auth } from "../middlewares/auth";
import upload from "../middlewares/multer";
// import { auth } from "../middlewares/auth";

import ZodMiddleware from "../middlewares/zodMiddleware";
import { createCampaignSchema, createOrganizationSchema } from "../zodSchemas";

import { Router } from "express";

export default (router: Router) => {
    router.post(
        "/api/v1/organizations",
        auth("organization"),
        upload.fields([
            { name: 'logo', maxCount: 1 },
            { name: 'introVideo', maxCount: 1 }
        ]),
        ZodMiddleware(createOrganizationSchema),
        createOrganization
    )

    router.post(
        "/api/v1/campaigns",
        auth("organization"),
        upload.single("campaignImage"),
        ZodMiddleware(createCampaignSchema),
        createCampaign
    )

    router.get(
        "/api/v1/campaigns",
        listCampaigns
    )

    router.get(
        "/api/v1/campaigns/:campaignId/donations",
        listCampaignsForOrganization
    )
};