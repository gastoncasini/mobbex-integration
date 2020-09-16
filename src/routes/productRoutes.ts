import { Request, Response, Router } from 'express'
import Product from '../models/Product'

class ProductRoutes {
	router: Router

	constructor() {
		this.router = Router()
		this.routes()
	}

	async getProducts(req: Request, res: Response): Promise<void> {
		const products = await Product.find()
		res.json(products)
	}

	async getProduct(req: Request, res: Response): Promise<void> {
		const product = await Product.find({ _id: req.params.id })
		res.json(product)
	}

	async createProduct(req: Request, res: Response): Promise<void> {
		const { name, stock, description, image, price } = req.body
		const newProduct = new Product({ name, stock, description, image, price })
		await newProduct.save()
		res.json(`product ${name} successfully added`)
	}

	async updateProduct(req: Request, res: Response): Promise<void> {
		const query = { _id: req.params.id }
		const config = { new: true }

		const product = await Product.findOneAndUpdate(query, req.body, config)

		res.json(product)
	}

	async deleteProduct(req: Request, res: Response): Promise<void> {
		const query = { _id: req.params.id }
		const products = await Product.findOneAndDelete(query)
		res.send(`product ${req.params.id} succesfully deleted`)
	}

	routes() {
		this.router.get('/products', this.getProducts)
		this.router.get('/products/:id', this.getProduct)
		this.router.post('/products', this.createProduct)
		this.router.put('/products/:id', this.updateProduct)
		this.router.delete('/products/:id', this.deleteProduct)
	}
}

const productRoutes = new ProductRoutes()
export default productRoutes.router
