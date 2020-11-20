import './App.css';
import {GoodsPage} from "./pages/GoodsPage/GoodsPage";
import {Layout} from "./hoc/layout/Layout";
import GoodsPageContext from "./pages/GoodsPage/GoodsPageContext";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./pages/Auth/Auth";
import {MarketPage} from "./pages/Market/MarketPage";
import {autoLogin} from "./store/actions/auth";
import {Logout} from "./components/logout/Logout";

function App() {

  // context
  const [modalOptions, setModalOptions] = useState({
    showModal: false,
    header: '',
    elements: {}, // {input: {types: 'text', content}}
    buttons: [], // {title: 'Save', action: () => {}}
  })

  // redux
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const isAdminAuthenticated = !!token;

  useEffect(() => {
    dispatch(autoLogin());
  },[dispatch]);

  let routes = (
    <Switch>
      <Route path="/auth" component={ AuthPage }/>
      <Route path="/" exact component={ MarketPage }/>
      <Redirect to="/"/>
    </Switch>
  )
  if (isAdminAuthenticated) {
    routes = (
      <Switch>
        <Route path="/market" component={ MarketPage }/>
        <Route path="/logout" component={ Logout }/>
        <Route path="/" exact component={ GoodsPage }/>
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
