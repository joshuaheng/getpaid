<?php header('Access-Control-Allow-Origin: *');
	require("connect.php");

	//preset userID to be 1 for now(person who is logged into the app)
	$userID = 1;
	$outputArray = array();
	$receipt = array();

	$result = mysqli_query($dbConnection,"SELECT receiptid,storeName,total,paid FROM Receipt WHERE userId = $userID");

	//each $row is an array of details from Receipts table that matches our userID
	while($row = mysqli_fetch_array($result))
  	{
  		$receiptID = $row[0];
  		//Query to get all items based on current $receiptID
  		$itemQuery = mysqli_query($dbConnection,"SELECT name, cost FROM Item WHERE receiptId = $receiptID"); 

  		$receipt['id']=$row[0];
  		$receipt['store'] = $row[1];
  		$receipt['amount'] = $row[2];
  		$receipt['paid'] = $row[3];
  		$receipt['items'] = array();
  		while($itemRow = mysqli_fetch_array($itemQuery)){
  			$receipt['items'][$itemRow[0]] = $itemRow[1];
  		}
  		array_push($outputArray,$receipt);
  		$receipt = array();
  	}
  	echo json_encode($outputArray);
?>