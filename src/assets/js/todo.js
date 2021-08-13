let token = window.localStorage.getItem('token')
let username = window.localStorage.getItem('username')

if(!token && !username) window.location = '/login'

userName.textContent = window.localStorage.getItem('username')
userIcon.textContent = userName.textContent[0].toUpperCase()

const getTodos = async () =>{
	let data = await request('/todos','GET',null,true)
	let resp = await data.json()
	renderTodos(resp.data)
}

form.onsubmit = async event =>{
	event.preventDefault()
	let date = new Date()
	let hours = (''+date.getHours()).padStart(2,0)
	let min = (''+date.getMinutes()).padStart(2,0)

	let newTodo = {
		todo_text : todotextInput.value,
		todo_time : `${hours}:${min}`,
		username : window.localStorage.getItem('username')
	}
	let resp = await request('/qoshish','POST',newTodo,true)
	if(resp.status == 200 ){
		let res  = await resp.json()
		let todo = res.data
		renderTodos([todo])
	}
	todotextInput.value = ''
}


function renderTodos(todos) {
	for(let todo of todos) {
		let li = document.createElement('li')
		let div = document.createElement('div')
		let icon = document.createElement('h1')
		let text = document.createElement('span')
		let time = document.createElement('span')
		let Name = document.createElement('p')
		let button = document.createElement('button')

		Name.textContent = todo.username
		text.textContent = todo.todo_text
		time.textContent = todo.todo_time
		icon.textContent = (todo.username)[0].toUpperCase()
		button.style.display = 'none'
		if(todo.userId == window.localStorage.getItem('userID')) {
			text.contentEditable = true
			button.style.display = 'inline-block'
			li.style.display = 'flex'
			li.style.flexDirection = 'row-reverse'
			div.style.background = '#2B5278'
			Name.style.color = '#995AB8'
			icon.style.marginLeft = '20px'
			li.style.alignItems = 'flex-start' 
		}
		text.onkeyup = async event => {
			if(event.keyCode==13){
				let x = text.textContent
				let res = await request('/update','PUT',{todo_id :todo.todo_id,todo_text: text.textContent},true)
				text.textContent = x
			}
		}

		div.append(Name,text,time)
		li.append(icon)
		li.append(div,button)
		ulList.append(li)

		button.onclick = async () => {
			let resp = await request('/delete','DELETE',{todo_id: todo.todo_id},true)
			if(resp.status == 200) {
				li.remove()
			}
		}
	}
}

getTodos()

log.onclick = ()=>{
	window.localStorage.removeItem('token')
	window.localStorage.removeItem('username')
	window.localStorage.removeItem('userID')
	window.location.reload()
}
