export interface orderItem {
	image: string
	quantity: number
	description: string
	total: number
}

export interface orderData {
	total: number
	currency: string
	description: string
	return_url: string
	reference: string

	webhook?: string
	test?: boolean
	timeout?: number
	items?: [orderItem]
}
