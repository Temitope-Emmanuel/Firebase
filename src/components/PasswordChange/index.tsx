import React, { isValidElement } from "react"
import { Link, useHistory } from "react-router-dom"
import * as ROUTES from "constants/routes"
import { FirebaseContext } from "components/Firebase"


const INITIAL_STATE = {
    passwordOne: "",
    passwordTwo: "",
    error: {
        message: null
    }
}

const PaswordChange = () => {
    const firebaseContext = React.useContext(FirebaseContext)
    const [passwordForm, setPasswordForm] = React.useState(INITIAL_STATE)
    const history = useHistory()

    const onSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const { passwordOne } = passwordForm
        firebaseContext!.doPasswordUpdate(passwordOne)?.then((authUser: any) => {
            setPasswordForm({ ...INITIAL_STATE })
            history.push(ROUTES.HOME)
            console.log(authUser)
        }).catch((err) => {
            console.log("there's been an err")
            setPasswordForm({ ...passwordForm, error: err })
        })
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    }

    const { passwordOne, passwordTwo, error: { message } } = passwordForm
    const isInValid = passwordOne !== passwordTwo
    return (
        <form onSubmit={onSubmit}>
            <input
                name="passwordOne"
                onChange={onChange}
                type="password"
                placeholder="New Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm New Password"
            />
            <button disabled={isInValid} type="submit">
                Update Password
            </button>
            {message && <p>{message}</p>}
        </form>
    )
}


export default PaswordChange