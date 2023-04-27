
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')

const CORS = require('cors') 
//CORS IS CROSS ORIGIN REQUEST SHARING it is security policy which is required when we are making request of data or post data to api at other domian or other endppoint , 
//in Cors the origin must be same , if it has same origin it is okk


app.use(CORS({origin:'*'}))

app.use(express.json())//express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.

const dataFilePath = path.join(__dirname, 'data.json');


//post req
app.post("/add",(req,res)=>{

    fs.readFile(dataFilePath,(err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error reading data file');
          return;
        }
    
        let jsonData = JSON.parse(data);

        const newData = req.body;
         jsonData.push(newData);

         fs.writeFile(dataFilePath, JSON.stringify(jsonData), (err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error writing data file');
              return;
            }

             res.status(201).json(newData);
    
});
});
});



//get req 
app.get('/getimages',(req,res)=>{



    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
      
        // parse the JSON data
    
        const { page = 1, pageSize = 10 } = req.query;
        fs.readFile(dataFilePath, "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Error reading images file" });
          } else {
            const images = JSON.parse(data);
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedImages = images.slice(startIndex, endIndex);
            res.status(200).json(paginatedImages);
          }
      
   
})



})
})




app.listen(3003,()=>{

    console.log("hey MF hello")
})







