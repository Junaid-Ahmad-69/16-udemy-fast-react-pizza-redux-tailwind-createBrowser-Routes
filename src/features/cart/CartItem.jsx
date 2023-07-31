import {formatCurrency} from "../utils/helpers.js";
import {useDispatch} from "react-redux";
import {DeleteItem} from "./DeleteIten.jsx";

function CartItem({item}) {
    const {pizzaId, name, quantity, totalPrice} = item;

    const dispatch = useDispatch()


    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex justify-between items-center gap-6">
                <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
                <DeleteItem pizzaId={pizzaId}/>
            </div>
        </li>
    );
}

export default CartItem;
