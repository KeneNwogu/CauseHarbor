import { Router } from "express";
import { auth } from "../middlewares/auth";
import ZodMiddleware from "../middlewares/zodMiddleware";
import { createDonationSchema } from "../zodSchemas";
import { createDonation, verifyDonation } from "../controllers/donor.controller";

export default (router: Router) => {
    router.post(
        "/api/v1/donations",
        auth(),
        ZodMiddleware(createDonationSchema),
        createDonation
    )

    router.post(
        "/api/v1/donations/verify",
        verifyDonation
    )
};