var myApp = angular.module('myApp', []);

/* Controllers */

//loads the data for main page
myApp.controller('MainPgCtrl', function($scope, $http) {
	//should get the 
	$http.get('./json/mock.json')
       .then(function(result){
          $scope.receipts = result.data;             
        });

    //to be directed to detailed receipt page
    $scope.receiptClicked = function(id){
    	alert(id);
    }
});