import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1h",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "12h",
    });
};

const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return { id: decoded.id };
    } catch (err) {
        return null;
    }
};

const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return { id: decoded.id };
    } catch (err) {
        return null;
    }
};

const verifyRefreshAndGenerateAccess = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateAccessToken({ id: decoded.id });
        return { accessToken };
    } catch (err) {
        return null;
    }
}


export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    verifyRefreshAndGenerateAccess
}
