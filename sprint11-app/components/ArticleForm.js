import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ArticleForm({ user, selectedArticle, setSelectedArticle, setArticles, setSpinner }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("React");

  useEffect(() => {
    if (selectedArticle) {
      setTitle(selectedArticle.title);
      setText(selectedArticle.text);
      setTopic(selectedArticle.topic);
    } else {
      setTitle("");
      setText("");
      setTopic("React");
    }
  }, [selectedArticle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 1 || text.trim().length < 1) return;
    if (!["React", "JavaScript", "Node"].includes(topic)) return;

    setSpinner(true);
    const payload = { title, text, topic };
    try {
      let res;
      if (selectedArticle) {
        res = await fetch(`http://localhost:9000/api/articles/${selectedArticle.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:9000/api/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      if (selectedArticle) {
        setArticles(a => a.map(article => article.id === selectedArticle.id ? data : article));
      } else {
        setArticles(a => [...a, data]);
      }
      setSelectedArticle(null);
      setTitle(""); setText(""); setTopic("React");
    } catch (err) {
      console.error(err);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Text" value={text} onChange={e => setText(e.target.value)} />
      <select value={topic} onChange={e => setTopic(e.target.value)}>
        <option value="React">React</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Node">Node</option>
      </select>
      <button type="submit">{selectedArticle ? "Update" : "Create"}</button>
    </form>
  );
}

ArticleForm.propTypes = {
  user: PropTypes.string.isRequired,
  selectedArticle: PropTypes.object,
  setSelectedArticle: PropTypes.func.isRequired,
  setArticles: PropTypes.func.isRequired,
  setSpinner: PropTypes.func.isRequired,
};
