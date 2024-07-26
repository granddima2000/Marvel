import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
	const {id} = useParams();
	const [data, setData] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

	useEffect(() => {
			updateData();
	}, [id]);

	const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
	};

	const onDataLoaded = (data) => {
			setData(data);
	};

    const handleBackClick = () => { // кнопка назад откуда пришел
		if (location.state && location.state.from) {
				navigate(location.state.from.pathname, { replace: true });
		} else {
				navigate('/character');
		}
    };

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !data) ? <Component data={data} handleBackClick={handleBackClick} /> : null

	return (
			<>
					<AppBanner/>
					{errorMessage}
					{spinner}
					{content}
			</>
	);
};

export default SinglePage;