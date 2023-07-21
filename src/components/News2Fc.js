import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News2Fc = (props) => {

  

  let defaultUrl = "https://www.shutterstock.com/image-vector/background-screen-saver-on-breaking-600w-723749530.jpg";
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [displayedResults, setDisplayedResults] = useState(0)

  const update = async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0f0941740664e618c9e45dc7f76c9e2&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    const data = await fetch(url);
    let parsedData = await data.json();
    setTotalResults(parsedData.totalResults)
    setDisplayedResults(displayedResults+parsedData.articles.length)
    setLoading(false)
    setArticles(parsedData.articles)
    console.log(parsedData.totalResults)
    console.log(parsedData.articles.length)

  }
  useEffect(()=>{update()}, [])
//   async componentDidMount(){
//       this.update();
//   }
  const fetchData = async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0f0941740664e618c9e45dc7f76c9e2&page=${page+1}&pageSize=${props.pageSize}`
    
    setPage(page+1)
    setLoading(true)
    const data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    setDisplayedResults(displayedResults+parsedData.articles.length)

  }
  const capitalize = (word)=>{
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
    
    return (
      <div className='container my-3'>
        <h1 style={{alignItems:'center', marginTop:'60px'}}>Here are the top  headlines for today - {capitalize(props.category)}</h1>
        {/* { loading && <Spinner />} */}
        <InfiniteScroll
            dataLength={articles.length} //This is important field to render the next data
            next={fetchData}
            hasMore={displayedResults<totalResults}
            loader={<Spinner />}
        >
          <div className='row'>
          {
            articles.map((element)=>{
              return <div className='col-md-3 my-2' key = {element.url}>
                        <NewsItem title={element.title.slice(0, 40)+"..."} description={(element.description&&element.description.length>50)?element.description.slice(0, 88)+"...":element.description} imageUrl = {!element.urlToImage?defaultUrl:element.urlToImage} author={element.author?element.author:"unknown"} date={new Date(element.publishedAt).toGMTString()} source={element.source.name} url={element.url}/>
                     </div>
            })
          } 
        </div>
        </InfiniteScroll>
        
      </div>
    )
}

News2Fc.defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8
  }
 News2Fc.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  };
export default News2Fc 
