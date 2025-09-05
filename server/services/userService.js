import { Bot, User } from "#models";
import { tokenService } from "#services";
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, isExpired, updateUserRefreshToken, verifyAccessToken } = tokenService;

const CreateUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();

        return user;
    } catch (error) {
        return { message: error?.message, isUser: false }
    }
};

const GetUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error("Error fetching user");
    }
};

const GetUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username })
        return user;
    } catch (error) {
        throw new Error("Error fetching user");
    }
};


const UpdateUser = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return user;
    } catch (error) {
        throw new Error("Error updating user");
    }
};

const DeleteUser = async (userId) => {
    try {
        const result = await User.findByIdAndDelete(userId);
        return result;
    } catch (error) {
        throw new Error("Error deleting user");
    }
};

// auth actions
const LoginUser = async ({ username, password }) => {
    try {
        const user = await GetUserByUsername(username);

        const verify = verifyRefreshToken(user.token, true)
        const userVerify = user.email === verify.email
        if(!userVerify) return { message: "Kullanıcı kimliği doğrulanmadı", isUser: false };
        
        const expiredToken = isExpired(user.token)

        if(expiredToken.expired) {
            const refreshToken = generateRefreshToken({
                email: user.email,
                username: user.username
            })
            await updateUserRefreshToken(user.username, refreshToken)
        }

        if (!user) return { message: "Kullanıcı bulunamadı", isUser: false };

        if(user.password !== password) return { message: "Bu bilgilere ait hesap bulunamadı", isUser: false };

        const accessToken = generateAccessToken({
            email: user.email,
            username: user.username
        })

        return { message: "Giriş başarılı", isUser: true, user, accessToken };
    } catch (error) {
        console.error("error", error)
        return { message: "Giriş başarısız", error: error, isUser: false }
    }
};

const RegisterUser = async ({ username, password, email }) => {
    try {
        const existsUser = await User.findOne({username})
        const existsEmail = await User.findOne({username})
        if(existsUser || existsEmail) return { message: "Kullanıcı zaten var", isUser: false }


        const refreshToken = generateRefreshToken({ email, username })
        const accessToken = generateAccessToken({ email, username })

        const user = await CreateUser({ username, password, email, token: refreshToken });
        return { message: "Kayıt yapıldı", isUser: true, user, accessToken: accessToken };
    } catch (error) {
        console.error("error", error)
        return { message: "Kayıt yapılamadı", isUser: false }
    }
}

// users bot
const GetUserBots = async (userId) => {
    try {
        const bots = await Bot.find({ user: userId }).populate('user');

        return { status: true, bots };
    } catch (error) {
        throw new Error("Error fetching user bots");
    }
};

const accessVerifyUser = (token)=> {
    try {
        const verify = verifyAccessToken(token, true)
        const expiredToken = isExpired(token)
        return { data: verify, expired: expiredToken.expired }
    } catch (error) {
        return { message: "Hata", status: false, error }
    }
} 

export {
    CreateUser,

    GetUserById,
    GetUserByUsername,

    UpdateUser,
    DeleteUser,
    // auth actions
    LoginUser,
    RegisterUser,
    accessVerifyUser,

    // users bot
    GetUserBots,
};