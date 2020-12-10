import firebase, {firebaseConfig}  from './resources/firebase/firebase.mjs';

const database = {
    testCase: (req, res, next) => {
        res.status(200).json({
            body: 'Test Passed!'
        });
    },

    getFirebaseApiKey: (req, res, next) => {
        console.log(firebaseConfig.apiKey)
        res.status(200).json({
            keys: {
                firebaseApiKey: firebaseConfig.apiKey
            }
        })
    },

    createEntry: (req, res, next) => {
        const insertIntoDB = (dbID, entry) => {
            if(entry){
                return new Promise(async (resolve, reject) =>{
                        let docRef = firebase.firestore().collection(dbID).doc();
                        await docRef.set(entry)
    
                        resolve(docRef);
                })
            }
        }
        const params = req.query;

        if(params.dbId && params.entry){
            const dbId = JSON.stringify(params.dbId);
            const entry = JSON.parse(params.entry);
            
            console.log(entry)

            
            insertIntoDB(params.dbId, entry).then((docRef) => {
                res.status(200).json({
                    id: docRef.id
                })
            })
            
        }


    },

    removeEntry: (req, res, next) => {
        const dbRemoveEntry = (dbId, entryId) => {
            console.log('removing client')
            //remove root client
            if(dbId && entryId){
                firebase.firestore().collection(dbId).doc(entryId).delete();
            } else {
                console.error("proper ID's not passed to 'dbRemoveEntry'");
            }
        } 

        const params = req.query;

        if(params.dbId && params.entryId) {
            dbRemoveEntry(params.dbId, params.entryId);
            
            res.status(200).json({
                removed: true
            })
        }
    }
}

export default database;