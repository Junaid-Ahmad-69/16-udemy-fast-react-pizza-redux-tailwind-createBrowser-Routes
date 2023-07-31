import {Link} from "react-router-dom";


export const Button = ({children, disabled, to, type}) => {
    const base = "focus:outline-none text-sm focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300"

    const style = {
        primary: base + " px-4 py-3 md:px-6 md:py-4",
        small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
        secondary: 'text-sm hover:text-stone-800 px-4 py-2.5 md:px-6 md:py-3.5 focus:outline-none focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed border-2 border-stone-300 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors duration-300'
    }
    if (to)
        return <Link to={to} className={style[type]}>{children}</Link>
    return (
        <button
            className={style[type]}>{children}</button>
    )
}
