import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { ToastHost } from './components/ToastHost'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { BurgerPage } from './pages/BurgerPage'
import { AddProduct } from './pages/AddProduct'
import { Cart } from './pages/Cart'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

function Shell() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/burger/:id" element={<BurgerPage />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <ToastHost />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Shell />
      </BrowserRouter>
    </AppProvider>
  )
}
