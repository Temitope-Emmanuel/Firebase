import React from "react"
import {User} from "firebase"
import {FirebaseContext} from "components/Firebase"

interface IAuthContext {
    authUser:User | null;
    handleAuthUser(arg:User):void
}

const AuthUserContext = React.createContext<IAuthContext>({
    authUser:null,
    handleAuthUser:(arg:User) => {}
})


export const AuthProvider = <P extends object>(Component:React.ComponentType<P>) => {
    return function Provider({...props}){
        const getFromStorage = () => {
            if(localStorage.getItem('authUser')){
                return JSON.parse((localStorage.getItem('authUser') as string))
            }else{
                return null
            }
        }
        const firebase = React.useContext(FirebaseContext)
        const [authUser,setAuthUser] = React.useState<User | null>(getFromStorage())
        const handleAuthUser = (arg:User) => {
            setAuthUser(arg)
        }
        
        React.useEffect(() => {
            const listener = firebase.onAuthUserListener((authUser:User) => {
                localStorage?.setItem('authUser',JSON.stringify(authUser))
                setAuthUser(authUser)
            },() => {
                localStorage?.removeItem('authUser')
                setAuthUser(null)
            })
            return function(){
                listener && listener()
            }
        },[])

        return(
            <AuthUserContext.Provider value={{authUser,handleAuthUser}} >
                <Component {...props as P} />
            </AuthUserContext.Provider>
        )
    }
}

export default AuthUserContext