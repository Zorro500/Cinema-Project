const BASE_URL = 'https://kinopoiskapiunofficial.tech' ;
const API_KEY = '1d1c5db1-50fb-470f-8cee-9c05aa33eaf3' ;

export const fetchData = async(endoint)=>{
    const res = await fetch(`${BASE_URL}${endoint}`, 
   {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY ,
        'Content-Type': 'application/json',
    },
}) ;
    if(!res.ok){
        throw new Error('Failed to fetch posts') ;
    }
    return res.json() ;
}


export const top = (page)=>fetchData(`/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`);
export const searchMovies = (query, page = 1) => fetchData(`/api/v2.2/films?keyword=${query}&page=${page}`);
export const mediaNews = ()=>fetchData(`/api/v1/media_posts`);
export const getPremiers = (year, month) => 
  fetchData(`/api/v2.2/films/premieres?year=${year}&month=${month}`);
export const getAkters = (id) => fetchData(`/api/v1/staff?filmId=${id}`);


export const getTrailers = (id) => 
  fetchData(`/api/v2.2/films/${id}/videos`);

export const getImages = (id) => 
  fetchData(`/api/v2.2/films/${id}/images`);

export const getStaff = (id) => 
  fetchData(`/api/v1/staff?filmId=${id}`);

