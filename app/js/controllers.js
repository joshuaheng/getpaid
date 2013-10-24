var getpaidControllers = angular.module('getpaidControllers', []);

/* Controllers */

//loads all the receipts in the main page
getpaidControllers.controller('ReceiptListCtrl', ['$scope', '$http','$location',
	function($scope, $http, $location) {
	//should get the 
	$http.get('./json/mock.json')
       .then(function(result){
          $scope.receipts = result.data;             
        });

    //to be directed to detailed receipt page
    $scope.receiptClicked = function(path){
    	alert(path);
    	$location.path(path);
    	}
}]);

getpaidControllers.controller('ReceiptDetailCtrl',['$scope','$routeParams',
	function($scope, $routeParams){
		$scope.receiptId = $routeParams.receiptId;
		
	}]);