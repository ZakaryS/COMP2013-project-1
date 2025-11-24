import cart1 from "../assets/cart-empty.png";
import cart2 from "../assets/cart-full.png";

export default function NavBar({ cart }) {
    return (
        <div className="NavBar">
            <div className="NavUser">
                Hello, username
            </div>
            <div className="NavTitle">
                <h2>Groceries App 🍎</h2>
            </div>
            <div className="NavCart">
                <img src={cart.length > 0 ? cart2 : cart1} alt="" height="30"/>
            </div>
        </div>
    )
}