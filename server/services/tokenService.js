import jwt from "jsonwebtoken";
import { User } from "#models";

const ACCESS_KEY = process.env.JWT_ACCESS_SECRET ||  "cat"
const REFRESH_KEY = process.env.JWT_REFRESH_SECRET || "dog"

function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_KEY, { expiresIn: "10m" });
}


function generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_KEY, { expiresIn: "7d" });
}


function verifyAccessToken(token) {
    try {
        return jwt.verify(token, ACCESS_KEY);
    } catch (err) {
        return null;
    }
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, REFRESH_KEY);
    } catch (err) {
        return null;
    }
}

function isExpired(token) {
    try {
        jwt.verify(token, ACCESS_KEY);
        return { expired: false };
    } catch (err) {
        if (err.name === "TokenExpiredError") {
        return { expired: true };
        }
        return { expired: false, invalid: true };
    }
}

async function updateUserRefreshToken(username, refreshToken) {
    const user = await User.findOne({ username });
    if (!user) return null;
    user.token = refreshToken;
    await user.save();
    return user;
}

async function refreshAccessToken(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return null;

    const user = await User.findOne({ username: decoded.username });
    if (!user) return null;

    if (user.token !== refreshToken) return null;

    const newAccessToken = generateAccessToken({ username: user.username });
    return newAccessToken;
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    isExpired,
    updateUserRefreshToken,
    refreshAccessToken
};
