import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import altNewsImg from '../News.png'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsMonkey - ${(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)}`
  }

  async updateNews() {
    try {
      this.props.setProgress(20);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({ loading: true })
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      })
      this.props.setProgress(100);
    } catch (error) {
      console.log(error)
      console.log("failed in api");
    }
  }

  async componentDidMount() {
    this.updateNews();
  }


  prevPage = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  nextPage = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

fetchMoreData = async () => {
  try {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    const data = await fetch(url);
    const parsedData = await data.json();

    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      page: nextPage,
    }));
  } catch (error) {
    console.log(error);
    console.log("failed in api");
  }
};


  render() {
    console.log(this.state.articles);
    try {
      return (
        <>
          <h2 className='text-center my-5'>NewsMonkey - Top {(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)} Headlines</h2>
          {/* {this.state.loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title !== null ? element.title.slice(0, 60) : element.title}
                      description={element.description !== null ? element.description.slice(0, 90) : element.description}
                      urlToImage={element.urlToImage !== null ? element.urlToImage : altNewsImg}
                      url={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name} />
                  </div>
                })}
                {/* {
              !this.state.loading && (
                <div className='d-flex justify-content-between'>
                  <button type="button" disabled={this.state.page <= 1} className="btn btn-secondary btn-dark btn-lg" onClick={this.prevPage}>&larr; Previous</button>
                  <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-secondary btn-dark btn-lg" onClick={this.nextPage}>Next &rarr;</button>
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

}

export default News