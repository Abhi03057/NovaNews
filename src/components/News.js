import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = ({ country = "us", pagesize = 6, category, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NovaNews`;
  }, [category]);

  // Wrapping updateNews inside useCallback to prevent infinite loops
  const updateNews = useCallback(async () => {
    setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=6b02024572a247ea89640d8c11719425&page=${page}&pageSize=${pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  }, [country, category, pagesize, page, setProgress]);

  useEffect(() => {
    updateNews();
  }, [updateNews]);

  const handleNextClick = () => {
    if (page + 1 > Math.ceil(totalResults / pagesize)) return;
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevClick = () => {
    if (page <= 1) return;
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>
        "Stay in the Nova— {capitalizeFirstLetter(category)} News that's out of this world!"
      </h2>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / pagesize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
