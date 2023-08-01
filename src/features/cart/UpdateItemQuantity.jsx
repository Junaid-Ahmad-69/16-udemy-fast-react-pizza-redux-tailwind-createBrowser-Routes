import {Button} from "../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {decreaseItemQuantity, increaseItemQuantity} from "./cartSlice.js";
export const UpdateItemQuantity = ({pizzaId, currentQuantity}) => {
    const dispatch = useDispatch();
    return (
        <div className="flex gap-2 items-center md:gap-3">
            <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
            <span className="text-sm font-bold">{currentQuantity}</span>
            <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
    )
}
