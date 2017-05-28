var EMAIL_USER;
var PASSWORD;

function register(){
  var email = signupFrm.emailTxt.text;
  var pass = signupFrm.password.text;
  if(email && pass){
    if(isEmailFormat(email))
      {
        if(dbObjectId == null || dbObjectId == undefined){
       			connectDB();          
        }
        EMAIL_USER = email;
        PASSWORD = kony.crypto.createHash("sha1",pass);
        kony.db.transaction(dbObjectId, verifyUserRegister, myTransactionErrorCallback, mySuccessCallback);
      }else{
         alert("Eメールを正しく記入してください！");
      }
  }else{
    alert("Eメールとパスワードを記入してください！");
  }
}

function verifyUserRegister(dbId)
{
  var sqlStatement = 'SELECT * FROM users WHERE username = "'+EMAIL_USER+'" and password = "'+PASSWORD+'"';
  kony.db.executeSql(dbId, sqlStatement, null, signupProcess, sql_errorCallBack);
} 


function signupProcess(transactionId, resultset)
{
    var count = resultset.rows.length;
    if(count < 1)
    {
        kony.db.transaction(dbObjectId, insertEmail, myTransactionErrorCallback, mySuccessCallback); 
      
    }else{
      	alert("このEメールが登録されています。"); 
    }
}

function insertEmail(dbId){
   var sqlStatement = 'INSERT INTO users (username, password) VALUES ("'+EMAIL_USER+'", "'+PASSWORD+'")';
   kony.db.executeSql(dbId, sqlStatement, null, successRegister, sql_errorCallBack);
}

function successRegister(transactionId, resultset){
    alert("登録完了！");
    signupFrm.password.text = "";
// 	loginFrm.show();
}

































