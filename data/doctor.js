import {doctors} from "../config/mongoCollections.js";
import {connectToMongoDB} from "../config/mongoConnection.js";
import {ObjectId} from "mongodb";



export async function createDoctor (userEmail) {
	let doctorCollection = await doctors();

	let newDoctor = {
		docEmail: userEmail,
		patientList:[]
	};

	let createInfo = await doctorCollection.insertOne(newDoctor);
	if (!createInfo.acknowledged || !createInfo.insertedId) {
		throw "could not add doctor";
	}
	const docID = createInfo.insertedId.toString();
	const doc = await getDoctorById(docID)
	doc._id = doc._id.toString();
	console.log("1HERE: \n\n", doc);
	return doc;

};


export async function getDoctorById(id) {
	console.log("H2ERE: \n\n", id);
	let doctorCollection = await doctors();
	console.log("Doctor ID: ", id);
	const doctor = await doctorCollection.findOne({_id: new ObjectId(id)});
	console.log("Doctor: ", doctor);
	if (!doctor) throw "Could not find doctor";

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
