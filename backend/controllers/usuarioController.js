import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';


const registrar = async (req, res) => {
    // evitar reg de usuarios duplicados

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario){
        return res.status(400).json({msg: 'El usuario ya existe'});
    }


    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
         await usuario.save();
        res.json({msg: "Usuario creado correctamente"});

        
    } catch (error) {
        console.log(error)
    }
    
}

const autenticar = async (req, res) => {
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        return res.status(400).json({msg: 'El usuario no existe'});
    }
   
    if(await usuario.compararPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email:usuario.email,
            token: generarJWT(usuario._id)
        });
        }else {
            res.status(400).json({msg: 'El password es incorrecto'})
        }

    if(!usuario.confirmado){
        return res.status(400).json({msg: 'El usuario no ha sido confirmado'});
    }
    res.json({
        usuario,
        token: usuario.token
    });
}

const confirmar = async (req, res) => {
   
    const {token} =  req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar){
        return res.status(400).json({msg: 'Token no valido'});
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({msg: 'Usuario confirmado'});
        
    } catch (error) {
        console.log(error)
        
    }

}

const olvidePassword = async (req, res) => {
    const {email} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        return res.status(400).json({msg: 'El usuario no existe'});
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({msg: 'Se ha enviado un email a su cuenta'});
        
    } catch (error) {
        console.log(error)
        
    }


}

const comprobarToken = async (req, res) => {
    const {token} = req.params;
    const tokenValido = await Usuario.findOne({token});
    if(!tokenValido){
        return res.status(400).json({msg: 'Token no valido'});
    }else{
        res.json({msg: 'Token valido'});
    }
}

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const usuario = await Usuario.findOne({token});
    if(!usuario){
        return res.status(400).json({msg: 'Token no valido'});
    }
    try {
        usuario.password = password;
        usuario.token = '';
        await usuario.save();
        res.json({msg: 'Se ha cambiado su password'});
        
    } catch (error) {
        console.log(error)

        
    }

    
}

const perfil = async (req, res) => {
    const {usuario} = req;
    res.json({usuario});
}



export {
    confirmar,
    registrar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
    
}