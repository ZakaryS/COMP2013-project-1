import QuantityCounter from "./QuantityCounter";

export default function ProductCard({ 
    productQuantity,
    image,
    productName,
    brand,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleAddToCart,
}) {
    return (
    <div className="ProductCard">
        <h3>{productName}</h3>
        <img src={image} alt="" height="100px" />
        <h5>{brand}</h5>
        <QuantityCounter
        productQuantity={productQuantity}
        handleAddToQuantity={handleAddToQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        mode="product"
        />
        <p>
            Total Price: $ {(productQuantity.quantity * productQuantity.currentPrice).toFixed(2)}
        </p>
        <button onClick={() => handleAddToCart(productQuantity)}>Add To Cart</button>
    </div>
)}