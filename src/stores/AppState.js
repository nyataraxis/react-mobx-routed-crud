import { observable, action } from "mobx";
import axios from "axios";

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable items;
  @observable item;
  @observable pid;
  @observable testval;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.items = [];
    this.item = {};
    this.pid = null;
    this.testval = "Cobbled together by ";
  }

  async fetchData(pathname, id) {
    let { data } = await axios.get(
      `http://localhost:3000/users.json`
    );
    
    let pep = pathname.split('/').pop();
    pep = pep ? pep : '';
    console.log(data);
    console.log(pep);
    if(data){
      window.db = data;
//      window.db = data.map((reg, key) =>());
//      this.setData(data,pep);  
    }
    
  }

  @action refreshUsers() {
    this.items = window.db;
  }

  
  @action setData(data,pid) {
    this.items = data;
    this.item = data[pid];
  }
  @action initUsers(){
    this.items = window.db;
  }
  @action initUser(id) {
    this.item = window.db[id];
  }
  @action delItem(id){
    window.db.splice(id, 1);
    this.items = window.db;
  }
  @action setSingle(data) {
    this.item = data[0];
  }

  @action clearItems() {
    //this.items = [];
    this.item = {};
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
