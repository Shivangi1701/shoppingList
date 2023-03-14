import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const CartContainer = () => {
    const { cartItems, total, amount } = useSelector((store) => store.cart);
    if (amount < 1) {
        return (
            <section className='cart'>
                <header>
                    <h2>Your Bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </section>
        );
    }

    return (
        <section className='cart'>
            <header>
                <h2>Your Bag</h2>
            </header>
            <div>
                {cartItems.map((item)=>{ //maps over the cartItems array
                    return <CartItem key={item.id} {...item} />;//key prop is set to id value and spread operator (...item) passes all properties of item as seperate props to the cart item 
                })}
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>
                        Total <span>${total}</span>
                    </h4>
                </div>
                <button className='btn clear-btn'>Clear cart</button>
            </footer>
        </section>
    )
};

export default CartContainer;