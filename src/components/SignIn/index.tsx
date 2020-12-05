import React from "react"
import { useHistory } from "react-router-dom"
import {FirebaseContext} from "components/Firebase"
import * as ROUTES from "constants/routes"
import { SignUpLink } from "components/SignUp"
import {PasswordForgetLink} from "components/PasswordForget"


const SignInPage = () => (
    <div>
        <h1>
            SignIn
        </h1>
        <SignInForm />
        <SignInGoogle/>
        <SignInFacebook/>
        <SignInTwitter/>
        <PasswordForgetLink/>
        <SignUpLink/>
    </div>
)

const INITIAL_STATE = {
    email: "",
    password: "",
    error: {
        message: null
    }
}

const SignInForm = () => {
    const history = useHistory()
    const firebaseContext = React.useContext(FirebaseContext)
    const [formState, setFormState] = React.useState(INITIAL_STATE)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const onSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault()
        firebaseContext!.
            doSignInWithEmailAndPassword(formState.email, formState.password)
            .then((authUser: any) => {
                setFormState({ ...INITIAL_STATE })
                history.push(ROUTES.HOME)
            }).catch((err) => {
                setFormState({ ...formState, error: err })
            })
    }
    const { email, error, password } = formState
    const isInValid = password === "" || email === ""
    return (
        <form onSubmit={onSubmit}>
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <button disabled={isInValid} type="submit">
                Sign In
    </button>
            {error && <p>{error.message}</p>}
        </form>
    )
}

const SignInGoogle = () => {
    const [error,setError] = React.useState({message:null})
    const firebaseContext = React.useContext(FirebaseContext)
    const history = useHistory()

    const onSubmit = (evt:React.SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault()
        firebaseContext.doSignInWithGoogle().then(socialAuthUser => {
            console.log("this is the social auth user",socialAuthUser)
            const {user} = socialAuthUser
            firebaseContext.user(user!.uid).set({
                username:user?.displayName,
                email:user?.email,
                roles:{}
            })
            setError({message:null})
            history.push(ROUTES.HOME)
        }).catch(err => {
            console.log(err)
            setError(err)
        })
    }
    const {message} = error
    return(
        <div>
        <form onSubmit={onSubmit} >
            <button type="submit" role="submit">
                Sign In With Google
            </button>
            {message && <p>{message}</p>}
        </form>
        </div>
    )
}
const SignInFacebook = () => {
    const [error,setError] = React.useState({message:null})
    const firebaseContext = React.useContext(FirebaseContext)
    const history = useHistory()

    const onSubmit = () => {
        // evt.preventDefault()
        firebaseContext.doSignInWithFacebook().then(socialAuthUser => {
            console.log("this is the social auth user",socialAuthUser)
            const {user,additionalUserInfo} = socialAuthUser
            firebaseContext.user(user!.uid).set({
                username:(additionalUserInfo?.profile as any).name,
                email:(additionalUserInfo?.profile as any).email,
                roles:{}
            })
            setError({message:null})
            history.push(ROUTES.HOME)
        }).catch(err => {
            console.log(err)
            setError(err)
        })
    }
    const {message} = error
    return(
        <div>
        {/* <form onSubmit={onSubmit} > */}
            <button onClick={onSubmit}>
                Sign In With Facebook
            </button>
            {message && <p>{message}</p>}
        {/* </form> */}
        </div>
    )
}
const SignInTwitter = () => {
    const [error,setError] = React.useState({message:null})
    const firebaseContext = React.useContext(FirebaseContext)
    const history = useHistory()

    const onSubmit = () => {
        // evt.preventDefault()
        firebaseContext.doSignInWithTwitter().then(socialAuthUser => {
            console.log("this is the social auth user",socialAuthUser)
            const {user,additionalUserInfo} = socialAuthUser
            firebaseContext.user(user!.uid).set({
                username:(additionalUserInfo?.profile as any).name,
                email:(additionalUserInfo?.profile as any).email,
                roles:{}
            })
            setError({message:null})
            history.push(ROUTES.HOME)
        }).catch(err => {
            console.log(err)
            setError(err)
        })
    }
    const {message} = error
    return(
        <div>
        {/* <form onSubmit={onSubmit} > */}
            <button onClick={onSubmit}>
                Sign In With Twitter
            </button>
            {message && <p>{message}</p>}
        {/* </form> */}
        </div>
    )
}


export default SignInPage