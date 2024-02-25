import { initializeProfile, loginProfile, verifyProfile } from "../controllers/profile.controller";
import { auth } from "../middlewares/auth";

import ZodMiddleware from "../middlewares/zodMiddleware";
import { createProfileSchema, loginProfileSchema, verifyProfileSchema } from "../zodSchemas";

import { Router } from "express";

export default (router: Router) => {
    router.post(
        "/api/v1/profile",
        ZodMiddleware(createProfileSchema),
        initializeProfile
    );

    router.post(
        "/api/v1/profile/verify",
        ZodMiddleware(verifyProfileSchema),
        verifyProfile
    );

    router.post(
        "/api/v1/profile/login",
        ZodMiddleware(loginProfileSchema),
        loginProfile
    );
};