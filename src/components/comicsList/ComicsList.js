import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorBoundary/ErrorBoundary';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true)
        clearError();
        getAllComics(offset)
            .then(onComicsListLoaded)
    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList < 8) {
            ended = true;
        }

        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    };

    function renderItems(arr) {
        const items = arr.map((item, i)=> {
            return (
                <CSSTransition key={item.id} timeout={500} classNames={'comics__item'}>
                    <li className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
                </CSSTransition>
                
            )
        });
        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
            
    };

    const items = renderItems(comicsList);

    const errorMessage = error  ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
            onClick={() => onRequest(offset)} 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;