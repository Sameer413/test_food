import React from 'react'
import Header from '../../component/Header/Header'
import { Routes, Route } from 'react-router-dom'
import CreateItem from '../../component/Admin/CreateItem'
import MainContainer from '../MainContainer'

const Main = () => {
    return (
        <div>
            <Header />
            <main className="mt-14 md:mt-20 px-4 md:px-16 py-4  w-full">
                <Routes>
                    <Route path='/*' element={<MainContainer />} />
                    <Route path='/createitem' element={< CreateItem />} />
                </Routes>
            </main>
        </div>
    )
}

export default Main