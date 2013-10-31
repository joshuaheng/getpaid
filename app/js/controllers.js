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

    //TO BE COMPLETED
    $scope.deleteReceipt = function(receiptId){
    	alert("Delete receipt " + $scope.receipts[receiptId-1].store + " ?");
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

//Controller to create a new receipt and add it to the database
getpaidControllers.controller('NewReceiptCtrl',['$scope',
	function($scope){
		var master = {
			storename:'',
			date:'',
			paid:'',
			items:[]
		};

		var resetNewItemFd = {
			name:'',
			quantity:'',
			cost:'',
			shared:'',
			users:[]
		};
		$scope.newItem={
			name:'',
			quantity:'',
			cost:'',
			shared:'',
			users:[]
		};

		//resets the form to the default settings
		$scope.cancel = function() {
			$scope.form = angular.copy(master);
			$scope.newItem = angular.copy(resetNewItemFd);
		};

		$scope.save = function() {
			master = $scope.form;
			$scope.cancel();
			//sends the whole array of item objects to server for insertion into database.
		};

		$scope.addItem = function(newitem) {
			$scope.form.items.push(newitem);
			$scope.newItem = angular.copy(resetNewItemFd);
			$scope.payer='';
		};

		$scope.addSharedUser = function(item,username){
			item.users.push(username);
			$scope.payer='';
		};

		$scope.removeItem = function(index) {
			$scope.form.items.splice(index, 1);
		};

		//by default if it is a shared receipt, paid will be set as false and vice versa.
		$scope.receiptPaid = function(value){
			$scope.form.paid = value;
			console.log(value);
		};

		$scope.cancel();
	}]);

//Miscellaneous functions
//function to retrieve the total expenditure for the month.
function getTotal(data){
	var total = 0;
	for(var i = 0; i < data.length; i++){
		total+=parseInt(data[i].amount, 10);
	}
	return total;
}