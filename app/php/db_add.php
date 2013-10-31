<?php header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	require("connect.php");
	$userID = 1;

	$data = file_get_contents("php://input");
	$postData = json_decode($data);
	
	//main receipt details
	$storeName = $postData->storename;
	$receiptDate = $postData->receiptDate;
	$paid = $postData->paid;
	$total = $postData->total;
	$shared = $postData->sharedReceipt;

	$query = "INSERT INTO Receipt (receiptId, userId, total, shared, receiptDate, storeName, paid) VALUES (NULL, '$userID', '$total', '$shared', '$receiptDate', '$storeName', '$paid')";
	mysqli_query($dbConnection, $query);
	echo mysqli_insert_id($dbConnection);
?>