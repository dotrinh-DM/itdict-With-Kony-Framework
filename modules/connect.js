var dbObjectId;
function connectDB(){
  var destFilePath = kony.io.FileSystem.getDatabaseDirectoryPath()+"liveitdic.db";
  var fileObj = null;
  try{
//       var file = new kony.io.File(destFilePath);
//       if(!file.exists()){
        fileObj = kony.io.FileSystem.copyBundledRawFileTo("itdict.sqlite3", destFilePath);
//       }
  } catch(e) { 
    alert("Loi Exception "+e);
  }
  dbObjectId = kony.db.openDatabase("liveitdic.db", "1.0", "Prebundled SQL Database - db dc dong goi trc", 9 * 1024 * 1024);
}
