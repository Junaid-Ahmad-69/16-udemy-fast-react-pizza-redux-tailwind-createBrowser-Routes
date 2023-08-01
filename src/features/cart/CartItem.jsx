import {formatCurrency} from "../utils/helpers.js";
import {useDispatch, useSelector} from "react-redux";
import {DeleteItem} from "./DeleteIten.jsx";
import {UpdateItemQuantity} from "./UpdateItemQuantity.jsx";
import {getCartItemById} from "./cartSlice.js";

function CartItem({item}) {
    const {pizzaId, name, quantity, totalPrice} = item;

  const currentQuantity = useSelector(getCartItemById(pizzaId))


    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex justify-between items-center gap-6">
                <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
                <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
                <DeleteItem pizzaId={pizzaId}/>
            </div>
        </li>
    );
}

export default CartItem;
