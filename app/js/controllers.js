var getpaidControllers = angular.module('getpaidControllers', []);

//Service which returns all the receipts of the current user
getpaidControllers.factory('receiptDataSvc', function($http) {
	return {
		getReceipts: function() {
			return $http.get('./json/mock.json').then(function(result) {
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
			console.log(data);
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
			$scope.receipt = data[receiptId];
			console.log(data[receiptId].items);
		});

	}]);