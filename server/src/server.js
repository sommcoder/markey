require("dotenv").config();

// Firebase Sign-in
// var firebase = require("firebase");
// var firebaseui = require("firebaseui");

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// var uiConfigObj = {
//   callbacks: {
//     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function () {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById("loader").style.display = "none";
//     },
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: "popup",
//   signInSuccessUrl: "<url-to-redirect-to-on-success>", // this will need to be the url for the client code
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//   ],
//   // // Terms of service url.
//   // tosUrl: "<your-tos-url>",
//   // // Privacy policy url.
//   // privacyPolicyUrl: "<your-privacy-policy-url>",
// };

// // render the FirebaseUI Auth interface:
// ui.start("#firebaseui-auth-container", uiConfigObj);

const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

const PORT = process.env.PORT || 5000;
const DOMAIN = process.env.DOMAIN || "localhost";

// enable CORS
fastify.register(cors, {
  "Access-Control-Allow-Origin": DOMAIN,
});

// Registered Routes:
fastify.register(require("./routes/characters"), { prefix: "api/v1" });

fastify.listen({ port: PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log(`Fastify server is listening on port ${PORT}`);
    // test();
  }
});
