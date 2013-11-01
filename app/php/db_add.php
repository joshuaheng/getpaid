<?php header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require("connect.php");

//pre set userid as 1 for now
$userID = 1;

$data = file_get_contents("php://input");
$postData = json_decode($data);

	//main receipt details
$storeName = $postData->storename;
$receiptDate = $postData->receiptDate;
$paid = $postData->paid;
$total = $postData->total;
$shared = $postData->sharedReceipt;

//validation code to ensure all our fields are valid before executing the query
if(isset($storeName, $receiptDate, $paid, $total, $shared)){
	$query = "INSERT INTO Receipt (receiptId, userId, total, shared, receiptDate, storeName, paid) VALUES (NULL, '$userID', '$total', '$shared', '$receiptDate', '$storeName', '$paid')";
	mysqli_query($dbConnection, $query);
	echo mysqli_insert_id($dbConnection);
}
?>