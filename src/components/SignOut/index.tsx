import React from "react"
import { FirebaseContext } from "components/Firebase"


const SignOut = () => {
    const firebaseContext = React.useContext(FirebaseContext)
    return(
        <button type="button" onClick={firebaseContext?.doSignOut} >
            Sign Out
        </button>
    )
}


export default SignOut