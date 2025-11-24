import QuantityCounter from "./QuantityCounter";

export default function ProductCard({ 
    _id,
    productQuantity,
    image,
    productName,
    brand,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleAddToCart,
    handleOnDelete,
    handleOnEdit,
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
            ${productQuantity.currentPrice.toFixed(2)}
        </p>
        <button onClick={() => handleAddToCart(productQuantity)}>Add To Cart</button>
        <button className="EditButton" onClick={() => handleOnEdit(_id)}>Edit</button>
        <button className="RemoveButton" onClick={() => handleOnDelete(_id)}>Delete</button>
    </div>
)}