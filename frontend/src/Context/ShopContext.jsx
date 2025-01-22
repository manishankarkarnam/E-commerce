import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = Cookies.get('cart');
        console.log('Initial cartItems:', savedCart);
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(() => {
        const savedUser = Cookies.get('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });


    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then(response => response.json())
            .then(data => {
                const sortedProducts = data.sort((a, b) => b.id - a.id);
                setProducts(sortedProducts);
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    useEffect(() => {
        Cookies.set('cart', JSON.stringify(cartItems), { expires: 7 });
    }, [cartItems]);

    useEffect(() => {
        if (user) {
            Cookies.set('user', JSON.stringify(user), { expires: 1 });
        } else {
            Cookies.remove('user');
        }
    }, [user]);

    const addToCart = (id, size) => {
        setCartItems(prev => {
            const key = `${id}-${size}`;
            const newCart = { ...prev };
            if (newCart[key]) {
                newCart[key].quantity += 1;
            } else {
                newCart[key] = { quantity: 1, size };
            }
            return newCart;
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems(prev => {
            const key = `${id}-${size}`;
            const newCart = { ...prev };
            if (newCart[key]) {
                if (newCart[key].quantity > 1) {
                    newCart[key].quantity -= 1;
                } else {
                    delete newCart[key];
                }
            }
            return newCart;
        });
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((acc, curr) => acc + curr.quantity, 0);
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const key in cartItems) {
            const [id, size] = key.split('-');
            const item = products.find(product => product.id === Number(id));
            if (item) {
                totalAmount += item.new_price * cartItems[key].quantity;
            }
        }
        return totalAmount;
    };

    const getLatestProducts = (count) => products.slice(0, count);

    const getLatestWomenProducts = (count) => {
        return products
            .filter(item => item.category.toLowerCase() === "women")
            .slice(0, count);
    };

    // Login Function
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.success) {
                const userData = { token: data.token };
                setUser(userData);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    };

    // Logout Function
    const logout = () => {
        setUser(null);
    };

    // Signup Function
    const signup = async (username, email, password) => {
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();

            if (data.success) {
                // Store token after successful signup
                const userData = { token: data.token };
                setUser(userData);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Signup failed' };
        }
    };

    const contextValue = {
        all_product: products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        getTotalCartAmount,
        getLatestProducts,
        getLatestWomenProducts,
        user,
        login,
        logout,
        signup,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;