
// // google mvc...... this is basically a 'model'
// const util = require('util');
// const fs = require('fs')

// // this makes read and write async so we can do .then()
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

// const uuidv1 = require('uuid')
// // go to postman and test GET /api/notes try it in chrome
// class Store{
//     retrive() {
//         return readFileAsync("db/db.json", "utf8")
//     }
//     getNotes() {
//         // 'this' refers to this class, Store
//         return this.retrive().then(function (notes) {
//             let formatedNotes = [].concat(JSON.parse(notes))
//             return formatedNotes
//         })
//     }

    
// }
// // bruh
// module.exports = new Store();