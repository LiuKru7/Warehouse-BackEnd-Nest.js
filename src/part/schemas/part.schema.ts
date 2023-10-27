import { Schema, Document } from 'mongoose';

export const PartSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required:true,
    },
    place: {
        type: String,
        required:true,
    },
    qrCode: {
        type: String,
        required:true
    }
});

export interface Part extends Document {
    name: string;
    code: string;
    quantity: number;
    place: string;
    qrCode: string;
}
