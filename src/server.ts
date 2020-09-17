import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
// routes
import routes from './routes/indexRoutes'
import productRoutes from './routes/productRoutes'
import orderRoutes from './routes/orderRoutes'

class Server {
	app: express.Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	config() {
		const MONGO_URI =
			'mongodb+srv://tongas:mobbextest@mobbex.80sy0.mongodb.net/ecomerce?retryWrites=true&w=majority'
		mongoose.set('useFindAndModify', false)
		mongoose
			.connect(MONGO_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			})
			.then((db) => console.log('DB connected'))
			.catch(() => console.log('Error connecting to DB'))

		// Settings
		this.app.set('port', process.env.PORT || 3000)
		// Middlewares
		this.app.use(morgan('dev'))
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
	}

	routes() {
		this.app.use(routes)
		this.app.use(productRoutes)
		this.app.use(orderRoutes)
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server started on port ', this.app.get('port'))
		})
	}
}

const server = new Server()
server.start()
