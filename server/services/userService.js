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

export {
    CreateUser,

    GetUserById,
    GetUserByUsername,

    UpdateUser,
    DeleteUser
};