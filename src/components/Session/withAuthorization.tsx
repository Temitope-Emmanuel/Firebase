import React from "react"
import {FirebaseContext} from "components/Firebase"
import AuthContext from "./AuthContext"
import {useHistory} from "react-router-dom"
import * as ROUTES from "constants/routes"
import {User} from "firebase"

export const withAuthorization = (condition:any) => <P extends object>(Component: React.ComponentType<P>) => (
    function WithAuthorization({...props }) {
        const firebase = React.useContext(FirebaseContext)
        const auth = React.useContext(AuthContext)
        const history = useHistory()

        React.useEffect(() => {
            const listener = firebase.onAuthUserListener((authUser:User) => {
                if(!condition(authUser)){
                    history.push(ROUTES.LANDING)
                }
            },() => {history.push(ROUTES.SIGN_IN)})
            return function(){
                listener && listener()
            }
        },[])

        return (
            <div>
                {
                    condition(auth.authUser) ? <Component {...props as P} /> : null
                }
            </div>
        )
    }
)

export default withAuthorization