import CreateUser from "../user/CreateUser.jsx";
import {useSelector} from "react-redux";
import {Button} from "./Button.jsx";


function Home() {
     const userName = useSelector(state=>state.user.username);
    return (
        <div className="my-10 sm:my-16 text-center px-4">
            <h1 className="text-xl font-semibold mb-8 md:text-3xl">
                The best pizza.
                <br/>
                <span className="text-yellow-500">
                        Straight out of the oven, straight to you.
                </span>
            </h1>
            {!userName ? <CreateUser/> : <Button to="/menu" type="primary">Continue Order {userName}</Button>}
        </div>
    );
}

export default Home;
