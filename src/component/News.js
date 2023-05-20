import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import altNewsImg from '../News.png'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `NewsMonkey - ${(props.category).charAt(0).toUpperCase() + (props.category).slice(1)}`


  const updateNews = async () => {
    try {
      props.setProgress(20);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setLoading(true)
      let data = await fetch(url)
      let parsedData = await data.json()
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100);
    } catch (error) {
      console.log(error)
      console.log("failed in api");
    }
  }

  useEffect(() => {
    updateNews()
  })


  // const prevPage = async () => {
  //   setPage(page = page - 1)
  //   setState({ page: state.page - 1 });
  //   updateNews();
  // }

  // const nextPage = async () => {
  //   setPage(page = page + 1)
  //   setState({ page: state.page + 1 });
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

      setLoading(true)

      const data = await fetch(url);
      const parsedData = await data.json();

      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      setPage(nextPage)

    } catch (error) {
      console.log(error);
      console.log("failed in api");
    }
  };


  console.log(articles);
  try {
    return (
      <>
        <h2 className='text-center my-5'>NewsMonkey - Top {(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} Headlines</h2>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title !== null ? element.title.slice(0, 60) : element.title}
                    description={element.description !== null ? element.description : element.description}
                    urlToImage={element.urlToImage !== null && element.urlToImage !== "" ? element.urlToImage : altNewsImg}
                    url={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              })}
              {/* {
              !loading && (
                <div className='d-flex justify-content-between'>
                  <button type="button" disabled={page <= 1} className="btn btn-secondary btn-dark btn-lg" onClick={prevPage}>&larr; Previous</button>
                  <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-secondary btn-dark btn-lg" onClick={nextPage}>Next &rarr;</button>
                </div>
              )
            } */}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  } catch (error) {
    console.error(error)
    return (
      <div className="container my-3">
        <p className='h1 my-5'>Sorry, there was a problem loading the news. Please try again later.</p>
      </div>
    )

  }
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes,
  category: PropTypes.string
}

export default News