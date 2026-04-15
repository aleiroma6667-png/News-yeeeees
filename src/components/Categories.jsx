import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/style/style.css';

function Categories() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchCategories() {
            try {
                // Сенің Mokky сілтемең
                const response = await axios.get('https://621a91c96fd2860b.mokky.dev/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Қате шықты:", error);
            }
        }
        fetchCategories();
    }, []);

    const handleCategoryClick = (slug) => {
        if (slug) {
            navigate(`/?category=${slug}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="categories-page">
            <div className="category-banner-small">
                Категории
            </div>
            
            <div className="category-grid">
                {/* ФИЛЬТР: Тек "icon" өрісі бар элементтерді (категорияларды) ғана қалдырамыз */}
                {categories
                    .filter(item => item.icon) 
                    .map((cat) => (
                        <div 
                            key={cat.id} 
                            className="category-card" 
                            onClick={() => handleCategoryClick(cat.slug)}
                        >
                            <div className="icon-box">
                                {/* Иконканы шығару */}
                                <img src={cat.icon} alt={cat.name} className="category-icon" />
                            </div>
                            <span className="category-name">{cat.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Categories;