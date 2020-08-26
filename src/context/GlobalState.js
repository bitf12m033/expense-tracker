import React , {useReducer, createContext,useEffect} from 'react'

import AppReducer from './AppReducer'
// Initial state

const initialState = {
    transactions:[
    ]
}
 initialState.transactions = localStorage.getItem('transactions')
  ? JSON.parse(localStorage.getItem('transactions'))
  : []
// Create context 

export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({children}) =>{
    const [state , dispatch] = useReducer(AppReducer,initialState);

    // Actions
    function deleteTransaction(id)
    {
        dispatch({
            type:'DELETE_TRANSACTION',
            payload:id
        });
    }
    function addTransaction(transaction)
    {
        dispatch({
            type:'ADD_TRANSACTION',
            payload:transaction
        });

    }
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state.transactions))
    }, [state.transactions])
    return (
        <GlobalContext.Provider value={{transactions: state.transactions,deleteTransaction , addTransaction}}>
            {children}
        </GlobalContext.Provider>
    )
}
