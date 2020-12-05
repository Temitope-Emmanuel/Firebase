import React from "react"
import {Link} from "react-router-dom"
import * as ROUTES from "constants/routes"
import {withAuthorization} from "../Session"
import {User} from "firebase"



const HomePage = () => (
    <div>
        <p>This is the home page</p>
    </div>
)

const condition = (authUser:User | null) => !!authUser

export default withAuthorization(condition)(HomePage)