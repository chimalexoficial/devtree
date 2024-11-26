import server from './server';

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log('Server on', port);
});


let productName = "Tablet";
let isAuth = false;
let price = 30;

type Product = {
    id: number,
    price: number,
    name: string,
}

type ProductID = Pick<Product, 'id'>

let product3 = {
    id: 1
}

let product : Product = {
    id: 1,
    price: 30,
    name: "Tablet",
}

const numbers = [10,20,30];