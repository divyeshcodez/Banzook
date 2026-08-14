import { createRoot } from 'react-dom/client'
import './index.css'
import 'lenis/dist/lenis.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { ReactLenis } from 'lenis/react'

createRoot(document.getElementById('root')!).render(
  <ReactLenis root>
    <CartProvider>
      <App />
    </CartProvider>
  </ReactLenis>
)
