import './singleCharacterPage.scss';

const SingleCharacterPage = ({data, handleBackClick}) => {

    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <button onClick={handleBackClick} className="button__main">
                <div className="single-comic__back">Back to all</div>
            </button>
            {/* <Link to="/comics" className="single-comic__back">Back to all</Link> */}
        </div>
    )
}

export default SingleCharacterPage;

