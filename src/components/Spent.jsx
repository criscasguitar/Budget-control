import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import {formDate} from '../helpers/index'

import savingIcon from '../img/icono_ahorro.svg'
import homeIcon from '../img/icono_casa.svg'
import foodIcon from '../img/icono_comida.svg'
import spentIcon from '../img/icono_gastos.svg'
import leisureIcon from '../img/icono_ocio.svg'
import healthIcon from '../img/icono_salud.svg'
import suscriptionsIcon from '../img/icono_suscripciones.svg'

const iconDictionary = {
    saving: savingIcon,
    food: foodIcon,
    home: homeIcon,
    spent: spentIcon,
    leisure: leisureIcon,
    health: healthIcon,
    suscriptions: suscriptionsIcon

}

const Spent = ({spent, setEditExpense, deleteSpent}) => {
    const {category, name, amount, id, date} = spent;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(spent)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => deleteSpent(id)}
                destructive={true}
                >
                Delete
            </SwipeAction>
        </TrailingActions>
    )
  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                    <img 
                        src={iconDictionary[category]} 
                        alt="Spent Icon" 
                    />

                    <div className='descripcion-gasto'>

                        <p className='categoria'>{category}</p>
                        <p className='nombre-gasto'> {name}</p>
                        <p className='fecha-gasto'> Added: {' '}
                        <span>{formDate(date)}</span></p>

                    </div>
                </div>

                <p className='cantidad-gasto'>${amount}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Spent