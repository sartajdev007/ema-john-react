import { getStoredCart } from "../utilities/fakedb";

export const ProductsAndCartLoader = async () => {
    const productsData = await fetch('http://localhost:5000/products');
    const { products } = await productsData.json();

    // get cart
    const savedCart = getStoredCart();
    const prevCart = []
    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id);
        // console.log(id, addedProduct);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            prevCart.push(addedProduct);
        }
    }
    return { products, prevCart };
}