import { Router } from "express";

import { doCreateUserWithEmailAndPassword, doSignOut, dosignInWithEmailAndPassword } from '../firebase/firebaseFunctions.js'
import { getPatientById, getPatientsByBirthdate, getAllPatients,getAllPatientsFromDoctorPatientList, createPatient, editPatientNotes } from '../data/patients.js';

import { dirname } from "path";
import xss from 'xss';
import { addPatientToDoctor, createDoctor, getDoctorByUserId } from "../data/doctor.js";
import { log } from "console";

// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname('./brainbrowser/examples');
__dirname += '/examples'


var sampleData

import fs from "fs";
import { read as readmat } from "mat-for-js";

fs.readFile("sampleData.mat", null, (err, data) => {
    sampleData = readmat(data.buffer);
    console.log(sampleData);
});

const router = Router();

router.route("/").get(async (req, res) => {
  res.redirect("login");
});

router.route("/login").get(async (req, res) => {
  //make sure no cookie
  if (req.session.loggedIn) {
    return res.redirect("/home");
  }

  //return login page
  return res.render("login", { title: "Login", layout: "nonav", error: "" });
});

router.route("/signup").get(async (req, res) => {
  //make sure no cookie
  if (req.session.loggedIn) {
    return res.redirect("/home");
  }

  //return signup page
  return res.render("signup", { title: "Sign Up", layout: "nonav", error: "" });
});

router.route("/signup").post(async (req, res) => {
  const userInfo = req.body;

  if (!userInfo ||  !userInfo.emailAddressInput ||  !userInfo.passwordInput ||  !userInfo.confirmPasswordInput | !userInfo.nameInput) {
    return res.status(400).render("signup", { title: "Sign Up", layout: "nonav", error: "Signup Failed!" });
  }

  if (userInfo.passwordInput != userInfo.confirmPasswordInput) {
    return res
      .status(400)
      .render("signup", { title: "Sign Up", layout: "nonav", error: "Passwords must match" });
  }

  if (req.session.loggedIn) {
    //make sure no cookie
    return res.redirect("/home");
  }

  let user;
  try {
    user = await doCreateUserWithEmailAndPassword(xss(userInfo.emailAddressInput),  xss(userInfo.passwordInput),  xss(userInfo.nameInput));
		
  } catch (e) {
		console.log(e);
    return res.status(400).render("signup", { title: "Sign Up", layout: "nonav", error: String(e) });
  }

  //set cookie
  req.session.user = { name: user.user.displayName, id: user.user.uid };
  req.session.loggedIn = true;
	let doctor = await createDoctor(req.session.user.id.toString(), req.session.user.name, userInfo.emailAddressInput);
  //return homepage
  return res.redirect("/home");
});

router.route("/login").post(async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  if (!userInfo || !userInfo.emailAddressInput || !userInfo.passwordInput) {
    return res.status(400).render("login", { title: "Login", layout: "nonav", error: "Login Failed!" });
  }

  if (req.session.loggedIn) {
    //make sure no cookie
    return res.redirect("/home");
  }

  let user;
  try {
    user = await dosignInWithEmailAndPassword(xss(userInfo.emailAddressInput),  xss(userInfo.passwordInput));
  } catch (e) {
    return res.status(400).render("login", { title: "Login", error: String(e) });
  }

  //set cookie

  req.session.user = { name: user.user.displayName, id: user.user.uid };
  req.session.loggedIn = true;

  //return homepage
  return res.redirect("/home");
});

router.route("/logout").get(async (req, res) => {
  //make sure cookie
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  await doSignOut();
  req.session.destroy();

  //return homepage
  return res.redirect("/login");
});

router.route("/home").get(async (req, res) => {
  //make sure  cookie
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
	let myPatients = []
	let sharedPatients = [];
	try {
		// console.log(req.session);
		let doctor = await getDoctorByUserId(req.session.user.id.toString())
		// console.log(doctor);
		let myPatients = await getAllPatientsFromDoctorPatientList(doctor.patientList); //returns a list of patients
		// console.log(myPatients);
		return res.render("home", {
			title: "Home",
			error: "",
			myPatients: myPatients,
			sharedPatients: sharedPatients,
			name: req.session.user.name,
		});
		
	} catch (error) {
		return res.render("home", {
			title: "Home",
			error: "No patients Found",
			myPatients: [],
			sharedPatients: sharedPatients,
			name: req.session.user.name,
		});
	}

  //console.log(req.session.user);
  //return homepage

});

router.route("/profile").get(async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  return res.render("profile", {name:req.session.user.name, user_title:"PLACE HOLDER", birthdate:"PLACE HOLDER", patients:["PLACE HOLDER"], surgeries:[{type:"EXAMPLE TYPE", date:"EXAMPLE DATE"}]})
})

router.route("/wireframe").get(async (req, res) => {
  //make sure  cookie
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  // console.log(req.session.user);
  //return wireframe
  return res.render("wireframe", { title: "Home", error: "" });
});

router.route("/dataview").get(async (req, res) => {
    //make sure  cookie
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
  
    // console.log(req.session.user);
    //return homepage
    return res.render("dataview", {
      title: "EEG Data View",
      error: "",
      name: req.session.user.name,
    });
  });


router.route("/patients/:sort").get(async (req, res) => {

  const validFlags = ["firstName", "lastName", "date_of_birth", "medications"]

  let patients = await getAllPatients();

  //Defaults the sorting to first name unless the flag is a valid flag
  let sortType = req.params.sort 
  if(!validFlags.includes(sortType)){
    sortType = "firstName"
  }

  //Sorts the patient array by the chosen flag
  patients = patients.sort((a,b) => {
    if (a[sortType] < b[sortType]) return -1
    else if (b[sortType] < a[sortType]) return 1
    else return 0
  })


  //Render the page with the sorted patients array
  return res.render("patients", {
    title: "patients",
    error: "",
    patients,
  })
})

//Does the same thing as the above route but without sorting
router.route("/patients").get(async (req, res) => {

  let patients = await getAllPatients();

  return res.render("patients", {
    title: "patients",
    error: "",
    patients: patients,
  })
})

router.route('/patient/:id').get(async (req, res) => {
    if(!req.session.loggedIn){
        return res.redirect('/login')
    }

    let id = req.params.id

    // console.log(id)

    if(!id){
        return res.status(400).json({"error": "Must supply id"})
    }

    let patient
    try{
        patient  = await getPatientById(id)
    }catch(e){
        return res.status(404).json({"error": e})
    }
		// console.log(patient);
    return res.render("patientPage", {patientData: patient, }); //eegData: sampleData.data.data

}).post(async (req, res) => { 
  if(!req.session.loggedIn){
    return res.redirect('/login')
  }

  let id = req.params.id

  // console.log(id)

  if(!id){
      return res.status(400).json({"error": "Must supply id"})
  }

  let history = xss(req.body.medicalHistory)
  let medications = xss(req.body.medications)
  let notes = xss(req.body.notes)
  // console.log(req.body)
try {
	let patient;
	// console.log(req.session);
	console.log("DANIEL", req.session.user.id);
	let doctor = await getDoctorByUserId(req.session.user.id.toString());
	let doc1;
	console.log("DAN HERE111111111");

	patient = await editPatientNotes(id, history, medications, notes);
	console.log(doctor);
	console.log("H1EREERERE", doctor._id, "\n", patient._id);
	console.log(patient);
	doc1 = await addPatientToDoctor(doctor._id, patient._id);
	console.log("DONE!");
	return res.redirect("/patient/" + id);
} catch (e) {
	return res.status(500).json({ error: e });
}
  

  
})

router.route('/searchPatients').post(async (req, res) => {


    if(!req.session.loggedIn){
        return res.redirect('/login')
    }
    // console.log(req.body)

    let birthdate = xss(req.body.birthdate);

    if(!birthdate){
        return res.status(400).json({"error": "Must supply birthdate"})
    }

    let patients
    try{
        patients  = await getPatientsByBirthdate(birthdate)
    }catch(e){
        return res.status(400).json({"error": e})
    }

    return res.json(patients)

})

//stuff so the brain works
router.route("/color-maps/spectral.txt").get(async (req, res) => {
  res.sendFile('color-maps/spectral.txt',  {root : __dirname})
});

router.route("/models/brain-surface.obj").get(async (req, res) => {
  res.sendFile('models/brain-surface.obj',  {root : __dirname})
});

router.route("/models/atlas-labels.txt").get(async (req, res) => {
  res.sendFile('models/atlas-labels.txt',  {root : __dirname})
});

router.route("/patient/models/cortical-thickness.txt").get(async (req, res) => {
  res.sendFile('models/cortical-thickness.txt',  {root : __dirname})
});

// router.route("/").get(async (req, res) => {
//   res.sendFile('',  {root : __dirname})
// });

// router.route("/").get(async (req, res) => {
//   res.sendFile('',  {root : __dirname})
// });

// router.route("/").get(async (req, res) => {
//   res.sendFile('',  {root : __dirname})
// });




export default router;
