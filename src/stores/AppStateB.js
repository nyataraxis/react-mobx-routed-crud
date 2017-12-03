import { observable, action, computed } from "mobx";
import axios from "axios";

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable items;
  @observable item;
  @observable usersFetched;
  
  @observable testval;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.users = [];
    this.items = [];
    this.item = {};
    this.usersFetched = false;
    this.testval = "Cobbled together by ";
  }

  async fetchData(pathname, id) {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com${pathname}`
    );
    console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  @computed get curId() {
    return 0;
  }

  async fetchUsers() {
     
        let { data } = await axios.get(
        `http://localhost:3000/users.json`
      );
        console.log(data);

        window.db = data;
        data.length > 0 ? this.setData(data) : {};
    /*}*/
  }
  async fetchUser(id) {
       let { data } = await axios.get(
        `http://localhost:3000/users.json`
      );
       data = data[id];
        console.log(data);
       window.db = data;
       data.length > 0 ? {} : this.setSingle(data,id);
  }

  @action setInit(data) {
    window.db = data;
    this.items = data;
    this.users = data;
    this.usersFetched = true;
  }



  @action setData(data) {
    this.items = data;
    //window.db = data;
  }

  @action setSingle(data,id) {
    //this.item = data[id];
    this.item = window.db[id];
    console.log(id);
   // this.item = window.db[id];
    //window.db = data;
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
    this.usersFetched = false;
  }

  @action authenticate() {
    return new Promise((resolve, reject) => {
      this.authenticating = true;
      setTimeout(() => {
        this.authenticated = !this.authenticated;
        this.authenticating = false;
        resolve(this.authenticated);
      }, 0);
    });
  }
}
