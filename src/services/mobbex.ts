import axios, { AxiosRequestConfig } from 'axios'
import { orderData } from '../types/order.types'
import Order from '../models/Order'
import { ngrokURL } from '../utils/ngrok'

class MobbexService {
	checkoutURL: string
	apiKeyDEV: string
	accessTokenDEV: string

	constructor() {
		this.checkoutURL = 'https://api.mobbex.com/p/checkout'
		this.apiKeyDEV = 'zJ8LFTBX6Ba8D611e9io13fDZAwj0QmKO1Hn1yIj'
		this.accessTokenDEV = 'd31f0721-2f85-44e7-bcc6-15e19d1a53cc'
	}

	/*
	 *get mobbex requiered headers
	 */
	private chekoutHeaders(): AxiosRequestConfig {
		return {
			headers: {
				'x-api-key': this.apiKeyDEV,
				'x-access-token': this.accessTokenDEV,
				'Content-Type': 'application/json',
			},
		}
	}

	/*
	 * get order data
	 */
	private async getOrderData(orderID: string): Promise<orderData> {
		const order = await Order.findById(orderID)

		if (order === null) {
			throw new Error('Order not found')
		}

		// dinammically get NGROK URL for development
		const url = await ngrokURL()

		const data: orderData = {
			total: order.total,
			currency: order.currency,
			description: 'Orden de prueba',
			reference: orderID,
			return_url: `${url}/orders/${orderID}`,
			webhook: `${url}/orders/webhook`,
		}

		return data
	}

	/*
	 *  call mobbex checkout
	 */
	public async checkout(orderID: string) {
		try {
			const orderData = await this.getOrderData(orderID)
			const config = this.chekoutHeaders()

			return axios.post(this.checkoutURL, orderData, config)
		} catch (error) {
			throw error
		}
	}
}

export const mobbex = new MobbexService()
