import config from "utils"
import app from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/analytics"

class Firebase{
    
    public auth;
    public db;
    public googleProvider;
    public facebookProvider;
    public twitterProvider;

    
    constructor(){
        app.initializeApp(config)
        app.analytics();
        this.auth = app.auth()
        this.db = app.database()
        this.googleProvider = new app.auth.GoogleAuthProvider()
        // this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.facebookProvider = new app.auth.FacebookAuthProvider()
        this.twitterProvider = new app.auth.TwitterAuthProvider()
    }

    // Auth *** API ***
    doCreateUserWithEmailAndPassword = (email:string,password:string) => (
        this.auth.createUserWithEmailAndPassword(email,password)
    )
    doSignInWithEmailAndPassword = (email:string,password:string) => (
        this.auth.signInWithEmailAndPassword(email,password)
    )
    doSignInWithGoogle = () => (
        this.auth.signInWithPopup(this.googleProvider)
    )
    doSignInWithFacebook = () => (
        this.auth.signInWithPopup(this.facebookProvider)
    )
    doSignInWithTwitter = () => (
        this.auth.signInWithPopup(this.twitterProvider)
    )
    doSignOut = () => (
        this.auth.signOut()
    )
    doPasswordReset = (email:string) => (
        this.auth.sendPasswordResetEmail(email)
    )
    doPasswordUpdate = (password:string) => (
        this.auth.currentUser?.updatePassword(password)
    )
    // User *** API ***
    user = (uid:string) => this.db.ref(`users/${uid}`)
    users = () => this.db.ref(`users`)

    // Merge Auth and DB users API
    onAuthUserListener = (next:Function,fallback:Function) => (
        this.auth.onAuthStateChanged(authUser => {
            if(authUser){
                this.user(authUser.uid)
                .once('value').then(snapshot => {
                    const dbUser = snapshot.val()

                    // default empty roles
                    if(!dbUser.roles){
                        dbUser.roles = {}
                    }
                    // merge auth and db user
                    authUser = {
                        uid:authUser?.uid,
                        email:authUser?.email,
                        ...dbUser
                    }

                    next(authUser)
                })
            }else{
                fallback()
            }
        })
    ) 
}

export default Firebase