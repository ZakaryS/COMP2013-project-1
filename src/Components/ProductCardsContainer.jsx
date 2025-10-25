import ProductCard from "./ProductCard";

export default function ProductCardsContainer({
    products,
    productQuantity,
    handleAddToQuantity,
    handleRemoveQuantity,
    handleAddToCart,
}) {
    return (
        <div className="ProductsContainer">
            {products.map((product) => (
                <ProductCard
                key={product.id}
                {...product}
                productQuantity={productQuantity.find((prod) => prod.id === product.id)}
                handleAddToQuantity={handleAddToQuantity}
                handleRemoveQuantity={handleRemoveQuantity}
                handleAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
}