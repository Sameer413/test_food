import React from 'react'
import Main from './pages/Main/Main'
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from './Context/StateProvider'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { useEffect } from 'react'
import { actionType } from './Context/Reducer'

const App = () => {
    const [{ foodItems }, dispatch] = useStateValue()

    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data
            })
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <AnimatePresence mode='wait'>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Main />

            </div>
        </AnimatePresence>
    )
}

export default App