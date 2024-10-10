const userModel = require('../../models/userModel')
const ROLE = require('../../helpers/role')

async function updateUser(req, res) {
    try {
        const sessionUserId = req.user.id;
        const { userId, email, name, role } = req.body;
        
        // Check if the session user has the right to update other users
        const sessionUser = await userModel.findById(sessionUserId);
        if (sessionUser.role !== ROLE.ADMIN) {
            return res.status(403).json({
                message: 'You do not have permission to update users',
                success: false,
                error: true,
            });
        }

        // Validate the role
        if (role && !Object.values(ROLE).includes(role)) {
            return res.status(400).json({
                message: 'Invalid role',
                success: false,
                error: true,
            });
        }

        const payload = {
            ...(email && { email }),    
            ...(name && { name }),
            ...(role && { role }),
        };

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
                error: true,
            });
        }

        res.json({
            data: updatedUser,
            message: 'User updated successfully',
            success: true,
            error: false,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;