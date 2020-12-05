import React from "react"
import Firebase from "./firebase"

const createFirebase = () => {
    let firebase = null 
    if(!firebase){
        firebase = new Firebase()
    }   
    return firebase
}


const firebase = createFirebase()
const FirebaseContext = React.createContext<Firebase>(firebase);

export const FirebaseProvider = <P extends object>(Component:React.ComponentType<P>) => {
    return function Provider({...props}){
        
        return(
            <FirebaseContext.Provider value={firebase}>
                <Component {...props as P} />
            </FirebaseContext.Provider>
        )
    }
}

export default FirebaseContext