import { Schema,Document} from "mongoose"

    export const ShockSchema = new Schema({
        code: {
            type:String,
            required:true,
            default: "NO SHOCK CODE"
        },
        clientName: {
            type:String,
            required: true,
            default: "no name"
        },
        clientPhone: {
            type:String,
            required: true,
            default: "No number"
        },
        clientCity: {
            type:String,
            required:true,
            default:"No city"
        },
        type: {
            type:String,
            required:true,
            default: "CAR OR MOTO"
        },
        arrivedDate: {
            type: String,
            required: true,
            default: new Date()
        },
        clientComment: {
            type: String,
            required: true,
            default: "No comment"
        },
    });

    export interface  Shock extends Document {
        code: string,
        clientName: string,
        clientPhone: string,
        type: string,
        arrivedDat: string,
        clientComment : string
    }