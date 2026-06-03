/*import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import Search from './pages/Search/Search';
import Authorization from './pages/Authorization/Authorization';
import ProfilLayout from './components/ProfilLayout/ProfilLayout';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import NowPlaying from './pages/NowPlaying/NowPlaying';
import NoteFound from './pages/NoteFound'
import './App.css'
import MovieCard from './pages/MovieCard/MovieCard';
import { getAkters,fetchData,getPremiers, mediaNews, top } from './utils/FormatDate';
import Favorites from './pages/Favorites/Favorites' ;
import History from './pages/History/History';
import Settings from './pages/Settings/Settings'
import ProfilInfo from './pages/ProfilInfo/ProfilInfo'
import { Navigate } from 'react-router-dom';

function App() {
  
const router = createBrowserRouter([{
  path:'/', element:<Layout/>,children:[
    {index : true, element: <Navigate to="/home" replace />},
    {path :'home', element: <Home/>,loader: async () => {
    const [popular, nowPlaying, news] = await Promise.all([
      top(1),                   
      getPremiers(2026, 'MARCH'), 
    ]);
    return { popular, nowPlaying, news };
  }},
    {path : 'movie/:movieId' , element : <Movie/>,loader :()=> top(1)},
    {path : 'movieCard/:movieCardId' ,element : <MovieCard/>,  loader: async ({ params }) => {
     const [film, trailers, urlFilms,akters] = await Promise.all([
      fetchData(`/api/v2.2/films/${params.movieCardId}`),
      fetchData(`/api/v2.2/films/${params.movieCardId}/videos`),
      fetchData(`/api/v2.2/films/${params.movieCardId}/external_sources`),
      getAkters(params.movieCardId)
    ]);
    return { film, trailers, urlFilms, akters };
  }},
    {path : 'search' , element : <Search/>,loader:async({request})=>{
      const url = new URL(request.url);
      const keyword = url.searchParams.get('keyword');
      const API_KEY = '1d1c5db1-50fb-470f-8cee-9c05aa33eaf3';
      const response = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=1`,
    {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY ,
        'Content-Type': 'application/json',
    },
}
  );
   const data = await response.json();
  return data;
    }},
    {path : 'authorization' , element : <Authorization/>},
    {path : 'profil' , element : <ProfilLayout/>},
    {path : 'coming-soon' , element : <ComingSoon/>,loader: ()=>mediaNews()},
    {path : 'now-playing' , element : <NowPlaying/>,loader: () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    return getPremiers(year, month);
  }},
  {path: 'profil' ,element:<ProfilLayout/>,children:[
        {index:true, element:<ProfilInfo/>},
        {path:'favorites',element:<Favorites/>},
        {path:'history',element:<History/>},
        {path:'settings',element:<Settings/>}

      ]},
    {path : '*' , element : <NoteFound/>,
  
    }
  ]
}])
  return (
  <RouterProvider router={router} />
  )
}

export default App
*/

import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom'   // ← заменили BrowserRouter на HashRouter

import Layout from '../src/components/Layout/Layout';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import Search from './pages/Search/Search';
import Authorization from './pages/Authorization/Authorization';
import ProfilLayout from './components/ProfilLayout/ProfilLayout';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import NowPlaying from './pages/NowPlaying/NowPlaying';
import NoteFound from './pages/NoteFound'
import './App.css'
import MovieCard from './pages/MovieCard/MovieCard';
import { getAkters, fetchData, getPremiers, mediaNews, top } from './utils/FormatDate';
import Favorites from './pages/Favorites/Favorites';
import History from './pages/History/History';
import Settings from './pages/Settings/Settings'
import ProfilInfo from './pages/ProfilInfo/ProfilInfo'
import { Navigate } from 'react-router-dom';

function App() {
  const router = createHashRouter([{   // ← изменили вызов
    path: '/', 
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { 
        path: 'home', 
        element: <Home />,
        loader: async () => {
          const [popular, nowPlaying, news] = await Promise.all([
            top(1),                   
            getPremiers(2026, 'MARCH'), 
          ]);
          return { popular, nowPlaying, news };
        }
      },
      { path: 'movie/:movieId', element: <Movie />, loader: () => top(1) },
      { 
        path: 'movieCard/:movieCardId', 
        element: <MovieCard />, 
        loader: async ({ params }) => {
          const [film, trailers, urlFilms, akters] = await Promise.all([
            fetchData(`/api/v2.2/films/${params.movieCardId}`),
            fetchData(`/api/v2.2/films/${params.movieCardId}/videos`),
            fetchData(`/api/v2.2/films/${params.movieCardId}/external_sources`),
            getAkters(params.movieCardId)
          ]);
          return { film, trailers, urlFilms, akters };
        }
      },
      { 
        path: 'search', 
        element: <Search />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const keyword = url.searchParams.get('keyword');
          const API_KEY = '1d1c5db1-50fb-470f-8cee-9c05aa33eaf3';
          const response = await fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=1`,
            {
              method: 'GET',
              headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json',
              },
            }
          );
          const data = await response.json();
          return data;
        }
      },
      { path: 'authorization', element: <Authorization /> },
      { path: 'profil', element: <ProfilLayout /> },
      { path: 'coming-soon', element: <ComingSoon />, loader: () => mediaNews() },
      { 
        path: 'now-playing', 
        element: <NowPlaying />, 
        loader: () => {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
          return getPremiers(year, month);
        }
      },
      { 
        path: 'profil', 
        element: <ProfilLayout />,
        children: [
          { index: true, element: <ProfilInfo /> },
          { path: 'favorites', element: <Favorites /> },
          { path: 'history', element: <History /> },
          { path: 'settings', element: <Settings /> }
        ]
      },
      { path: '*', element: <NoteFound /> }
    ]
  }]);

  return <RouterProvider router={router} />;
}

export default App;



