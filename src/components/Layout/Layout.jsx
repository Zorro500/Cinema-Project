import  Header from '../Header/Header' ;
import Footer from '../Footer/Footer' ;
import { Outlet} from 'react-router-dom';
import { createContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';



export const contextSearch = createContext() ;
export const contextAutoriz = createContext();
export const contextMovieCard = createContext();
export const contextFavorite = createContext() ;
export const contextHistory = createContext();

export default function Layout(){
const [clickSearch,setClickSearch] = useState(false) ;
const [autoriz,setAutoriz] = useState(false) ;
const [movieId,setMovieId] = useState(-1);
const [film,setArryMovieCard] = useState();
const [enter,setEnter] = useState(false) ;
const [arrFavorite,setArrFavorite] = useState([]);
const [history,setHistory] = useState([]) ;



    return(
        <>
        <Toaster position='top-right'/>
        <contextHistory.Provider  value={{history,setHistory}}>
        <contextFavorite.Provider value={{arrFavorite,setArrFavorite}}>
        <contextMovieCard.Provider value={{movieId,setMovieId,film,setArryMovieCard}}> 
        <contextAutoriz.Provider value={{autoriz,setAutoriz,enter,setEnter}}>
        <contextSearch.Provider value={{setClickSearch,clickSearch}}>
       <Header />
       <main>
        <Outlet/>
       </main>
        <Footer/>
        </contextSearch.Provider>
        </contextAutoriz.Provider>
        </contextMovieCard.Provider>
        </contextFavorite.Provider>
        </contextHistory.Provider>
        </>
     
    )
}