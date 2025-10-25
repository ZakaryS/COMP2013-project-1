import { useState } from "react";
import NavBar from "./NavBar";
import ProductCardsContainer from "./ProductCardsContainer";
import CartContainer from "./CartContainer";

export default function GroceriesAppContainer({ products }) {
    const [productQuantity, setProductQuantity] = useState(
        products.map((prod) => {
            const price = parseFloat(prod.price.replace("$", ""));
            return {
                id: prod.id,
                quantity: 0,
                priceOptions: [price],
                currentPrice: price, // The word "price" on its own looks gross. :(
            };
        })
    );

    const [cart, setCart] = useState([]);

    const handleAddToQuantity = (productId, mode) => {
        if (mode === "product") {
        const newProductQuantity = productQuantity.map((prod) => {
            if (prod.id === productId) {
                return { ...prod, quantity: prod.quantity + 1 };
            }
            return prod;
        });
        setProductQuantity(newProductQuantity);
    }
    
    else if (mode === "cart") {
        const newCart = cart.map((item) => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(newCart);
    }
        return;
    }

    const handleRemoveQuantity = (productId, mode) => {
        if (mode === "product") {
        const newProductQuantity = productQuantity.map((prod) => {
            if (prod.id === productId && prod.quantity > 0) {
                return { ...prod, quantity: prod.quantity - 1 };
            }
            return prod;
        });
        setProductQuantity(newProductQuantity);
    }
    else if (mode === "cart") {
        const newCart = cart.map((item) => {
            if (item.id === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(newCart)
    }
        
        return;
    }

    const handleAddToCart = (productToAdd) => {
        const currentProduct = products.find((prod) => prod.id === productToAdd.id);
        const productInCart = cart.find((item) => item.id === productToAdd.id);
        if (productToAdd.quantity === 0) {
            alert("Please add quantity before adding to cart!");
            return;
        }

        if (!productInCart) {
            setCart((prevCart) => {
                return [
                    ...prevCart,
                    {
                        ...currentProduct,
                        quantity: productToAdd.quantity,
                        currentPrice: productToAdd.currentPrice,
                    },
                ];
            });
        } else {
            const newCart = cart.map((prevCart) => {
                if (prevCart.id === productToAdd.id) {
                    return {...prevCart,
                    
                    quantity: prevCart.quantity + productToAdd.quantity,
                    currentPrice: productToAdd.currentPrice,
                    }
                }
                return prevCart;
            });
            setCart(newCart);
        }
    };

    const handleRemoveFromCart = (productToRemove) => {
        const productInCart = cart.find((item) => item.id === productToRemove.id);

        if (!productInCart) {
            alert("Product not found in Cart!");
            return;
        }

        setCart((prevCart) => { return prevCart.filter((item) => item.id !== productToRemove.id); });
    }

    const handleEmptyCart = () => {
        if (cart.length === 0) {
            alert("Cart is already empty!");
            return;
        }

        setCart([]);
        return;
    }

    return (
        <div>
            <NavBar cart={cart} />
            <div className="GroceriesApp-Container">
            <ProductCardsContainer
            products={products}
            productQuantity={productQuantity}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            />
            <CartContainer
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            />
            </div>
        </div>
    );
}