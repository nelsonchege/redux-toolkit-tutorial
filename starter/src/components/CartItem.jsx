import React from 'react'
import {ChevronDown,ChevronUp} from '../constants/icons'
import {removeItem,toggleAmount} from '../redux/features/cart/cartSlice'
import { useDispatch } from 'react-redux'

export default function CartItem({id,img,title,price,amount}) {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4> 
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={()=>{dispatch(removeItem(id))}}>remove</button>
      </div>
      <div>
        <button className='amount-btn' onClick={()=>{dispatch(toggleAmount({id,actionType:'add'}))}}>
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={()=>{
          if(amount===1){
            dispatch(removeItem(id));
            return;
          }
          dispatch(toggleAmount({id,actionType:'minus'}))
          }}>
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}
