import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News2 extends Component {

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
      totalResults: 0,
      displayedResults: 0
    };

  }
  async update(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0f0941740664e618c9e45dc7f76c9e2&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    const data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
      displayedResults: this.state.displayedResults+parsedData.articles.length
    })
  }
  async componentDidMount(){
      this.update();
  }
  fetchData = async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0f0941740664e618c9e45dc7f76c9e2&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({page: this.state.page+1});
    this.setState({loading: true})
    const data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults,
      displayedResults: this.state.displayedResults+parsedData.articles.length
    })
  }
  capitalize = (word)=>{
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  render() {
    

    return (
      <div className='container my-3'>
        <h1 style={{alignItems:'center', marginTop:'60px'}}>Here are the top  headlines for today - {this.capitalize(this.props.category)}</h1>
        {/* { this.state.loading && <Spinner />} */}
        <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchData}
            hasMore={this.state.displayedResults<this.state.totalResults}
            loader={<Spinner />}
        >
          <div className='row'>
          {
            this.state.articles.map((element)=>{
              return <div className='col-md-3 my-2' key = {element.url}>
                        <NewsItem title={element.title.slice(0, 40)+"..."} description={(element.description&&element.description.length>50)?element.description.slice(0, 88)+"...":element.description} imageUrl = {!element.urlToImage?this.defaultUrl:element.urlToImage} author={element.author?element.author:"unknown"} date={new Date(element.publishedAt).toGMTString()} source={element.source.name} url={element.url}/>
                     </div>
            })
          } 
        </div>
        </InfiniteScroll>
        
      </div>
    )
  }
}

export default News2
