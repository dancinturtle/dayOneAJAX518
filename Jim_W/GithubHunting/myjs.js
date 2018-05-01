


function pasteDetails(res) {
    console.log(res)
    name = res["name"];
    id   = res["id"];
    avatar_url = res["avatar_url"]
    console.log("name: " + name)
    var html = "<h2>" + name + "</h2>" +
               "<img class=poke alt=no_pokemon" +
                 " src=\"" + avatar_url + "\">" +
               "<h3> id </h3>" +
               "<p>" + id + "</p>"
    console.log("name: " + name);
    $("#detailPanel").html(html); 
}

function getDetails() {
    id = 'j2willey'
    console.log("getDetails: " + id);
    $.get("https://api.github.com/users/" + id, pasteDetails, "json");
}


function drawPage() {
    // insert Group Period box
    console.log("1")
    $("#show").on("click", getDetails);    
}

$( document ).ready(drawPage)

