import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './CartContext.jsx'; 
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import QuickViewModal from './QuickViewModal.jsx';

// Import all Page Components
import HomePageContent from './HomePageContent.jsx';
import StoryPage from './StoryPage.jsx';
import ScentsPage from './ScentsPage.jsx';
import ContactPage from './ContactPage.jsx';
import DiscoveryPage from './DiscoveryPage.jsx'; 
import ProductDetailPage from './ProductDetailPage.jsx'; 
import CartPage from './CartPage.jsx'; 
import CheckoutPage from './CheckoutPage.jsx';
import ProductCategoryIndexPage from './ProductCategoryIndexPage.jsx';
import PolicyPage from './PolicyPage.jsx'; 
import FAQPage from './FAQPage.jsx'; // NEW IMPORT

// --- AppContent: Handles state and renders the site (uses useCart) ---
const AppContent = () => {
  // Read item-adding functionality from context
  const { addItem } = useCart(); 

  // Local state for UI flow
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState({ message: '', visible: false }); 
  const [activeCategory, setActiveCategory] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); // <--- NEW STATE FOR SEARCH

  // HANDLERS
  const handleAddToCart = (product, quantity, size) => {
    // 1. Update Cart Context
    addItem(product, quantity, size); 

    // 2. Set Notification
    setNotification({
      message: `${product.name} (${size}) added to cart.`,
      visible: true
    });

    // 3. Clear Notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);

    handleCloseModal(); 
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };
  
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (categoryName) => {
    setActiveCategory(categoryName);
  };
  
  // NEW HANDLER FOR SEARCH INPUT
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // When searching, we redirect to the scents page to show results
    if (query && window.location.pathname !== '/scents') {
        window.location.href = '/scents';
    }
  };


  return (
    <div className="app-container">
      {/* Pass search state and setter to Header */}
      <Header 
        notification={notification} 
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange} // <--- NEW PROPS ADDED
      /> 
      
      <main>
        <Routes>
          {/* 1. Primary Marketing Routes */}
          <Route path="/" element={<HomePageContent 
            activeCategory={activeCategory} onCategoryChange={handleCategoryChange} onQuickView={handleQuickView}
          />} />
          
          <Route path="/story" element={<StoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/discovery" element={<DiscoveryPage />} /> 
          <Route path="/help" element={<FAQPage />} /> 

          {/* 2. E-commerce/Browse Routes */}
          <Route path="/categories" element={<ProductCategoryIndexPage />} /> 
          
          <Route path="/scents" element={<ScentsPage 
            activeCategory={activeCategory} onCategoryChange={handleCategoryChange} onQuickView={handleQuickView}
            searchQuery={searchQuery} // <--- PASS SEARCH QUERY
          />} />

          {/* Dynamic Routes */}
          <Route path="/scents/:id" element={<ProductDetailPage 
              onAddToCart={handleAddToCart}
          />} />
          
          <Route path="/policies/:policyType" element={<PolicyPage />} /> 

          {/* Checkout Flow Routes */}
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      
      <Footer />
      
      <QuickViewModal
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

// --- App: Wraps the Router and Provider ---
function App() {
    return (
        <Router>
            <CartProvider>
                <AppContent />
            </CartProvider>
        </Router>
    );
}

export default App;
