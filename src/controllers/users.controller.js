import User from "../models/User";
import Role from "../models/Role";

export const getUsers = async (req, res) => {
    const users = await User.find().populate("roles");
    res.json(users);
};

export const createUser = (req, res) => {
    //AGREGAR proceso de crear user.
    console.log('Creating User')
    
}