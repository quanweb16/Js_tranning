// Ví dụ về object properties
const person = {
    name: "John Doe",
    age: 30,
    occupation: "Software Engineer"
  };
  
  console.log(person.name); // Output: "John Doe"
  console.log(person["age"]); // Output: 30
  
  person.city = "New York"; // Thêm một property mới
  delete person.occupation; // Xóa một property
  
  console.log(person); // Output: { name: 'John Doe', age: 30, city: 'New York' }