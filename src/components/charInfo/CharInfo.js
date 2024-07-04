import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";

import "./charInfo.scss";
import { Link, useLocation } from "react-router-dom";

const CharInfo = (props) => {

  const location = useLocation();

  const [char, setChar] = useState(null);
  const {loading, error, clearError, getCharacter} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]) 

  const updateChar = () => {
    const { charId } = props;
    if (!charId) { // Если у нас нет charId, то будет отображать компонент скелетон
      return;
    }
    
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
  };

  const onCharLoaded = (char) => {
    setChar(char)
  };

  const skeleton = char || loading || error ? null : <Skeleton />; // Отображаем компонент скелетона, если ничего из этих не true
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} location={location} /> : null; 

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({ char, location }) => { // Занимается логикой и состоянием
  const {name, description, thumbnail, homepage, wiki, comics} = char;

  let imgStyle = { 'objectFit' : "contain" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
    imgStyle = { 'objectFit' : "cover" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {
          comics.slice(0, 10).map((item, i) => {
            return (
              <Link 
                    to={`/comics/${item.resourceURI.split('/').pop()}`} 
                    state={{from: location}} 
                    key={i} 
                    className="char__comics-link">
                <li className="char__comics-item">{item.name} </li>
              </Link> 
            )
          })
        }
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number
};

export default CharInfo;
