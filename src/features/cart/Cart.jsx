import {LinkButton} from "../ui/LinkButton.jsx";
import {Button} from "../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearItem} from "./cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";

function Cart() {
    const dispatch = useDispatch();
    const userName = useSelector(state => state.user.username)
    const cart = useSelector(state => state.cart.cart);

    if (!cart.length) return <EmptyCart/>

    return (
        <div className="py-3 px-4">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
            <ul className="divide-y divide-stone-200 border-b mt-3">{cart.map(item => <CartItem item={item}
                                                                                                key={item.id}/>)}</ul>
            <div className="mt-6 space-x-2">
                <Button to="/order/new" type="primary">Order pizzas</Button>
                <Button type="secondary" onClick={() => dispatch(clearItem())}>Clear Cart</Button>
            </div>
        </div>
    );
}

export default Cart;
