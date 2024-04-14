import {doctors} from "../config/mongoCollections.js";
import {connectToMongoDB} from "../config/mongoConnection.js";
import {ObjectId} from "mongodb";

const validatePatientArgs = (VARS, VAR_NAMES) => {
	let errors = [];

	for (let i = 0; i < VARS.length; i++) {
		if (!VARS[i]) {
			errors.push(`Field: ${VAR_NAMES[i]} missing! Please supply.`);
		}
	}
	if (errors.length > 0) {
		//console.log(errors.toString()) //used to show example in test
		throw errors.toString();
	}
	return;
};


export const createDoctor = async (
	userEmail,
	patientList

) => {
	let doctorCollection = await doctors();


	let newDoctor = {
		docEmail: userEmail,
		patientList:patientList
	};

	let createInfo = await doctorCollection.insertOne(newDoctor);
	if (!createInfo.acknowledged || !createInfo.insertedId) {
		throw "could not add doctor";
	}

	return createInfo.insertedId.toString();
};


export async function getDoctorById(id) {
	let doctorCollection = await doctors();
	console.log("Doctor ID: ", id);
	let doctor = await doctorCollection.findOne({_id: new ObjectId(id)});
	console.log("Doctor: ", doctor);
	if (!doctor) {
		throw "Could not find patient";
	}

	doctor._id = doctor._id.toString();
	return doctor;
}

export async function getAllDoctors(){
  let doctorCollection = await doctors();
  let doctor = await doctorCollection.find({}).toArray();
  if(!doctor){
    throw "Could not find doctors"
  }

  doctor._id = doctor._id.toString()
  return doctor
}

export async function addPatientToDoctor(id, newSharedSuregon) {
	
}

// await connectToMongoDB()
// await createPatient("Kyle", "Boberg", "1/23/2013", "white", "M", "lots of history", "so many medications")
//await editPatientData("65f8dd398346b2df5287e970", "Kyle", "Boberg2", "1/25/2013", "white", "M", "lots of history", "so many medication 2")

// console.log(await getPatientsByBirthdate("1/23/2013"))
