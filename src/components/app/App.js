import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {ButtonUp} from "../pages"; // Для страниц без ленивой подгрузки
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../singleComicPage/SingleComicPage'));



const App = () => {

  return (
    <Router>
        <div className="app">
            <AppHeader />
            <main>
                <Suspense fallback={<Spinner/>}>
                  <Routes>
                      <Route path="/" element={<MainPage />}/>
                      <Route path="comics" element={<ComicsPage />}/>
                      <Route path="comics/:comicId" element={<SingleComicPage />}/>
                      <Route path="characters/:id" element={<SingleComicPage />}/>
                      <Route path="*" element={<Page404/>} />
                  </Routes>
                </Suspense>
            </main>
            <ButtonUp/>
        </div>
    </Router>
  );

}

export default App;
