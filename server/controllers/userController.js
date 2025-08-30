import { User } from "#models";
import { userService, tokenService } from "#services";

const { CreateUser, LoginUser, RegisterUser, GetUserById, GetUserBots } = userService;
const { generateAccessToken } = tokenService;

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
        const user = await GetUserById(userId);
        if (!user) return res.status(404).json({ status: false, error: "User not found" });

        res.status(200).json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const UserLogin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await LoginUser({ username, password });
        if (!user) return res.status(401).json({ status: false, error: "Invalid credentials" });

        res.status(200).json({ status: true, user, token });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

const UserRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await RegisterUser({ username, password });
        res.status(201).json({ status: true, user });
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

export {
    UserCreate,
    UserProfile,
    GetUsersBot,
    
    UserLogin,
    UserRegister
}