const userModel = require('../../models/userModel')

async function userDetailsController(req, res){
    try {
        console.log("userId", req.user.id);
        const user = await userModel.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic
            },
            message: "User details retrieved successfully",
            error: false, 
            success: true
        });

        console.log("user", user);
    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred while fetching user details",
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;