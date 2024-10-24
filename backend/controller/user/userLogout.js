async function userLogout(req, res){
    try{
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            partitioned: true
        };
        
        res.clearCookie("token", tokenOptions);

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
