import './Input.css';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched;
}

export const Input = props => {
  const inputType = props.type || 'text';
  const htmlFor = `${inputType}`;
  const className = `Input ${isInvalid(props) && 'invalid'}`;

  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props) ?
          <span>{props.errorMessage || 'Input correct value'}</span> :
          null
      }
    </div>
  )
}
