
import { createPatient, getPatientsByBirthdate,editPatientSharedSuregon } from "./data/patients.js";
import { connectToMongoDB, closeConnection, getDB } from './config/mongoConnection.js';


async function main() {
    await connectToMongoDB();

    try{
        let id = await createPatient("Test", "Person", "1/23/2013", "white", "M", "testing1", "medications","Dr.Partika","None");
				await editPatientSharedSuregon(id,"dr.sdfsdf");
    }catch(e){
        console.log(e);
    }

    await closeConnection();
}

main();