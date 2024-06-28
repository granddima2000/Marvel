import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";
import ButtonUp from "../buttonUp/ButtonUp";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";



const App = () => {

  return (
    <Router>
        <div className="app">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="comics" element={<ComicsPage />}/>
                </Routes>
            </main>
            <ButtonUp/>
        </div>
    </Router>
  );

}

export default App;
