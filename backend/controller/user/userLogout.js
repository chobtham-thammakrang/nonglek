async function userLogout(req, res){
    try{
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set to true in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // Lax for dev, None for prod
        };
        }
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
