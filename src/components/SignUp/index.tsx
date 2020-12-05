import React from "react"
import { Link } from "react-router-dom"
import {useHistory} from "react-router-dom"
import {FirebaseContext} from "components/Firebase"
import * as ROUTES from "constants/routes"
import * as ROLES from "constants/roles"


const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
)


const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAdmin:false,
    error: {
        message:""
    }
}

const SignUpForm = () => {
    const firebaseContext = React.useContext(FirebaseContext)
    const [formState, setFormState] = React.useState(INITIAL_STATE)
    const history = useHistory()
    const isInvalid =
        formState.passwordOne !== formState.passwordTwo ||
        formState.passwordOne === '' ||
        formState.email === '' ||
        formState.username === '';

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }
    const onChangeCheckbox = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormState({...formState,[e.target.name]:e.target.checked})
    }

    const onSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const {email,username,isAdmin} = formState
        const roles:any = {}
        if(isAdmin){
            roles[ROLES.ADMIN] = ROLES.ADMIN
        }
        firebaseContext!.
        doCreateUserWithEmailAndPassword(formState.email,formState.passwordOne)
        .then((authUser:any) => {
            return firebaseContext.user(authUser.user.uid).set({
                username,
                email,
                roles
            }).then(() => {
                setFormState({...INITIAL_STATE})
                history.push(ROUTES.HOME)
            }).catch((err) => {
                setFormState({...formState,error:err})
            })
        }).catch((err) => {
            setFormState({...formState,error:err})
        })
    }

    return (
        <form onSubmit={onSubmit} >
            <input
                name="username"
                value={formState.username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={formState.email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={formState.passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={formState.passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <label>
                Admin:
                <input
                    name="isAdmin"
                    type="checkbox"
                    checked={formState.isAdmin}
                    onChange={onChangeCheckbox}
                />
            </label>
            <button type="submit" disabled={isInvalid} >Sign Up</button>
            {formState.error && <p>{formState.error!.message}</p>}
        </form>
    )
}

const SignUpLink = () => (
    <p>
        Don't have an account ? <Link to={ROUTES.SIGN_UP} >Sign Up</Link>
    </p>
)


export default SignUpPage

export { SignUpForm, SignUpLink }