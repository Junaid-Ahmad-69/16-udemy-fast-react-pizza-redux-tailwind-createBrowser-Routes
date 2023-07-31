import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./features/ui/Home.jsx";
import Menu, {loader as menuLoader} from "./features/menu/Menu.jsx";
import Order, {loader as orderLoader} from "./features/order/Order.jsx";
import Cart from "./features/cart/Cart.jsx";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder.jsx";
import {AppLayout} from "./features/ui/AppLayout.jsx";
import Error from "./features/ui/Error.jsx";

const routes = createBrowserRouter([
    {
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {path: "/", element: <Home/>},
            {
                path: "/menu",
                element: <Menu/>,
                loader: menuLoader,
                errorElement: <Error/>,
            },
            {path: "/cart", element: <Cart/>},
            {
                path: "/order/new",
                element: <CreateOrder/>,
                action: createOrderAction
            },
            {
                path: "/order/:orderId",
                element: <Order/>,
                loader: orderLoader,
                errorElement: <Error/>,
            },
        ]
    }
])

export const App = () => {
    return <RouterProvider router={routes}/>
}
