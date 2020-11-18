import './Layout.css';
import {ModalWindow} from "../../components/modal/ModalWindow";

export const Layout = (props) => {

  return (
    <>
      <ModalWindow/>

      { props.children }
    </>
  )
}