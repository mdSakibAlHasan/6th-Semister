import { db } from "./db.js";

export const getNotificationDetails = async (req, res) => {
    const originalArray = req.body.posts;

    const modifiedArray = await Promise.all(
        originalArray.map(async (item) => {
            try {
                const result = await findImageAndText(item.PostID);
                const postTime = result ? result.PostTime : null;
                const imageName = result ? result.Image : null;
                const text = result ? result.Text : null;
                return { ...item, Image: imageName, Text: text, PostTime: postTime };
            } catch (err) {
                // Handle errors here if needed
                console.error('Error getting name by UserID:', err);
                return { ...item, UserName: null }; // You can set a default value if an error occurs
            }
        })
    );

    //console.log('Modified Array:', modifiedArray);
    res.json(modifiedArray);
};



function findImageAndText(postID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Text, Image, PostTime FROM PostInfo WHERE PostID = ?';
        db.query(query, [postID], (err, result) => {
            if (err) {
                console.error('Error querying the database:', err);
                reject(err);
            } else if (result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(null); // Handle the case where no result is found for the given userID
            }
        });
    });
}



