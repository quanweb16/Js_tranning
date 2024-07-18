// Ví dụ về đối tượng trong JavaScript
let person = {
    name: "John Doe",
    age: 30,
    occupation: "Software Engineer"
  };
  
  console.log(person.name); // "John Doe"
  console.log(person["age"]); // 30
  
  person.email = "john.doe@example.com";
  delete person.occupation;
  
  console.log(person); // { name: "John Doe", age: 30, email: "john.doe@example.com" }