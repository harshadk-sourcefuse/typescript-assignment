import { Role } from "../Constants";
import { User } from "../interface/User";
import 'reflect-metadata';

const formatDate = () => {
  return (target: any, propertyKey: string | symbol) => {
    // var value = descriptor.value.apply(this);
    console.log(this, target.constructor, propertyKey, target.constructor[propertyKey])
    // if(value){
    //     descriptor.value = () => {
    //       var date = new Date(value);
    //       return [date.getDate(), date.g ̰etMonth()+1, date.getFullYear()].join("-");
    //     };
    // }
    let value: string;
    const getter = function () {
      return value;
    };
    const setter = function (newVal: string | Date) {
      if (newVal instanceof Date) {
        var date = new Date(newVal);
        value = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("-");
      }
    }
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    });
  };
}

export class UserModel<T, U> implements User<T, U>{
  id!: U;
  firstName!: T;
  middleName!: T;
  lastName!: T;
  email!: T;
  phoneNumber!: T;
  address!: T;
  role!: Role;
  currentState?: UserModel<T, U>;
  @formatDate()
  createdOn?: Date;
  modifiedOn?: Date;

}