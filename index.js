const firebase = require('firebase');
const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyAAvuA7BTJRVFRym3cRHHzwfPIM3NaCTP0",
    authDomain: "crwn-db-b2bb7.firebaseapp.com",
    databaseURL: "https://crwn-db-b2bb7.firebaseio.com",
    projectId: "crwn-db-b2bb7",
    storageBucket: "crwn-db-b2bb7.appspot.com",
    messagingSenderId: "281711477222",
    appId: "1:281711477222:web:7f1a80f4d9c5158ff89627" 
});

const cors = require("cors")

const express = require("express")

const bodyParser = require("body-parser")

const app = express()

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

app.use(cors())

app.listen(PORT, () => console.log(`Server running on port:${PORT}`))

//Load the dropdown
app.get("/api/loadData", async (req,res) => {
    // res.sendFile("./public/index.html",{ root: __dirname })
    let data = []
    let response = await firebaseApp.firestore().collection('playersData').get()
    response.forEach(item => data.push(item.data().name))
    res.json(data)
    
})

//Get the data for a specific query
app.post("/api/getData", async (req, res) => {
    let outputArray = []
    // console.log(req.body.value)
    let response = await firebaseApp.firestore().collection('playersData').where("name","==",req.body.value).get()
    response.forEach(item => outputArray.push(item.data()))
    res.json(outputArray)
})