const express = require("express")
const app = express()
const cors = require("cors")
const connection = require("./database/db")
app.use(express.json())
app.use(cors());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRouter = require('./routes/auth.router');
const categoryRouter = require('./routes/category.router')
const productRouter = require('./routes/product.router')
const basketRouter = require('./routes/basket.router')
const orderRouter = require('./routes/order.router')


app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/baskets', basketRouter)
app.use("/api/orders", orderRouter);

connection()
const port = 4050
app.listen(port, () => console.log("App live 4050 port "))