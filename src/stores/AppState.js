import { computed, observable, action } from "mobx";
import axios from "axios";

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable items;
  @observable isNew;
  @observable item;
  @observable pid;
  @observable testval;
  @observable saved;
  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.items = [];
    this.item = {};
    this.saved = false;
    this.isNew = false;
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

  @action changeUser(field, val, id) {
      if(this.isNew){
        this.item[field] = val;
      } else {
      window.db[id][field] = val;
      this.item[field] = val;
    }
  }
  @action changeUserName(field, val, id) {
      if(this.isNew){
        this.item.name[field] = val;
      } else { 
        window.db[id].name[field] = val;
      this.item.name[field] = val;
    }
  }

  @action saveUser() {
      if(this.isNew){

        this.items.push(this.item);
        window.db.push(this.item);
      } 
      this.saved = true;
  }

  @computed get guidGen() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }
  @action setData(data,pid) {
    this.items = data;
    this.item = data[pid];
  }
  @action initUsers(){
    this.items = window.db;
  }
  @action initUser(id) {
    if(window.db[id]){
      this.item = window.db[id];
      this.isNew = false;
    } else {
      let gu = this.guidGen;
      this.isNew = true;
      this.item = {
      guid: gu,
      name: {first:'', last:''},
      email: '',
      age: 0
      }
    }
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
    this.isNew = false;
    this.saved = false;
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
