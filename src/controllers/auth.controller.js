import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';



export const signUp = async (req, res) => {
    
    const {username, email, password, roles,} = req.body;
    
    console.log(req.body)
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
        console.log("entra al if, detecta q se envia roles")
        console.log("foundRoles: ", foundRoles)    
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log('saveduser', savedUser)

   const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    })
    
    res.status(200).json({token})
    
}

//SignIn
export const signin = async (req, res) => {
    //populate se utiliza para traer los datos del documento roles (trae el documento completo)
    const userFound = await User.findOne({username: req.body.username}).populate("roles");

    if(!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    //si no coinciden las password retorno mensaje
    if (!matchPassword) return res.status(401).json({token: null, message: 'Invalid Password'})

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    //console.log(userFound)
    res.json({token})
        
}