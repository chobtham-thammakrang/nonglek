const userModel = require('../models/userModel')

const uploadProductPermission = async (userId) => {
    const user = await userModel.findById(userId)
    
    if (user && user.role === 'ADMIN') {
        return true
    } else {
        return false
    }
}

module.exports = uploadProductPermission