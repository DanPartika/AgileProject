
import { createPatient, editPatientData, getPatientsByBirthdate } from "./data/patients.js";
import { connectToMongoDB, closeConnection, getDB } from './config/mongoConnection.js';

/*
SCHEMAS:

Patient = {
    id,
    firstName,
    lastName,
    date_of_birth,
    race,
    sex,
    medical_history, 
    medications,
    notes
}

Doctor = {
	name,
	docEmail,
	patientList,
	sharedPatientList
}
*/


async function main() {
    await connectToMongoDB();
    console.log("Seeding...")
    let seedPatients = async () => {
        try{
            let js = await createPatient("John", "Smith", "1/15/1980", "Caucasian", "M", "Hypertension, Diabetes type 2", "Lisinopril, Metformin");
            let ej = await createPatient("Emily", "Johnson", "3/10/1992", "Asian", "F", "Asthma, Seasonal allergies", "Albuterol inhaler, Loratadine");
            let ml = await createPatient("Michael", "Lee", "11/20/1975", "Caucasian", "M", "High cholesterol, GERD", "Atorvastatin, Omeprazole");
            let sg = await createPatient("Sarah", "Garcia", "9/5/1990", "Asian", "F", "Depression, Anxiety", "Sertraline, Clonazepam");
            let db = await createPatient("David", "Brown", "7/8/1987", "Asian", "M", "None", "None");
            let jm = await createPatient("Jennifer", "Martinez", "5/12/1968", "African American", "F", "Rheumatoid arthritis, Hypothyroidism", "Methotrexate, Levothyroxine");

            editPatientNotes(js, "Hypertension, Diabetes type 2", "Lisinopril, Metformin", "Allergic to penicillin.")
            editPatientNotes(ml, "High cholesterol, GERD", "Atorvastatin, Omeprazole", "Patient is a smoker, advised to quit.")
            editPatientData(sg, "Depression, Anxiety", "Sertraline, Clonazepam", "Patient mentions occasional anxiety attacks.")
            editPatientData(db, "None", "None", "Patient follows a vegetarian diet.")
            editPatientData(jm, "Rheumatoid arthritis, Hypothyroidism", "Methotrexate, Levothyroxine", "Patient is pregnant, due in June.")


        }catch(e){
            console.log(e);
        }
    }
    
    await seedPatients();
    console.log("Seed file finished")
    await closeConnection();
}

main();