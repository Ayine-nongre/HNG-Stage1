import { User_Organization } from "../model/User_Organization.js"

export const AddUser = async (req, res) => {
    try {
        const { orgId } = req.params
        const { userId } = req.body

        if (!orgId || !userId) return res.status(400).json({
            "status": 'Failed',
            "message": "Incomplete data",
            "statusCode": 400
        })

        await User_Organization.create({ userId, organizationId: orgId })

        return res.status(200).json({
            "status": "success",
            "message": "User added to organisation successfully",
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