
var vidset =[
"bdhyr",
"jnlbt",
"sised",
"oholw",
"artde",
"tinbo",
"labre",
"dhdhr"];
function thisvid(label){
    var elem = document.getElementsByClassName('setvid');
    elem = [].slice.call(elem);
    var pos = elem.indexOf(label);
    console.log(pos); 
    var ln = "v/?vsrc="+vidset[pos]+"&q=true";

    console.log(ln);
    window.open(ln,'_self')
    }