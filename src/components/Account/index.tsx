import React from "react"
import {Link} from "react-router-dom"
import * as ROUTES from "../../constants/routes"
import {PasswordForgetForm} from "components/PasswordForget"
import PasswordChangeForm from "components/PasswordChange"
import {withAuthorization} from "../Session"


const Account = () => (
    <div>
        <h1>
            Account Page
        </h1>
        <PasswordForgetForm/>
        <PasswordChangeForm/>
    </div>
)
const condition = (authUser:any) => !!authUser
export default withAuthorization(condition)(Account)