import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim : true
    },
    password: {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        trim : true,
        unique: true
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
});

usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

usuarioSchema.methods.compararPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}



const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;