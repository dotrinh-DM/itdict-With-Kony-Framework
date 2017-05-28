// Hítory In Home Screen

function segHistoryData() 
{ 
  	var hisArr = [];
    try {
      if(toType(kony.store.getItem("historySeg")) != "null"){
//         alert(toType(kony.store.getItem("historySeg")));
        hisArr = kony.store.getItem("historySeg");
        Home.historyLbl.isVisible = false;
        Home.sgmentHistory.isVisible = true;
//         alert(hisArr);
        var count = hisArr.length;

        // Only show 30 items in history
          if(count > 30)
          {
              hisArr = hisArr.splice(count-30,30);
              kony.store.setItem("historySeg",hisArr);
              count = 30;
          }

          Home.sgmentHistory.widgetDataMap = {motoLbl:"motoLbl"};
          var setRowData = [];  
          var items = {};
          var i = 0;

          for (i;i < count;i++)
          {
              items = {motoLbl:hisArr[i]};
              setRowData.push(items);
          }
          Home.sgmentHistory.setData(setRowData.reverse());
      }
    } catch(e){
          log(e.message);
    }
}

function clearHistory()
{
  kony.store.removeItem("historySeg");
  Home.sgmentHistory.removeAll();
  HISTORYSEGMENT = [];
  Home.historyLbl.isVisible = true;
  Home.sgmentHistory.isVisible = false;
  alert("出来ました");
}















