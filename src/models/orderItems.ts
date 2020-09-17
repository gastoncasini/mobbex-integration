import { Schema, model } from 'mongoose'
const OrderItemSchema = new Schema({
	productID: { type: String },
	quantity: { type: Number, required: true },
	total: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
})

export default model('OrderItem', OrderItemSchema)
