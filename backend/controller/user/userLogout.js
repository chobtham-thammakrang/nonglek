async function userLogout(req, res){
    try{
        res.clearCookie("token");

        res.json({
            message: "Logout Successfully",
            error: false,
            success: true,
            data: []
        });
    }catch(err){    
        res.status(500).json({
            message: err.message || "An error occurred during logout",
            error: true,
            success: false
        });
    }
}

module.exports = userLogout;