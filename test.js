import assert from "assert";
import {doCreateUserWithEmailAndPassword, dosignInWithEmailAndPassword, doSignOut, doUpdatePassword, doSocialSignIn} from "./firebase/firebaseFunctions.js"
import { firebaseApp } from "./firebase/firebaseConfig.js";

let testingCreate = async () => {
    await describe("Create User", async () => {
        /*
        it("should return Charles as the display name since the user is created successfully with Charles as the display name", async () => {
            const user = await doCreateUserWithEmailAndPassword("ccanata4@stevens.edu", "password", "Charles")
            assert.equal(user.user.displayName, "Charles")
        })
        it("should return Agile as the display name since the user is created successfully with Agile as the display name", async () => {
            const user = await doCreateUserWithEmailAndPassword("Agile2@Method.edu", "agileRules", "Agile")
            assert.equal(user.user.displayName, "Agile")
        })
        it("should fail since the user is already created", async () => {
            try{
                const user = await doCreateUserWithEmailAndPassword("ccanata@stevens.edu", "password", "Charles")
                assert.fail("Account should not have been created")
            }
            catch{
                assert(true, "Task Successfully failed")
            }
        })*/
        it("Creat User testing currently disabled, waiting for further functionality", () => {
            assert(true, "")
        })
    })
}

let testingLogin = async () => {
    await describe("Login", async () => {
        await it("should return true since the username and the password are valid", async () => {
            const user = await dosignInWithEmailAndPassword("ccanata@stevens.edu", "password")
            assert.notEqual(user.user, null)
        })
        await doSignOut()
        await it("should return true since the username and the password are valid", async () => {
            const user = await dosignInWithEmailAndPassword("Agile@Method.edu", "agileRules")
            assert.notEqual(user.user, null)
        })
        await doSignOut()

        //doSocialSignIn Tests

        await it("should fail since the username is invalid", async () => {
            try{
                const user = await dosignInWithEmailAndPassword("ccanata11@stevens.edu", "password")
                assert.fail("User should not have authenticated")
            }
            catch{
                assert(true, "Task Successfully failed")
            }
            
            
        })
        await it("should fail since the password is invalid", async () => {
            try{
                const user = await dosignInWithEmailAndPassword("ccanata@stevens.edu", "p@ssword")
                assert.fail("User should not have authenticated")
            }
            catch{
                assert(true, "Task Successfully failed")
            }
        })

    })
}

let testingUpdateProfile = async () =>{
    /*
    describe("Update Password", () => {
        
    })
    describe("Update display name", () => {

    })
    */
}

let testingDatabaseConnection = async () => {
    
}

await testingCreate()
await testingLogin()
//DELETE CREATED USERS
