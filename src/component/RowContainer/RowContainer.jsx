import React, { useEffect, useRef } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../../img/NotFound.svg'
import { useStateValue } from '../../Context/StateProvider'
import { actionType } from '../../Context/Reducer'
import { useState } from 'react'

const RowContainer = ({ flag, data, scrollValue }) => {

    const rowContainer = useRef();

    const [items, setItems] = useState([]);

    const [{ cartItems }, dispatch] = useStateValue();

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue])

    const addtocart = (item) => {

        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items
        })
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    useEffect(() => {
        addtocart();
    }, [items]);

    return (
        <div
            ref={rowContainer}
            className={`w-full flex items-center gap-3 my-12 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center scrollbar-none'}  `}
        >

            {data && data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item.id}
                        className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg  hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
                    >

                        <div className="w-full flex items-center justify-between">

                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                            >
                                <img
                                    src={item?.imageUrl}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>

                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                                onClick={() => setItems([...cartItems, item])}
                            >
                                <MdShoppingBasket className="text-white " />
                            </motion.div>

                        </div>

                        <div className="w-full flex flex-col items-end justify-end -mt-8">
                            <p className="text-textColor font-semibold md:text-lg text-base">
                                {item?.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {item?.calories}
                            </p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-headingColor font-semibold">
                                    <span className="text-sm text-red-500">$</span> {item?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full flex items-center justify-center flex-col">
                    <img src={NotFound} className="h-340" alt="" />
                    <p className="text-xl font-semibold text-headingColor my-4">Items Not Available</p>
                </div>
            )
            }

        </div>
    )
}

export default RowContainer