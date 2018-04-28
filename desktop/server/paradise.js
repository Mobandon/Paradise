const Vessel = require('./vessel')

function Paradise()
{
  this.reset = function()
  {
    this.world = [
      new Vessel({name:"ghost",parent:1,owner:0,note:"Well, well, hello there."}),
      new Vessel({name:"library",parent:1,owner:0,note:"It's raining in the library, as it always did and ever will. "})
    ]
  }

  this.reset();

  this.import = function(json)
  {
    var a = []
    for(id in json){
      var vessel = new Vessel(json[id])
      a.push(vessel)
    }
    this.world = a;
  }

  this.export = function()
  {
    var a = []

    for(id in this.world){
      var json = this.world[id].to_json()
      a.push(json)
    }
    return JSON.stringify(a)
  }

  this.add = function(vessel)
  {
    console.log(`+ add ${vessel.name()}`)
    this.world.push(vessel)
    this.update()
  }

  this.query = function(id = 0,q = "look")
  {
    return this.ghost(id).cmd(q)
  }

  this.update = function()
  {
    // Connect IDs
    for(id in this.world){
      this.world[id].parade = this
      this.world[id].id = parseInt(id)
    }
  }

  this.ghost = function(id)
  {
    this.update()
    return this.world[id];
  }
}

module.exports = Paradise