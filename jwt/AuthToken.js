import jwt from 'jsonwebtoken';
import { User } from "../models/model.user.js"


const createTokenAndSaveCookies = async (userId, res) => {
    var token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("jwt", token, {
        httpOnly: false,        //  Prevent JavaScript access to cookie   now for production changed to false
        secure: true,         // In development, we use false (for localhost)
        sameSite: "none",       // Allows cookies to be sent on cross-origin          none for production
    });
    await User.findByIdAndUpdate(userId, { token })
    return token;
}
export default createTokenAndSaveCookies;