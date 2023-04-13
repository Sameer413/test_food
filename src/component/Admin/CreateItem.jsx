import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md';
import { foodCategory } from '../../utils/Data';
import Loader from '../Loader/Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase.config'
import { getAllFoodItems, saveItem } from '../../utils/firebaseFunctions';
import { useStateValue } from '../../Context/StateProvider';
import { actionType } from '../../Context/Reducer';


const CreateItem = () => {
    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [imageAsset, setImageAsset] = useState(null);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [{ foodItems }, dispatch] = useStateValue()




    const uploadImage = (e) => {
        setLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error);
            setFields(true)
            setMsg('Error while uploading : Try Again 😫')
            setAlertStatus('danger')
            setTimeout(() => {
                setFields(false)
                setLoading(false)
            }, 4000)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                setImageAsset(downloadURL);
                setLoading(false);
                setFields(true);
                setMsg('Image uploaded Successfully 😊')
                setAlertStatus("success")
                setTimeout(() => {
                    setFields(false)
                }, 4000)
            })
        })
    }

    const deleteImg = () => {
        setLoading(true)
        const deleteRef = ref(storage, imageAsset)
        deleteObject(deleteRef).then(() => {
            setImageAsset(null)
            setLoading(false)
            setMsg('Image deleted Successfully 😊')
            setAlertStatus("success")
            setTimeout(() => {
                setFields(false)
            }, 4000)
        })
    }

    const saveDetails = () => {
        setLoading(true)
        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setFields(true)
                setMsg("Required Fields Can't be empty");
                setAlertStatus('danger')
                setTimeout(() => {
                    setFields(false)
                    setLoading(false)
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageUrl: imageAsset,
                    category: category,
                    calories: calories,
                    qty: 1,
                    price: price
                }
                saveItem(data);
                setLoading(false);
                setFields(true);
                setMsg("Data Uploaded successfully 😊");
                clearData()
                setAlertStatus("success")
                setTimeout(() => {
                    setFields(false)
                }, 4000);
            }
        } catch (error) {
            setFields(true)
            setMsg("Error while uploading : try Again 😫")
            setAlertStatus("danger")
            setTimeout(() => {
                setFields(false)
                setLoading(false)
            }, 4000);
        }

        fetchData();
    }

    const clearData = () => {
        setTitle("")
        setImageAsset(null)
        setCalories("")
        setPrice("")
        setCalories("select Category")
    }

    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data
            })
        })
    }


    return (
        <div className="w-full min-h-screen flex items-center justify-center">

            <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                {fields && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
                        {msg}
                    </motion.p>
                )}

                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFastfood className="text-xl text-gray-700" />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        placeholder='Give me a Title...'
                    />
                </div>

                <div className="w-full ">
                    <select
                        className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                        onChange={(e) => setCategory(e.target.value)}
                        name=""
                        id="">
                        <option value="other" className="bg-white">
                            Select Category
                        </option>
                        {foodCategory && foodCategory.map((item) => (
                            <option
                                key={item.id}
                                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                                value={item.urlParamName}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
                    {loading ? <Loader /> : <>

                        {!imageAsset ? (
                            <>
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">

                                        <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                        <p className="text-gray-500 hover:text-gray-700">
                                            Click here to upload
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="uploadingImage"
                                        accept='image/*'
                                        onChange={uploadImage}
                                        className="w-0 h-0"
                                    />
                                </label>
                            </>
                        ) : (
                            <><div className="relative h-full">
                                <img
                                    src={imageAsset}
                                    alt="upload_image"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type='button'
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                    onClick={deleteImg}
                                >
                                    <MdDelete className="text-white" />
                                </button>
                            </div></>
                        )}
                    </>
                    }
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdFoodBank className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="Calories"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
                    </div>

                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdAttachMoney className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <button
                        type='button'
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CreateItem