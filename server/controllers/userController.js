import { User } from "#models";
import { userService, tokenService } from "#services";

const { CreateUser, LoginUser, RegisterUser, GetUserById, GetUserBots, accessVerifyUser } = userService;
const { verifyAccessToken, verifyRefreshToken, generateAccessToken } = tokenService;

const UserCreate = async (req,res)=> {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(409).json({ status: false, error: "User already exists" });
        const user = await CreateUser({ username, password });
        res.status(201).json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const UserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const data = await GetUserById(userId);
        if (!data) return res.status(404).json({ status: false, error: "User not found" });
        
        res.status(200).json({ status: true, data });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const UserLogin = async (req, res) => {
    const { username, password } = req.body;

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    console.log(token)

    try {
        const data = await LoginUser({ username, password });
        if (!data) return res.status(401).json({ status: false, message: data?.message });

        res.status(200).json({ status: true, message: data?.message, data });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const UserRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {

        const data = await RegisterUser({ username, password, email });
        res.status(201).json({ status: true, data });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const GetUsersBot = async (req, res) => {
    const userId = req.params.userId;
    try {
        const bots = await GetUserBots(userId);
        res.status(200).json({ status: true, bots });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

const GenerateNewAccessToken = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1];

        const verify = verifyAccessToken(token, true)

        const user = await User.findOne({ username: verify.username })

        const baseVerify = verifyRefreshToken(user.token, true) 
        const isAuth = baseVerify.email === user.email
        
        if(!isAuth) return res.status(200).json({ status: false, message: 'Kimlik doğrulanmadı.' });

        const accessToken = generateAccessToken({
            email: user.email,
            username: user.username,
            _id: user._id
        })

        return res.status(200).json({ status: true, accessToken });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

// verify user
const UserAccessVerify = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1];

        const result = await accessVerifyUser(token)
        return res.status(200).json({ ...result });
    } catch (error) {
        res.status(500).json({ status: false, message: "Doğrulama başarısız", error });
    }
}

const userLogout = async (req, res) => {
    try {
        return res.status(200).json({ status: true, message: "Çıkış başarılı" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Çıkış başarısız", error });
        
    }
}

export {
    UserCreate,
    UserProfile,
    GetUsersBot,
    
    UserLogin,
    UserRegister,
    userLogout,

    GenerateNewAccessToken,
    UserAccessVerify
}