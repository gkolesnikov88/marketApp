
export const Button = props => {
  const className = `Button ${props.type}`;
  return (
    <button
      onClick={props.onClick}
      className={className}
      disabled={props.disabled}
    >
      { props.children }
    </button>
  )
}
