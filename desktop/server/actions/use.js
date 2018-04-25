function Use(host)
{
  require(`../action`).call(this,host,"use");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      this.host.cmd(target.data.program)
    }
    else{
      console.log(`! missing ${params}`)
    }
  }
}

module.exports = Use