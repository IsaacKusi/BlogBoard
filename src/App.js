import Header from "./Components/Header";
import Nav from "./Components/Nav";
import NewPost from "./Components/NewPost";
import Home from "./Components/Home";
import About from "./Components/About";
import PostPage from "./Components/PostPage";
import Missing from "./Components/Missing";
import Footer from "./Components/Footer";
import EditPost from "./Components/EditPost";
import './app.css'
import { Route, Switch } from "react-router-dom";
import { DataProvider } from "./context/DataContext";


const App = () => {

  return (
    <>
      <div className="main-container">
        <div className="app">
          <div>
            <DataProvider>
              <div className="nav-container">
                <Header title='JesusHaus Blogs' />
                <Nav />
              </div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path='/post' component={NewPost} />
                <Route path="/edit/:id" component={EditPost} />
                <Route path="/post/:id" component={PostPage} />
                <Route path="/about" component={About} />
                <Route path="*" component={Missing} />
              </Switch>
              <Footer />
            </DataProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
