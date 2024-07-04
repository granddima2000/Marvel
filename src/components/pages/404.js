import page404 from '../../resources/img/page404.jpg'
import { Link } from 'react-router-dom';
const Page404 = () => {
	
	return (
		<>
            <div className="error">
				<img src={page404} alt="error" style={{'display': 'block', 'margin': '0 auto', 'width': '70%',  }} />	
                <Link to={'/'} className='error__link' style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}}>Вернуться на главную</Link>
								
            </div>
			
		</>
	);
};

export default Page404;