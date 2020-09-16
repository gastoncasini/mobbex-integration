import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
	name: { type: String, required: true, unique: true, lowercase: true },
	stock: { type: Number, required: true },
	price: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
})

export default model('Product', ProductSchema)
