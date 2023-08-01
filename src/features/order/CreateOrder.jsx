import {Form, redirect, useActionData, useNavigation} from 'react-router-dom';
import {Button} from "../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import EmptyCart from "../cart/EmptyCart.jsx";
import {createOrder} from "../services/apiRestaurant.js";
import store from "../../store.jsx";
import {clearItem, getTotalCartPrice} from "../cart/cartSlice.js";
import {useState} from "react";
import {formatCurrency} from "../utils/helpers.js";
import {fetchAddress} from "../user/userSlice.js";

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false)
    const {username, status: addressStatus, position, address, error: errorAddress} = useSelector(state => state.user)
    const isLoading = addressStatus === "loading";
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const dispatch = useDispatch()
    const formErrors = useActionData();
    const cart = useSelector(state => state.cart.cart);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = totalCartPrice + priorityPrice;
    if (!cart.length) return <EmptyCart/>
    return (
        <div className="px-4 py-6 ">
            <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

            <Form method="POST">
                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input className="input grow" type="text" name="customer" defaultValue={username} required/>
                </div>

                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input className="input w-full" type="tel" name="phone" required/>
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input className="input w-full" type="text" name="address" required defaultValue={address}
                               disabled={isLoading}/>
                        {addressStatus === "error" && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>
                    {!position.latitude && !position.longitude &&
                        <span className="absolute md:right-[5px] z-20 md:top-[5px] right-[3px] top-[3px]">
                        <Button disabled={isLoading} type="small" onClick={(e) => {
                            e.preventDefault()
                            dispatch(fetchAddress())
                        }}>Get Position</Button>
                    </span>}
                </div>

                <div className="mb-12 flex gap-5 items-center">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={e => setWithPriority(e.target.checked)}
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"/>
                    <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
                </div>

                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
                    <input type="hidden" name="position"
                           value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ""}/>
                    <Button disabled={isSubmitting || isLoading} type="primary">
                        {isSubmitting ? 'Placing order....' : `Order now from ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "true"
    };
    const errors = {};
    if (!isValidPhone(order.phone))
        errors.phone =
            'Please give us your correct phone number. We might need it to contact you.';

    if (Object.keys(errors).length > 0) return errors;


    // If everything is okay, create new order and redirect

    const newOrder = await createOrder(order);
    store.dispatch(clearItem())
    return redirect(`/order/${newOrder.id}`);

}

export default CreateOrder;
