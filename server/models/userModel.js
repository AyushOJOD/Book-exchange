class User {
  constructor(name, email, mobile, password, role) {
    this.id = Date.now(); // simple unique ID
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.role = role; // 'owner' or 'seeker'
  }
}

module.exports = User;
