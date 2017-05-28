// Log func --------------------------------
var path =kony.io.FileSystem.getDataDirectoryPath();
myfile = kony.io.FileSystem.getFile(path+"/itdict_logs.txt");

function log(dataToLogo)
{
    myfile.createFile(); 
    var dataAdded = myfile.write("\n"+dataToLogo,true);
//     alert("IS DATA ADDED >>>>>>>"+dataAdded);
}

/**
 * @function
 *
 */
function checkIsSpecialChars(str)
{
  var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return format.test(str);
}

function addslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function exitApp()
{
   try{
         kony.application.exit();
      }
   catch(Error)
      {
         alert("申し訳ございません、えくじっとできません："+Error);
      }
}

function isEmailFormat(param)
{
	var emailReg=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(param===undefined || param===null){
      return false;
    }
    param=param.trim();
    if(param==="")
      return false;
    if(emailReg.test(param)===false){
      return false;
    }
    return true;
}

















