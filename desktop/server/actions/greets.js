function Greets(host)
{
  require(`../action`).call(this,host,"greetings");

  this.docs = "Add a greetings to the current parent vessel, which become a character. WIP"

  this.operate = function(params)
  {
    var is_update = !this.host.parent().data.greetings ? false : true;

    this.host.parent().set("greetings",params)




    if(params == ""){

      return `<p><action>${this.host.parent().name()}</action> is now silent.</p>`
    }
    else if(is_update){



      return `<p>The greeting of <action>${this.host.parent().name()}</action> is changed!</p>`
    }


    return `<p>You gave <action>${this.host.parent().name()}</action> a voice. Hello <action>${this.host.parent()}</action> !</p>`
  }
}

module.exports = Greets
