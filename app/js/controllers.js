var getpaidControllers = angular.module('getpaidControllers', []);

//Service which returns all the receipts of the current user
getpaidControllers.factory('receiptDataSvc', function($http) {
	return {
		getReceipts: function() {
			return $http.get('https://web.engr.illinois.edu/~heng3/getpaid/app/php/db_get.php').then(function(result) {
				return result.data;
			});
		}
	}
});

/* Controllers */
//loads all the receipts in the main page
getpaidControllers.controller('ReceiptListCtrl', ['$scope', '$location','receiptDataSvc',
	function($scope,$location,receiptDataSvc) {
		receiptDataSvc.getReceipts().then(function(data){
			$scope.receipts = data;
			$scope.total = getTotal(data);
		});


    //to be directed to detailed receipt page when a receipt is clicked on the main page
    $scope.receiptClicked = function(receiptId){
    	$location.path('/receipts/'+receiptId.toString());
    }
}]);

//changes the view to the detailed receipt view based on the receiptId
getpaidControllers.controller('ReceiptDetailCtrl',['$scope','$routeParams', 'receiptDataSvc',
	function($scope, $routeParams, receiptDataSvc){

		$scope.receiptId = $routeParams.receiptId;
		var receiptId = $scope.receiptId;
		console.log(receiptId);
		receiptDataSvc.getReceipts().then(function(data){
			//offset by 1 because data is 0 indexed. Our receiptId starts from 1 in the db.
			$scope.receipt = data[receiptId-1];
			$scope.total = data[receiptId-1].amount;
			console.log(data[receiptId-1].items);
		});

	}]);

//function to retrieve the total expenditure for the month.
function getTotal(data){
	var total = 0;
	for(var i = 0; i < data.length; i++){
		total+=parseInt(data[i].amount, 10);
	}
	return total;
}