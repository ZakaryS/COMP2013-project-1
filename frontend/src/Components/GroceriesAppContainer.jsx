import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ProductCardsContainer from "./ProductCardsContainer";
import CartContainer from "./CartContainer";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function GroceriesAppContainer() {

    const handleProductsDB = async() => {
        try {
            const response = await axios.get("http://localhost:3000/products");
            setProductsData(response.data);
            setProductQuantity( response.data.map((prod) => ({
                id: prod.id,
                quantity: 0,
                priceOptions: [parseFloat(prod.price.replace("$", ""))],
                currentPrice: parseFloat(prod.price.replace("$", "")),
            })));
        }catch(error) {
            console.log(error.message);
        }
    }

    // States
    const [cart, setCart] = useState([]);
    const [products, setProductsData] = useState([]);
    const [productQuantity, setProductQuantity] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        productName: "",
        brand: "",
        image: "",
        price: "",
    });
    const [postResponse, setPostResponse] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // Effects
    useEffect(() => {
        handleProductsDB();
    }, [postResponse]);

    // Handlers
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
    };

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
    };

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
    };

    const handleEmptyCart = () => {
        if (cart.length === 0) {
            alert("Cart is already empty!");
            return;
        }

        setCart([]);
        return;
    };

    const handleResetForm = () => {
        setFormData({
            id: "",
            productName: "",
            brand: "",
            image: "",
            price: "",
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                handleOnUpdate(formData._id);
                handleResetForm();
                setIsEditing(false);
            } else {
            const response = await axios.post("http://localhost:3000/products", formData);
            setPostResponse(response.data.message)
            setFormData({
                id: "",
                productName: "",
                brand: "",
                image: "",
                price: "",
            });
            handleProductsDB();
        }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
    };

    const handleOnDelete = async(id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/products/${id}`);
            setPostResponse(response.data.message);
        } catch (error) {
            console.log(error.message);
        }
    };

    //Fix Edit
    const handleOnEdit = async(_id) => {
        try {
            const productToEdit = await axios.get(`http://localhost:3000/products/${_id}`);
            setFormData({
                _id: productToEdit.data._id,
                id: productToEdit.data.id,
                productName: productToEdit.data.productName,
                brand: productToEdit.data.brand,
                image: productToEdit.data.image,
                price: productToEdit.data.price,
            });
            setIsEditing(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnUpdate = async (_id) => {
        try {
            const result = await axios.patch(
                `http://localhost:3000/products/${_id}`,
                formData,
            );
            setPostResponse(result.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <NavBar cart={cart} />
            <div className="GroceriesApp-Container">
            <ProductForm
            id={formData.id}
            productName={formData.productName}
            brand={formData.brand}
            image={formData.image}
            price={formData.price}
            handleOnSubmit={handleOnSubmit}
            handleOnChange={handleOnChange}
            isEditing={isEditing}
            postResponse={postResponse}
            />
            <ProductCardsContainer
            products={products}
            productQuantity={productQuantity}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleOnDelete={handleOnDelete}
            handleOnEdit={handleOnEdit}
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