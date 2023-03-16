import {useState} from 'react'
import Message from './Message'

const NewBudget = ({
  presupuesto,
   setPresupuesto,
   setIsValidBudget
  }) => {

  const[message, setMessage] = useState('')

  const handleBudget = (e) => {
    e.preventDefault();

    if(!presupuesto || presupuesto < 0 ) {
      setMessage('It is not a valid Budget!');
      return
    }

      setMessage('')
      setIsValidBudget(true);


  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        
        
        <form onSubmit={handleBudget} className="formulario">
          <div className='campo'>
            <label>Define Budget</label>

            <input
              className='nuevo-presupuesto'
              type='number'
              placeholder='Add your Budget'
              value={presupuesto}
              onChange={e => setPresupuesto(Number(e.target.value))}
            />
          </div>

          <input type="submit" value="Add" />
          {message && <Message type='error'>{message}</Message>}
        </form>
    </div>
  )
}

export default NewBudget