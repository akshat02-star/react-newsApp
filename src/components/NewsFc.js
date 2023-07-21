import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const NewsFc = (props) => {



  const defaultUrl = "https://www.shutterstock.com/image-vector/background-screen-saver-on-breaking-600w-723749530.jpg";
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const update = async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=087ed906c17a46069cec38a9ce8cc8d8&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    const data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setLoading(false)
  }
  useEffect(()=>{
    update();
  }, [])
  

  const handleNextClick=async ()=>{
    setPage(page+1)
    update();
  }
  const handlePreviousClick=async ()=>{
      setPage(page-1)
      update();
  }

    return (
      <div className='container my-3'>
        <h1 style={{alignItems:'center'}}>Here are the top headlines for today</h1>
        { loading && <Spinner />}
        <div className='row'>
          {
            !loading && articles.map((element)=>{
              return <div className='col-md-3 my-2' key = {element.url}>
                        <NewsItem title={element.title.slice(0, 40)+"..."} description={(element.description&&element.description.length>50)?element.description.slice(0, 88)+"...":element.description} imageUrl = {!element.urlToImage?defaultUrl:element.urlToImage} author={element.author?element.author:"unknown"} date={new Date(element.publishedAt).toGMTString()} source={element.source.name} url={element.url}/>
                     </div>
            })
          } 
        </div>
        {!loading && <div className='container d-flex justify-content-between'>
          <button disabled={page===1} type="button" className="btn btn-primary" onClick={handlePreviousClick}>&larr; Previous</button>
          <button disabled={Math.ceil(totalResults/props.pageSize)===page}type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
        </div>
        }
      </div>
    )
}
  NewsFc.defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8
  }
  NewsFc.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  };

export default NewsFc
