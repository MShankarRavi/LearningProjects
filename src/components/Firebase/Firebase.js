import React from 'react';
import firebase from 'firebase';

var firebaseApp = firebase.initializeApp(
    {
        // Your web app's Firebase configuration

        apiKey: "AIzaSyAJUvoyuuu3uT-HLGyEEd_HN5bwPqHrDLY",
        authDomain: "react-contact-form-cad6d.firebaseapp.com",
        projectId: "react-contact-form-cad6d",
        storageBucket: "react-contact-form-cad6d.appspot.com",
        messagingSenderId: "131627634750",
        appId: "1:131627634750:web:903ae9bcfb11379576416f"


    });
var db = firebaseApp.firestore();
db.settings({timestampInSnapshots:true})
export {db};