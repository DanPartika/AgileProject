import {Router} from 'express'

import { doCreateUserWithEmailAndPassword, doSignOut, dosignInWithEmailAndPassword } from '../firebase/firebaseFunctions.js'


const router = Router()

router.route("/").get(async (req, res) => {
    res.redirect("login");
  });

router.route("/login").get(async (req, res) => { 
    //make sure no cookie
    if(req.session.loggedIn){
        return res.redirect('/home')
    }

    //return login page
    return res.render("login", {title: "Login", error: ""})

})

router.route("/signup").get(async (req, res) => { 
    //make sure no cookie
    if(req.session.loggedIn){
        return res.redirect('/home')
    }

    //return signup page
    return res.render("signup", {title: "Sign Up", error: ""})
    


})

router.route("/signup").post(async (req, res) => { 
    const userInfo = req.body

    if(!userInfo || !userInfo.emailAddressInput || !userInfo.passwordInput || !userInfo.confirmPasswordInput | !userInfo.nameInput){
        return res.status(400).render("signup", {title: "Sign Up", error: "Invalid Request"})
    }

    if(userInfo.passwordInput != userInfo.confirmPasswordInput){
        return res.status(400).render("signup", {title: "Sign Up", error: "Passwords must match"})
    }

    if(req.session.loggedIn){//make sure no cookie
        return res.redirect('/home')
    }

    let user
    try{
        user = await doCreateUserWithEmailAndPassword(userInfo.emailAddressInput, userInfo.passwordInput, userInfo.nameInput)
    }catch(e){
        return res.status(400).render("signup", {title: "Sign Up", error: String(e)})
    }


    //set cookie
    req.session.user = {name: user.user.displayName, id: user.user.uid}
    req.session.loggedIn = true
    
    //return homepage
    return res.redirect('/home')

})

router.route("/login").post(async (req, res) => { 
    const userInfo = req.body
    console.log(userInfo)

    if(!userInfo || !userInfo.emailAddressInput || !userInfo.passwordInput){
        return res.status(400).render("login", {title: "Login", error: "Invalid Request"})
    }

    if(req.session.loggedIn){//make sure no cookie
        return res.redirect('/home')
    }

    let user
    try{
        user = await dosignInWithEmailAndPassword(userInfo.emailAddressInput, userInfo.passwordInput)
    }catch(e){
        return res.status(400).render("login", {title: "Login", error: String(e)})
    }

    //set cookie

    req.session.user = {name: user.user.displayName, id: user.user.uid}
    req.session.loggedIn = true
    
    //return homepage
    return res.redirect('/home')

})

router.route("/logout").get(async (req, res) => { 

    //make sure cookie
    if(!req.session.loggedIn){
        return res.redirect('/login')
    }

    await doSignOut()
    req.session.destroy()

    //return homepage
    return res.redirect('/login')
})


router.route("/home").get(async (req, res) => { 

    //make sure  cookie
    if(!req.session.loggedIn){
        return res.redirect('/login')
    }

    console.log(req.session.user)
    //return homepage
    return res.render("home", {title: "Home", error: "", name: req.session.user.name})
})

router.route("/wireframe").get(async (req, res) => { 

    //make sure  cookie
    if(!req.session.loggedIn){
        return res.redirect('/login')
    }

    console.log(req.session.user)
    //return wireframe
    return res.render("wireframe", {title: "Home", error: ""})
})

export default router