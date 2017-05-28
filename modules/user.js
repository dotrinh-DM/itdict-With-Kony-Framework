var username;
var password;

function login()
{
 	var user = loginFrm.username.text;
  	var pass = loginFrm.password.text;
  if(user && pass){  
  	if(dbObjectId == null || dbObjectId == undefined){
       connectDB();          
    }
    username = user;
    password = kony.crypto.createHash("sha1",pass);
    kony.db.transaction(dbObjectId, verifyUser, myTransactionErrorCallback, mySuccessCallback);
  }else{
    alert("やり直してください！");
  }
}

function verifyUser(dbId)
{
  var sqlStatement = 'SELECT * FROM users WHERE username = "'+username+'" and password = "'+password+'"';
  kony.db.executeSql(dbId, sqlStatement, null, loginProcess, sql_errorCallBack);
} 


function loginProcess(transactionId, resultset)
{
    var count = resultset.rows.length;
    if(count > 0)
    {
        var rowItem = kony.db.sqlResultsetRowItem(transactionId,resultset,0);
        Home.displayname.text = rowItem.username;
        Home.loginBtn.isVisible = false;
        Home.displayname.isVisible = true;
        kony.store.setItem("username", rowItem.username.replace(/@.*/, ""));
        kony.store.setItem("id", rowItem.id);
        dashboardFrm.show();
      	loginFrm.username.text = "";
  		loginFrm.password.text = "";
    }else{
      	alert("見つからないです。"); 
    }
  
}

function logout(){
  kony.store.removeItem("username");
  kony.store.removeItem("id");
  Home.loginBtn.isVisible = true;
  Home.displayname.isVisible = false;
  Home.NewStared.isVisible = false;
  Home.NewStar.isVisible = true;
  Home.gopySegment.removeAll();
  Home.NewDetail.isVisible = false;
  Home.FlexScrollContainer006f03d8de8ce44.isVisible = true;
}

function startupCheck()
{
  var username = kony.store.getItem("username");
      if(username){
        Home.displayname.text = username;
        Home.loginBtn.isVisible = false;
        Home.displayname.isVisible = true;

      }else{
        Home.loginBtn.isVisible = true;
        Home.displayname.isVisible = false;
      }
}

function showLoginAnima(){
	  loginFrm.show();
      try{
        loginFrm.animate(kony.ui.createAnimation({
                  "100": {
                          "left":"0","top":"0",
                          "stepConfig": {
                                  "timingFunction": kony.anim.EASE
                              }
                        }
          }),
        {
           "delay": 0,
           "iterationCount": 1,
           "fillMode": kony.anim.FILL_MODE_FORWARDS,
           "duration": 2
        },{
            "animationEnd": function(){  alert("end"); }
        });
      }catch(e)
      {
        alert(e.message);
      }

}







































