import {Header} from "./Header.jsx";
import CartOverview from "../cart/CartOverview.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import {Loader} from "./Loader.jsx";

export const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loader/>}
            <Header/>
            <div className="overflow-scroll">
                <main className=" max-w-3xl mx-auto ">
                    <Outlet/>
                </main>
            </div>
            <CartOverview/>
        </div>
    )
}
