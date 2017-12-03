import {observable, computed, action} from 'mobx';
import axios from "axios";


class NameStore {
    @observable first:'';
    @observable last:'';    
}

export default class UserStore {

    @observable currentData = {
        id: null,
        // reference: '',
        name: NameStore
        // age: null,
        // email: ''
    }
    @observable users;
    @observable user;
    @action setData(data) {
      this.users = data;
    }

    @action setSingle(data,id) {
      this.user = data[id];
    }
    // @observable data = [
    //     {
    //         reference: 1,
    //         name: 'Test 1'
    //     }, {
    //         reference: 2,
    //         name: 'Test 2'
    //     }
    // ];
    
    async fetchUsers() {
      let { data } = await axios.get(
        `./users.json`
      );
      console.log(data);
      data.length > 0 ? this.setData(data) : console.log("someth bad happened");
    }




    @computed get qtd() {
        return this.data.length;
    }

    
    getAll() {
        return this.data;
    }

    @action changeData(field, value) {
        this.currentData[field] = value;
    }
    @action changeName(field, value) {
        this.currentData.name[field] = value;
    }

    @action persistData() {
        if (this.currentData.id === null) { // new data
            this.data.push(this.currentData); // todo retirar id
        } else {
            this.data[this.currentData.id].name = this.currentData.name;
        }
        this.clearData();
    }

    @action removeData() {
        if (this.currentData.id !== null) { // new data
            this.data.splice(this.currentData.id, 1);
        }
        this.clearData();
    }

    @action clearData() {
        this.currentData = {
            id: null,
            name: {first:'',last:''}
        }
    }

    @action getDataById(id) {
        this.currentData = {
            id: id,
            // reference: this.data[id].reference,
            name: {
                first:this.data[id].name.first,
                last: this.data[id].name.last
        }

        }
    }

}
