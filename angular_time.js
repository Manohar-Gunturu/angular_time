(function() {
  'use strict';

  angular.module('rstime', [])
    .directive('rsTime', ['$interval', '$filter',
      function($interval, $filter) {
        return clock($interval, $filter);
      }
    ]);

  function clock($interval, $filter) {
    return {
      restrict: 'EA',
      scope: {
        live: '=isLive',
        digitalFormat: '=digitalFormat',
        value: '=startTime',
        diff: '=diff'
      },
      template: '<div class="digital"><span>{{digital}}</span></div>',
      link: function(scope, element, attrs){
          var config = {};
          config.formate = scope.digitalFormat || 'hh:mm a';
          config.value = scope.value;
          config.diff= scope.diff || false;
          scope.digital = logicC(config);
          if(scope.live){
            $interval(function(){
               scope.digital = logicC(config);
            },1000);
          }else{
            scope.digital = logicC(config);
          } 
        }
      }
  }
  
  Date.prototype.format = function (format, utc){
     return formatDate(this, format, utc);
  };
  
  
  
  
  function logicC(config){
   
     if(config.diff){
       return daysBetween(new Date(config.value*1000), new Date());  
     }
     else if(config.value != undefined){
       return new Date(config.value*1000).format(config.formate);
     } else{
       return (new Date().format(config.formate));  
     }       
  }
  
  
  
  function formatDate(date, format, utc){
        var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        function ii(i, len) {
		var s = i + ""; len = len || 2;
		while (s.length < len) s = "0" + s; return s; 
		}

        var y = utc ? date.getUTCFullYear() : date.getFullYear();
        format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
        format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
        format = format.replace(/(^|[^\\])y/g, "$1" + y);

        var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
        format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
        format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
        format = format.replace(/(^|[^\\])M/g, "$1" + M);

        var d = utc ? date.getUTCDate() : date.getDate();
        format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
        format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
        format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
        format = format.replace(/(^|[^\\])d/g, "$1" + d);

        var H = utc ? date.getUTCHours() : date.getHours();
        format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
        format = format.replace(/(^|[^\\])H/g, "$1" + H);

        var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
        format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
        format = format.replace(/(^|[^\\])h/g, "$1" + h);

        var m = utc ? date.getUTCMinutes() : date.getMinutes();
        format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
        format = format.replace(/(^|[^\\])m/g, "$1" + m);

        var s = utc ? date.getUTCSeconds() : date.getSeconds();
        format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
        format = format.replace(/(^|[^\\])s/g, "$1" + s);

        var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])f/g, "$1" + f);

        var T = H < 12 ? "AM" : "PM";
        format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
        format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

        var t = T.toLowerCase();
        format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
        format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

        var tz = -date.getTimezoneOffset();
        var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
        if (!utc)
        {
            tz = Math.abs(tz);
            var tzHrs = Math.floor(tz / 60);
            var tzMin = tz % 60;
            K += ii(tzHrs) + ":" + ii(tzMin);
        }
        format = format.replace(/(^|[^\\])K/g, "$1" + K);

        var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
        format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
        format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

        format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
        format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

        format = format.replace(/\\(.)/g, "$1");

        return format;
    };
    
    
    
  var daysBetween = function( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    //take out milliseconds
    difference_ms = difference_ms/1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    var hours = Math.floor(difference_ms % 24);  
    var days = Math.floor(difference_ms/24);
    console.log(seconds,hours,minutes); 
    if(days > 0){
      if(days>31){
        days = humanise(days);
      }else{
        days = days +" Days"
      }
      return days;      
    }else{
      if(hours > 0){
        return hours+" Hour"+(hours > 1 ? 's' : '') ;
      }
      if(minutes > 0){
        return minutes+" Minute"+(minutes > 1 ? 's' : '');
      }
      
      if(seconds > 0){
        return seconds+" Second"+(seconds > 1 ? 's' : '');
      }
    }
  }
    
  function humanise(diff) {
  // The string we're working with to create the representation
  var str = '';
  // Map lengths of `diff` to different time periods
  var values = [[' Year', 365], [' Month', 30], [' Day', 1]];
  var tmp = 0;
  // Iterate over the values...
  for (var i=0;i<values.length;i++) {
    var amount = Math.floor(diff / values[i][1]);

    // ... and find the largest time value that fits into the diff
    if (amount >= 1 && tmp < 2) {
      // If we match, add to the string ('s' is for pluralization)
      str += amount + values[i][0] + (amount > 1 ? 's' : '') + ' ';
      tmp++;
      // and subtract from the diff
      diff -= amount * values[i][1];
    }
  }

  return str;
}  
  
})();
