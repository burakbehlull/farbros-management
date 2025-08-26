import { Bot, User } from "#models";

const CreateUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();

        return user;
    } catch (error) {
        throw new Error("Error creating user");
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
        const user = await User.findOne({ username });
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
        if (!user) return {message: "User not found", status: false};

        if(user.password !== password) return {message: "Invalid password", status: false};

        return {message: "Login successful", status: true, user};
    } catch (error) {
        throw new Error("Error logging in");
    }
};

const RegisterUser = async ({ username, password }) => {
    try {
        const user = await CreateUser({ username, password });
        return { message: "Registration successful", status: true, user };
    } catch (error) {
        throw new Error("Error registering user");
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

export {
    CreateUser,

    GetUserById,
    GetUserByUsername,

    UpdateUser,
    DeleteUser,
    // auth actions
    LoginUser,
    RegisterUser,

    // users bot
    GetUserBots
};