import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const { cartItems,subTotal,shipping,tax,total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const increment = (id) => {
    dispatch({
      type: 'incrementFromCart',
      payload: id
    });
    dispatch({
      type: 'calculateCartTotle',
    });
    
  }
  const decrement = (id) => {
    dispatch({
      type: 'decrementFromCart',
      payload: id
    })
    dispatch({
      type: 'calculateCartTotle',
    });
  }
  const deleteHandler = (id) => {
    dispatch({
      type: 'deleteFromCart',
      payload: id
    })
    dispatch({
      type: 'calculateCartTotle',
    });
  }

  return (
    <div className="cart">

      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => {
            return (
              <CartItem
                key={i.id}
                imgSrc={i.imgSrc}
                name={i.name}
                price={i.price}
                qty={i.quantity}
                id={i.id}
                decrement={decrement}
                increment={increment}
                deleteHandler={deleteHandler}
              />
            );
          })
        ) : (
          <h1>Nothing in cart...</h1>
        )}
      </main>

      <aside>
        <h2>Subtotal: ${subTotal}</h2>
        <h2>Shipping: ${shipping}</h2>
        <h2>Tax: ${tax}</h2>
        <h2>Total: ${total}</h2>
      </aside>
    </div>
  );
}

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => {
  return (
    <div className="cartItem">
      <img src={imgSrc} alt="Item" />

      <article>
        <h3>{name}</h3>
        <p>${price}</p>
      </article>

      <div>
        <button onClick={() => decrement(id)}>-</button>
        <p>{qty}</p>
        <button onClick={() => increment(id)}>+</button>
      </div>
      <AiFillDelete onClick={() => deleteHandler(id)} />
    </div>
  );
};

export default Cart;
