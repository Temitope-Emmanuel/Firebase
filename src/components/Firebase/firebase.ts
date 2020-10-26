import config from "utils"
import app from "firebase/app"
import "firebase/auth"


class Firebase{
    private auth;
    constructor(){
        app.initializeApp(config)
        this.auth = app.auth()
    }

    // Auth API
    doCreateUserWithEmailAndPassword = (email:string,password:string) => {
        this.auth.createUserWithEmailAndPassword(email,password)
    }
    doSignInWithEmailAndPassword = (email:string,password:string) => {
        this.auth.signInWithEmailAndPassword(email,password)
    }
    doSignOut = () => {
        this.auth.signOut()
    }

    doPasswordReset = (email:string) => {
        this.auth.sendPasswordResetEmail(email);
    }

    doPasswordUpdate = (password:string) => {
        this.auth.currentUser?.updatePassword(password)
    }
}


export default Firebase