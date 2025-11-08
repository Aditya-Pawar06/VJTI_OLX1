import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CommonNav from "../components/CommonNav"
import Navbar from '../components/HomeNav';

const ProductInfo = () => {
    const username = localStorage.getItem('username')
    const [senderEmail, setSenderEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/getProductDataByID",
                    { params: { id: id } }
                )
                console.log(response.data[0])
                setProduct(response.data[1])
                setUser(response.data[0])
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchProduct()
    }, [id])

    useEffect(() => {
        const userData = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    "http://localhost:5000/api/getUserData",
                    { params: { username: username } }
                );
                console.log(response.data)
                setSenderEmail(response.data.email)
                setName(response.data.name)
                setPhone(response.data.phone)
                setIsLoading(false)
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }

        userData()
    }, [username])


    const openContactForm = () => {
        setShowModal(true)
    }

    const closeContactForm = () => {
        setShowModal(false)
    }

    const handleSendEmail = async () => {
        try {
            // console.log(senderEmail,phone)
            const response = await axios.post('http://localhost:5000/sendEmail', {
                to: user.email, // The seller's email
                subject: 'Inquiry About Product: ' + product.pname,
                text: `Contact Details of Sender: Email:${senderEmail}Phone:${phone} ${message}`,
                html: `
                <p><strong>Message:</strong> ${message}</p>
                `,
            })

            if (response.status === 200) {
                alert('Email sent successfully!')
                setMessage('') // Clear the message box
                setShowModal(false) // Close the modal
            } else {
                alert('Failed to send the email. Please try again.')
            }
        } catch (error) {
            console.error('Error sending email:', error)
            alert('Failed to send the email. Please try again.')
        }
    }

    return (
        <>
            <CommonNav />
            <div className="flex items-start gap-5 bg-gray-50 p-5">
                {/* Left Side: Image */}
                <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.pname}
                    className="w-1/2 h-50 object-cover rounded-md mb-4"

                />

                {/* Right Side: Product and Seller Info */}
                <div className="w-1/2 bg-gray-100 p-5 rounded-xl flex flex-col justify-between">
                    {/* Product Information */}
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-gray-800">Product Information</h2>
                        <div className="mt-2 text-gray-700">Name: {product.pname}</div>
                        <div className="mt-2 text-gray-700">Description: {product.description}</div>
                        <div className="mt-2 text-gray-700">Category: {product.category}</div>
                        <div className="mt-2 text-gray-700">Price: ₹{product.price}</div>
                        <div className={`mt-2 font-medium ${product.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>Status: {product.status}</div>
                    </div>

                    {/* Seller Information */}
                    <div className="bg-teal-100 p-4 rounded-lg mb-4">
                        <h3 className="text-xl font-bold text-teal-700">Seller Information</h3>
                        <div className="mt-1 text-teal-800">Seller Name: {user.name}</div>
                        <div className="mt-1 text-teal-800">Seller Email: {user.email}</div>
                        <div className="mt-1 text-teal-800">Seller Phone: {user.phone}</div>
                    </div>

                    

                    {/* Contact Me Button */}
                    <button
                        onClick={openContactForm}
                        className="w-full bg-teal-400 text-white font-bold py-2 px-4 rounded-lg mt-3 hover:bg-teal-500 transition duration-300">
                        Contact Me
                    </button>
                </div>
            </div>

            {/* Modal for Sending Message */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Send a Message to {user.name}</h3>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full h-40 p-2 border border-gray-300 rounded-lg mb-4"
                        />
                        <div className="flex justify-end gap-3">
                            <button onClick={closeContactForm} className="bg-gray-300 text-black py-2 px-4 rounded-lg">Cancel</button>
                            <button
                                onClick={handleSendEmail}
                                className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductInfo
