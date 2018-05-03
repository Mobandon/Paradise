function Talkto(host)
{
  require(`../action`).call(this,host,"talkto");

  this.docs = 'Listen to a vessel. WIP'

  this.operate = function(params)
  {
    if(params.trim() == ""){ return `<p>Huh?! For more details on how to set usage, type <action data='help with usage'>help</action>.</p>`; }

    var target = this.find(params,this.host.siblings());

    if(target){
      //this.host.move(target)
      //if (target.greetings()) {
        return `<p><action>${target.name()}</action>: ${target.greetings()}</p>`
      //}
      
    }
    else{
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Talkto
