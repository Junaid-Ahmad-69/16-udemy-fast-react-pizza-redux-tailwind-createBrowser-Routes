import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTotalCartPrice, getTotalCartQuantity} from "./cartSlice.js";
import {formatCurrency} from "../utils/helpers.js";

function CartOverview() {
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);
    if (!totalCartQuantity) return null;
    return (
        <div
            className="bg-stone-800 text-stone-200 uppercase text-sm md:text-base sm:px-6 px-4 py-4 flex items-center justify-between">
            <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
                <span>{totalCartQuantity} pizzas</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>
            <Link to="/cart">Open cart &rarr;</Link>
        </div>
    );
}

export default CartOverview;
