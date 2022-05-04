import {Schema,SchemaTypes,model} from "mongoose"

const FoodEntrySchema = new Schema({
    food: {
        type: SchemaTypes.String,
        required: true,
    },
    meal: {
        type: SchemaTypes.ObjectId,
        ref: "Meal",
        required: true,
    },
    calorieValue: {
        type: SchemaTypes.Number,
        min: 0,
        required: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
})

const FoodEntryModel = model("FoodEntry", FoodEntrySchema)

export default FoodEntryModel