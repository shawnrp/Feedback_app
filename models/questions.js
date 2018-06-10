import { Mongo } from 'meteor/mongo'; //import mongoDB features

//exposes mongoDB collection so that it can be accessed across entire meteorJS app
export const Questions = new Mongo.Collection('questions'); 
