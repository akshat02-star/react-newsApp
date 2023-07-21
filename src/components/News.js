import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  };

  defaultUrl = "https://www.shutterstock.com/image-vector/background-screen-saver-on-breaking-600w-723749530.jpg";
  constructor(){
    super();
    this.state={
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };

  }
  async update(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=087ed906c17a46069cec38a9ce8cc8d8&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    const data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false
    })
  }
  async componentDidMount(){
      this.update();
  }
  handleNextClick=async ()=>{
    this.setState({page: this.state.page+1});
    this.update();
  }
  handlePreviousClick=async ()=>{
      this.setState({page: this.state.page-1});
      this.update();
  }
  render() {
    

    return (
      <div className='container my-3'>
        <h1 style={{alignItems:'center'}}>Here are the top headlines for today</h1>
        { this.state.loading && <Spinner />}
        <div className='row'>
          {
            !this.state.loading && this.state.articles.map((element)=>{
              return <div className='col-md-3 my-2' key = {element.url}>
                        <NewsItem title={element.title.slice(0, 40)+"..."} description={(element.description&&element.description.length>50)?element.description.slice(0, 88)+"...":element.description} imageUrl = {!element.urlToImage?this.defaultUrl:element.urlToImage} author={element.author?element.author:"unknown"} date={new Date(element.publishedAt).toGMTString()} source={element.source.name} url={element.url}/>
                     </div>
            })
          } 
        </div>
        {!this.state.loading && <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page===1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={Math.ceil(this.state.totalResults/this.props.pageSize)===this.state.page}type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        }
      </div>
    )
  }
}

export default News
