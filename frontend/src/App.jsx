
import './App.css';
import './index.css';
import './assets/fonts/fonts.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <CartProvider>
      <div className="flex flex-col h-screen w-screen">
        <header className="shrink-0">
          <Navbar />
        </header>

        <main className="flex-grow ">
          <AppRoutes />
        </main>

        <footer className="shrink-0">
          <Footer />
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
