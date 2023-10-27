import { Schema, Document } from 'mongoose';

export const PartHistorySchema = new Schema({
    code: {
        type: String,
        required: true
    },
    history: []
});

export interface PartHistory extends Document {
    code: string;
    history: any[];
}
