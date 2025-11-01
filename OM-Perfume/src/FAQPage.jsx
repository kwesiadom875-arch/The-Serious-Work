import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Data for the expandable FAQ sections
const FAQ_DATA = [
    {
        question: "How long does the fragrance last on my skin?",
        answer: "Longevity depends on the concentration. Our Eau de Parfum (EDP) typically lasts 6-8 hours, while Colognes (EDT/Cologne) last 4-6 hours. For maximum wear, moisturize your skin before application."
    },
    {
        question: "What is the difference between EDP and Cologne?",
        answer: "Eau de Parfum (EDP) has a higher concentration of perfume oils (15-20%), resulting in a stronger, longer-lasting scent. Cologne has a lower concentration (2-4%) and is lighter, making it ideal for daily wear or warmer weather."
    },
    {
        question: "What is your return policy for open bottles?",
        answer: "Due to hygiene standards, we only accept returns for unopened, unused products in their original packaging within 30 days. Please review our full Shipping & Returns Policy for details."
    },
    {
        question: "How should I store my perfume?",
        answer: "To preserve the integrity of the scent, store bottles upright in a cool, dark place away from direct sunlight and temperature fluctuations (e.g., bathrooms). The original box is ideal."
    },
];

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item">
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                {faq.question}
                <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
            </button>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                <p>{faq.answer}</p>
            </div>
        </div>
    );
};


function FAQPage() {
    return (
        <div className="faq-page-container">
            <header className="faq-header">
                <h1>Frequently Asked Questions</h1>
                <p>Everything you need to know about our products, shipping, and service.</p>
            </header>

            <div className="faq-accordion">
                {FAQ_DATA.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                ))}
            </div>

            <section className="faq-support">
                <h2>Still Need Help?</h2>
                <p>If you can't find an answer here, please visit our <Link to="/contact">Contact Page</Link> for personalized assistance.</p>
            </section>
        </div>
    );
}

export default FAQPage;