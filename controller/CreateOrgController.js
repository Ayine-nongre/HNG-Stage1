import { Organization } from "../model/Organization.js"
import { User_Organization } from "../model/User_Organization.js"

export const createOrg = async (req, res) => {
    try {
        const { name, description } = req.body

        const newOrg = await Organization.create({ name, description })
        await User_Organization.create({ userId: req.user.id, organizationId: newOrg.id })

        return res.status(201).json({
            "status": "success",
            "message": "Organisation created successfully",
            "data": {
                "orgId": newOrg.id, 
                "name": newOrg.name, 
                "description": newOrg.description
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            "status": "Bad Request",
            "message": "Client error",
            "statusCode": 400
        })
    }
}