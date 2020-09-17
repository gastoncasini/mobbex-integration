import { Request, Response, Router } from 'express'
import Order from '../models/Order'
import { mobbex } from '../services/mobbex'

class OrderRoutes {
	router: Router

	constructor() {
		this.router = Router()
		this.routes()
	}

	async getOrders(req: Request, res: Response): Promise<void> {
		const orders = await Order.find()
		res.json(orders)
	}

	async getOrder(req: Request, res: Response): Promise<void> {
		try {
			const order = await Order.find({ _id: req.params.id })

			res.json(order)
		} catch (error) {
			res.status(500)
			res.send('an unexpected error ocurred')
		}
	}

	async createOrder(req: Request, res: Response): Promise<void> {
		try {
			const { user, currency, total } = req.body
			const newOrder = new Order({ user, currency, total, state: '0' })
			await newOrder.save()
			res.status(200)
			res.json(`Order successfully created`)
		} catch (error) {
			res.status(500)
			res.send('an unexpected error ocurred')
		}
	}

	async updateOrder(req: Request, res: Response): Promise<void> {
		try {
			const query = { _id: req.params.id }
			const config = { new: true }
			const data = req.body

			if (data.state) {
				// removes state property
				delete data.state
			}

			const order = await Order.findOneAndUpdate(query, data, config)

			res.json(order)
		} catch (error) {
			res.status(500)
			res.send('an unexpected error ocurred')
		}
	}

	async deleteOrder(req: Request, res: Response): Promise<void> {
		try {
			const query = { _id: req.params.id }
			await Order.findOneAndDelete(query)

			res.send(`Order ${req.params.id} succesfully deleted`)
		} catch (error) {
			res.status(500)
			res.send('an unexpected error ocurred')
		}
	}

	async checkout(req: Request, res: Response) {
		try {
			const orderID = req.params.id
			const request = await mobbex.checkout(orderID)

			res.status(200)
			res.json(request.data)
		} catch (error) {
			console.log(error)
			res.status(500)
			res.send('an unexpected Error ocurred')
		}
	}

	/*
	 * Mobbex WebHook Handler
	 */
	async orderStateManager(req: Request, res: Response) {
		try {
			const status = req.body.data.payment.status.code
			const orderID = req.body.data.payment.reference
			const data = { state: status }
			const config = { new: true }

			await Order.findByIdAndUpdate(orderID, data, config)

			res.status(200).end()
		} catch (error) {
			console.log(error)
		}
	}

	routes() {
		this.router.get('/orders', this.getOrders)
		this.router.get('/orders/:id', this.getOrder)
		this.router.post('/orders', this.createOrder)
		this.router.put('/orders/:id', this.updateOrder)
		this.router.delete('/orders/:id', this.deleteOrder)
		// mobbex routes
		this.router.post('/orders/checkout/:id', this.checkout)
		this.router.post('/orders/webhook/', this.orderStateManager)
	}
}

const orderRoutes = new OrderRoutes()
export default orderRoutes.router
