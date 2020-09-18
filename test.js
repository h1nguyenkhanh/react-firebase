var db = firebase.firestore();
 
// Truy vấn tất cả các document có "age" lớn hơn hoặc bằng 19
db.collection("users").orderBy("age").startAt(19)