import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"

const BudgetControl = ({
        spents, 
        setSpents,
        presupuesto,
        setPresupuesto,
        setIsValidBudget
    }) => {

    const [percentage, setPercentage] = useState(0)
    const [available, setAvailble] = useState(0);
    const [spent, setSpent] = useState(0)

    useEffect(() => {
      const totalSpent = spents.reduce((total, spent) => spent.amount + total, 0);

      const totalAvailable = presupuesto - totalSpent;

      // Calcular el porcentaje gastado
      const newPercentage = (((presupuesto - totalAvailable) / presupuesto) * 100).toFixed(2);
      
      setAvailble(totalAvailable);
      setSpent(totalSpent);  
      
      setTimeout(() => {
        setPercentage(newPercentage);
      }, 1000);  
      
    }, [spents])
    

    const resetAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp =() => {
        const result = confirm('¿Do you want to restart budget and expenses?');

        if(result) {
            setSpents([])
            setPresupuesto(0)
            setIsValidBudget(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor:  percentage > 100 ? '#DC2626' : '#3B82F6'
            })}
                value={percentage}
                text={`${percentage}% Spent`}
                
            />
        </div>

        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}    
            >
                Reset App
            </button>
            <p>
                <span>Budget:</span> {resetAmount(presupuesto)}
            </p>

            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Available:</span> {resetAmount(available)}
            </p>

            <p>
                <span>Spent:</span> {resetAmount(spent)}
            </p>
        </div>
    </div>
  )
}

export default BudgetControl