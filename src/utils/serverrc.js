let server = {
	protocol: 'http',
	host: 'localhost',
	port: '7001'
}

export default server;

export let url = `${server.protocol}://${server.host}:${server.port}`;
