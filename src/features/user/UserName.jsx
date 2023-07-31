import {useSelector} from "react-redux";

export const UserName = () => {
   const userName =  useSelector(store=> store.user.username)
    if(!userName) return null
    return (
        <div className="text-sm font-semibold hidden md:block">{userName}</div>
    )
}
