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
    history: any[];  // Ideally, you'd want to replace `any[]` with a more detailed type or interface that describes each history item.
}
