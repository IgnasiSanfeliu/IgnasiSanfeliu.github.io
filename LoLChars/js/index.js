//Init RegionalChars
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        loadRegionalChars();
    }
}

//onclick copyText
function copyText(chara){
console.log(chara);
var elm = document.getElementById(chara);
  if(document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(elm);
    range.select();
    document.execCommand("Copy");
  }
  else if(window.getSelection) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
  }
  document.getElementById("modal").style.display='block';
setTimeout(function(){ document.getElementById("modal").style.display='none'; }, 300);

}

//On change: RegionalChars.
function loadRegionalChars(){

	var xhttp = new XMLHttpRequest();
	var myUrl = "http://localhost/LoLChars/json/Chars.json";
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var region = document.getElementById("region").value;
		document.getElementById("title").innerHTML = "<h1>"+region+"</h1>";
		var chars = JSON.parse(this.responseText);
		for (i = 0; i < chars.length; i++) { 
		 if (region == chars[i].Region){
			var arraycharsregion=chars[i].Chars;
			document.getElementById("contentchars").innerHTML ="<div id='clipboard'></div>";
			document.getElementById("contentchars").innerHTML +="<div id='chardiv' align='center'></div>";
			document.getElementById("chardiv").innerHTML +="<h3 class='whitetext'>click to copy</h3><br>";
			for (x=0;x<arraycharsregion.length;x++ ){
				document.getElementById("clipboard").innerHTML += arraycharsregion[x] +" ";

				if (arraycharsregion[x] =='>'){
					document.getElementById("chardiv").innerHTML+="<div class='character'id='>' onclick=copyText(>) ><h1>"+arraycharsregion[x]+"</h1></div> ";
				}else{
				document.getElementById("chardiv").innerHTML+="<div class='character'id="+arraycharsregion[x]+" onclick=copyText('"+arraycharsregion[x]+"') ><h1>"+arraycharsregion[x]+"</h1></div> ";
				}
			}			
		   document.getElementById("chardiv").innerHTML+="<div style='float:left;height:200px;'></div>";
		 }
		
		}
		 
     }
    };
  xhttp.open("GET", myUrl );
  xhttp.send();
}

