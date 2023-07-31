import {formatCurrency} from "../utils/helpers.js";
import {Button} from "../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItem, getCartItemById} from "../cart/cartSlice.js";
import {DeleteItem} from "../cart/DeleteIten.jsx";

function MenuItem({pizza}) {
    const dispatch = useDispatch()
    const {id, name, unitPrice, ingredients, soldOut, imageUrl} = pizza;

    const currentQuantity = useSelector(getCartItemById(id))
    const isInCart = currentQuantity > 0;

    function handlerAddItem() {
        const newPizza = {
            pizzaId: id,
            quantity: 1,
            name,
            unitPrice,
            totalPrice: unitPrice * 1,
        }
        dispatch(addItem(newPizza))
    }

    return (
        <li className="flex gap-4 py-2">
            <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale opacity-70' : " "}`}/>
            <div className="flex flex-col grow pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
                <div className="mt-auto flex items-center justify-between ">
                    {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> :
                        <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
                    {isInCart && <DeleteItem pizzaId={id}/>}
                    {!soldOut && !isInCart && <Button type="small" onClick={handlerAddItem}>Add to cart</Button>}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
