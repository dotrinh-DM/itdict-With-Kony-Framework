//Insert new comment to WORD
var CONTENT;
var rowId;
var likeDislikeIsset = false;

function insertGopy(){
  var username = kony.store.getItem("username");
  if(username){
        var temp = Home.NewGopy.text;
        if(!temp){
          alert("正しく入力してください。");
        }else{
          CONTENT = htmlEntities(addslashes(temp));
          if(dbObjectId == null || dbObjectId == undefined){
             connectDB();          
          }
          kony.db.transaction(dbObjectId, saveGopy, myTransactionErrorCallback, mySuccessCallback);
        }
  } else{
    	alert("ログインしてください。"); 
  }
}

function saveGopy(dbId){
  	var word_to_insert = Home.NewSearchedWord.text;
    var sqlStatement = 'INSERT INTO dong_gop (word, mean, user_id) VALUES ("'+word_to_insert+'", "'+CONTENT+'", '+kony.store.getItem("id")+')';
    kony.db.executeSql(dbId, sqlStatement, null, saveGopySuccess, sql_errorCallBack);
}


function saveGopySuccess(transactionId, resultset)
{
  var numm = 0;
  if(resultset.rowsAffected == 1)
      {
        var dataObj = {
              richtextSegmentGopy:CONTENT,
              tacgia: kony.store.getItem("username"),
	          rowId:resultset.insertId,
		      
          	  likelight:{isVisible:true},
        	  likebold:{isVisible:false},
              numlike:numm.toString(),

              dislikelight:{isVisible:true},
              dislikebold:{isVisible:false},
              numdislike:numm.toString()
        };
        
        Home.gopySegment.isVisible = true;
        if(Home.gopySegment.getLastVisibleRow() == null)
          {
               Home.gopySegment.addDataAt(dataObj, 0);
          }else{
              var lastIndex = Home.gopySegment.getLastVisibleRow().rowIndex+1; // append to bottom of segment.
              Home.gopySegment.addDataAt(dataObj, lastIndex);
          }
//         animationDef = { 
//               "100": {
//                 "stepConfig": {
//                   "timingFunction": kony.anim.EASIN_IN_OUT
//                 }
//               }
//         };

//         animationConfig = {
//             duration: 1,
//             fillMode: kony.anim.FILL_MODE_FORWARDS
//         };

//         row={
//            sectionIndex:0,	
//            rowIndex:1,
//         };
        
//            //callback 
//         var callback = function(){
//             alert("animation complete!");
//         };

//         animationDefObject = kony.ui.createAnimation(animationDef);
//         Home.gopySegment.animateRows(
//            {
//               rows: [row],
//               widgets:["FlexContainer0bcbe4a1ca8b643"],
//               animation: {
//                 definition: animationDefObject,
//                 config: animationConfig,
//                 callbacks: callback
//               }
//            }
//         );
      }else{
        alert("失敗した。");
      }
}

//-------------------- like and dislike for each donggop

function likeFunction()
{
  if(kony.store.getItem("id")){
    if(dbObjectId == null || dbObjectId == undefined){
      connectDB();          
    }
    rowId = Home.gopySegment.selectedItems[0].rowId; // get current dong gop id  
    kony.db.transaction(dbObjectId, checkLikeIssetQuery, myTransactionErrorCallback, mySuccessCallback);
  }else{
    alert("ログインしてください！");
  }
    
}

/**
 * @Check like row or dislike row isset?
 *
 */
function checkLikeIssetQuery(dbId){
    var sqlStatement = 'select * from likeTbl where donggop_id = '+rowId+' and user_id = '+kony.store.getItem("id")+'';
    kony.db.executeSql(dbId, sqlStatement, null, likeIssetResult, sql_errorCallBack);
}

function likeIssetResult(transactionId, resultset)
{
  	  var count = resultset.rows.length;
  	  if(count > 0){
         kony.db.transaction(dbObjectId, updateLikeQuery, myTransactionErrorCallback, mySuccessCallback); // Update like for dong dop
      }else{
         kony.db.transaction(dbObjectId, insertLikeQuery, myTransactionErrorCallback, mySuccessCallback); // Insert like for dong dop
      }
      var selectedIndex = Home.gopySegment.selectedIndex[1]; // get current row id in segment
      var richtextSegmentGopy = Home.gopySegment.selectedItems[0].richtextSegmentGopy;
      var tacgia = Home.gopySegment.selectedItems[0].tacgia;
      var numlike = parseInt(Home.gopySegment.selectedItems[0].numlike);
      var numdislike = parseInt(Home.gopySegment.selectedItems[0].numdislike);
      var dataObj = {
        richtextSegmentGopy:richtextSegmentGopy,
        tacgia: tacgia,
        rowId:rowId,

        likelight:{isVisible:false},
        likebold:{isVisible:true},
        numlike:(numlike+1).toString(),

        dislikelight:{isVisible:true},
        dislikebold:{isVisible:false},
        numdislike:(numdislike-1)<0?numdislike.toString():(numdislike-1).toString()
      };
      Home.gopySegment.setDataAt(dataObj,selectedIndex); // Update again data for current row in segment with selectedIndex
}


