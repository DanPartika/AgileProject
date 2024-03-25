import {patients} from "../config/mongoCollections.js"
import {connectToMongoDB} from '../config/mongoConnection.js'
import {ObjectId} from "mongodb";

export const createPatient = async (
  firstName,
  lastName,
  date_of_birth,
  race,
  sex,
  medical_history, 
  medications
) => {
  if(!firstName||!lastName||!date_of_birth||!race||!sex||!medical_history||!medications){throw "Field(s) missing"};
  firstName = firstName.trim();
  lastName = lastName.trim();
  

  let patientCollection = await patients();

  date_of_birth = new Date(date_of_birth)
  if(date_of_birth > new Date()){
    throw "Invalid Date"
  }

  
  let newPatient = {
    firstName,
    lastName,
    date_of_birth: `${date_of_birth.toLocaleDateString()}`,
    race,
    sex,
    medical_history, 
    medications
  };

  let createInfo = await patientCollection.insertOne(newPatient);
  if(!createInfo.acknowledged || !createInfo.insertedId){throw "could not add user"}

  return createInfo.insertedId.toString();

};

export const editPatientData= async (
    id,
    firstName,
    lastName,
    date_of_birth,
    race,
    sex,
    medical_history, 
    medications
) => {
    if(!firstName||!lastName||!date_of_birth||!race||!sex||!medical_history||!medications){throw "Field(s) missing"};
    firstName = firstName.trim();
    lastName = lastName.trim();


    

    date_of_birth = new Date(date_of_birth)
    if(date_of_birth > new Date()){
        throw "Invalid Date"
    }

    let patientCollection = await patients();

    let patient = await patientCollection.findOne({_id: new ObjectId(id)})
    console.log(patient)
    if(!patient){
        throw "Patient does not exist"
    }

    let updatePatient = {
    firstName,
    lastName,
    date_of_birth: `${date_of_birth.toLocaleDateString()}`,
    race,
    sex,
    medical_history, 
    medications
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


export async function getPatientsByBirthdate(birthdate){
  let startDate = new Date(birthdate)

  console.log(startDate.toLocaleDateString())

  let patientCollection = await patients();
  let patientList = await patientCollection.find({date_of_birth: startDate.toLocaleDateString()})

  return patientList.toArray()
}


// await connectToMongoDB()
// await createPatient("Kyle", "Boberg", "1/23/2013", "white", "M", "lots of history", "so many medications")
//await editPatientData("65f8dd398346b2df5287e970", "Kyle", "Boberg2", "1/25/2013", "white", "M", "lots of history", "so many medication 2")

// console.log(await getPatientsByBirthdate("1/23/2013"))