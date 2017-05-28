//process favourite function
var word_id;

function star()
{
  var username = kony.store.getItem("username");
  if(username){
    if(dbObjectId == null || dbObjectId == undefined){
      connectDB();          
    }
    kony.db.transaction(dbObjectId, checkStatus, myTransactionErrorCallback, mySuccessCallback);

  }else{
    alert("ログインしてください。これから他端末で同期可能がある。"); 
  }

}

function checkStatus(dbId)
{
  word_id = Home.idHidden.text;
  var sqlStatement = 'SELECT * FROM stared WHERE word_id = "'+word_id+'" and user_id = "'+kony.store.getItem('id')+'"';
  log("check status: "+sqlStatement);
  kony.db.executeSql(dbId, sqlStatement, null, sql_success_star, sql_errorCallBack);
  Home.NewStar.isVisible = false;
  Home.NewStared.isVisible = true;
} 

function sql_success_star(transactionId, resultset){
  var count = resultset.rows.length;
//   alert("count: "+count);
  if(count < 1)
  {
     //Insert
  	 kony.db.transaction(dbObjectId, insertStar, myTransactionErrorCallback, mySuccessCallback);
  }else{
    //update
     kony.db.transaction(dbObjectId, updateStar, myTransactionErrorCallback, mySuccessCallback);
  }
}


function insertStar(dbId)
{
	  var sqlStatement = "insert into stared (status,word_id,user_id) values ( 1, "+word_id+", "+kony.store.getItem('id')+")";
  log("check insert: "+sqlStatement);    
  kony.db.executeSql(dbId, sqlStatement, null, sql_success_alert, sql_errorCallBack);	 
}  
  

function updateStar(dbId)
{
	  var sqlStatement_sec = "update stared set status = 1 where word_id = "+word_id+" and user_id = "+kony.store.getItem('id')+"";
  log("check update: "+sqlStatement_sec);
  kony.db.executeSql(dbId, sqlStatement_sec, null, sql_success_alert, sql_errorCallBack);	 
}   

// Unstar
function unStar()
{
  word_id = Home.idHidden.text;
  Home.NewStar.isVisible  = true;
  Home.NewStared.isVisible  = false;
  kony.db.transaction(dbObjectId, updateUnstar, myTransactionErrorCallback, mySuccessCallback);

}

function updateUnstar(dbId)
{
  var sqlStatement_sec = "update stared set status = 0 where word_id = "+word_id+" and user_id = "+kony.store.getItem('id')+"";
  log("check update unstare: "+sqlStatement_sec);
  kony.db.executeSql(dbId, sqlStatement_sec, null, updateUnstarSucess, sql_errorCallBack);   
}

function updateUnstarSucess(transactionId, resultset){
   log(resultset);
}



// for test -------------------------------
function sql_success_alert(transactionId, resultset){
 
//   kony.db.transaction(dbObjectId, checksaukhiupdate, myTransactionErrorCallback, mySuccessCallback);
    
}

function checksaukhiupdate(dbId)
{
  var sqlStatement = 'SELECT * FROM stared WHERE word_id = '+word_id+' and user_id = '+kony.store.getItem('id')+'';
    kony.db.executeSql(dbId, sqlStatement, null, kquala, sql_errorCallBack);   
}

function kquala(transactionId, resultset)
{
  var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,0);
  alert("status khi da update:---------"+rowItem.status);
}



















