// Ví dụ về scope của biến
let globalVariable = "I am global";

function myFunction() {
  let localVariable = "I am local";
  console.log(globalVariable); // Output: "I am global"
  console.log(localVariable); // Output: "I am local"
}

myFunction();
console.log(globalVariable); // Output: "I am global"
console.log(localVariable); // Error: localVariable is not defined