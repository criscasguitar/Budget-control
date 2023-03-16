import { useState, useEffect } from 'react'
import Header from './components/Header'
import ExpenseList from './components/ExpenseList'
import Filter from './components/Filter'
import Modal from './components/Modal'
import {generateId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [presupuesto, setPresupuesto] = useState( 
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [spents, setSpents] = useState(
    localStorage.getItem('spents') ? JSON.parse(localStorage.getItem('spents')) : []
  );
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [editExpense, setEditExpense] = useState({});

  const [filter, setFilter] = useState('')
  const [expenseFilter, setSpentsFilter] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
    
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => { 
    localStorage.setItem('spents', JSON.stringify(spents) ?? [])
  }, [spents])

  useEffect(() => {
    if(filter) {
      //Filter spents by category
      const spentsFilter = spents.filter(spent => spent.category === filter);

      setSpentsFilter(spentsFilter)
    }
  },[filter])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0) {
      setIsValidBudget(true)
    }
  }, [])
  

  const handleNewSpent = () => {
      setModal(true)
      setEditExpense({})

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
  }

  const deleteSpent = id => {
    const updatedSpent = spents.filter( spent => spent.id !== id);

    setSpents(updatedSpent);
  }

  const saveSpent = spent => {

    if(spent.id) {
      const updatedSpent = spents.map(spentState => 
        spentState.id === spent.id ? spent : spentState);
        setSpents(updatedSpent);
        setEditExpense({})
    } else {
      spent.id = generateId();
      spent.date = Date.now();
      setSpents([...spents, spent])
    }

    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        spents={spents}
        setSpents={setSpents}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto} 
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
            <main>
              <Filter
                filter={filter}
                setFilter={setFilter}
              />
              
              <ExpenseList
                spents={spents}
                setEditExpense={setEditExpense}
                deleteSpent={deleteSpent}
                filter={filter}
                expenseFilter={expenseFilter}

                 />
            </main>
            <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNewSpent}
            />
            </div>
        </>
      )}

      {modal && <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  saveSpent={saveSpent}
                  editExpense={editExpense}
                  setEditExpense={setEditExpense}
                  />}
      
    </div>
   
  )
}

export default App
