import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, setCart, decrementCart } from "../../Redux/Features/Filters/Cartproducts";
import extractImages from "../../Utils/ImagesFunction";
import axios from 'axios';

const Cart = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const dispatch = useDispatch();
    const CartProducts = useSelector((state) => state.productscartReducer.cart);

    const HandlerAddProduct = (product) => {
        dispatch(setCart(product));
    };

    const HandlerDecrementProduct = (id) => {
        dispatch(decrementCart(id));
    };

    const HandlerDeleteProduct = (id) => {
        dispatch(deleteItem(id));
    };

    const calculateTotal = () => {
        return CartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const PayEmail =  () => {
        
    }

    return (
        <div className="bg-gray-500 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {CartProducts.length ? (
                    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
                        <h1 className="text-xl font-bold mb-4">Checkout</h1>
                        {CartProducts.map((product) => (
                            <div key={product.id} className="flex items-center mb-2">
                                <img src={extractImages(product.images)} alt={`Photo of ${product.title}`} className="w-24 h-24 object-cover mr-4" />
                                <div className="flex-1">
                                    <h2 className="font-semibold">{product.title}</h2>
                                    <p>{product.price}</p>
                                    <p>{product.quantity}</p>
                                </div>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => HandlerAddProduct(product)}>+</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => HandlerDecrementProduct(product.id)}>-</button>
                                <button className="bg-gray-500 text-white px-3 py-1 rounded-md" onClick={() => HandlerDeleteProduct(product.id)}>Delete</button>
                            </div>
                        ))}
                        <h2 className="text-lg font-semibold mt-4">Total</h2>
                        <p className="text-xl font-bold">{calculateTotal()}</p>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4" onClick={PayEmail}>PAY</button>
                    </div>
                ) : (
                    <p>No products in the cart.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;