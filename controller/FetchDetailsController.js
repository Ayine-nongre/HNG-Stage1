import { Sequelize } from "sequelize"
import { Organization } from "../model/Organization.js"
import { User } from "../model/User.js"
import { User_Organization } from "../model/User_Organization.js"

export const FetchUserDetails = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({
        "status": "Failed",
        "message": "No user's id found"
    })

    if (id !== req.user.id) return res.status(401).json({
        "status": "Bad Request",
        "message": "Authentication failed",
        "statusCode": 401
    })

    const user = await User.findOne({ where: { id }}).catch(err => {
        console.log(err)
        return res.status(500).json({
            "status": "Failed",
            "message": "Internal server error",
            "statusCode": 500
        })
    })

    if (!user) return res.status(404).json({
        "status": "Failed",
        "message": "User with this id does not exist",
        "statusCode": 404
    })

    return res.status(200).json({
        "status": "Success",
        "message": "Fetched user's data successfully",
        "data": {
            "user": {
                "userId": user.id,
                "firstName": user.firstname,
                "lastName": user.lastname,
                "email": user.email,
                "phone": user.phone
            }
        }
    })
}

export const FetchOrganisationsDetails = async (req, res) => {
    try {
        const user = await User.findAll({ 
            where: { id: req.user.id },
            include: Organization 
        })

        const org = user[0].dataValues.organizations
        const orgs = []

        org.map((data) => {
            orgs.push({
                "orgId": data.dataValues.id,
                "name": data.dataValues.name,
                "description": data.dataValues.description
            })
        })

        return res.status(200).json({
            "status": "Success",
            "message": "Fetched organisations successfully",
            "data": {
                "organisations": orgs
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            "status": "Failed",
            "message": "internal server error",
            "statusCode": 500
        })
    }
}

export const FetchOrganisationDetailById = async (req, res) => {
    try {
        const { orgId } = req.params

        if (!orgId) return res.status(404).json({
            "status": "Failed",
            "message": "No organisation's id found",
            "statusCode": 404
        })

        const org = await Organization.findOne({ where: { id: orgId } })

        if (!org) return res.status(404).json({
            "status": "Failed",
            "message": "Organisation with this id does not exist",
            "statusCode": 404
        })

        return res.status(200).json({
            "status": "Success",
            "message": "Fetched organisation successfully",
            "data": {
                "orgId": org.id,
                "name": org.name,
                "description": org.description
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            "status": "Failed",
            "message": "Internal server error",
            "statusCode": 500
        })
    }
}