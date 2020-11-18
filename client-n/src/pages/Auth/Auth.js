import {useState} from "react";
import {Input} from "../../components/UI/Input/Input";

export const AuthPage = () => {

  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Input correct email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Input correct password',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const onChangeHandler = (event, controlName) => {

  }

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className="Auth">
      <div>
        <h1>Authorization</h1>
        <form className="AuthForm">
          { renderInputs() }
        </form>
      </div>
    </div>
  )
}
