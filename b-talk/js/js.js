function zoommit(label){
    var list=document.getElementsByClassName("zoomon");
    list = [].slice.call(list); 
    var posofimg = list.indexOf(label);
    var srcimg = document.getElementsByClassName("zoomon")[posofimg].src;
    $('#enlrgimg').fadeIn();
    document.getElementById('emprimgenlrg').src= srcimg;
  }
  $("#enlrgimg").click(function() {
    $('#enlrgimg').hide();});
