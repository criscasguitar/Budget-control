import Spent from "./Spent"

const ExpenseList = ({
    spents,
    setEditExpense, 
    deleteSpent,
    filter,
    expenseFilter
  }) => {
  return (
    <div className="listado-gastos contenedor">

        { filter ? (
            <>
            <h2>{expenseFilter.length ? 'Expenses' : 'There are not expenses yet in this category'}</h2>
              {expenseFilter.map(spent => (
                  <Spent 
                      key={spent.id}
                      spent={spent}
                      setEditExpense={setEditExpense}
                      deleteSpent={deleteSpent}
                  /> 
                )) } 
              </>
                ) : (
              <>
                <h2>{spents.length ? 'Expenses' : 'There are not expenses yet'}</h2>  
                  {spents.map(spent => (
                    <Spent 
                        key={spent.id}
                        spent={spent}
                        setEditExpense={setEditExpense}
                        deleteSpent={deleteSpent}
                    />
                    
                    ))}
              </>
            )
        }
    </div>
  )
}

export default ExpenseList