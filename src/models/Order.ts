import { Schema, model, Document } from 'mongoose'

interface OrderDocument extends Document {
	user: string
	total: number
	state: number
	currency: string
	createdAt: Date
	updatedAt?: Date
	products?: [any]
}

const OrderSchema = new Schema({
	user: { type: String, required: true, lowercase: true },
	products: { type: String },
	total: { type: String, required: true },
	state: { type: String },
	currency: { type: String, default: 'ARS' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
})

export default model<OrderDocument>('Order', OrderSchema)
