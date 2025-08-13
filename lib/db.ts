import { error } from "console";
import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI!

if(!MONGODB_URI){
    throw new Error("please define mongo_uri in env file")
}

let cached=global.mongoose

if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.conn){
        mongoose.connect(MONGODB_URI)
        .then(()=> mongoose.connection)
    }

    try{
        cached.conn=await cached.promise
    }
    catch(error){
        cached.promise=null
        throw error;

    }


    return cached.conn




}




