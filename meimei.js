Array.prototype.contains = function(value) {
  for(var i in this) {
    if( this.hasOwnProperty(i) && this[i] === value) {
      return true;
    }
  }
  return false;
}

Array.prototype.asort = function(key) {
    this.sort(function(a, b) {
        return (a[key] > b[key]) ? 1 : -1;
    });
}

Array.prototype.arsort = function(key) {
    this.sort(function(a, b) {
        return (a[key] < b[key]) ? 1 : -1;
    });
}

daikichi = { 
  set : [1,3,5,6,7,8,11,13,15,16,17,18,21,23,24,25,31,32,33,35,37,39,41,45,47,48.52],
  first_point : 20,  
  second_point : 5 
};

kichi = {
  set : [0],
  first_point : 10,  
  second_point : 5  
};

hankichi = {
  set : [27,29,36,38,42,50,51,53],
  first_point : 5,  
  second_point : 0  
};

kyo = {
  set : [2,4,9,10,12,14,19,20,22,26,28,30,34,40,43,44,46,49],
  first_point : -20,  
  second_point : -5  
};

function hantei (kakusu) {
  if (daikichi.set.contains(kakusu)) {
    return 1;
  }
  
  if (kichi.set.contains(kakusu)) {
    return 2; 
  }
  
  if (hankichi.set.contains(kakusu)) {
    return 3; 
  }
  
  if (kyo.set.contains(kakusu)) {
    return 4; 
  }
}


function _check(item_set, kakusu, priority) {
  if (item_set.set.contains(kakusu) ) {
    if (priority > 1) {
      point = point + item_set.first_point; 
    } else {
      point = point + item_set.second_point; 
    }
  } 
}

function _point(kakusu, priority) {
/*
       daikichi = [1,11,16,21,23,31,32,41]
       kichi = [3,5,6,8,13,15,18,24,25,29,33,37,39,44,45,47,48,51,52]
       hankichi = [7,17,27,30,34,35,36,38,40,42,43,49,53,57,58]
       kyo = [2,4,9,10,12,14,19,20,22,26,28,46,50,54,55,56,59,60]
*/
  

  _check(daikichi, kakusu, priority);
  _check(kichi, kakusu, priority);
  _check(hankichi, kakusu, priority);
  _check(kyo, kakusu, priority);
}

function _point_gogyo(first, second, third, fourth) {
  if(third % 2 == 0) {
    point = point + 10;
    return "good";
  } else {
    point = point * 0.8; 
    return "bad";
  }
}



function _calc(first, second, third, fourth) {
  point = 0;
  tenkaku = parseInt( first )   + parseInt( second );
  jinkaku = parseInt( second )  + parseInt( third );
  chikaku = parseInt( third )   + parseInt( fourth );
  gaikaku = parseInt( first )   + parseInt( fourth );
  fukukaku = parseInt( jinkaku) + parseInt( third )  + parseInt( fourth );
  soukaku = parseInt( first )   + parseInt( second ) + parseInt( third  ) + parseInt( fourth );
  syakai  = parseInt( soukaku ) - parseInt( first );
  katei   = parseInt( soukaku ) - parseInt( fourth );

  _point(tenkaku,1);
  _point(jinkaku,1);
  _point(chikaku,1);
  _point(gaikaku,1);
  _point(soukaku,1);
  _point(syakai,2);
  _point(fukukaku,2);
  _point(katei,2);

  res.push(
    {
      "tenkaku" : {
        "kakusu" : tenkaku, 
        "hantei" : hantei(tenkaku)
      },
      "jinkaku" : {
        "kakusu" : jinkaku, 
        "hantei" : hantei(jinkaku)
      },
      "chikaku" : {
        "kakusu" : chikaku, 
        "hantei" : hantei(chikaku)
      },
      "gaikaku" : {
        "kakusu" : gaikaku, 
        "hantei" : hantei(gaikaku)
      },
      "soukaku" : {
        "kakusu" : soukaku, 
        "hantei" : hantei(soukaku)
      },
      "syakai"  : {
        "kakusu" : syakai, 
        "hantei" : hantei(syakai)
      },
      "katei"   : {
        "kakusu" : katei, 
        "hantei" : hantei(katei)
      },
      "third"   : {
        "kakusu" : third, 
        "hantei" : hantei(third)
      },
      "fourth"        : {
        "kakusu" : fourth, 
        "hantei" : hantei(fourth)
      },
      "fukukaku": {
        "kakusu" : fukukaku, 
        "hantei" : hantei(fukukaku)
      },
      "gogyo"   : _point_gogyo(first, second, third, fourth),
      "point"   : point
    }
  );
}

