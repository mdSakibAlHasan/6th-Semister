import { db } from "../db.js";
import multer from "multer";

// Create a MySQL connection


// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

export const setProfileInfo = async (req, res, next) => {
    try {
      upload.single("file")(req, res, (err) => {
        const {
          text
        } = req.body;
        //console.log(Name,fatherName,motherName, birthDate,gender,nationalId,researchExperienceList, thesisSupervisionList, professionalAffiliationList,Orchidlink,GoogleScholarlink,ResearchGateLink);
  
        if (err instanceof multer.MulterError) {
          console.log(err);
          return res.status(400).json({ error: "Multer error" });
        } else if (err) {
          // Handle other errors
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        const path = req.file.filename;
        console.log(req.file,"///////",path);
        // const querey = `UPDATE bcsir.researcher
        // SET Name = '${Name}',
        //     fatherName = '${fatherName}',
        //     motherName = '${motherName}',
        //     birthDate = '${birthDate}',
        //     gender = '${gender}',
        //     nationalId = '${nationalId}',
        //     ResearchExperience = '${researchExperienceList}',
        //     ThesisSupervision = '${thesisSupervisionList}',
        //     ProfessionalAffiliation = '${professionalAffiliationList}',
        //     Orchidlink = '${Orchidlink}',
        //     GoogleScholarlink = '${GoogleScholarlink}',
        //     ResearchGateLink = '${ResearchGateLink}',
        //     Photo = '${path}'
        // WHERE ID = ${ID};`;
        // console.log(querey);
        // db.query(querey, (err, data) => {
        //   if (err) {
        //     console.log("Err to update data");
        //     return res.status(400).json("Something happend to update data");
        //   }
        //   // else{
        //   //   return res.status(200).json("data update successfully")
        //   // }
        // });
  
        //res.status(200).json({ message: "Data stored successfully" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
// Route to handle the POST request
export const createPost = async (req, res) =>{
    console.log("here are post");
    const { text } = req.body;
    const file = req.file;
    console.log(text,"++++++++++++", file);
    if (!text || !file) {
      return res.status(400).json({ message: "Text or file are required." });
    }
    
    console.log(text,"++++++++++++", file);
    // Store the text and file information in the database
    // const query = "INSERT INTO posts (text, image) VALUES (?, ?)";
    // db.query(query, [text, file.path], (error, results) => {
    //   if (error) {
    //     console.error("Error storing post in the database: ", error);
    //     return res.status(500).json({ message: "Internal server error." });
    //   }
  
    //   return res.status(200).json({ message: "Post stored successfully." });
    // });
}
// app.post("/edit/setProfileInfo", upload.single("file"), (req, res) => {
//   const { text } = req.body;
//   const file = req.file;

//   if (!text || !file) {
//     return res.status(400).json({ message: "Text and file are required." });
//   }

//   // Store the text and file information in the database
//   const query = "INSERT INTO posts (text, image) VALUES (?, ?)";
//   db.query(query, [text, file.path], (error, results) => {
//     if (error) {
//       console.error("Error storing post in the database: ", error);
//       return res.status(500).json({ message: "Internal server error." });
//     }

//     return res.status(200).json({ message: "Post stored successfully." });
//   });
// });

