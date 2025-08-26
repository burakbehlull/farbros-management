import { userService, tokenService } from "#services";

const { CreateUser, LoginUser, RegisterUser} = userService;
const { verifyRefreshAndGenerateAccess } = tokenService;

const UserCreate = async (req,res)=> {
    const { username, password } = req.body;
    try {
        const user = await CreateUser({ username, password });
        res.status(201).json({ status: true, user });
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

export {
    UserCreate,
    UserLogin,
    UserRegister
}