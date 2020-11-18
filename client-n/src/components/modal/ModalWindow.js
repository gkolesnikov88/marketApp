import GoodsPageContext from "../../pages/GoodsPage/GoodsPageContext";
import {useContext, useEffect} from "react";
import $ from "jquery";

export const ModalWindow = () => {

  // context
  const {modalOptions, setModalOptions} = useContext(GoodsPageContext);

  $('#modalWindow').on('hidden.bs.modal', function (e) {
    setModalOptions({
      ...modalOptions,
      showModal: false
    })
  })

  useEffect(() => {
    if (modalOptions.showModal) {
      $('#modalWindow').modal('show');
    }
  }, [modalOptions.showModal])

  const onClickEvent = (action) => {
    $('#modalWindow').modal('hide');
    action(modalOptions);
  }

  const onChangeEvent = (onChange, value) => {
    onChange(modalOptions, value);
  }

  return (
    <div className="modal" tabIndex="-1" id="modalWindow">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{ modalOptions.header }</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            { Object.values(modalOptions.elements).filter(elem => elem.type === 'text').map((elem, index) => {
              return (<p key={index}>{ elem.text }</p>)
            }) }
            { Object.values(modalOptions.elements).filter(elem => elem.type === 'input').map((elem) => {
              return (
                <div className="form-group d-flex flex-row" key={ elem.text }>
                  <label htmlFor="recipient-name" className="col-form-label col-sm-3">{ elem.text }</label>
                  <input type="text" className="form-control" id={ elem.id } value={ elem.value }
                    onChange={(event => onChangeEvent(elem.onChange, event.target.value))}
                  />
                </div>
            )
            })}
            { Object.values(modalOptions.elements).filter(elem => elem.type === 'select').map((elem) => {
              return (
                <div className="form-group d-flex flex-row" key={ elem.text }>
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-3">{ elem.text }</label>
                  <select
                    className="form-control" id={ elem.id }
                    onChange={ event => onChangeEvent(elem.onChange, event.target.value) }
                    value={ elem.value }
                  >
                    {
                      elem.selectOptions.map(option => {
                        return (
                          <option
                            key={ option._id }
                            value={ option._id }
                          >{ option.name }</option>
                        )
                      })
                    }
                    <option>Without category</option>
                  </select>
                </div>
              )
            })}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            {
              modalOptions.buttons.map(button => {
                const classesName = ['btn'];
                if (button.className) {
                  classesName.push(button.className);
                } else {
                  classesName.push('btn-primary');
                }
                return (
                  <button
                    type="button"
                    className={ classesName.join(' ') }
                    onClick={ () => onClickEvent(button.action) }
                    key={ button.title }
                  >{ button.title }</button>)
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}