import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {

  const [apiData,setApiData] = useState([]);
  const cardsRef = useRef();
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2E3MzJiM2UzMTE3Mzg0MDgzNTgwNGJkYmM4YjAxYSIsIm5iZiI6MTcyODA0NjEyOC4wODgxNDUsInN1YiI6IjY2ZmZlMmE4NzgzMGMxMzAxZTdjYmRhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9qfxHO2Wk0Q2IGhErq3FaDve1JiyR9J6ty3ocYwWYqA'
    }
  };
  
  

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel',handleWheel);  
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popoular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef} >
        {apiData.map((card,index)=>{
          return  <div className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                  </div>
          })}
      </div>
    </div>
  )
}

export default TitleCards
