let host = 'http://localhost:8080'
async function request(path, method, body , token) { 
	let headers = {
			'Content-Type': 'application/json'
	}
	if(token) headers['token'] = window.localStorage.getItem('token')
 	let resp = await fetch(host+path, {
		method,
		headers,
		body : body ? JSON.stringify(body) : null
	})
	return resp
}