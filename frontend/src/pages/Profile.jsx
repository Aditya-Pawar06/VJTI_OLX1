import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { User, Mail, Phone } from 'lucide-react'
import ProductsOnSale from '../components/ProductsOnSale';
import CommonNav from '../components/CommonNav';


const Profile = () => {
  const username = localStorage.getItem("username")

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [pname, setPname]= useState("")
  const [description, setDescription]= useState("")
  const [price, setPrice]= useState("")
  const [category, setCategory]= useState("")
  const [status, setStatus]= useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [image, setImage] = useState(null)
  
  useEffect(() => {
    const userData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          "http://localhost:5000/api/getUserData",
          { params: { username: username } }
        );
        setEmail(response.data.email)
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("pname", pname);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("status", status);
      if (image) formData.append("image", image); 
  
      const response = await axios.post("http://localhost:5000/api/addproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201) {
        setIsOpen(false);
        alert("Product Added Successfully");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error");
      } else {
        setError("Server Error");
      }
    }
  };
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 bg-yellow-400"></div>
      </div>
    )
  }

  return (
    <>
    <CommonNav/>
    <div className="min-h-screen bg-gray-100 flex items-left justify-left p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-yellow-400 text-white rounded-full flex items-center justify-center mb-4">
            <User size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-500">@{username}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <Mail className="text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{email}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <Phone className="text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{phone || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <button onClick={()=>{setIsOpen(true)}}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
              Add Product
            </button>
          </div>
        </div>
        {isOpen && (<form style={styles.form} onSubmit={handleAddProduct}>
        {/* Full Name */}
        <div style={styles.inputGroup}>
          <i className="fas fa-user" style={styles.icon}></i>
          <input
            type="text"
            placeholder="Product Name"
            value = {pname}
            onChange = {(e)=>{setPname(e.target.value)}}
            style={styles.input}
            required
          />
        </div>

        {/* Username */}
        <div style={styles.inputGroup}>
          <i className="fas fa-user" style={styles.icon}></i>
          <input
            type="text"
            placeholder="Product Description"
            
            value = {description}
            onChange = {(e)=>{setDescription(e.target.value)}}
            style={styles.input}
            required
          />
        </div>

        {/* Price */}
        <div style={styles.inputGroup}>
          <i className="fas fa-envelope" style={styles.icon}></i>
          <input
            type="number"
            placeholder="Product Price"
            value = {price}
            onChange = {(e)=>{setPrice(e.target.value)}}
            style={styles.input}
            required
          />
        </div>

        {/* Product Category Dropdown */}
<div style={styles.inputGroup}>
  <i className="fas fa-list" style={styles.icon}></i>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    style={styles.input}
    required
  >
    <option value="" disabled>Select Category</option>
    <option value="furniture">furniture</option>
    <option value="electronics">electronics</option>
    <option value="stationary">stationary</option>
    <option value="sports">sports</option>
    <option value="music">music</option>
    <option value="other">other</option>
  </select>
</div>


        {/* Product Status Dropdown */}
<div style={styles.inputGroup}>
  <i className="fas fa-lock" style={styles.icon}></i>
  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    style={styles.input}
    required
  >
    <option value="" disabled>Select Status</option>
    <option value="available">Available</option>
    <option value="unavailable">Unavailable</option>
  </select>
</div>

        {/* Image */}
        <div style={styles.inputGroup}>
          <i className="fas fa-lock" style={styles.icon}></i>
          <input
            type="file"
            placeholder="Add Image"
            accept="image/*"
            onChange = {(e)=>{setImage(e.target.files[0])}}
            style={styles.input}
            required
          />
        </div>
        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>)}
      </div>
      <div className="ml-8">
        <ProductsOnSale/>
      </div>
    </div>
    </>
  )
}

const styles = {
  container: {
      width: "500px", // Explicitly set the width
      margin: "50px auto",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#fdfdfd",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
    },
heading: {
  fontSize: "24px",
  marginBottom: "10px",
},
description: {
  fontSize: "14px",
  color: "#777",
  marginBottom: "20px",
},
form: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},
inputGroup: {
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
  width: "100%",
  position: "relative",
},
icon: {
  position: "absolute",
  left: "10px",
  fontSize: "18px",
  color: "#888",
},
input: {
  width: "100%",
  padding: "10px 35px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
},
button: {
  backgroundColor: "#f8c11c",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "15px",
},
register: {
  fontSize: "14px",
},
footer: {
  marginTop: "20px",
  fontSize: "14px",
  color: "#888",
},
socialMediaLink: {
  color: "#4267B2", // Facebook blue
  textDecoration: "none",
  fontWeight: "bold",
},
registerLink: {
  color: "#4267B2",  // Blue color for the link
  textDecoration: "none",  // Optional: removes the underline
},
};


export default Profile