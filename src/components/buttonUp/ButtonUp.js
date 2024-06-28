import { useEffect, useState } from 'react';
import up from '../../resources/img/up.png';

import './buttonUp.scss';

const ButtonUp = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > window.innerHeight / 2) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			};
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
				top: 0,
				behavior: 'smooth'
		});
};

	return (
		
		<button
		 className={`up__button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
			<img src={up} alt="scroll to top" />
		</button>
	);
};

export default ButtonUp;