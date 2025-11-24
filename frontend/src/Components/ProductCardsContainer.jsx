import ProductCard from "./ProductCard";

export default function ProductCardsContainer({
    products,
    productQuantity,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleAddToCart,
    handleOnDelete,
    handleOnEdit,
}) {
    return (
        <div className="ProductsContainer">
            {products.map((product) => (
                <ProductCard
                key={product._id}
                _id={product._id}
                {...product}
                productQuantity={productQuantity.find((prod) => prod.id === product.id)}
                handleAddToQuantity={handleAddToQuantity}
                handleRemoveQuantity={handleRemoveQuantity}
                handleAddToCart={handleAddToCart}
                handleOnDelete={handleOnDelete}
                handleOnEdit={handleOnEdit}
                />
            ))}
        </div>
    );
}