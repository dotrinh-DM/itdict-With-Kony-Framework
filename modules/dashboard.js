//Dashboard logic

function getAllStaredWord(){
  if(dbObjectId == null || dbObjectId == undefined){
       connectDB();          
    }
    kony.db.transaction(dbObjectId, staredQuery, myTransactionErrorCallback, mySuccessCallback);
}

function staredQuery(dbId){
    var id = kony.store.getItem("id");
    var sqlStatement = 'select items.item_id as iid, items.word as iword from stared join items on stared.word_id = items.item_id where stared.user_id = '+id+'';
    kony.db.executeSql(dbId, sqlStatement, null, showToStaredWord, sql_errorCallBack);
}


function showToStaredWord(transactionId, resultset)
{
	  var count = resultset.rows.length;
      if(count > 0){
          var i = 0;
          var setRowData = [];  
          var items = {};      
          dashboardFrm.Segment0ccbf40087a184e.widgetDataMap = {motoLbl:"motoLbl",dashboard:"dashboard"};
          for (i;i < count;i++)
          {
            var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,i);
            items = {motoLbl:rowItem.iword,dashboard:"dashboard"};
            setRowData.push(items);
          }
          dashboardFrm.Segment0ccbf40087a184e.setData(setRowData);  
      }else{
        //alert("ko lay dc");
      }
}











































