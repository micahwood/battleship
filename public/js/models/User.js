function User(name) {
  this.name = name;
}

User.prototype.getName = function() {
  return this.name;
};