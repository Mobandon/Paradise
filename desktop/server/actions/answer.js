function Answer(host)
{
  require(`../action`).call(this,host,"answer");

  this.docs = 'Set a answer to a question. Syntax: "answer the_question = the_anwser". WIP'

  this.operate = function(params)
  {
    if(params.trim() == ""){ return `<p>Huh?! For more details on how to set usage, type <action data='help with answer'>help</action>.</p>`; }

    var parts = params.split("=")
    var question = parts[0].trim()
    var answer = params.replace(question,"").replace("=","").trim()

    if (this.host.parent().is_character()) {
      if(answer){
        this.host.parent().setanswer(question,answer)

        return `<p>You set the anwser of '${question}' to '${answer}'.</p>`
      }
      else{
        if (this.host.parent().data.answers[question]) {
          delete this.host.parent().data.answers[question];
          return `<p>Very well. I will forget the answer for the question '${question}'.</p>`
        }
        else {
          return `<p>I don't understand what I must say... Did you forget the "=" ?</p>`
        }

      }
    }
    else{
      return `<p>This is not a character! Please set a greeting with Greets first.</p>`
    }

  }
}

module.exports = Answer
