$(function(){var a,b,c,a=[[1262304e6,6],[12649824e5,3057],[12674016e5,20434],[127008e7,31982],[1272672e6,26602],[12753504e5,27826],[12779424e5,24302],[12806208e5,24237],[12832992e5,21004],[12858912e5,12144],[12885696e5,10577],[12911616e5,10295]],d=[[1262304e6,5],[12649824e5,200],[12674016e5,1605],[127008e7,6129],[1272672e6,11643],[12753504e5,19055],[12779424e5,30062],[12806208e5,39197],[12832992e5,37e3],[12858912e5,27e3],[12885696e5,21e3],[12911616e5,17e3]];b=[{label:"Income",data:d},{label:"Expenditure",data:a}],c={xaxis:{min:new Date(2009,12,1).getTime(),max:new Date(2010,11,2).getTime(),mode:"time",tickSize:[1,"month"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],tickLength:0},yaxis:{},series:{lines:{show:!0,fill:!0,fill:.2,lineWidth:2},points:{show:!0,radius:4,fill:!0,fillColor:"#ffffff",lineWidth:2}},grid:{hoverable:!0,clickable:!1,borderWidth:1,tickColor:"#eaf3fb",borderColor:"#eaf3fb"},legend:{show:!0,position:"nw"},tooltip:!0,tooltipOpts:{content:"%s: %y"},shadowSize:0,colors:["#3a86c8","#64bd63","#6dc6cd","#52bf8a","#638ca5"]};var e=$("#area-chart");e.length&&$.plot(e,b,c)});