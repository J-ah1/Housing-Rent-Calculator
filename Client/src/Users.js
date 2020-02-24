import './App.css';

// Notes: CORS disabled on ColdFusion (Solution: Disable the calling server?)

export function users(user) {
  
  function getUsers() {
    var names = []
    var request = new XMLHttpRequest();
    // NOTE BY JOSH: I set mine to 8500 as that's the default for me
    request.open("GET", "http://localhost:8500/db.cfc?method=retrieveUsers", false);
    request.send();
    var parser = new DOMParser()
    var xml = (parser.parseFromString(request.responseText, "text/xml"))
    var users = xml.getElementsByTagName("struct");
    for(let i = 0; i < users.length; i++){
      var data = users[i].getElementsByTagName("var");
      var obj = {
        username: data[0].textContent,
        password: data[1].textContent,
      }
      names.push(obj)
    }
    return(names)
  }

  function checkUsers(user) {
    var request = new XMLHttpRequest();
    request.open("GET", `http://localhost:8500/db.cfc?method=check&username=${user[0]}&password=${user[1]}`, false);
    request.send();
    console.log(request.responseText)
  }

  return(checkUsers(user))
  
}
