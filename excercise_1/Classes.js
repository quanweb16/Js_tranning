// Ví dụ về class
class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    }
  
    getOlder() {
      this.age++;
    }
  }
  
  const john = new Person("John Doe", 30);
  john.greet(); // Output: "Hello, my name is John Doe"
  john.getOlder();
  console.log(john.age); // Output: 31