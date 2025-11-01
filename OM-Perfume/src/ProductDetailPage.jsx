import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_MOCK } from './data';
import { RatingStars } from './ProductCard.jsx'; 

// Helper component to embed the video
const VideoAdPlayer = ({ videoUrl }) => (
    <div className="video-player">
        <video controls width="100%">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
);

// Static data for the ingredients section (could be moved to data.js later)
const KEY_INGREDIENTS = [
    { name: "Incense", profile: "Smoky, spiritual base note", icon: "🔥" },
    { name: "Oud", profile: "Aromatic, rich, grounding wood", icon: "🌲" },
    { name: "Bergamot", profile: "Bright, fresh citrus opening", icon: "🍋" },
    { name: "Pimento Berry", profile: "Warm, spicy heart note", icon: "🌶️" },
];

function ProductDetailPage({ onAddToCart }) {
    const { id } = useParams(); 

    const product = PRODUCTS_MOCK.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="product-detail-container not-found">
            <h1>404</h1>
            <p>Scent Not Found. <Link to="/scents">Browse all perfumes</Link>.</p>
        </div>;
    }

    const [selectedSize, setSelectedSize] = React.useState('50ml');
    const [quantity, setQuantity] = React.useState(1);

    const handleAdd = () => {
        onAddToCart(product, quantity, selectedSize);
    };

    return (
        <div className="product-detail-container">
            
            {product.videoUrl && <VideoAdPlayer videoUrl={product.videoUrl} />}
            
            <div className="detail-grid">
                
                {/* Image Column */}
                <div className="detail-image-col">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="detail-product-image"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/500x600/CCCCCC/000000?text=Product+Details"; 
                        }}
                    />
                </div>
                
                {/* Details Column */}
                <div className="detail-details-col">
                    <p className="detail-category-link">Brand: {product.brand} | {product.category}</p>
                    <h1 className="detail-product-name">{product.name}</h1>
                    <RatingStars rating={product.rating} />
                    
                    <p className="detail-price">${product.price.toFixed(2)}</p>

                    <p className="detail-description">
                        This luxurious scent features key notes of: **{product.notes}**. A deeply layered fragrance that evolves throughout the day, providing an unforgettable presence.
                    </p>

                    {/* --- NEW INGREDIENTS SECTION (Under Main Accords) --- */}
                    <div className="key-ingredients-section">
                        <h2>Key Ingredients</h2>
                        <div className="ingredient-grid">
                            {KEY_INGREDIENTS.map((ingredient) => (
                                <div key={ingredient.name} className="ingredient-item">
                                    <span className="ingredient-icon">{ingredient.icon}</span>
                                    <div className="ingredient-text">
                                        <h4>{ingredient.name}</h4>
                                        <p>{ingredient.profile}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* ---------------------------------------------------- */}

                    {/* Size Selector */}
                    <div className="detail-option-selector">
                        <label>Size:</label>
                        <select 
                            value={selectedSize} 
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="detail-size-select"
                        >
                            <option value="30ml">30ml ($10 less)</option>
                            <option value="50ml">50ml (Standard)</option>
                            <option value="100ml">100ml ($50 more)</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="detail-actions">
                        <input 
                            type="number" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            className="detail-quantity-input"
                        />
                        <button className="detail-add-to-cart-btn" onClick={handleAdd}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;