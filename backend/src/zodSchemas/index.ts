import { string, object, array, enum as enum_, number, coerce } from "zod";

export const createProfileSchema = object({
    name: string({ required_error: "name is required" }).min(3),
    email: string({ required_error: "email is required" }).email(),
    phone: string().optional(),
    password: string({ required_error: "password is required" }).min(6),
    role: enum_(["donor", "organization"], { required_error: "profile role is required", 
    invalid_type_error: "profile role must be either 'donor' or 'organization'" })
})

export const verifyProfileSchema = object({
    email: string({ required_error: "email is required" }).email(),
    verificationCode: string({ required_error: "verification code is required" }).length(6)
})

export const loginProfileSchema = object({
    email: string({ required_error: "email is required" }).email(),
    password: string({ required_error: "password is required" })
})

export const createEmployerSchema = object({
    firstName: string({ required_error: "first name is required" }).min(4),
    lastName: string({ required_error: "last name is required" }).min(3),
    email: string({ required_error: "email is required" }).email(),
    companyName: string({ required_error: "company name is required" }).min(3),
    phone: string().optional(),
    password: string({ required_error: "password is required" }).min(6)
}).strict()

export const createOrganizationSchema = object({
    missionStatement: string({ required_error: "mission statement is required" }).min(4),
    organizationGoals: array(string({ required_error: "organization goals is required" })).min(3),
}).strict()

export const createCampaignSchema = object({
    targetBudget: coerce.number({ required_error: "a target budget is required", 
    invalid_type_error: "Expected a number." }),
    title: string({ required_error: "title of the campaign is required" }),
    description: string({ required_error: "description is required"}),
    goals: array(string({ required_error: "goal is required"})).min(3)
})

export const createDonationSchema = object({
    campaign: string({ required_error: "campaign is required" }),
    amount: coerce.number({ required_error: "amount is required", 
    invalid_type_error: "Expected a number." }).min(100)
})