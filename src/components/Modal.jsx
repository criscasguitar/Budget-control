import {useState, useEffect} from 'react'
import Message from './Message';
import CloseBtn from '../img/cerrar.svg'

const Modal = ({setModal, 
    animarModal, 
    setAnimarModal, 
    saveSpent,
    editExpense,
    setEditExpense
    }) => {

    const [name, setName] =useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if(Object.keys(editExpense).length > 0) {
            setName(editExpense.name);
            setAmount(editExpense.amount);
            setCategory(editExpense.category);
            setId(editExpense.id);
            setDate(editExpense.date);
          }
    }, [])

    const modalHiden = () => {   
        setAnimarModal(false)
        setEditExpense({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([name, amount, category].includes('')) {
            setMessage('All fields are required')

            setTimeout(() => {
                setMessage('')
            }, 3000);
            return;
        }

        saveSpent({name, amount, category, id, date});
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CloseBtn}
                alt="cerrar Modal"
                onClick={modalHiden}
            />
        </div>

        <form
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>

            <legend>{editExpense.name ? 'Edit Expense' : 'Add Expense'}</legend>
            {message && <Message type='error'>{message}</Message>}

            <div className='campo'>
                <label htmlFor="name">Spent Name</label>

                <input 
                id='name'
                type="text"
                placeholder='Add the name spent'
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="amount">Amount</label>

                <input 
                id='amount'
                type="text"
                placeholder='Add the amount of the expense'
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="category">Type of spent</label>

                <select
                    id='category'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >

                    <option value="">-- Select --</option>
                    <option value="saving">Saving</option>
                    <option value="food">Food</option>
                    <option value="home">Home</option>
                    <option value="spent">Spent</option>
                    <option value="leisure">Leisure</option>
                    <option value="health">Health</option>
                    <option value="suscriptions">Suscriptions</option>

                </select>
            </div>

            <input
                type='submit'
                value={editExpense.name ? 'Edit Expense' : 'Save Expense'}
            />
        </form>
    </div>
  )
}

export default Modal