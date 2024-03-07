import Header from "./components/Header";
import Sobre from "./pages/Sobre";
import Home from "./pages/Home";
import Error404 from "./error/Error404";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Redirect,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  const estaLogado = true;
  const protectedRoutes = (props) => {
    return(
      <Route render={()=>props.estaLogado ? (props.children) : (<Redirect to="/login" />)}/>
    )
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/home" Component={Home} />
            <Route path="/sobre" Component={Sobre} />
          <Route path="*" Component={Error404} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
