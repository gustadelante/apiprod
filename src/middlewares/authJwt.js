//Verificación
//si pasa por esta función ok continúa, sino devuelvo un error x ej.
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try {
        
        const token = req.headers["token"];
                
        console.log("token?:", token);
                
        if (!token) return res.status(403).json({message: "No token provided"})

            const decoded = jwt.verify(token, config.SECRET)
            //le asigno userId al req y luego lo tengo disponible en las siguientes funciones.
            req.userId = decoded.id;

        const user = await User.findById(req.userId, {password: 0})
        //console.log(user)
        if (!user) return res.status(404).json({message: 'no user found'})

        console.log(decoded)

        next()

    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    console.log('usuario', user)
    const roles = await Role.find({_id: {$in: user.roles}})
    console.log('roles del usuario', roles)

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "admin" ) {
            console.log("roles bucle",roles[i].name)
            next();
            return;
        }
        
    }
    //si en el bucle anterior no tiene el rol de mod, envia msg.
    return res.status(403).json({message: "Require Moderator Role"})
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    console.log('usuario', user)
    const roles = await Role.find({_id: {$in: user.roles}})
    console.log('roles del usuario', roles)

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            console.log("roles bucle",roles[i].name)
            next();
            return;
        }
        
    }
    //si en el bucle anterior no tiene el rol de mod, envia msg.
    return res.status(403).json({message: "Require Admin Role"})
   
}
