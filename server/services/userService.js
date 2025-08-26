import { User } from "#models";

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

export {
    CreateUser,
    GetUserById,
    GetUserByUsername
}