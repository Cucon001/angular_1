import { ObjectId } from "mongoose";

export interface Person{
    id1:ObjectId;
    username:String;
    password:String;
}