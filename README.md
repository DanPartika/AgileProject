# Presurgical Epilepsy Evaluation Platform

A web application that surgeons can use to evaluate their patients brain before conducting a operation. 

## Description

Construct a presurgical epilepsy evaluation system by pinpointing sources of brain activity using EEG data and rendering a 3D visualization of the brain. Build a user-friendly application that will be convenient for surgeons to use and aid in their decision-making. We will develop a user-friendly experience through features such as its simple yet intuitive visual interface and an easy-to-navigate UX. We aim to give surgeons/doctors a more hands-on experience through our 3D model which wouldn’t be possible through the typical EEG report/data that they normally receive. Our solution will be a data-driven visual experience for the surgeons to better comprehend patient brain activity data and make it easier to make more informed decisions/diagnoses about surgical procedures for epilepsy patients. A key feature will be the surgeons' ability to highlight certain parts of the brain in different colors to more easily differentiate portions of the brain that they should focus more on. This in turn will lead to faster and more efficient analysis of data for the surgeons, improving the rate at which they can provide care.

### How to Run

1. Clone the repository using git or download a zip of it and then install the needed packages using:
```
npm install
```

2. Next you can run the program using the following command in a terminal:
```
npm start
```

## Authors

 * Daniel Partika
 * Rohan Balani
 * Kyle Boberg
 * Susan McAloon
 * Charles Canata
 * Daniel Kang

## Version History

* 1.0
    * Initial Release
    * Basic website with login/signup features
    * Shows a basic template of what future sprints will aim to complete
* 2.0
    * Create different pages (with navigation bar) to organize where data will be displayed (i.e. patient data, visualization, profile data)
    * Create Patient Search functionality
    * Further integrate a CI/CD pipeline/workflow file for further functionality
    * Add ability & routes to search for patients via different filters (First Name, Last Name, Surgery Date, Surgeon)
    * Get EEG visualization set up on personal machines for future integration to web app
    * Streamline access to patient data right after sign-in

* 3.0
    * Interactive 3D rendering a brain scan integrated in app
    * “Medical History” and additional “Notes Display” display and uploading functionality added
    * Surgeons can now view patient information like DOB, Race, Sex, Medical History, and Additional Notes as well as the option to save additional history/notes info
    * Further integrate a CI/CD pipeline/workflow file for further functionality
    * EEG patient dataset selected to use for brain model
    * Incremental/minor UI/UX additions to enhance user readability/display