// Insert new record when the record not yet exist
function insertLikeQuery(dbId){
   	var sqlStatement = 'insert into likeTbl(like_or_dislike,donggop_id,user_id) values (1,'+rowId+','+kony.store.getItem('id')+')';
    kony.db.executeSql(dbId, sqlStatement, null, thanhcong, sql_errorCallBack);
}


// Update when the record already exist
function updateLikeQuery(dbId){
   	var sqlStatement = 'UPDATE likeTbl SET like_or_dislike = 1 WHERE donggop_id = '+rowId+' and user_id = '+kony.store.getItem('id')+'';
 	kony.db.executeSql(dbId, sqlStatement, null, thanhcong, sql_errorCallBack);
}

// Dislike process
function dislikeFunction()
{
  if(kony.store.getItem("id")){
    if(dbObjectId == null || dbObjectId == undefined){
      connectDB();          
    }
    rowId = Home.gopySegment.selectedItems[0].rowId; // get current dong gop id
    kony.db.transaction(dbObjectId, checkDislikeIssetQuery, myTransactionErrorCallback, mySuccessCallback);
  }else{
    alert("ログインしてください！");
  }
    
}

/**
 * @Check like row or dislike row isset?
 *
 */
function checkDislikeIssetQuery(dbId){
    var sqlStatement = 'select * from likeTbl where donggop_id = '+rowId+' and user_id = '+kony.store.getItem("id")+'';
    kony.db.executeSql(dbId, sqlStatement, null, dislikeIssetResult, sql_errorCallBack);
}

function dislikeIssetResult(transactionId, resultset)
{
  	  var count = resultset.rows.length;
  	  if(count > 0){
         kony.db.transaction(dbObjectId, updateDislikeQuery, myTransactionErrorCallback, mySuccessCallback); // Update like for dong dop
      }else{
         kony.db.transaction(dbObjectId, insertDislikeQuery, myTransactionErrorCallback, mySuccessCallback); // Insert like for dong dop
      }
      var selectedIndex = Home.gopySegment.selectedIndex[1]; // get current row id in segment
      var richtextSegmentGopy = Home.gopySegment.selectedItems[0].richtextSegmentGopy;
      var tacgia = Home.gopySegment.selectedItems[0].tacgia;
      var numlike = parseInt(Home.gopySegment.selectedItems[0].numlike);
      var numdislike = parseInt(Home.gopySegment.selectedItems[0].numdislike);
      var dataObj = {
        richtextSegmentGopy:richtextSegmentGopy,
        tacgia: tacgia,
        rowId:rowId, // Update old id for row

        likelight:{isVisible:true},
        likebold:{isVisible:false},
        numlike:(numlike-1)<0?numlike.toString():(numlike-1).toString(),

        dislikelight:{isVisible:false},
        dislikebold:{isVisible:true},
        numdislike:(numdislike+1).toString()
      };
      Home.gopySegment.setDataAt(dataObj,selectedIndex); // Update again data for current row in segment with selectedIndex
}


// Insert new record when the record not yet exist
function insertDislikeQuery(dbId){
   	var sqlStatement = 'insert into likeTbl(like_or_dislike,donggop_id,user_id) values (0,'+rowId+','+kony.store.getItem('id')+')';
    kony.db.executeSql(dbId, sqlStatement, null, thanhcong, sql_errorCallBack);
}


// Update when the record already exist
function updateDislikeQuery(dbId){
   	var sqlStatement = 'UPDATE likeTbl SET like_or_dislike = 0 WHERE donggop_id = '+rowId+' and user_id = '+kony.store.getItem('id')+'';
 	kony.db.executeSql(dbId, sqlStatement, null, thanhcong, sql_errorCallBack);
}

function thanhcong(transactionId, resultset){
//   alert(resultset);
}




//-------------------- for test

function showLike(){
    if(dbObjectId == null || dbObjectId == undefined){
       connectDB();          
    }
    kony.db.transaction(dbObjectId, getLikeQuery, myTransactionErrorCallback, mySuccessCallback);
}

function getLikeQuery(dbId){
    var sqlStatement = 'select * from likeTbl';
    kony.db.executeSql(dbId, sqlStatement, null, showToDetail, sql_errorCallBack);
}


function showToDetail(transactionId, resultset)
{
	  var count = resultset.rows.length;
  	  var i = 0;
      for (i;i < count;i++)
      {
         var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,i);
     	 alert(rowItem.like_or_dislike);
         alert("donggop_id: "+rowItem.donggop_id);
      }
}






































