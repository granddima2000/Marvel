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
                    <li><NavLink end className={({isActive}) => isActive ? 'app__menu_active' : undefined} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
            <button onClick={() => handleNavigation('/')}>назад</button>
            <button onClick={() => handleNavigation('/comics')}>вперед</button>
        </header>
    )
}

export default AppHeader;