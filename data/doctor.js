import {doctors} from "../config/mongoCollections.js";
import {connectToMongoDB} from "../config/mongoConnection.js";
import {ObjectId} from "mongodb";


export async function createDoctor (userId, Name, userEmail) {
	let doctorCollection = await doctors();

	let newDoctor = {
		userId: userId,
		name: Name,
		docEmail: userEmail,
		patientList:[],
		sharedPatientList:[]
	};

	let createInfo = await doctorCollection.insertOne(newDoctor);
	if (!createInfo.acknowledged || !createInfo.insertedId) throw "could not add doctor";

	const docID = createInfo.insertedId.toString();
	const doc = await getDoctorById(docID)
	doc._id = doc._id.toString();
	//console.log("1HERE: \n\n", doc);
	return doc;

};

export async function getDoctorById(id) {
	let doctorCollection = await doctors();
	const doctor = await doctorCollection.findOne({_id: new ObjectId(id)});
	if (!doctor) throw "Could not find doctor";
	doctor._id = doctor._id.toString();
	return doctor;
}

export async function getDoctorByUserId(id) {
	let userId1 = id.toString();
	let doctorCollection = await doctors();
	const doctor = await doctorCollection.findOne({userId: userId1});
	if (!doctor) throw "Could not find doctor";
	doctor._id = doctor._id.toString();
	return doctor;
}

export async function getAllDoctors() {
  let doctorCollection = await doctors();
  let doctor = await doctorCollection.find({}).toArray();
  if(!doctor) throw "Could not find doctors"

  doctor._id = doctor._id.toString()
  return doctor
}

export async function addPatientToDoctor(docID, patientID ) {
	let doctorCollection = await doctors();
	if (!doctorCollection) throw "No Doctors found";

	let doctor = await getDoctorById(docID);
	if (!doctor) throw "no Doctor found";

	// Convert the existing patient list to a Set to ensure uniqueness
	let patientSet = new Set(doctor.patientList);
	// Add the new patient ID to the Set
	patientSet.add(patientID);

	// Convert the Set back to an array
	let newPatientList = Array.from(patientSet);

	let updatedDoctor = {
		userId: doctor.userId,
		name: doctor.name,
		docEmail: doctor.userEmail,
		patientList: newPatientList,
		sharedPatientList: doctor.sharedPatientList,
	};

	console.log("\n2 updatedDoctor", docID);
	let updated = await doctorCollection.findOneAndUpdate(
		{ _id: new ObjectId(docID) },
		{ $set: updatedDoctor }
	);
	console.log("2 out of set ", updated);
	if (!updated) throw "could not add patient to doctor";
	console.log("2");
	let doc = await getDoctorById(updated._id.toString());
	console.log("2");
	updated._id = updated._id.toString();
	console.log("3HERE: \n\n", updated);
	return updated;
}

export async function sharePatientToDoctor(docID, patientID) {
	let doctorCollection = await doctors();

	let doctor = await getDoctorById(docID);
	let newPatientList = doctor.sharedPatientList;
	newPatientList.push(patientID);

	let updatedDoctor = {
		userId: userId,
		name: doctor.name,
		docEmail: doctor.userEmail,
		patientList: doctor.patientList,
		sharedPatientList: newPatientList,
	};

	const updateInfo = await doctorCollection.replaceOne(	{_id: ObjectId(docID)},	updatedDoctor);

	if (!updateInfo.acknowledged || !updateInfo.insertedId) throw "could not add patient to doctor";

	const doc = await getDoctorById(updateInfo.insertedId.toString());
	doc._id = doc._id.toString();
	//console.log("4HERE: \n\n", doc);
	return doc;
}