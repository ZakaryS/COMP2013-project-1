import CartCard from "./CartCard";

export default function CartContainer({
    cart,
    handleRemoveFromCart,
    handleEmptyCart,
    handleAddToQuantity,
    handleRemoveQuantity,
}) {
    let totalCost = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCost += cart[i].quantity * cart[i].currentPrice;
    }

    return (
        <div className="CartContainer">
            <h2>Cart items: {cart.length}</h2>
            {cart.map((item) => (
                <CartCard
                key={item.id}
                {...item}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddToQuantity={handleAddToQuantity}
                handleRemoveQuantity={handleRemoveQuantity}
                />
            ))}
            {cart.length === 0 ? (
                <p>No Items In Cart</p>
            ) : (
            <>
            <button className="RemoveButton" onClick={handleEmptyCart}>Empty Cart</button>
            <button id="BuyButton">Checkout: ${totalCost.toFixed(2)}</button>
            </>
            )}
        </div>
    );
}