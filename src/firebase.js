import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyATM473PXUS4ynZ-FKlF2r1jbphntWnHZc",
  authDomain: "fsplagos.firebaseapp.com",
  databaseURL: "https://fsplagos-default-rtdb.firebaseio.com",
  projectId: "fsplagos",
  storageBucket: "fsplagos.appspot.com",
  messagingSenderId: "778401776777",
  appId: "1:778401776777:web:ed8ec3d53ed3064716b258",
  measurementId: "G-1BBNVVHVXZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseDB = firebase.database()
export const firebaseAuth = firebase.auth()
export const firebaseStorage = firebase.storage()



// firebaseDB.ref().child('plans').set({
//   p_300k: [12540,25080,80370,80370,80370,80370,80370,160530],
//   p_400k: [25080,39620,104200,104200,104200,104200,104200,214300],
//   p_450k: [25080,42370,108870,108870,108870,108870,108870,288200],
//   p_38k:  [4180, 8740, 12860, 12860, 12860, 12860, 12860, 12860, 24920],
//   p_50k: [6270, 8740, 12500, 12500, 12500, 12500, 12500, 22190],
//   p_70k: [8740, 12860, 22990, 22990, 22990, 22990, 22990, 22990, 50460],
//   p_100k: [6270, 12860, 25270, 25270, 25270, 25270, 25270, 54520],
//   p_140k: [8740, 15880, 42990, 42990, 42990, 42990, 42990, 42990, 117460],
//   p_150k: [10545, 14820, 37500, 37500, 37500, 37500, 37500, 87135],
//   p_200k: [10545, 15770, 49970, 49970, 49970, 49970, 49970, 123835],
//   p_210k: [9310, 18620, 68970, 68970, 68970, 68970, 68970, 68970, 168250],
//   p_250k: [12350, 17290, 73000, 73000, 73000, 73000, 73000, 105360],
//   p_280k: [13490, 27360, 81830, 81830, 81830, 81830, 81830, 81830, 193170],
//   p_350k: [22890, 35245, 97280, 97280, 97280, 97280, 97280, 155465],
//   p_420k: [13490, 27360, 99510, 99510, 99510, 99510, 99510, 99510, 218090],
//   p_490k: [27360, 50100, 117305, 117305, 117305, 117305, 117305, 117305, 218710],
//   p_500k: [24700, 34580, 146000, 146000, 146000, 146000, 146000, 210720],
//   p_700k: [46170, 66120, 175370, 175370, 175370, 175370, 175370, 410860],
//   p_750k: [50160, 78660, 187720, 187720, 187720, 187720, 187720, 432580]
// })
 