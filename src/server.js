import http from 'http'
import { PORT, host } from './config.js'
import Express from './lib/express.js'

const server = http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
  	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Allow-Origin, token');
  	res.setHeader('Access-Control-Allow-Methods', 'GET,POST, DELETE, PUT');
  	if(req.method == 'OPTIONS') res.end();
	const app =  new Express(req,res);
	app.static('assets')
	app.get('/', (req,res)=>res.render('index'))
	app.get('/login', (req,res)=>res.render('login'))
	app.get('/register', (req,res)=>res.render('register'))
})

server.listen(PORT,()=> console.log('Server ishga tushdi http://'+host+':'+PORT))