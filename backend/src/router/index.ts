import { Router } from "express";
import profileRouter from "./profile.router";
import organizationRouter from "./organization.router";
import donorRouter from "./donor.router";

const router = Router();

export default (): Router => {
    profileRouter(router);
    organizationRouter(router);
    donorRouter(router);
    return router;
};
