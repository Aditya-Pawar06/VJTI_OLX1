import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryBar from '../components/CategoryBar'

const Marketplace = () => {
  const username = localStorage.getItem("username")

  const [category, setCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("") // New state for search input
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("http://localhost:5000/api/getProductDataForMarketPlace")
        setProducts(response.data)
        setFilteredProducts(response.data) // Initially show all products
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    fetchProductData()
  }, [])

  // Filter products based on selected category
  const handleCategoryFilter = (selectedCategory) => {
    setCategory(selectedCategory);
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply search filter after category filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(product => 
        product.pname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle search query input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    let filtered = products;

    if (category !== "All" && category !== "") {
      filtered = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply search filter in search bar
    if (query.trim() !== "") {
      filtered = filtered.filter(product => 
        product.pname.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
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
      <Navbar />
      <div className="flex">
        {/* Category Filter */}
        <div className="w-1/5 p-4 bg-gray-100 shadow-md">
          <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
          <ul className="space-y-2">
            {["All", "Electronics", "Furniture", "Stationary", "Sports", "Music", "Other"].map((cat) => (
              <li key={cat}>
                <button 
                  onClick={() => handleCategoryFilter(cat)} 
                  className={`w-full text-left px-4 py-2 rounded-md ${category === cat ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Listing */}
        <div className="bg-white p-9 rounded-lg shadow-md mb-12 text-lg flex-1">
          <h2 className="text-2xl font-semibold mb-4">Products on Sale</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-md"
          />

          {filteredProducts.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <li key={product._id} className="p-6 border border-gray-300 rounded-lg shadow">
                  <Link to={`/product/${product._id}`}>
                    <img 
                      src={`http://localhost:5000${product.image}`} 
                      alt={product.pname} 
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-bold">{product.pname}</h3>
                    <p className="text-gray-700 text-base">{product.description}</p>
                    <p className="text-md text-gray-500">Category: {product.category}</p>
                    <p className="text-xl font-bold text-yellow-500">₹{product.price}</p>
                    <p className={`text-md font-medium ${product.status === "Available" ? "text-green-500" : "text-red-500"}`}>
                      {product.status}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-lg">No products available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );  
}

export default Marketplace;
