import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../assets/style/style.css'; 

function PostDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null); 
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [comments, setComments] = useState([]); 

  useEffect(() => {
    // 1. Постты алу
    async function fetchPost() {
      try {
        const response = await axios.get(`https://621a91c96fd2860b.mokky.dev/baha/${id}`);
        setNews(response.data);
      } catch (error) {
        console.error("Деректерді алу мүмкін болмады:", error);
      }
    }

    async function fetchComments() {
      try {
        const response = await axios.get(`https://621a91c96fd2860b.mokky.dev/coments?postId=${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Пікірлерді жүктеу қатесі:", error);
      }
    }
    
    fetchPost();
    fetchComments(); // Пікірлерді шақыру
  }, [id]);

  async function SubmitComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://621a91c96fd2860b.mokky.dev/coments', {
        postId: id,
        text: commentText,
        createdAt: new Date().toLocaleString() // Уақытты оқылатын форматқа өзгерттік
      });
      
      setSubmitMessage("Пікір қосылды!");
      setCommentText('');
      
      setComments([...comments, response.data]);
      
    } catch (error) {
      setSubmitMessage("Қате орын алды");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!news) {
    return <div className="loading">Жүктелуде...</div>;
  }

  const newsImageUrl = news.img || news.image;

  return (
    <div className="post-detail-container">
      <div className="post-detail-content">
        <h1 className="post-title">{news.title}</h1>
        
        <div className="post-meta">
           <span className="post-date">{news.date}</span>
           <span className="post-category-label">Категория: {news.category}</span>
        </div>

        <div className="post-image-wrapper">
          {newsImageUrl ? (
            <img 
              src={newsImageUrl} 
              alt={news.title} 
              className="full-post-image" 
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400?text=Сурет+табылмады";
              }}
            />
          ) : (
            <div className="image-placeholder">Сурет көрсетілмеген</div>
          )}
        </div>

        <div className="post-description">
           <p>{news.description || "Бұл жаңалық туралы ақпарат жақын арада толықтырылады."}</p>
        </div>

        <hr className="divider" />

        <div className="comments-display-section">
          <h3>Пікірлер ({comments.length})</h3>
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item" style={{
                  background: '#f4f4f4', 
                  padding: '10px', 
                  marginBottom: '10px', 
                  borderRadius: '8px'
                }}>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>Пайдаланушы</p>
                  <p style={{ margin: '5px 0' }}>{comment.text}</p>
                  <small style={{ color: '#888' }}>{comment.createdAt}</small>
                </div>
              ))
            ) : (
              <p>Әлі пікір жазылмаған. Бірінші болып пікір қалдырыңыз!</p>
            )}
          </div>
        </div>

        <hr className="divider" />

        {/* Пікір қалдыру формасы */}
        <form className="comment-form" onSubmit={SubmitComment}>
          <textarea 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Пікіріңізді жазыңыз..."
          />
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Жіберілуде...' : 'Жіберу'}
          </button>
        </form>

        {submitMessage && <p className="status-message">{submitMessage}</p>}
      </div>
    </div>
  );
}

export default PostDetailPage;