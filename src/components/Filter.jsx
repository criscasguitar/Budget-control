import {useState, useEffect} from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div className='filtros sombra contenedor'>
      <form>
          <div className='campo'>
            <label>Filter Expense</label>

            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
            > 
                    <option value="">-- All Categories --</option>
                    <option value="saving">Saving</option>
                    <option value="food">Food</option>
                    <option value="home">Home</option>
                    <option value="spent">Spent</option>
                    <option value="leisure">Leisure</option>
                    <option value="health">Health</option>
                    <option value="suscriptions">Suscriptions</option>
            /</select>
          </div>
      </form>
    </div>
  )
}

export default Filter