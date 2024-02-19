const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK with the service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a Firestore reference
const db = admin.firestore();

// Define a function to generate dummy data
async function generateDummyData() {
  try {
    // Define your candidates and provinces
    const candidates = [
      'KvEbndXtda7WjnBL8jRE', // Amahle
      'OtR4tJSECIfcYOC1uSqe', // Cekiswa
      'TYyT29aBdL1K5GLo8FkZ', // Daniel
      'h6zHq79MbDiQYaz6LTom', // Derick
      'Ap93Hhq7vK31gBq8piGz', // Derick
      'C1ru5OkbisjepuaV1Zqg', // Sinaye
      'ZlOyUhIQf7dwMjawmki1', // Thabo
    ];

    const provinces = [
      'Eastern Cape',
      'Free State',
      'Gauteng',
      'KwaZulu-Natal',
      'Limpopo',
      'Mpumalanga',
      'North West',
      'Northern Cape',
      'Western Cape',
    ];

    // Create a batch object for efficient bulk writes
    const batch = db.batch();

    // Loop through the candidates and provinces to generate dummy data
    for (let i = 0; i < 60; i++) {
      const candidateId = candidates[i % candidates.length]; // Cycle through candidates
      const province = provinces[Math.floor(Math.random() * provinces.length)]; // Randomly select a province

      // Add the vote record to the batch
      batch.set(db.collection('votes').doc(), { candidateId, province });
    }

    // Commit the batch to Firestore
    await batch.commit();

    console.log('Dummy data generation completed.');

  } catch (error) {
    console.error('Error generating dummy data:', error);
  }
}

// Call the function to generate dummy data
generateDummyData();
