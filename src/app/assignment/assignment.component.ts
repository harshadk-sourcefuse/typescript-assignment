import { Component, OnInit } from '@angular/core';
import { UserModel } from '../shared/class/UserModel';
import { Constants , Role } from '../shared/Constants';
import { User } from '../shared/interface/User';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  state:any = {
    0: "Load Data",
    1: "Refresh Data"

  }
  currentState:number = 0;
  users:User<String,Number>[] = [];
  roles:string[] = Object.values(Role);
  constructor() { }

  ngOnInit(): void {
    this.currentState = 0;
  }

  loadInitialData(){
    if(this.currentState == 0)
      this.currentState = 1;
    this.users = Constants.Default_Users.map( user=> ((<any>Object).assign(new UserModel(), user)));
    
  }

  editUser(userToEdit:User<String,Number>){
    delete userToEdit.currentState;
    userToEdit.currentState = {...userToEdit};
  }

  cancelEditUser(userToEdit:User<String,Number>){
    this.users =  this.users.map(user=> {
      if(user.id === userToEdit.id && userToEdit.currentState){
        user = ((<any>Object).assign(new UserModel(), userToEdit.currentState));
        delete user.currentState;
      } return user;
    });
    console.log(this.users)
  }

  saveUserDetails(user:User<String,Number>){
    if(user.email && user.role && user.firstName){
      delete user.currentState;
    }
  }

  deleteUser(userToDelete:User<String,Number>){
    this.users = this.users.filter(user=> user.id !==userToDelete.id);
  }
}
