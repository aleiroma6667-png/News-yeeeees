import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/style/style.css';
import PostCard from './PostCard';

function PostList() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    
    // URL-ден категорияны алу (мысалы, "Бокс")
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');

    useEffect(() => {
        async function fetchPost() {
            setIsLoading(true);
            try {
                // Mokky-ге сұраныс: егер категория таңдалса, оны URL-ге қосамыз
                // Мысалы: https://.../baha?category=Бокс
                let url = 'https://621a91c96fd2860b.mokky.dev/baha';
                if (currentCategory) {
                    url += `?category=${currentCategory}`;
                }

                const response = await axios.get(url);
                setNews(response.data);
            } catch (error) {
                console.error("Жүктеу қатесі:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, [currentCategory]); // Категория ауысқан сайын қайта жұмыс істейді

    return (
        <div className="posts-container">
            {isLoading ? (
                <div className="loading">Жүктелуде...</div>
            ) : news.length > 0 ? (
                news.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
                <div className="no-news">
                    {currentCategory} категориясы бойынша жаңалықтар табылмады.
                </div>
            )}
        </div>
    );
}

export default PostList;