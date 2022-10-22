import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const products = useLoaderData();
    const [cart, setCart] = useState([])

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // useEffect(() => {
    //     const storedCart = getStoredCart();
    //     const savedCart = []
    //     for (const id in storedCart) {
    //         const addedProduct = products.find(product => product.id === id)
    //         // console.log(addedProduct)
    //         if (addedProduct) {
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             savedCart.push(addedProduct)
    //         }
    //     }
    //     setCart(savedCart);
    // }, [products])

    const handleCart = (product) => {
        // console.log(product)
        const existProduct = cart.find(selectedProduct => selectedProduct.id === product.id);
        let newCart = [];
        if (!existProduct) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            const rest = cart.filter(selectedProduct => selectedProduct.id !== product.id);
            existProduct.quantity = existProduct.quantity + 1;
            newCart = [...rest, existProduct];
        }

        setCart(newCart);
        addToDb(product.id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product.id}
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
        </div>
    );
};

export default Shop;