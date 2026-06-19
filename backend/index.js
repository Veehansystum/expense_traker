const express =require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const bodyParser =require('body-parser');
const cors =require('cors')
const ProductRouter = require('./Routes/ProductRouter');
const AuthRouter = require('./Routes/AuthRouter');
const ExpenseRouter =require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');
const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG')
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter);
app.use('/expenses',ensureAuthenticated, ExpenseRouter);
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})