function myTransactionErrorCallback(SQLError)
{
  // proceed with the logic
  alert("Ko doc dc transaction "+SQLError);
}

//The below function specifies the callback that must be executed if the transaction is successful.
function mySuccessCallback()
{
//  alert("ok transaction");
}


function sql_errorCallBack(err)
{
	 alert("loi sql");
}