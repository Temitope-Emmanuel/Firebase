import React from "react"
import * as ROLES from "constants/roles"
import {FirebaseContext} from "../Firebase"
import {withAuthorization} from "components/Session"


interface IUser{
    email:string;
    uid:string;
    username:string
}

interface IUserList {
    users:IUser[]
}

const UsersList:React.FC<IUserList> = ({users}) => (
    <ul>
        {users.map((user) => (
            <li key={user.uid}>
                <span>
                    <strong>
                        ID:
                    </strong>
                    {user.uid}
                </span>
                <span>
                    <strong>
                        E-Mail:
                    </strong>
                    {user.email}
                </span>
                <span>
                    <strong>
                        Username:
                    </strong>
                    {user.username}
                </span>
            </li>
        ))}
    </ul>
)

const AdminPage = () => {
    const firebaseContext = React.useContext(FirebaseContext) 
    const [loading,setLoading] = React.useState(false)
    const [users,setUsers] = React.useState<IUser[]>([])

    React.useEffect(() => {
        firebaseContext.users().on('value',(snapshot) => {
            const usersObject = snapshot.val()
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid:key
            }))
            setLoading(false)
            setUsers(usersList)
        })
        return function(){
            firebaseContext.users().off()
        }
    },[])

    return(
        <div>
            <h1>
                Admin
            </h1>
            <p>Only Accessible to Sign In admin</p>
            <UsersList users={users} />
        </div>
    )
}

const condition = (authUser:any) => authUser && authUser.roles[ROLES.ADMIN]

export default withAuthorization(condition)(AdminPage)