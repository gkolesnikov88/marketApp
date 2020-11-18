import './Loader.css';

export const Loader = () => {
  return (
    <>
      <div className='align-self-center'>Loading</div>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}