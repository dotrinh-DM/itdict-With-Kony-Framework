var START_STATUS = 0;
var txtSearch;
var motoLbl;
var HISTORYSEGMENT = [];
var word_id;
var likelight_status,likebold_status,dislikelight_status,dislikebold_status;

//when user type some character on search box --------------------------------------
function autocompleteFunc()
{
    var getTxt = Home.txtSearch.text;
    try{
      if(getTxt.length < 1){
        Home.autocompleteFlex.isVisible = false;
        searchNow();
      }else{
            if(dbObjectId == null || dbObjectId == undefined){
                    connectDB();          
            }
            var temp = getTxt.substring(0,1);     
            if (temp.match(/[a-z]/i) && getTxt.indexOf("%") < 0) { // Begin with alphabe character
                txtSearch = getTxt; 
                kony.db.transaction(dbObjectId, selectByWord, myTransactionErrorCallback, mySuccessCallback);
            }else {
              if(getTxt.indexOf("%") < 0){ 
                   // Neu ko co %
                    txtSearch = getTxt.replace(/"/g,'""');
                    kony.db.transaction(dbObjectId, selectByWordSpecialCharacter, myTransactionErrorCallback, mySuccessCallback);
              }else
              {
                  txtSearch = getTxt; 
                  // Neu co %
                  kony.db.transaction(dbObjectId, selectByWordByPercent, myTransactionErrorCallback, mySuccessCallback);
              }
           }
      }
    }catch(e){
//       alert(e.message);
    }
    
}//END autocomplete

function selectByWord(dbId)
{
  var sqlStatement = 'SELECT word,mean FROM items where word like "'+txtSearch+'%" limit 50';
  kony.db.executeSql(dbId, sqlStatement, null, sql_success, sql_errorCallBack);
} 

function selectByWordSpecialCharacter(dbId)
{
  var sqlStatement = 'SELECT word,mean FROM items where word like "%'+txtSearch+'%" limit 50';
  kony.db.executeSql(dbId, sqlStatement, null, sql_success, sql_errorCallBack);
} 

function selectByWordByPercent(dbId)
{
  var sqlStatement = 'SELECT word,mean FROM items where word like "%#'+txtSearch+'%" ESCAPE "#" limit 50';
  kony.db.executeSql(dbId, sqlStatement, null, sql_success, sql_errorCallBack);
} 

function sql_success(transactionId, resultset)
{
  var count = resultset.rows.length;
  var i = 0;
  var wordArr = [],idArr = [];
  if(count < 1)
  {
    Home.sgmentHistory.isVisible = true;
    Home.NewDetail.isVisible = false;
    Home.autocompleteFlex.isVisible = false;
  }else{
    Home.autocompleteSegment.widgetDataMap = {motoLbl:"motoLbl",honyakuLbl:"honyakuLbl"};
    var setRowData = [];  
    var items = {};
    for (i;i < count;i++)
    {
      var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,i);
      items = {motoLbl:rowItem.word,honyakuLbl:(rowItem.mean).substring(0, 11)+"..."};
      setRowData.push(items);
    }
    Home.autocompleteSegment.setData(setRowData);
    Home.autocompleteFlex.isVisible = true;
    
  }
}

//End when user type some character--------------------------------------------

//When user touch on specified word. ------------------------------------------
function viewDetail()
{
      Home.NewDetail.top = "410dp"; //reset top of newdetail to orginal
  	  Home.NewGopy.text = ""; //set null for textarea
      if(dbObjectId == null || dbObjectId == undefined){
         connectDB();          
      }
      kony.db.transaction(dbObjectId, getContentByWord, bugViewdetail, mySuccessCallback);
}

function bugViewdetail()
{
  alert("at func -> getContentByWord transaction");
}

function getContentByWord(dbId) //query to show mean
{
    motoLbl = Home.autocompleteSegment.selectedItems[0].motoLbl;
    try{
        if(toType(kony.store.getItem("historySeg")) != "null")
          {
            HISTORYSEGMENT = kony.store.getItem("historySeg");
            HISTORYSEGMENT.push(motoLbl);
            kony.store.setItem("historySeg", HISTORYSEGMENT);
        }else{
            HISTORYSEGMENT.push(motoLbl);
            kony.store.setItem("historySeg", HISTORYSEGMENT);	
        }
    }catch(e){
          log(e.message);
          log(e.name);
    }

	var sqlStatement = 'SELECT * FROM items where word = "'+motoLbl+'"';
  	kony.db.executeSql(dbId, sqlStatement, null, getContentByWordSuccess, sql_errorCallBack);
  
  	var sqlStatement_second = 'select dong_gop.id,dong_gop.word,dong_gop.mean,users.username,';
	sqlStatement_second += ' (select count(like_or_dislike) from likeTbl where like_or_dislike = 1 and donggop_id = dong_gop.id) as soluonglike,';
  	sqlStatement_second += ' (select count(like_or_dislike) from likeTbl where like_or_dislike = 0 and donggop_id = dong_gop.id) as soluongdislike,';
   	sqlStatement_second += ' (select like_or_dislike from likeTbl where donggop_id = dong_gop.id and user_id = '+kony.store.getItem("id")+') as current_status_user';	
    sqlStatement_second += ' from dong_gop JOIN users ON dong_gop.user_id = users.id WHERE dong_gop.word = "'+motoLbl+'"';
//   log(sqlStatement_second);  
  kony.db.executeSql(dbId, sqlStatement_second, null, addAfterContent, sql_errorCallBack);
  
     var username = kony.store.getItem("username");
      if(username){
         kony.db.transaction(dbObjectId, checkStarToShow, bugViewdetail, mySuccessCallback);
      }
} 

