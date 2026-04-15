    import { Link } from "react-router-dom";

    function PostCard({ post }) {
        return (
            /* 1. to={`/post/${post.id}`} - басында "/" болуы керек, әйтпесе сілтеме қате жиналуы мүмкін.
            2. className="post-link" - біздің CSS-тегі стильдерді қолдану үшін.
            */
            <Link to={`/detail/${post.id}`} className="post-link">
                <div className="post-card-content">
                    <h2>{post.title}</h2>
                    <div className="post-info">
                        <span className="post-date">{post.date}</span>
                        <span className="post-category">{post.category}</span>
                    </div>
                </div>
            </Link>
        );
    }

    export default PostCard;