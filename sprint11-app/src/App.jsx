import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import Articles from "../components/Articles";
import ArticleForm from "../components/ArticleForm";
import Spinner from "../components/Spinner";

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

