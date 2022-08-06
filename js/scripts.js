/*!
    * Start Bootstrap - dpro v6.0.2 (https://startbootstrap.com/theme/dpro)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-dpro/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    $('#audioframe').hide();
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });
})(jQuery); // End of use strict


$('#signbtn').click(function(){
    $('#signdiv').toggle('fast');
    $('#conconas').hide();
    $(".navbar-collapse").collapse("hide");
    $('#newsmag').css('z-index','1');
});

$('#onaudio').click(function(){
$('#audioframe').toggle();
$(".navbar-collapse").collapse("hide");
});


$('#clsaud').click(function(){
    $('#audioframe').hide();
    });
    
$('#onopcal').click(function(){
      $('#calcont').toggle();
      });

  $('#clcnas').click(function(){
    var hdelem = document.getElementById('conconas');
    if(hdelem.style.display =="block"){
      $('#conconas').hide();
      document.getElementById('clcnas').innerHTML = " << ";
    }
    else{
      $('#conconas').show();
      document.getElementById('clcnas').innerHTML = " >> ";
    }
      });
  ////////////////////////////////////////////

  var ur1= "https://script.google.com/macros/s/";
  var ur2 = "AKfycbzJAiZhlgd8X8TbMEXANxL-wgLBylCUPOYn3cZF-QaY33C_kx9MelRzJqqK8g7mV-C8";
  var urlv = ur1+ur2+'/exec';
var dtstr = new Date();
// var dtstr = date.toISOString();
// var dtstr = tois.substring(0, 10);
  inlivefrm.addEventListener('submit', (event)=>{
    document.getElementById('subinlv').disabled= true;
     liveond();
  })
function liveond(){
  var glid = $("#glddid").val(); 
  var ddid = $("#justpass").val(); 
  var url = urlv +"?callback=ldprevd&glid="+glid+"&ddid="+ddid+"&timestp="+dtstr+"&action=chinlv";
  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });
}
function ldprevd(e){
var res = e.records;
if(res!="ID not found!"){
  var cldata = res[0].Calender
document.getElementById('allsvevnt').value=cldata;
document.getElementById('subinlv').disabled= false;
$('#signdiv').hide();
$('#conconas').show();
$('#livfunc').show();
$('#newsmag').css('z-index','20000');
$('#onaudio').show();
}
else{
document.getElementById('subinlv').disabled= false;
}
getcalendar();
}


    /////////////////Calender////////////////

 function getcalendar() {
    var calendarEl = document.getElementById('calendar');
    var preevent =$('#allsvevnt').val();
    var elemev = preevent.split("{e},");
    var eventsup =[];
  for(var i=0;i<elemev.length-1;i+=3){
  var entry = {};
  entry.title = JSON.parse(elemev[i]);
  entry.start = JSON.parse(elemev[i+1]);
  entry.end= JSON.parse(elemev[i+2]);
  eventsup.push(entry);
  }
  
  var date = new Date();
  var tois = date.toISOString();
  var flcaldate = tois.substring(0, 10);
  var calendar = new FullCalendar.Calendar(calendarEl, {
  
      headerToolbar: {
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: flcaldate,
      navLinks: true, 
      weekNumbers: true,
      weekNumberCalculation: 'ISO',
      selectable: true,
      selectMirror: true,
      select: function(arg) {
        var title = prompt('Event Title:');
        if (title) {
          calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          })
        // console.log(title,arg.start,arg.allDay);
     var t = JSON.stringify(title);
     var s = JSON.stringify(arg.start.toISOString());
     var e = JSON.stringify(arg.end.toISOString());
     var k = "{e},";
     var evnt = t+k+s+k+e+k;
     var glid = $("#glddid").val(); 
     var ddid = $("#justpass").val(); 
           var ur1="https://script.google.com/macros/s/";
           var ur2 ="AKfycbzJAiZhlgd8X8TbMEXANxL-wgLBylCUPOYn3cZF-QaY33C_kx9MelRzJqqK8g7mV-C8";
           var url = ur1+ur2+"/exec" + "?callback=ctrlqevsv&glid=" + glid + "&ddid=" + ddid + "&event=" + evnt + "&action=upevnt";
           var request = jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp"
          });
        }
        calendar.unselect();
      },
      eventClick: function(arg) {
        if (confirm('Are you sure you want to delete this event?')) {
          arg.event.remove();
  var tt = JSON.stringify(arg.event.title);
  var st = JSON.stringify(arg.event.start.toISOString());
  var et = JSON.stringify(arg.event.end.toISOString());
  var kt = "{e},";
  var delitm = tt+kt+st+kt+et+kt;
  var glid = $("#glddid").val(); 
  var ddid = $("#justpass").val(); 
          var ur1="https://script.google.com/macros/s/";
           var ur2 ="AKfycbzJAiZhlgd8X8TbMEXANxL-wgLBylCUPOYn3cZF-QaY33C_kx9MelRzJqqK8g7mV-C8";
           var url = ur1+ur2+"/exec" + "?callback=ctrlqevrmv&glid=" + glid + "&ddid=" + ddid + "&event=" + delitm + "&action=rmvevnt";
          var request = jQuery.ajax({
           crossDomain: true,
           url: url,
           method: "GET",
           dataType: "jsonp"
         });
        }
      },
  
     // editable: true,
      dayMaxEvents: true, 
      events:eventsup
      
    });
  
    calendar.render();
  }
  
  function ctrlqevsv(e){
    liveond();}
  
  function ctrlqevrmv(e){
    liveond();}