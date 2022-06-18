import { ObjectId } from "mongoose";

export interface Person{
    id1:ObjectId;
    id:number;
    name:String;
    age:number;
    address:String;
}