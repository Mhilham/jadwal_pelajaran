import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCksetmQe_ec2BH6g5MKqQU_1K1U6htmww",
  authDomain: "data-7d32f.firebaseapp.com",
  projectId: "data-7d32f",
  storageBucket: "data-7d32f.appspot.com",
  messagingSenderId: "156748846014",
  appId: "1:156748846014:web:4269883b14bdb400b2dfef",
  measurementId: "G-W3SBB85TF1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarjadwal() {
  const refDokumen = collection(db, "jadwal");
  const kueri = query(refDokumen, orderBy("hari"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      jam: dok.data().jam,
      waktu: dok.data().waktu,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel
    });
  });

  return hasil;
}


export async function hapusjadwal(docId) {
  await deleteDoc(doc(db, "jadwal", docId));
};

export async function tambahjadwal(hari, jam, waktu, kelas, mapel ) {
  try {
    const dokRef = await addDoc(collection(db, "jadwal"), {
     hari: hari,
     jam: jam,
     waktu:waktu,
     kelas: kelas,
     mapel: mapel,
    
  
    });
    console.log('berhasil menambah data' + dok)
  } catch (e) {
    console.log('Gagal menambah data' + e);
  }
}
