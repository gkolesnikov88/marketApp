import './App.css';
import {GoodsPage} from "./pages/GoodsPage/GoodsPage";
import {Layout} from "./hoc/layout/Layout";
import GoodsPageContext from "./pages/GoodsPage/GoodsPageContext";
import {useState} from "react";
import {useSelector} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./pages/Auth/Auth";
import {MarketPage} from "./pages/Market/MarketPage";

function App() {

  // context
  const [modalOptions, setModalOptions] = useState({
    showModal: false,
    header: '',
    elements: {}, // {input: {types: 'text', content}}
    buttons: [], // {title: 'Save', action: () => {}}
  })

  // redux
  const isAuthenticated = useSelector(state => !!state.auth.token);
  const token = useSelector(state => state.auth.token);
  console.log(token);
  console.log(isAuthenticated);

  let routes = (
    <Switch>
      <Route path="/auth" component={ AuthPage }/>
      <Route path="/" exact component={ MarketPage }/>
      <Redirect to="/"/>
    </Switch>
  )
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/admin" component={ GoodsPage }/>
        <Route path="/" exact component={ MarketPage }/>
        <Redirect to="/"/>
      </Switch>
    )
  }

  return (
    <GoodsPageContext.Provider value={{modalOptions, setModalOptions}}>
      <Layout>
        {
          routes
        }
      </Layout>
    </GoodsPageContext.Provider>
  );
}

export default App;
