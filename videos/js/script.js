
var vidset =[
"bdhyr",
"jnlbt",
"sised",
"oholw",
"artde",
"tinbo",
"labre",
"dhdhr",
"hmiss"];
function thisvid(label){
    var elem = document.getElementsByClassName('setvid');
    elem = [].slice.call(elem);
    var pos = elem.indexOf(label);
    var ln = "v/?vsrc="+vidset[pos]+"&q=true";
    window.open(ln,'_self')
    }