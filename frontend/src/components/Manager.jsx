import React from 'react'
import { useRef, useState, useEffect } from 'react';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('password');
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])



    const ShowPass = () => {
        passwordref.current.type = 'text'
        alert("Show Pass");
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png"
            passwordref.current.type = 'text'
        }
        else {
            ref.current.src = "icons/hidden.png"
            passwordref.current.type = 'password'
        }
    }

    const SavePass = () => {
        setpasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),
        rgba(255,255,255,0))]"></div>
            <div className='mycontainer'>
                <h1 className='text-center'>
                    <div className='logo font-bold text-2xl items-center'>
                        <span className='text-green-700'>&lt;</span>
                        Pass
                        <span className='text-green-700'>OP/&gt;</span>
                    </div>
                </h1>
                <p className='text-green-700 text-center'>Your Own Password Manager</p>
                <div className=' flex flex-col p-4 gap-4'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter URL' className='rounded-full border border-green-600 text-black px-2 '
                        type="text" name="site" id="" />
                    <div className='flex w-full gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" className='rounded-full border border-green-600 text-black w-full px-2'
                            name="username" id="" />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" className='rounded-full border border-green-600 text-black w-full px-2'
                                name="password" id="" />
                            <span className="absolute right-3 top-0.5 " onClick={ShowPass} >
                                <img ref={ref} src="icons/eye.png" alt="hidden" width={20} />
                            </span>
                        </div>
                    </div>

                    <button onClick={SavePass} className="flex justify-center items-center gap-2 rounded-full bg-green-600 px-2  w-fit self-center hover:bg-green-500 border border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#1e293b"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>

                <div className='passwords'>
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>NO PASSWORDS TO SHOW</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-700 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border  border-white  text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td className='py-2 border  border-white  text-center w-32'>{item.username}</td>
                                        <td className='py-2 border  border-white  text-center w-32'>{item.password}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
