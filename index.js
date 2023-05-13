const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path')
const dotenv = require ('dotenv');

dotenv.config();
const app = express();


app.set('view engine','pug');
app.set('views',__dirname + '/views');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 3500

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login',{errorMessage:''})
})

app.post('/login',(req,res)=>{
    let users=[
        {username:'root',password:'11',name:'root'},
        {username:'peter',password:'22',name:'pedro perez'},
    ]

    let {username,password}= req.body;
    let user=users.find(user => username === username && user.password ===password);
    if (user){
        res.render('profile',{name:user.name,username: user.username});
        }else{
        res.render('login',{errorMessage:'Usuario no encontrado.Intentelo con otro.'})
    }
})

app.listen(port,()=>{
    console.log(`Server is http:// localhost:${port}`)
})