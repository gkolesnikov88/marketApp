import $ from 'jquery';

export const GoodItem = ({item, index, onDeleteById, onChangeById}) => {

  return (
    <tr>
      <th scope="row">{item._id}</th>
      <td>{item.name}</td>
      <td>{item.purchasePrice}</td>
      <td>{item.sellingPrice}</td>
      <td className='text-center'>
        <button onClick={() => onDeleteById(item)} type="button" id='delete' className="btn btn-danger mr-1">Delete</button>
        <button onClick={() => onChangeById(item)} type="button" id="change" className="btn btn-primary">Change</button>
      </td>
    </tr>
  )
}