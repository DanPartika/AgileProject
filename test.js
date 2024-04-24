import assert from "assert";
import {doCreateUserWithEmailAndPassword, dosignInWithEmailAndPassword, doSignOut, doUpdatePassword, doSocialSignIn} from "./firebase/firebaseFunctions.js"
import { firebaseApp } from "./firebase/firebaseConfig.js";
import { connectToMongoDB } from "./config/mongoConnection.js";


import { createPatient, getPatientsByBirthdate, editPatientNotes, getPatientById } from "./data/patients.js";

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

let testingPatientData = async () => {
    await connectToMongoDB()
    describe('CreatePatient', function () {
        describe('create function', function () {
          it('it should return the id when successfully registered',async function () {
            let patient = await createPatient("Patient", "One", "1/1/2000", "White", "M", "medical history", "medications")
            assert.notEqual(patient, null);
          });

          it('it should return an error if data is missing',async function () {
            let error = ""
            try{
                let patient = await createPatient("One", "1/1/2000", "White", "M", "medical history", "medications")
            }catch(e){
                error = e 
            }
            assert.notEqual(error, "");
            
          });

          it('it should return an error if birthdate is in the future',async function () {
            let error = ""
            try{
                let patient = await createPatient("Patient", "One", "1/1/2030", "White", "M", "medical history", "medications")
            }catch(e){
                error = e 
            }
            assert.notEqual(error, "");
            
          });
    
        });
      });


      describe('Search Patient', function () {
        describe('search patient function', function () {
          it('it should return the list of patients with the matching birthday',async function () {
            let patients = await getPatientsByBirthdate("1/1/2000")
            assert.notEqual(patients.length, 0);
          });

          it('it should return the empty list when no patient has a matching birthday',async function () {
            let patients = await getPatientsByBirthdate("1/2/2000")
            assert.equal(patients.length, 0);
          });

          it('it should return the empty list when the birthday is invalid',async function () {
            let patients = await getPatientsByBirthdate("1/32/2000")
            assert.equal(patients.length, 0);
          });
    
        });
      });

      describe('Edit Patient Notes', function () {
        it('should update patient notes successfully', async function () {
            // Create a patient
            const patient = await createPatient("Patient", "One", "1/1/2000", "White", "M", "medical history", "medications");
            // Edit patient notes
            const updatedPatient = await editPatientNotes(patient, "Updated medical history", "Updated medications", "New notes");
            // Retrieve the patient again
            const retrievedPatient = await getPatientById(patient);
            // Check if notes are updated
            assert.strictEqual(retrievedPatient.medical_history, "Updated medical history");
            assert.strictEqual(retrievedPatient.medications, "Updated medications");
            assert.strictEqual(retrievedPatient.notes, "New notes");
        });
    
        it('should throw an error if patient ID is invalid', async function () {
            let error = null;
            try {
                // Attempt to edit patient notes with an invalid ID
                await editPatientNotes("invalid_id", "Updated medical history", "Updated medications", "New notes");
            } catch (e) {
                error = e;
            }
            assert.notStrictEqual(error, null);
        });
    });

}

let testingDocData = async () => {

}
//await testingPatientData()
// await testingCreate()
 //await testingLogin()
