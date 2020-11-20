import './Layout.css';
import {ModalWindow} from "../../components/modal/ModalWindow";

export const Layout = (props) => {

  return (
    <div className="Layout">
      <ModalWindow/>

      { props.children }
    </div>
  )
}