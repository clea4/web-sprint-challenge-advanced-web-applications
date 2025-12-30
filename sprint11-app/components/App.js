import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Articles from "./Articles";
import ArticleForm from "./ArticleForm";
import Spinner from "./Spinner";

export default function App() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [spinner, setSpinner] = useState(false);

  return (
    <div className="App">
      {spinner && <Spinner />}
      {!user ? (
        <LoginForm setUser={setUser} setSpinner={setSpinner} />
      ) : (
        <>
          <Articles
            user={user}
            articles={articles}
            setArticles={setArticles}
            setSelectedArticle={setSelectedArticle}
            setSpinner={setSpinner}
          />
          <ArticleForm
            user={user}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
            setArticles={setArticles}
            setSpinner={setSpinner}
          />
        </>
      )}
    </div>
  );
}

