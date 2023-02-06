import React ,{useEffect}from 'react'
import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'
import { useDispatch,useSelector } from 'react-redux'
import {calculateTotals,getCartItems} from './redux/features/cart/cartSlice'


export default function App() {
  const { isOpen } = useSelector((state) => state.modal);
  const { cartItems ,isLoading} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line
  }, [cartItems]);
  
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar/>
      <CartContainer />
    </main>
  )
}

