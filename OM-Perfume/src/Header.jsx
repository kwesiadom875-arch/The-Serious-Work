import React, { useState } from 'react'; // <-- NEW IMPORT: useState
import { useCart } from './CartContext.jsx';
import { Link } from 'react-router-dom';
import './Header.css'; // <-- NEW IMPORT: Header-specific styles

function Header({ notification, searchQuery, setSearchQuery }) {
  const { cartCount } = useCart(); 
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to toggle search bar visibility

  // Handler for the search input change
  const handleInputChange = (e) => {
    // Pass the input value up to App.jsx state
    setSearchQuery(e.target.value);
  };
  
  // Handler to close the search bar when user clicks away or presses Enter
  const closeSearch = () => {
    setIsSearchOpen(false);
    // If the input is empty on close, ensure the search state is clear
    if (!searchQuery) {
        setSearchQuery('');
    }
  };

  return (
    <header className="header">
      {/* Notification Box */}
      <div 
        className={`cart-notification ${notification.visible ? 'visible' : ''}`}
      >
        {notification.message}
      </div>

      {/* Top Bar with Social Links (omitted for brevity) */}
      <div className="top-bar">
        <span className="welcome-text">Welcome to your luxury scent experience!</span>
        <div className="social-icons">
          <a href="https://facebook.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">F</a> 
          <a href="https://twitter.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">T</a>
          <a href="https://pinterest.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">P</a>
          <a href="https://youtube.com/wm-scents" target="_blank" rel="noopener noreferrer" className="icon">Y</a>
        </div>
      </div>

      {/* Main Logo and Primary Navigation */}
      <div className="main-nav-bar">
        <div className="logo-container">
          <h1 className="logo-text">O.M.</h1>
        </div>
        
        <nav className="primary-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/scents">Scents</Link></li>
            <li><Link to="/discovery">Discovery</Link></li>
            <li><Link to="/story">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="utility-icons">
          
          {/* Search Input Bar */}
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <button 
                title="Search" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="search-toggle-btn"
            >
                🔍
            </button>
            <input
                type="text"
                placeholder="Search scents and brands..."
                value={searchQuery}
                onChange={handleInputChange}
                onBlur={closeSearch} // Close when focus is lost
                onKeyDown={(e) => {
                    if (e.key === 'Enter') closeSearch();
                }}
                className="search-input"
            />
          </div>

          <button title="Account">👤</button>
          <Link to="/cart" className="cart-button" title="Shopping Cart"> 
            🛒 ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
