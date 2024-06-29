import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';

import useMarvelService from "../../../services/MarvelService";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import Spinner from "../../spinner/Spinner";

import './singleComicPage.scss';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();
    
    useEffect(() => {
        updateComic();
        console.log(comicId)
    }, [comicId]);

    const updateComic = () => {

        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    };  

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const handleBackClick = () => { // кнопка назад откуда пришел
        if (location.state && location.state.from) {
            navigate(location.state.from.pathname, { replace: true });
        } else {
            navigate('/comics');
        }
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} handleBackClick={handleBackClick} /> : null; 

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic, handleBackClick}) => {

    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button onClick={handleBackClick} className="button__main">
                <div className="inner">Назад</div>
            </button>
            {/* <Link to="/comics" className="single-comic__back">Back to all</Link> */}
        </div>
    )
}

export default SingleComicPage;