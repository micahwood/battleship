function Game(gid) {
  this.user = '';
  this.gid = gid; 
}

Game.prototype.getGid = function() {
  return this.gid; 
};

Game.prototype.getUser = function() {
  return this.user;
};

Game.prototype.addUser = function(user) {
  this.user = user;
};