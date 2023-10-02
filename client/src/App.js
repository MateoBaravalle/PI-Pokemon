import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPk } from "./redux/actions";
import Nav from "./components/Nav/Nav";
import Landing from "./views/Landing/Landing"
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Customs from "./views/Customs/Customs";
import "./App.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getAllPk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header>
        <h1>PokeApp 🎱</h1>
        {location.pathname !== "/" && <Nav />}
      </header>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Customs" element={<Customs />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
