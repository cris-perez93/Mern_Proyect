import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
        });
        console.log("DB conectada");
        const url = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    }

    export default conectarDB;