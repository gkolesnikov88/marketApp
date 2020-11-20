import {useState} from "react";
import {Input} from "../../components/UI/Input/Input";
import './Auth.css';
import {Button} from "../../components/UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {adminAuth} from "../../store/actions/auth";
import is from 'is_js';

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
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();

  const isValidControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = is.email(value.trim()) && isValid;
    }
    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid;
    }

    return isValid;
  }

  const onChangeHandler = (event, controlName) => {
    const formControlsCopy = {...formControls};
    const control = {...formControlsCopy[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = isValidControl(control.value, control.validation);

    formControlsCopy[controlName] = control;

    let isFormValidCopy = true;
    Object.keys(formControlsCopy).forEach(name => {
      isFormValidCopy = formControlsCopy[name].valid && isFormValidCopy;
    });
    setFormControls(formControlsCopy);
    setIsFormValid(isFormValidCopy);
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

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  const loginHandler = () => {
    dispatch(adminAuth(formControls.email.value, formControls.password.value));
  }

  return (
    <div className="Auth">
      <div>
        <h1>Admin authorization</h1>
        <form className="AuthForm" onSubmit={onSubmitHandler}>
          { renderInputs() }
          {
            errorMessage && <div className='error'>{ errorMessage }</div>
          }
          <Button
            type="success"
            onClick={loginHandler}
            disabled={!isFormValid}
          >Log in</Button>
        </form>
      </div>
    </div>
  )
}
