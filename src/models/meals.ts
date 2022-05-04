import {Schema, SchemaTypes, model} from "mongoose"

const MealSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    maxEntries: {
        type: SchemaTypes.Number,
        min: 0,
        required: true,
    },
}, {
    timestamps: true,
})

const MealModel = model("Meal", MealSchema)

export default MealModel