import React from 'react'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'

export default function CartContainer() {
    const {cartItems,amount,total} = useSelector((state)=>state.cart)

    if(amount < 1){
        return(
            <section className="cart">
                <header>
                    <h2>Your Cart</h2>
                    <h4 className="empty-cart"> is Currently Empty</h4>
                </header>
            </section>
        )
    }
  return (
    <section className="cart">
        <header>
            <h2>Your Cart</h2>
        </header>
        <div>
            {cartItems.map((item)=>(
                <CartItem key={item.id} {...item}/>
            ))}
        </div>
        <footer>
            <hr />
            <div className="cart-total">
                <h4>Total <span>${total}</span></h4>
            </div>
            <button className="btn clear-btn">Clear cart</button>
        </footer>
    </section>
  )
}
