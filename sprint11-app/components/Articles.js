import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function Articles({ user, articles, setArticles, setSelectedArticle, setSpinner }) {

  const fetchArticles = async () => {
    setSpinner(true);
    try {
      const res = await fetch("http://localhost:9000/api/articles", {
        headers: { Authorization: `Bearer ${user}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch articles");
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSpinner(false);
    }
  };

  const handleDelete = async (id) => {
    setSpinner(true);
    try {
      const res = await fetch(`http://localhost:9000/api/articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setArticles(articles.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      {articles.length === 0 ? (
        <p>No articles yet</p>
      ) : (
        <ul>
          {articles.map(a => (
            <li key={a.id}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <p>{a.topic}</p>
              <button onClick={() => setSelectedArticle(a)}>Edit</button>
              <button onClick={() => handleDelete(a.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Articles.propTypes = {
  user: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired,
  setArticles: PropTypes.func.isRequired,
  setSelectedArticle: PropTypes.func.isRequired,
  setSpinner: PropTypes.func.isRequired,
};
