import express from 'express';
import exphbs from 'express-handlebars'
import session from 'express-session';
const app = express();
import configRoutes from './routes/index.js';
import cors from "cors";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { firebaseApp } from './firebase/firebaseConfig.js';
firebaseApp

const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    // let the next middleware run:
    next();
};

app.use(express.json());
app.use(cors());
app.use(rewriteUnsupportedBrowserMethods);
app.use(express.urlencoded({extended:false}));

app.use(
    session({
      name: 'AuthCookie',
      secret: "secret",
      user: {},
      loggedIn: false,
      error: {status: 200, message: ""},
      saveUninitialized: false,
      resave: false,
      cookie: {maxAge: 60000}
    })
);


app.use('/public', staticDir);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


configRoutes(app);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

