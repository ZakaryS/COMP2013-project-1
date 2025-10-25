import QuantityCounter from "./QuantityCounter";

export default function CartCard({
    id,
    image,
    productName,
    quantity,
    currentPrice,
    handleRemoveFromCart,
    handleAddToQuantity,
    handleRemoveQuantity,
}) {
    const productQuantity = { id, quantity, currentPrice };
    return (
        <div className="CartCard">
            <img src={image} alt="" height="30" />
            <h4>{productName}</h4>
            <p>${currentPrice}</p>
            <QuantityCounter
            productQuantity={productQuantity}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            mode="cart"
            />
            <p>Total Price: ${(quantity * currentPrice).toFixed(2)}</p>
            <button className="RemoveButton" onClick={() => { handleRemoveFromCart({ id, productName, quantity, currentPrice });}}>Remove Item</button>
        </div>
    );
}