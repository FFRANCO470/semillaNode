import mongoose from 'mongoose'

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_CNX, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:false
        });  
        console.log('base de datos online');
    } catch (error) {
        throw Error('Error al iniciar base de datos')        
    }
    
}

export default dbConnection