function checkStarToShow(dbId)
{
    var sqlStatement = 'SELECT * FROM stared WHERE word_id = '+word_id+' and user_id = '+kony.store.getItem('id')+'';
    kony.db.executeSql(dbId, sqlStatement, null, showStarInDetail, sql_errorCallBack);	
}

// check if to show star or stared
function showStarInDetail(transactionId, resultset){
  var count = resultset.rows.length;
  if(count > 0)
  {
    //check status is 1 or 0, if status is 1 then this word is stared.
	var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,0);
    if(rowItem.status == 1)
      {
        Home.NewStar.isVisible  = false;
  		Home.NewStared.isVisible  = true;
      }else{
        Home.NewStar.isVisible  = true;
  		Home.NewStared.isVisible  = false;
      } 	    
  }else{
    Home.NewStar.isVisible  = true;
  		Home.NewStared.isVisible  = false;
  }
}


function getContentByWordSuccess(transactionId, resultset) // Present data
{
    var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,0);
    Home.NewSearchedWord.text = motoLbl;
    Home.idHidden.text = rowItem.item_id;
    word_id = rowItem.item_id; // VERY IMPORTANT VAR. THIS VAR TO PASS TO checkStarToShow FUNC.
  	var contentWillBeSet = "● "+rowItem.mean;
    Home.NewTranslatedContent.text = contentWillBeSet.replace(/ \/ /g,'<br/>● ');
  
    Home.sgmentHistory.isVisible = false;
    Home.NewDetail.isVisible = true;
    Home.NewDetail.animate( // Xu li cho btn roi xuong
          kony.ui.createAnimation(
           {
            "100": {
              "top": "110dp",
              "stepConfig": {
                "timingFunction": kony.anim.EASE
              }
            }
           }), 
    	  {
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.2
          }); 
    Home.autocompleteFlex.isVisible = false;
}

//End When user touch on specified word. --------------------------------------

//Start when user touch on specified word in history. ---------------------------

function viewDetailHistory()
{
      Home.NewDetail.top = "410dp"; //reset top of newdetail to orginal
  	  Home.NewGopy.text = ""; //set null for textarea
      if(dbObjectId == null || dbObjectId == undefined){
         connectDB();          
      }
      kony.db.transaction(dbObjectId, getContentByWordHistory, bugViewdetail, mySuccessCallback);
}

function getContentByWordHistory(dbId) //query to show mean
{
    motoLbl = Home.sgmentHistory.selectedItems[0].motoLbl;
    try{
        if(toType(kony.store.getItem("historySeg")) != "null")
          {
            HISTORYSEGMENT = kony.store.getItem("historySeg");
            HISTORYSEGMENT.push(motoLbl);
            kony.store.setItem("historySeg", HISTORYSEGMENT);
        }else{
            HISTORYSEGMENT.push(motoLbl);
            kony.store.setItem("historySeg", HISTORYSEGMENT);	
        }
    }catch(e){
          log(e.message);
          log(e.name);
    }

	var sqlStatement = 'SELECT * FROM items where word = "'+motoLbl+'"';
  	kony.db.executeSql(dbId, sqlStatement, null, getContentByWordSuccess, sql_errorCallBack);
  
  	var sqlStatement_second = 'select dong_gop.id,dong_gop.word,dong_gop.mean,users.username,';
	sqlStatement_second += ' (select count(like_or_dislike) from likeTbl where like_or_dislike = 1 and donggop_id = dong_gop.id) as soluonglike,';
  	sqlStatement_second += ' (select count(like_or_dislike) from likeTbl where like_or_dislike = 0 and donggop_id = dong_gop.id) as soluongdislike,';
  	sqlStatement_second += ' (select like_or_dislike from likeTbl where donggop_id = dong_gop.id and user_id = '+kony.store.getItem("id")+') as current_status_user';	
	sqlStatement_second += ' from dong_gop JOIN users ON dong_gop.user_id = users.id WHERE dong_gop.word = "'+motoLbl+'"';
    kony.db.executeSql(dbId, sqlStatement_second, null, addAfterContent, sql_errorCallBack);
  
      var username = kony.store.getItem("username");
      if(username){
         kony.db.transaction(dbObjectId, checkStarToShow, bugViewdetail, mySuccessCallback);
      }
} 

