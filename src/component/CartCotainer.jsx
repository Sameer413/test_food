import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/Reducer'
import EmptyCart from '../img/emptyCart.svg'
import CartItems from './CartItems'
import { useEffect } from 'react'
import { useState } from 'react'


const CartCotainer = () => {

    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [tot, setTot] = useState(1)
    const [flag, setFlag] = useState(0)

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price
        }, 0);
        setTot(totalPrice);
    }, [tot, flag]);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="w-full md:w-375 h-[100vh] bg-white drop-shadow-md flex flex-col fixed top-0 right-0 z-[100]">

            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                <motion.div

                    whileTap={{ scale: 0.75 }} onClick={showCart}>
                    <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
                </motion.div>

                <p className="text-textColor text-lg font-semibold">Cart</p>

                <motion.p
                    whileTap={{ scale: 0.75 }}
                    className="flex text-center gap-2 p-1 px-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base">
                    Clear <RiRefreshFill />{" "}
                </motion.p>
            </div>
            {/* bottom section */}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
                    <div className="w-full h-340 md:h-44 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                        {/* cart Item */}
                        {cartItems &&
                            cartItems.map((item) => (
                                <CartItems
                                    key={item.id}
                                    item={item}
                                    setFlag={setFlag}
                                    flag={flag}
                                />
                            ))
                        }

                    </div>

                    {/* Cart Total Sections */}
                    <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Sub Total</p>
                            <p className="text-gray-400 text-lg">$ 7.8</p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Delivery</p>
                            <p className="text-gray-400 text-lg">$ 1.52</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200 text-xl">Total</p>
                            <p className="text-gray-200 text-xl">${tot + 2.5}</p>
                        </div>

                        {user ? (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type='button'
                                className="w-full p-2 rounded-full bg-orange-500 text-lg my-2 hover:shadow-lg"
                            >
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type='button'
                                className="w-full p-2 rounded-full bg-orange-500 text-lg my-2 hover:shadow-lg"
                            >
                                Login to check out
                            </motion.button>
                        )}

                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={EmptyCart} className="w-300" alt="" />
                    <p className="text-xl text-textColor font-semibold">
                        Add some items to your cart
                    </p>
                </div>
            )}

        </motion.div>
    )
}

export default CartCotainer