import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
// routes
import routes from './routes/indexRoutes'

class Server {
	app: express.Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	config() {
		const MONGO_URI =
			'mongodb+srv://tongas:palceholder@mobbex.80sy0.mongodb.net/ecomerce?retryWrites=true&w=majority'

		// Settings
		this.app.set('port', process.env.PORT || 3000)
		// Middlewares
		this.app.use(morgan('dev'))
	}

	routes() {
		this.app.use(routes)
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server started on port ', this.app.get('port'))
		})
	}
}

const server = new Server()
server.start()
