function Client()
{
  this.controller = new Controller();

  this.input = null;
  this.h1   = null;
  this.page = null;
  this.note = null;
  this.view = null;
  this.tips = null;
  this.hint = null;

  this.docs = {}

  this.start = function()
  {
    this.controller.add("default","*","About",() => { require('electron').shell.openExternal('https://github.com/hundredrabbits/Left'); },"CmdOrCtrl+,");
    this.controller.add("default","*","Fullscreen",() => { app.toggle_fullscreen(); },"CmdOrCtrl+Enter");
    this.controller.add("default","*","Hide",() => { app.toggle_visible(); },"CmdOrCtrl+H");
    this.controller.add("default","*","Inspect",() => { app.inspect(); },"CmdOrCtrl+.");
    this.controller.add("default","*","Documentation",() => { left.controller.docs(); },"CmdOrCtrl+Esc");
    this.controller.add("default","*","Reset",() => { left.theme.reset(); },"CmdOrCtrl+Backspace");
    this.controller.add("default","*","Quit",() => { left.project.quit(); },"CmdOrCtrl+Q");

    this.controller.add_role("default","Edit","undo");
    this.controller.add_role("default","Edit","redo");
    this.controller.add_role("default","Edit","cut");
    this.controller.add_role("default","Edit","copy");
    this.controller.add_role("default","Edit","paste");
    this.controller.add_role("default","Edit","delete");
    this.controller.add_role("default","Edit","selectall");

    this.controller.commit();

    this.h1 = document.getElementById("h1");
    this.page = document.getElementById("page");
    this.note = document.getElementById("note");
    this.view = document.getElementById("view");
    this.tips = document.getElementById("tips");
    this.hint = document.getElementById("hint");
    this.input = document.getElementById("input");

    // Events
    this.input.oninput = (key) => { this.update_hint(key); };
    this.input.onkeyup = (key) => { if(key.key == "Enter"){ this.validate(); } };

    this.query();
  }

  this.update_hint = function()
  {
    if(!this.input.value || this.input.value.length < 2){ this.hint.innerHTML = ""; return; }

    var query = this.input.value.split(" ")[0].toLowerCase();
    for(name in this.docs){
      var action = this.docs[name ]
      if(name == query){
        this.hint.innerHTML = `<t class='ghost'>${this.input.value}</t> ${action}`
        break;
      }
      if(name.substr(0,query.length) == query){
        this.hint.innerHTML = `<t class='ghost'>${query}</t>${name.substr(query.length)}`
        break;
      }      
    }
    
  }

  this.validate = function(value = this.input.value)
  {
    this.input.value = "";
    console.log("VALIDATE",value); 
  }

  this.query = function(id = 0,q = "")
  {
    this.update(parade.query(q))
  }

  this.update = function(response)
  {
    this.h1.innerHTML = response.sight.h1
    this.page.innerHTML = response.sight.page
    this.note.innerHTML = response.sight.note
    this.view.innerHTML = response.sight.view
    this.tips.innerHTML = response.sight.tips

    this.docs = response.docs

    this.update_hint();

    console.log(response)
  }
}