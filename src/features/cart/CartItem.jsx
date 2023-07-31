import {formatCurrency} from "../utils/helpers.js";
import {Button} from "../ui/Button.jsx";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
          <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