// Get all gopy from dong_gop
function addAfterContent(transactionId, resultset) // handle comment
{
  	var count = resultset.rows.length;
  	if(count > 0){
      var i = 0;
      var setRowData = [];  
      var items = {};
      
      Home.gopySegment.widgetDataMap = {
        richtextSegmentGopy:"richtextSegmentGopy",
        tacgia:"tacgia",
        rowId:"rowId",
        
        likelight:"likelight",
        likebold:"likebold",
        numlike:"numlike",
        
        dislikelight:"dislikelight",
        dislikebold:"dislikebold",
        numdislike:"numdislike"
      }; // END MAPPING
      
      for (i;i < count;i++)
      {
        var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,i);
        if(rowItem.current_status_user == null) // If user do not have action
        {
			 likelight_status = true;
 	         likebold_status = false;
             dislikelight_status = true;
             dislikebold_status = false;
        }else{
            if(rowItem.current_status_user == 1){ // User likes
                 likelight_status = false;
                 likebold_status = true;
                 dislikelight_status = true;
                 dislikebold_status = false;
            }else{ // User dislikes
               likelight_status =true;
               likebold_status = false;
               dislikelight_status = false;
               dislikebold_status = true;
            }
        }
        items = {
          richtextSegmentGopy:rowItem.mean,
          tacgia:rowItem.username.replace(/@.*/, ""),
          rowId:rowItem.id,
          
          likelight:{isVisible:likelight_status},
          likebold:{isVisible:likebold_status},
          numlike:rowItem.soluonglike.toString(),
        
          dislikelight:{isVisible:dislikelight_status},
          dislikebold:{isVisible:dislikebold_status},
          numdislike:rowItem.soluongdislike.toString()
        };
		setRowData.push(items);
      }
      Home.gopySegment.setData(setRowData); // Set new data for segment
      Home.gopySegment.isVisible = true;
    }else{
      Home.gopySegment.isVisible = false;
      Home.gopySegment.removeAll();
    }	  
  
}
// when touch stared row

function onclickOnStaredRow(){
	  dashboardFrm.FlexContainer0e586a19f2ea149.isVisible = false;  
      Home.NewDetail.top = "410dp"; //reset top of newdetail to orginal
  	  Home.NewGopy.text = ""; //set null for textarea
      Home.show();
      if(dbObjectId == null || dbObjectId == undefined){
         connectDB();          
      }
      kony.db.transaction(dbObjectId, getContentByStaredWord, myTransactionErrorCallback, mySuccessCallback);
}


function getContentByStaredWord(dbId) //query to show mean
{
    motoLbl = dashboardFrm.Segment0ccbf40087a184e.selectedItems[0].motoLbl;
	var sqlStatement = 'SELECT * FROM items where word = "'+motoLbl+'"';
  	kony.db.executeSql(dbId, sqlStatement, null, getContentByWordSuccess, sql_errorCallBack);
  
  	var sqlStatement_second = 'select dong_gop.id,dong_gop.word,dong_gop.mean,users.username from dong_gop JOIN users ON dong_gop.user_id = users.id WHERE dong_gop.word = "'+motoLbl+'"';
    kony.db.executeSql(dbId, sqlStatement_second, null, addAfterContent, sql_errorCallBack);
  
    var username = kony.store.getItem("username");
    if(username){
      kony.db.transaction(dbObjectId, checkStarToShow, bugViewdetail, mySuccessCallback);
    }
    	
} 


//------------------
function backHome()
{
    Home.NewDetail.isVisible = false;
    Home.sgmentHistory.isVisible = true;
}

function searchNow()
{
   Home.txtSearch.setFocus(true);
}


function Hamburger() {
    if (Home.hamburger.left == '0%') {
        closeMenu();
    } else {
        openMenu();
    }
}

// @author: dotrinh.com
function openMenu() {
    var pForm = kony.application.getCurrentForm();
    try {//trap error   
        pForm.hamburger.animate(kony.ui.createAnimation({
            "100": {// Create obj
                "left": "0%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {//create config for animation
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.7
        });
      
        pForm.MainContainer.animate(kony.ui.createAnimation({
            "100": {
                "left": "87%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.7
        });
      
        if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPhone Simulator" || kony.os.deviceInfo().name == "iPad" || kony.os.deviceInfo().name == "iPad Simulator") {
            pForm.MainContainer.setEnabled(true);
        } else {
            pForm.MainContainer.setEnabled(false);
        }
    } catch (e) {
		log(e.message);
    }
}

function closeMenu() {
    var pForm = kony.application.getCurrentForm();
    try {
        pForm.hamburger.animate(kony.ui.createAnimation({
            "100": {
                "left": "-87%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.3
        });
        pForm.MainContainer.animate(kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.3
        });
        if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPhone Simulator" || kony.os.deviceInfo().name == "iPad" || kony.os.deviceInfo().name == "iPad Simulator") {
            pForm.MainContainer.setEnabled(true);
        } else {
            pForm.MainContainer.setEnabled(true);
        }
    } catch (e) {

    }
}



function openURLAbout()
{
	//Accessing an external web page : http://www.dotrinh.com
	kony.application.openURL("http://dotrinh.com");
}

























