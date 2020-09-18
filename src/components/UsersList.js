import React, { Component } from "react";
import firebase from "../firebase/config";

var db = firebase.firestore();
// Truy vấn 3 document đầu tiên có "age" lớn hơn 20 và sắp xếp theo "age"
db.collection("users")
  .orderBy("age")
  .startAt(19)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      inputName: "",
      inputAge: NaN,
      lastUser: null,
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        var data = doc.data();
        data.id = doc.id;
        data.doc = doc;
        users.push(data);
      });
      this.setState({ users });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]:
        event.target.id === "inputAge"
          ? parseInt(event.target.value)
          : event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    db.collection("users")
      .add({
        name: this.state.inputName,
        age: this.state.inputAge,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  removeUser(item) {
    db.collection("users")
      .doc(item.id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  async getCities() {
    var nextSnapshot;
    var firstSnapshot;
    var users = [];
    if (this.state.lastUser === undefined) return false;
    if (!this.state.lastUser) { //Điều kiện nếu chưa có user cuối cùng
      //Truy vấn 2 user đầu tiên 
      var first = db.collection("users").orderBy("name").limit(2);
      firstSnapshot = await first.get();
      this.setState({
        //Lấy user cuối cùng
        lastUser: firstSnapshot.docs[firstSnapshot.docs.length - 1],
      });

      firstSnapshot.docs.forEach((doc) => {
        var data = doc.data();
        data.id = doc.id;
        data.doc = doc;
        users.push(data);        
      });
      this.setState({
        users: users,
      });
    } else {
      //Lấy những user tiếp theo bằng cách truyền lastUser vào phương thức startAfter()
      var next = db
        .collection("users")
        .orderBy("name")
        .startAfter(this.state.lastUser)
        .limit(2);
      nextSnapshot = await next.get();
      this.setState({
        lastUser: nextSnapshot.docs[nextSnapshot.docs.length - 1],
      });
      nextSnapshot.docs.forEach((doc) => {
        var data = doc.data();
        data.id = doc.id;
        data.doc = doc;
        users.push(data);
      });
      this.setState(state=>{
        return {
          users: [
            ...state.users,
            ...users
          ]
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <button onClick={() => this.getCities()}>get cities</button>
          <div className="left">
            <h2>Add user</h2>
            <form action="#" onSubmit={(event) => this.handleSubmit(event)}>
              <label htmlFor="inputName">Name </label>
              <input
                type="text"
                className="name"
                id="inputName"
                onChange={(event) => this.handleChange(event)}
              />
              <br />
              <br />
              <label htmlFor="inputAge">Age </label>
              <input
                type="number"
                className="name"
                id="inputAge"
                onChange={(event) => this.handleChange(event)}
              />
              <br />
              <br />
              <button>Add</button>
            </form>
          </div>
          <div className="right">
            <h2>User List</h2>
            {this.state.users &&
              this.state.users.map((item, index) => {
                return (
                  <div key={index}>
                    <span>
                      {item.name}
                      {"   "}
                    </span>
                    <button
                      onClick={() => {
                        this.removeUser(item);
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