function meimei(first, second) {
  res = [];
  
  for(var i=1 ; i<19 ; i++) {
    for(var j=1 ; j<19 ; j++) {
      _calc(first, second, i, j);
    }
  }
  //res = res.sort_by { |val| -val['point'] }
  return res;
}

function hyoji(point) {
  if (point == 1) {
    return "◎";
  } else if (point == 2) {
    return "○";
  } else if (point == 3) {
    return "△";
  } else if (point == 4) {
    return "×";
  }
}

function fill(e) {
  form = '<table class="table table-bordered">';
  form += "<thead>";
  form += "<th>天格</th>";
  form += "<th>人格</th>";
  form += "<th>地格</th>";
  form += "<th>外格</th>";
  form += "<th>総画</th>";
  form += "<th>社会運</th>";
  form += "<th>家庭運</th>";
  form += "<th>伏運</th>";
  form += "<th>3番目の画数</th>";
  form += "<th>4番目の画数</th>";
  form += "<th>陰陽</th>";
  form += "<th>ポイント</th>";
  form += "</thead><tbody>";

  for(var i=0; i < e.length; i++) {
    form += "<tr>";
    form += "<td>" + e[i]["tenkaku"]["kakusu"]  + " 画:" +  hyoji(e[i]["tenkaku"]["hantei"] ) + "</td>";
    form += "<td>" + e[i]["jinkaku"]["kakusu"]  + " 画:" +  hyoji(e[i]["jinkaku"]["hantei"] ) + "</td>";
    form += "<td>" + e[i]["chikaku"]["kakusu"]  + " 画:" +  hyoji(e[i]["chikaku"]["hantei"] ) + "</td>";
    form += "<td>" + e[i]["gaikaku"]["kakusu"]  + " 画:" +  hyoji(e[i]["gaikaku"]["hantei"] ) + "</td>";
    form += "<td>" + e[i]["soukaku"]["kakusu"]  + " 画:" +  hyoji(e[i]["soukaku"]["hantei"] ) + "</td>";
    form += "<td>" + e[i]["syakai"]["kakusu"]   + " 画:" +  hyoji(e[i]["syakai"]["hantei"]  ) + "</td>";
    form += "<td>" + e[i]["katei"]["kakusu"]    + " 画:" +  hyoji(e[i]["katei"]["hantei"]   ) + "</td>";
    form += "<td>" + e[i]["fukukaku"]["kakusu"] + " 画:" +  hyoji(e[i]["fukukaku"]["hantei"]) + "</td>";
    form += "<td>" + e[i]["third"]["kakusu"]    + " 画</td>";
    form += "<td>" + e[i]["fourth"]["kakusu"]   + " 画</td>";
    form += "<td>" + e[i]["gogyo"]              + "</td>";
    form += "<td>" + e[i]["point"]              + "</td>";
    form += "</tr>";
  }
  form += "</tbody></table>";
  $("#res").append(form);

}


$(document).ready(function(){
  $("#submit").click(function(){
    var res = meimei($("#first").val(), $("#second").val());
    res.arsort("point");
    fill(res);
  });
});
