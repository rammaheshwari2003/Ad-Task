"use client"

import { useEffect, useState } from "react"
import { deleteProduct, fetchProducts } from "../api"
import {
  Package,
  Search,
  RefreshCw,
  Trash2,
  ShoppingCart,
  Tag,
  Info,
  X,
} from "lucide-react"
import { useCart } from "../CartContext"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { fetchCart } = useCart()
  const [addingToCart, setAddingToCart] = useState({})
  const [selectedProduct, setSelectedProduct] = useState(null)

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchProducts()
      setProducts(res.data)
    } catch (err) {
      console.error("Failed to fetch products:", err)
      setError("Failed to load products. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deleteP = async (id) => {
    const res = await deleteProduct(id)
    if (res.data) {
      setProducts(res.data.data)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = async (productId) => {
    setAddingToCart((prev) => ({ ...prev, [productId]: true }))
    try {
      await fetch(`http://localhost:8080/cart/add/${productId}`, {
        method: "POST",
      })
      await fetchCart()
    } catch (err) {
      console.error("Failed to add product to cart:", err)
    } finally {
      setAddingToCart((prev) => ({ ...prev, [productId]: false }))
    }
  }

  const downloadPDF = async () => {
    if (!selectedProduct) return

    try {
      const response = await fetch(`http://localhost:8080/products/${selectedProduct._id}/brochure`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to download brochure")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${selectedProduct.name}_brochure.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error("Error downloading PDF:", err)
    }
  }

  return (
    <div className="container mx-auto px-6 py-12 sm:px-8 md:px-10 lg:px-12 xl:px-16 max-w-[1600px] z-30">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-2xl mb-8">
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Package className="mr-3" size={32} />
            Product Catalog
          </h2>
          <button
            onClick={loadProducts}
            className="p-3 text-gray-500 hover:text-blue-600 focus:outline-none transition-colors"
            title="Refresh products"
          >
            <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={22} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Loading, Error, or Empty States */}
      {loading ? (
        <div className="flex justify-center items-center p-16 bg-white rounded-2xl shadow-lg">
          <RefreshCw size={32} className="animate-spin text-blue-600" />
          <span className="ml-4 text-xl text-gray-600">Loading products...</span>
        </div>
      ) : error ? (
        <div className="p-16 text-center text-red-600 bg-white rounded-2xl shadow-lg text-xl">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-16 text-center text-gray-500 bg-white rounded-2xl shadow-lg text-xl">
          {searchTerm ? "No products match your search." : "No products available."}
        </div>
      ) : (
        <>
          {/* Main Product Grid */}
          <div className=" gap-8 mb-16">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-contain p-6"
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <Package size={64} />
                      <span className="text-sm mt-3">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1 text-center">Product Name: {product.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Quick View Section */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-between">
              <Package className="mr-3" size={32} />
              Quick View
            </h2>
            <div className=" gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-contain p-4"
                      />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <Package size={36} />
                        <span className="text-xs mt-2">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1 text-center">{product.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 sm:p-8 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-10 sm:p-12">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-4xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={32} />
                </button>
              </div>

              {selectedProduct.images?.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 mb-10">
                  <div className="col-span-4 h-96 sm:h-[500px] bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                  {selectedProduct.images.slice(1).map((image, index) => (
                    <div key={index} className="h-24 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${selectedProduct.name} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-10">
                  <div className="text-gray-400 flex flex-col items-center">
                    <Package size={96} />
                    <span className="text-base mt-4">No images available</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                {selectedProduct.category && (
                  <div>
                    <h3 className="text-base font-medium text-gray-500">Category</h3>
                    <p className="text-gray-900 text-lg">{selectedProduct.category.name}</p>
                  </div>
                )}
                {selectedProduct.subCategory && (
                  <div>
                    <h3 className="text-base font-medium text-gray-500">Sub-Category</h3>
                    <p className="text-gray-900 text-lg">{selectedProduct.subCategory.name}</p>
                  </div>
                )}
              </div>

              {selectedProduct.description && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{selectedProduct.description}</p>
                </div>
              )}

              {selectedProduct.specialization && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialization</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{selectedProduct.specialization}</p>
                </div>
              )}

              <div className="flex gap-6">
                <button
                  onClick={() => {
                    deleteP(selectedProduct._id)
                    setSelectedProduct(null)
                  }}
                  className="bg-red-50 hover:bg-red-100 text-red-600 py-3 px-8 rounded-lg flex items-center justify-center transition-colors text-lg"
                >
                  <Trash2 size={24} className="mr-3" />
                  Delete
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 px-8 rounded-lg flex items-center justify-center transition-colors text-lg"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList