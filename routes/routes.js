import { Router } from "express";

import { doCreateUserWithEmailAndPassword, doSignOut, dosignInWithEmailAndPassword } from '../firebase/firebaseFunctions.js'
import { getPatientById, getPatientsByBirthdate, createPatient } from '../data/patients.js';


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
  return res.render("login", { title: "Login", error: "" });
});

router.route("/signup").get(async (req, res) => {
  //make sure no cookie
  if (req.session.loggedIn) {
    return res.redirect("/home");
  }

  //return signup page
  return res.render("signup", { title: "Sign Up", error: "" });
});

router.route("/signup").post(async (req, res) => {
  const userInfo = req.body;

  if (
    !userInfo ||
    !userInfo.emailAddressInput ||
    !userInfo.passwordInput ||
    !userInfo.confirmPasswordInput | !userInfo.nameInput
  ) {
    return res
      .status(400)
      .render("signup", { title: "Sign Up", error: "Invalid Request" });
  }

  if (userInfo.passwordInput != userInfo.confirmPasswordInput) {
    return res
      .status(400)
      .render("signup", { title: "Sign Up", error: "Passwords must match" });
  }

  if (req.session.loggedIn) {
    //make sure no cookie
    return res.redirect("/home");
  }

  let user;
  try {
    user = await doCreateUserWithEmailAndPassword(
      userInfo.emailAddressInput,
      userInfo.passwordInput,
      userInfo.nameInput
    );
  } catch (e) {
    return res
      .status(400)
      .render("signup", { title: "Sign Up", error: String(e) });
  }

  //set cookie
  req.session.user = { name: user.user.displayName, id: user.user.uid };
  req.session.loggedIn = true;

  //return homepage
  return res.redirect("/home");
});

router.route("/login").post(async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  if (!userInfo || !userInfo.emailAddressInput || !userInfo.passwordInput) {
    return res
      .status(400)
      .render("login", { title: "Login", error: "Invalid Request" });
  }

  if (req.session.loggedIn) {
    //make sure no cookie
    return res.redirect("/home");
  }

  let user;
  try {
    user = await dosignInWithEmailAndPassword(
      userInfo.emailAddressInput,
      userInfo.passwordInput
    );
  } catch (e) {
    return res
      .status(400)
      .render("login", { title: "Login", error: String(e) });
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

  console.log(req.session.user);
  //return homepage
  return res.render("home", {
    title: "Home",
    error: "",
    name: req.session.user.name,
  });
});
router.route("/home2").get(async (req, res) => {
  //make sure  cookie
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  console.log(req.session.user);
  //return homepage
  return res.render("home2", {
    title: "Home2",
    error: "",
    name: req.session.user.name,
  });
});
router.route("/home3").get(async (req, res) => {
  //make sure  cookie
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  console.log(req.session.user);
  //return homepage
  return res.render("home3", {
    title: "Home3",
    error: "",
    name: req.session.user.name,
  });
});

router.route("/wireframe").get(async (req, res) => {
  //make sure  cookie
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  console.log(req.session.user);
  //return wireframe
  return res.render("wireframe", { title: "Home", error: "" });
});

router.route("/dataview").get(async (req, res) => {
    //make sure  cookie
    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }
  
    console.log(req.session.user);
    //return homepage
    return res.render("dataview", {
      title: "EEG Data View",
      error: "",
      name: req.session.user.name,
    });
  });


router.route("/patients/:sort").get(async (req, res) => {

  const validFlags = ["fname", "lname", "surgeon", "next_surgery"]

  let patients = [
    { 
      fname: "Charles",
      lname: "Canata",
      surgeon: "Dr. Bhatt",
      next_surgery: "3/11/2025"
    },
    { 
      fname: "Kyle",
      lname: "Boberg",
      surgeon: "Dr. Nicolosi",
      next_surgery: "3/12/2025"
    },
    { 
      fname: "Daniel",
      lname: "Partika",
      surgeon: "Dr. Meunier",
      next_surgery: "3/11/2026"
    }
  ] //Change to get from db once Bobe pushes his changes

  //Defaults the sorting to first name unless the flag is a valid flag
  let sortType = req.params.sort 
  if(!validFlags.includes(sortType)){
    sortType = "fname"
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

  let patients = [
    { 
      fname: "Charles",
      lname: "Canata",
      surgeon: "Dr. Bhatt",
      next_surgery: "3/11/2025"
    },
    { 
      fname: "Kyle",
      lname: "Boberg",
      surgeon: "Dr. Nicolosi",
      next_surgery: "3/12/2025"
    },
    { 
      fname: "Daniel",
      lname: "Partika",
      surgeon: "Dr. Meunier",
      next_surgery: "3/11/2026"
    }
  ] //Change to get from db once Bobe pushes his changes

  return res.render("patients", {
    title: "patients",
    error: "",
    patients,
  })
})

router.route('/patient/:id').get(async (req, res) => {
    if(!req.session.loggedIn){
        return res.redirect('/login')
    }

    let id = req.params.id

    console.log(id)

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
    return res.render("patientPage", patient);

})

router.route('/searchPatients').post(async (req, res) => {


    if(!req.session.loggedIn){
        return res.redirect('/login')
    }
    console.log(req.body)

    let birthdate = req.body.birthdate

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



export default router;
