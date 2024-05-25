import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false, // отвечает за loading 
    offset: 210
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  };

  onRequest = (offset) => { // Отвечает за запрос на сервер
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  };

  onCharListLoading = () => { // Переключает в true newItemLoading
    this.setState({
      newItemLoading: true
    });
  };

  handleScroll = () => {
    const {offset, newItemLoading} = this.state
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !newItemLoading) {
        this.onRequest(offset + 9);
    }
  };

  onCharListLoaded = (newCharList) => {
    this.setState(({offset, charList}) => ({ // Возвращаем объект из этой функции, когда пишем просто ()
        charList: [...charList, ...newCharList], // если первый раз запускаем эту функцию, то в charList пустой массив. Формируется из 2 сущностей, старых и новых
        loading: false,
        newItemLoading: false,
        offset: offset + 9
      }));
  };

  onError = () => {
    // Отображает ошибку
    this.setState({
      loading: false,
      error: true,
    });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { 'objectFit' : "unset" };
      if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
        imgStyle = { 'objectFit' : "cover" };
      }
      return (
        <li
          className="char__item"
          key={item.id} // в App передаем id
          onClick={() => this.props.onCharSelected(item.id)}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, offset, newItemLoading} = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button 
            className="button button__main button__long"
            disabled={newItemLoading} // В зависимости от newItemLoading, будет работать наш disabled
            onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
