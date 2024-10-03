class Invoice {
  constructor(
    id,
    firstName,
    lastName,
    email,
    city,
    region,
    date,
    status = "Pending"
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.city = city;
    this.region = region;
    this.date = date;
    this.status = status;
  }
}

export default Invoice;
