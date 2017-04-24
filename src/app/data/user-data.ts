export class UserData {
  constructor( private name: string, private firstName: string, private lastName: string, private type: string ) {}
  
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
  
  getData() {
    return this;
  }
  
}
