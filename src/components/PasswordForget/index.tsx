import React from "react"
import {Link, useHistory} from "react-router-dom"
import * as ROUTES from "constants/routes"
import {FirebaseContext} from "components/Firebase"


const PasswordForgetPage = () => (
    <div>
        <h1>
            PasswordForget
        </h1>
        <PasswordForgetForm/>
    </div>
)

const INITIAL_STATE = {
    email:"",
    error:null
}

const PasswordForgetForm = () => {
    const [passwordForm,setPasswordForm] = React.useState(INITIAL_STATE)
    const firebaseContext = React.useContext(FirebaseContext)
    const history = useHistory()

    const onSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const {email} = passwordForm
        firebaseContext!.
        doPasswordReset(email)
        .then((authUser:any) => {
            console.log(authUser)
            setPasswordForm({...INITIAL_STATE})
            history.push(ROUTES.HOME)
        }).catch((err) => {
            console.log("this is the err",err)
            setPasswordForm({...passwordForm,error:err})
        })
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    }

    const {email,error} = passwordForm
    const isInValid = email === ""
    return (
        <form onSubmit={onSubmit}>
        <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
        />
        <button disabled={isInValid} type="submit">
        Reset My Password
        </button>
        {error && <p>{error}</p>}
        </form>
        );
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET} >
            Forgot Password ?
        </Link>
    </p>
)

export default PasswordForgetPage
export {PasswordForgetForm,PasswordForgetLink}