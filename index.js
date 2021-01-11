// API
//https://dog.ceo/api/breed/${race}/images/random

const fs = require('fs');
const superagent = require('superagent');

const promiseReader = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, result) => {
      if (err) reject(`I could not find that file 💥`);
      resolve(result);
    });
  });
};

const promiseWriter = (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, err => {
      if (err) reject(`Could not write file 💥`);
      resolve('Success');
    });
  });
};

// CALLBACK HELL

// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, race) => {
//   if (err) return console.log(err);
//   console.log(`Breed: ${race}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${race}/images/random`)
//     .end((err, result) => {
//       if (err) return console.log(err);
//       console.log(result.body.message);
//       fs.writeFile(`${__dirname}/output.txt`, result.body.message, (err, _) => {
//         if (err) return console.log(err);
//         console.log('Ramdom image saved successfully');
//       });
//     });
// });

// PROMISE

// promiseReader(`${__dirname}/dog.txt`)
//   .then(race => {
//     console.log(`Breed: ${race}`);
//     return superagent.get(`https://dog.ceo/api/breed/${race}/images/random`);
//   })
//   .then(result => {
//     console.log(result.body.message);
//     return promiseWriter(`${__dirname}/output.txt`, result.body.message);
//   })
//   .then(() => console.log('Ramdom image saved successfully'))
//   .catch(err => console.log(err));

// ASYNC/AWAIT

// const getDogPicture = async nbDogs => {
//   try {
//     const race = await promiseReader(`${__dirname}/dog.txt`);
//     console.log(`Breed: ${race}`);
//     const result = await superagent.get(
//       `https://dog.ceo/api/breed/${race}/images/random`
//     );
//     const image = result.body.message;
//     console.log(image);
//     await promiseWriter(`${__dirname}/output.txt`, image);
//     console.log('Ramdom image saved successfully');
//   } catch (error) {
//     throw error;
//   }
//   return '2: Done 🐶';
// };

const getDogPicture = async nbDogs => {
  try {
    const race = await promiseReader(`${__dirname}/dog.txt`);
    console.log(`Breed: ${race}`);
    let results = [];
    for (let i = 0; i < nbDogs; i++) {
      results.push(
        superagent.get(`https://dog.ceo/api/breed/${race}/images/random`)
      );
    }
    const all = await Promise.all(results);
    const images = all.map(el => el.body.message);
    console.log(images);
    await promiseWriter(`${__dirname}/output.txt`, images.join('\n'));
    console.log('Ramdom image saved successfully');
  } catch (error) {
    console.log(error);
    throw error;
  }
  return '2: Done 🐶';
};

// console.log('1: Will get dog pics !');
// getDogPicture()
//   .then(res => {
//     console.log(res);
//     console.log('3: Done getting dog pics !');
//   })
//   .catch(err => console.log(`Error: ${err} 💥`));

(async () => {
  try {
    console.log('1: Will get dog pics !');
    const res = await getDogPicture(3);
    console.log(res);
    console.log('3: Done getting dog pics !');
  } catch (error) {
    console.log(`Error: ${error} 💥`);
  }
})();
