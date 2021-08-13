form.onsubmit = async  event => {
	event.preventDefault()
	let newUser = {
		username : usernameInput.value,
		password : passwordInput.value,
		age: ageInput.value,
		gender  : genderInput.value,
		contact : contactInput.value
	}

	let resp = await request('/register',"POST",newUser)

	if(resp.status == 201) {
		resp  = await resp.json()
		window.localStorage.setItem('token', resp.token)
		window.localStorage.setItem('username', usernameInput.value)
		window.localStorage.setItem('userID', resp.userId)
		message.textContent = resp.message
		message.style.color = 'green'
		setTimeout(()=>{
			window.location = '/'
		}, 2000)
	}else {
		resp = await resp.json()
		message.textContent = resp.message
		message.style.color = 'red'
	}
}