import React from 'react'
import NewBudget from './NewBudget'
import BudgetControl from './BudgetControl'

const Header = ({
    spents,
    presupuesto, 
    setPresupuesto, 
    isValidBudget, 
    setIsValidBudget,
    setSpents
    }) => {
  return (
    <header>
        <h1>Expense Planner</h1>

        {isValidBudget ? (
           <BudgetControl
                spents={spents}
                setSpents={setSpents}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidBudget={setIsValidBudget}
           />
        ) : (
            <NewBudget 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto} 
            setIsValidBudget={setIsValidBudget}
        />
        )}
        
    </header>
  )
}

export default Header