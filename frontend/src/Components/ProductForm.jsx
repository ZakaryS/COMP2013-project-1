export default function ProductForm({
    id,
    productName,
    brand,
    image,
    price,
    handleOnSubmit,
    handleOnChange,
    isEditing,
    postResponse,
}) {
    return (
        <div className="product-form">
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="id"></label>
                <input type="text" name="id" id="id" value={id} onChange={handleOnChange} placeholder="ID" required/>
                <br/>
                <label htmlFor="productName"></label>
                <input type="text" name="productName" id="productName" value={productName} onChange={handleOnChange} placeholder="Product Name" required/>
                <br/>
                <label htmlFor="brand"></label>
                <input type="text" name="brand" id="brand" value={brand} onChange={handleOnChange} placeholder="Brand" required/>
                <br/>
                <label htmlFor="image"></label>
                <input type="text" name="image" id="image" value={image} onChange={handleOnChange} placeholder="Image" required/>
                <br/>
                <label htmlFor="price"></label>
                <input type="text" name="price" id="price" value={price} onChange={handleOnChange} placeholder="Price" required/>
                <br/>
                <button>{(isEditing) ? "Save" : "Submit"}</button>
                <br/>
                <div className="form-message"><p>{postResponse}</p></div>
            </form>
        </div>
    )
}