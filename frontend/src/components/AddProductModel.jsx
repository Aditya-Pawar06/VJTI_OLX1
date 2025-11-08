import React from 'react';

const AddProductModal = ({ showModal, setShowModal, newProduct, handleInputChange, handleAddProduct }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter category"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Product Image URL</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter image URL"
            />
          </div>


          <div>
            <label className="block font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter price"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
