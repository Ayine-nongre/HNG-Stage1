import express from 'express'
import { FetchOrganisationDetailById, FetchOrganisationsDetails, FetchUserDetails } from '../controller/FetchDetailsController.js'
import { verifyToken } from '../middleware/createToken.js'
import { createOrgValidator } from '../utils/orgValidator.js'
import { createOrg } from '../controller/CreateOrgController.js'
import { AddUser } from '../controller/AddUserController.js'

export const userRouter = express.Router()

userRouter.get('/users/:id', verifyToken, FetchUserDetails)
userRouter.get('/organisations', verifyToken, FetchOrganisationsDetails)
userRouter.post('/organisations', verifyToken, createOrgValidator, createOrg)
userRouter.get('/organisations/:orgId', verifyToken, FetchOrganisationDetailById)
userRouter.post('/organisations/:orgId/users', AddUser)