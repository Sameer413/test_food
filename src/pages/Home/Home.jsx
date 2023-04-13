import React from 'react'
import BikeDeliveryImg from '../../img/delivery.png'
import HeroBgImg from '../../img/heroBg.png';
import { heroData } from '../../utils/Data'



const Home = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">

            <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">

                <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                    <p className="text-base text-orange-500 font-semibold">
                        Bike Delivery
                    </p>
                    <div className="w-8 h-8 rounded-full overflow-hidden drop-shadow-xl">
                        <img src={BikeDeliveryImg} alt="Delivery Boy" className="w-full h-full object-contain bg-white" />
                    </div>

                </div>

                <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
                    The Fastest Delivery in <span className="text-orange-600 text-[3rem] md:text-[5rem]">Your City</span>
                </p>

                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sint quibusdam exercitationem veniam reiciendis voluptatibus alias laborum maiores dolore quos soluta ipsa, assumenda sapiente ipsum, officiis incidunt nobis velit aut.
                </p>

                <button type='button' className="bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto">Order Now</button>
            </div>

            <div className="py-2 flex-1 flex items-center relative">

                <img
                    src={HeroBgImg}
                    alt="hero-bg"
                    className="ml-auto h-420 lg:h-650 w-full lg:w-auto"
                />

                <div className="w-full h-full absolute flex top-0 left-0 items-center justify-center py-4 gap-4 flex-wrap lg:px-32">

                    {heroData &&
                        heroData.map(n => (
                            <div
                                key={n.id}
                                className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center shadow-lg">

                                <img
                                    src={n.imgSrc}
                                    alt="IceCream"
                                    className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                                />
                                <p
                                    className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4"
                                >
                                    {n.name}
                                </p>
                                <p
                                    className="text-[12px] lg:text-sm text-lightTextGray font-semibold my-1 lg:my-3 "
                                >
                                    {n.description}
                                </p>
                                <p className="text-sm font-semibold text-headingColor"><span className="text-xs text-red-600">$</span>{n.price}</p>

                            </div>
                        ))
                    }

                </div>

            </div>

        </section>
    )
}

export default Home