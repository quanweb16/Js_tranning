// Ví dụ về object methods
const person = {
    name: "John Doe",
    age: 30,
    greet: function() {
      console.log(`Hello, my name is ${this.name}`);
    },
    getOlder: function() {
      this.age++;
    }
  };
  
  person.greet(); // Output: "Hello, my name is John Doe"
  person.getOlder();
  console.log(person.age); // Output: 31