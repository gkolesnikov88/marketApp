import './App.css';
import {GoodsPage} from "./pages/GoodsPage/GoodsPage";
import {Layout} from "./hoc/layout/Layout";
import GoodsPageContext from "./pages/GoodsPage/GoodsPageContext";
import {useState} from "react";

function App() {

  // context
  const [modalOptions, setModalOptions] = useState({
    showModal: false,
    header: '',
    elements: {}, // {input: {types: 'text', content}}
    buttons: [], // {title: 'Save', action: () => {}}
  })

  return (
    <GoodsPageContext.Provider value={{modalOptions, setModalOptions}}>
      <Layout>
        <GoodsPage/>
      </Layout>
    </GoodsPageContext.Provider>
  );
}

export default App;
