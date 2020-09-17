import axios from 'axios'

export const ngrokURL = (): Promise<string> => {
	return axios
		.get('http://localhost:4040/api/tunnels')
		.then((res) => {
			return res.data.tunnels
				.filter((tunnel: any) => tunnel.proto === 'https')
				.map((tunnel: any) => tunnel.public_url)[0]
		})

		.catch(() => {
			return 'error'
		})
}
