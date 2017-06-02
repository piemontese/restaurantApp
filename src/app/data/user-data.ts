export class UserData {
  constructor( private name: string, private firstName: string, private lastName: string, private type: string, private isLogged: boolean, private typeDescription: string ) {}
  
  getName() {
    return this.name;
  }
  
  getFirstName() {
    return this.firstName;
  }
  
  getLastName() {
    return this.lastName;
  }
  
  getType() {
    return this.type;
  }
  
  getIsLogged() {
    return this.isLogged;
  }
  
  getTypeDescription() {
    return this.typeDescription;
  }
  
  getData() {
    return this;
  }
  
  unset() {
    this.name = "";
    this.firstName = "",
    this.lastName = "";
    this.type = "",
    this.isLogged = false;
    this.typeDescription = "";
  }
  
}
