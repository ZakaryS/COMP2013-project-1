export default function QuantityCounter({
    productQuantity,
    handleAddToQuantity,
    handleRemoveQuantity,
    mode,
}) {
    return (
        <div className="ProductQuantityDiv">
            <div>
                <button onClick={() => handleRemoveQuantity(productQuantity.id, mode)}>-</button>
            </div>
            <p>{productQuantity.quantity}</p>
            <div>
                <button onClick={() => handleAddToQuantity(productQuantity.id, mode)}>+</button>
            </div>
        </div>
    );
}