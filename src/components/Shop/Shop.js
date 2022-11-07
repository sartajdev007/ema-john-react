import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

// pagination
/*
count: loaded
perPage data:10
pages: count/perPage
currentPage: page
*/


const Shop = () => {
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const [cart, setCart] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setProducts(data.products)
            })
    }, [page, size])


    const pages = Math.ceil(count / size)

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = []
        const ids = Object.keys(storedCart)
        console.log(ids)
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id)
                    // console.log(addedProduct)
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct)
                    }
                }
                setCart(savedCart);
            })


    }, [products])

    const handleCart = (product) => {
        // console.log(product)
        const existProduct = cart.find(selectedProduct => selectedProduct._id === product._id);
        let newCart = [];
        if (!existProduct) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            const rest = cart.filter(selectedProduct => selectedProduct._id !== product._id);
            existProduct.quantity = existProduct.quantity + 1;
            newCart = [...rest, existProduct];
        }

        setCart(newCart);
        addToDb(product._id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product._id}
                        handleCart={handleCart}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/order'>
                        <button>Review Orders</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <p>Current Page : {page} and Size:{size}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}
                        className={page === number && 'selected'}
                        onClick={() => setPage(number)}
                    >
                        {number + 1}
                    </button>)
                }
                <select onChange={e => setSize(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;