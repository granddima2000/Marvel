import { Link, NavLink, useNavigate} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {

    let navigate = useNavigate();


    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end className={({isActive}) => isActive ? 'app__menu_active' : undefined} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink className={({isActive}) => isActive ? 'app__menu_active' : undefined} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
            <button className='button button__main' onClick={() => handleNavigation('/')}>
                <div className="inner">назад</div>
            </button>
            <button className='button button__main' onClick={() => handleNavigation('/comics')}>
                <div className="inner">вперед</div>
            </button>
        </header>
    )
}

export default AppHeader;