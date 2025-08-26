import {userService } from "#services";

const { CreateUser } = userService;


const userCreate = async (req,res)=> {
    const { username, password } = req.body;
    try {
        const user = await CreateUser({ username, password });
        res.status(201).json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};


export {
    userCreate
}