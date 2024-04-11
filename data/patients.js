import {patients} from "../config/mongoCollections.js"
import {connectToMongoDB} from '../config/mongoConnection.js'
import {ObjectId} from "mongodb";



const validatePatientArgs = (VARS, VAR_NAMES) =>{
  let errors = []

  for(let i = 0; i < VARS.length; i++){
    if(!VARS[i]){
      errors.push(`Field: ${VAR_NAMES[i]} missing! Please supply.`)
    }
  }
  if(errors.length > 0){
    //console.log(errors.toString()) //used to show example in test
    throw errors.toString()
  }
  return
}

const validateDateOfBirth = (date_of_birth) => {
  date_of_birth = new Date(date_of_birth)
  if(date_of_birth > new Date()){
    throw "Invalid Date of Birth"
  }
  return date_of_birth
}

export const createPatient = async (
  firstName,
  lastName,
  date_of_birth,
  race,
  sex,
  medical_history, 
  medications,
	suregon,
	sharedSuregon
) => {
  validatePatientArgs([firstName,lastName,date_of_birth,race,sex,medical_history,medications,	suregon,sharedSuregon],["firstName","lastName","date_of_birth","race","sex","medical_history","medications","suregon","sharedSuregon"])
  

  let patientCollection = await patients();

  date_of_birth = validateDateOfBirth(date_of_birth)
 

  
  let newPatient = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    date_of_birth: `${date_of_birth.toLocaleDateString()}`,
    race,
    sex,
    medical_history, 
    medications,
		suregon,
		sharedSuregon
  };

  let createInfo = await patientCollection.insertOne(newPatient);
  if(!createInfo.acknowledged || !createInfo.insertedId){throw "could not add user"}

  return createInfo.insertedId.toString();

};

export const editPatientNotes = async(
  id, 
  medical_history, 
  medications,
  notes
) => {
  let patientCollection = await patients();
  let patient = await patientCollection.findOne({_id: new ObjectId(id)})

  let updated = {...patient}
  updated.medical_history = medical_history
  updated.medications = medications
  updated.notes = notes

  console.log(updated)
  
  let update = await patientCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: updated});
    if(!update){throw "could not update patient"}
    update._id = update._id.toString();

    return update.value;

}

export const editPatientData= async (
    id,
    firstName,
    lastName,
    date_of_birth,
    race,
    sex,
    medical_history, 
    medications,
		suregon,
		sharedSuregon,
    notes
) => {
  validatePatientArgs([firstName,lastName,date_of_birth,race,sex,medical_history,medications,suregon,sharedSuregon],["firstName","lastName","date_of_birth","race","sex","medical_history","medications","suregon","sharedSuregon"])
  date_of_birth = validateDateOfBirth(date_of_birth)
   

    let patientCollection = await patients();
    let patient = await patientCollection.findOne({_id: new ObjectId(id)})

    if(!patient){
        throw "Patient does not exist"
    }

    let updatePatient = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    date_of_birth: `${date_of_birth.toLocaleDateString()}`,
    race,
    sex,
    medical_history, 
    medications,
		suregon,
		sharedSuregon,
    notes
    };

    let updated = await patientCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: updatePatient});
    if(!updated){throw "could not update band"}
    updated._id = updated._id.toString();

    return updated.value;


};


export async function getPatientById(id){
  let patientCollection = await patients();
  console.log(id)
  let patient = await patientCollection.findOne({_id: new ObjectId(id)})
  console.log(patient)
  if(!patient){
    throw "Could not find patient"
  }

  patient._id = patient._id.toString()
  return patient
}

// export async function getAllPatients(){
//   let patientCollection = await patients();
//   let patient = await patientCollection.find({})
//   if(!patient){
//     throw "Could not find patients"
//   }

//   patient._id = patient._id.toString()
//   return patient
// }

export async function getAllPatients(){
  let patientCollection = await patients();
  let patientList = await patientCollection.find({}).toArray();
  if(!patientList){
    throw "Could not find patients"
  }

  //patient._id = patient._id.toString()
  return patientList;
}

export async function getPatientsByBirthdate(birthdate){
  let startDate = new Date(birthdate)

  let patientCollection = await patients();
  let patientList = await patientCollection.find({date_of_birth: startDate.toLocaleDateString()})

  return patientList.toArray()
}

export async function getPatientsBySuregon(suregon) {
	let patientCollection = await patients();
	let patientList = await patientCollection.find({
		suregon: suregon
	});

	return patientList.toArray();
}

export async function editPatientSharedSuregon(id, newSharedSuregon) {
	console.log("HERE00");
	let sSuregon = newSharedSuregon.trim();

	let patientCollection = await patients();
	let patient = await patientCollection.findOne({_id: new ObjectId(id)})
console.log("HERE0");
	if(!patient){
			throw "Patient does not exist"
	}
console.log("HERE1");
console.log(patient);
	let updatePatient = {
		firstName: patient.firstName.trim(),
		lastName: patient.lastName.trim(),
		date_of_birth: patient.date_of_birth,
		race: patient.race,
		sex: patient.sex,
		medical_history: patient.medical_history,
		medications: patient.medications,
		suregon: patient.suregon,
		sharedSuregon: sSuregon,
	};
console.log("HERE2");
	let updated = await patientCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: updatePatient});
	if(!updated){throw "could not update band"}
	updated._id = updated._id.toString();
console.log("HERE");
	return updated.value;
}


// await connectToMongoDB()
// await createPatient("Kyle", "Boberg", "1/23/2013", "white", "M", "lots of history", "so many medications")
//await editPatientData("65f8dd398346b2df5287e970", "Kyle", "Boberg2", "1/25/2013", "white", "M", "lots of history", "so many medication 2")

// console.log(await getPatientsByBirthdate("1/23/2013"))