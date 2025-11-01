import React from 'react';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS_MOCK } from './data'; 

function ProductGrid({ activeCategory, onQuickView, searchQuery }) { // <--- RECEIVE SEARCH QUERY
  
  const normalizedSearch = searchQuery ? searchQuery.toLowerCase() : '';

  // 1. Apply Category Filter
  const categoryFilteredProducts = PRODUCTS_MOCK.filter(product => {
    if (!activeCategory) {
      return true;
    }
    return product.category === activeCategory;
  });

  // 2. Apply Search Filter on top of Category Filter
  const filteredProducts = categoryFilteredProducts.filter(product => {
    if (!normalizedSearch) {
        return true;
    }
    // Check if search term matches name, brand, or notes
    return (
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.notes.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <section className="product-grid-section">
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} scent={product} onQuickView={onQuickView} />
        ))}
      </div>

      <button className="all-products-button">
        View All Products ({filteredProducts.length} Items)
      </button>
    </section>
  );
}

export default ProductGrid;