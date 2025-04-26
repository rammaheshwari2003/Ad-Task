import React from "react"
import { NavLink } from "react-router-dom"
import { Home,PlusCircle,  ShoppingCart, Layers, LayoutGrid, UserPlus, LogIn } from "lucide-react"
import { useCart } from "../CartContext"

const navItems = [
  { to: "/", label: "Products", icon: Home },
  { to: "/categories", label: "Categories", icon: Layers },
  { to: "/subcategories", label: "Sub-Categories", icon: LayoutGrid },
  { to: "/create", label: "Add Product", icon: PlusCircle },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/registration", label: "Registration", icon: UserPlus },
  { to: "/login", label: "Login", icon: LogIn },
  { to: "/enquiry", label: "enquiry", icon: LogIn },
]

const Sidebar = () => {
  const { cart } = useCart()

  return (
    <aside className="hidden md:block w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg border-r z-40 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Menu</h2>
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
              {to === "/cart" && cart.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-medium rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar