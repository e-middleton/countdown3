import { useEffect, useState } from 'react';
import "./../App.css";

const News = () => {
  const [topFive, setTopFive] = useState(null);
  
  useEffect(() => {

    const fetchNews = async() => {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY_NEWS
        
        const data = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`)
        const obj = await data.json();

        if (obj !== null) { 
          setTopFive([obj.results[0],
            obj.results[1],
            obj.results[2],
            obj.results[3],
            obj.results[4]]
          )
          console.log(obj);
        }
        

      } catch (error) {
        console.log(error);
        
      }
    }
    fetchNews();
  }, [])


  return (
    <>
      <h3 className='header'>Top 5 NYT Articles</h3>
      <div className="grid-table">
        {topFive ? topFive.map((news, index) => (
          <div className='articleBox' key={index}> 
            <div>
              <h4>{news.title}</h4>
              <p>{news.byline}</p>
              <p>{news.abstract}</p>
              <a href={news.url}>Visit Article</a>
            </div>
            <img src={news.multimedia[2].url}/>
          </div>
        )) : null}
      </div>
    </>
  );
}
export default News;