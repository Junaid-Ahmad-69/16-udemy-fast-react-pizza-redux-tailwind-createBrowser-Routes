import {getMenu} from "../services/apiRestaurant.js";
import {useLoaderData} from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

function Menu() {
    const menu = useLoaderData();
    return (
        <>
            <ul className="divide-y divide-stone-200 px-2">
                {menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id}/>)}
            </ul>
        </>
    )
}

export async function loader() {
    return await getMenu();

}


export default Menu;
