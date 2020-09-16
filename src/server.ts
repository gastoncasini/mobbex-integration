import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
// routes
import routes from './routes/indexRoutes'
import productRoutes from './routes/productRoutes'

class Server {
	app: express.Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	config() {
		const MONGO_URI =
			'mongodb+srv://tongas:placeholder@mobbex.80sy0.mongodb.net/ecomerce?retryWrites=true&w=majority'
		mongoose.set('useFindAndModify', false)
		mongoose
			.connect(MONGO_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			})
			.then((db) => console.log('DB connected'))

		// Settings
		this.app.set('port', process.env.PORT || 3000)
		// Middlewares
		this.app.use(morgan('dev'))
		this.app.use(express.json())
	}

	routes() {
		this.app.use(routes)
		this.app.use(productRoutes)
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server started on port ', this.app.get('port'))
		})
	}
}

const server = new Server()
server.start()
