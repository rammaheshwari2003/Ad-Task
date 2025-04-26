import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import { Home, QrCode, PlusCircle, ShoppingCart, Layers } from "lucide-react"

import CreateProduct from "./pages/CreateProduct"
import ProductList from "./pages/ProductList"
import { CartProvider, useCart } from "./CartContext"
import CartPage from "./pages/CartPage"
import CategoryManagement from "./pages/CategoryManagement"
import SubCategoryManagement from "./pages/SubCategory"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Sidebar from "./pages/Navbar"
import EnquiryDisplay from "./pages/enquiryDisplay"

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  )
}

function AppContent() {
  const { cart } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px]">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 relative"
                  : "text-gray-500 hover:text-gray-700 relative transition-colors"
              }
            >
              <ShoppingCart size={28} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        <div className="container mx-auto px-6 py-12 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px]">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/subcategories" element={<SubCategoryManagement />} />
            <Route path="/enquiry" element={<EnquiryDisplay/>} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Bottom Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 rounded-t-xl z-40">
        <div className="flex justify-around py-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 flex flex-col items-center px-4"
                : "text-gray-500 hover:text-gray-700 flex flex-col items-center px-4 transition-colors"
            }
          >
            <Home size={26} />
            <span className="text-sm mt-1">Products</span>
          </NavLink>
          <NavLink
            to="/scan"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 flex flex-col items-center px-4"
                : "text-gray-500 hover:text-gray-700 flex flex-col items-center px-4 transition-colors"
            }
          >
            <QrCode size={26} />
            <span className="text-sm mt-1">Scan</span>
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 flex flex-col items-center px-4"
                : "text-gray-500 hover:text-gray-700 flex flex-col items-center px-4 transition-colors"
            }
          >
            <PlusCircle size={26} />
            <span className="text-sm mt-1">Add</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 flex flex-col items-center px-4"
                : "text-gray-500 hover:text-gray-700 flex flex-col items-center px-4 transition-colors"
            }
          >
            <Layers size={26} />
            <span className="text-sm mt-1">Categories</span>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 flex flex-col items-center px-4"
                : "text-gray-500 hover:text-gray-700 flex flex-col items-center px-4 transition-colors"
            }
          >
            <div className="relative">
              <ShoppingCart size={26} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="text-sm mt-1">Cart</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default App