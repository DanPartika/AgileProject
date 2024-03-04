import assert from "assert";
import { doCreateUserWithEmailAndPassword, dosignInWithEmailAndPassword } from "../firebase/firebaseFunctions.js";
import axios from "axios";

describe('Log In', function () {
    describe('login route', function () {
      it('should return 404 error when email is not registered',async function () {
        let doTest = await axios.post("http://localhost:3000/login", {
                emailAddressInput: "fakeEmail@email.com",
                passwordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 404);
      });

      it('should return 400 error when email is not supplied',async function () {
        let doTest = await axios.post("http://localhost:3000/login", {
                emailAddressInput: "",
                passwordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it('should return 400 error when password is not supplied',async function () {
        let doTest = await axios.post("http://localhost:3000/login", {
                emailAddressInput: "fakeEmail@email.com",
                passwordInput: ""
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it('should return 404 error when password is incorrect',async function () {
        let doTest = await axios.post("http://localhost:3000/login", {
                emailAddressInput: "kwboberg2@gmail.com",
                passwordInput: "fakePassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 404);
      });

      it('should return status 200 when password is correct',async function () {
        let doTest = await axios.post("http://localhost:3000/login", {
                emailAddressInput: "kwboberg2@gmail.com",
                passwordInput: "test123"
        }, { validateStatus: false })
        assert.equal(doTest.status, 200);
      });
    });
  });


  describe('Sign Up', function () {
    describe('Sign Up route', function () {
      it('should return 400 error when email is not supplied',async function () {
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "",
                nameInput: "FakeName",
                passwordInput: "fakepassword",
                confirmPasswordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it('should return 400 error when password is not supplied',async function () {
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "fakeEmail@email.com",
                nameInput: "FakeName",
                passwordInput: "",
                confirmPasswordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it('should return 400 error when confirm password is not supplied',async function () {
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "fakeEmail@email.com",
                nameInput: "FakeName",
                passwordInput: "fakepassword",
                confirmPasswordInput: ""
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it('should return 400 error when name is not supplied',async function () {
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "fakeEmail@email.com",
                nameInput: "",
                passwordInput: "fakepassword",
                confirmPasswordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it('should return 400 error when email is not a valid email',async function () {
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "fakeEmail",
                nameInput: "Fake Name",
                passwordInput: "fakepassword",
                confirmPasswordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it("should return 400 error when the passwords don't match",async function () {
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "fakeEmail@email.com",
                nameInput: "Fake Name",
                passwordInput: "fakepassword1",
                confirmPasswordInput: "fakepassword2"
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it("should return 400 error when the user is already signed up",async function () {
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "kwboberg2@gmail.com",
                nameInput: "Fake Name",
                passwordInput: "fakepassword",
                confirmPasswordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 400);
      });

      it("should status 200 when the new credentials are valid",async function () { 
        //test will only be valid once, because it creates the user and thus will be a user who is already signed up afterwards.
        this.timeout(5000);
        let doTest = await axios.post("http://localhost:3000/signup", {
                emailAddressInput: "newUser@gmail.com",
                nameInput: "New User",
                passwordInput: "fakepassword",
                confirmPasswordInput: "fakepassword"
        }, { validateStatus: false })
        assert.equal(doTest.status, 200);
      });


    });
  });