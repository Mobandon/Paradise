function Ask(host)
{
  require(`../action`).call(this,host,"ask");

  this.docs = '"ask Character Question":Answer a question. "ask Character" List all the questions available. WIP'

  this.operate = function(params)
  {
    if(params.trim() == ""){ return `<p>Huh?! For more details on how to set usage, type <action data='help with ask'>help</action>.</p>`; }


    var parts = params.split(" ")
    var tar = parts[0]
    var target = this.find(tar,this.host.siblings());
    var question = params.replace(tar,"").trim();


    if(target){
      if (target.is_character()) {
        var dial = ``;

        if (question) {
          dial += `<p>About ${question}:<p>`
          //dial += `<p><action>${target.name()}</action>: Answer the question ${question}</p>`;
          if (target.answer(question)) {
            dial += `<p><action>${target.name()}</action>: ${target.answer(question)}</p>`;
          }
          else {
            dial += `<p><action>${target.name()}</action>: I don't know the answer... Sorry!</p>`;
          }
        }
        else {
          dial += `<p><action>${target.name()}</action>: ${target.greetings()}</p>`;

          if (target.data.answers) {
            dial += `<p>Ask for...<ol>`
            for (var i in target.data.answers) {
              dial += `<li>-${i}</li>`;
            }
            dial += `</ol></p>`
          }
          else{
            dial += `<p>No answers given ! Use the Answer command inside the character.</p>`
          }

          //dial += `<p>List of all the questions</p>`;
        }

        return dial
      }
      else{
        return `<p>${target.name()} is not a character! Please set a greeting with Greets first.</p>`
      }
    }
    else{
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Ask
