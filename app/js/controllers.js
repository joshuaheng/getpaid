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
getpaidControllers.controller('NewReceiptCtrl',['$scope','$http',
	function($scope,$http){
		var master = {
			storename:'',
			receiptDate:'',
			paid:'',
			sharedReceipt:'',
			total:0.00,
			items:[]
		};

		var resetNewItemFd = {
			name:'',
			quantity:'',
			cost:0.00,
			shared:'',
			users:[]
		};
		

		//resets the form to the default settings
		$scope.cancel = function() {
			$scope.form = angular.copy(master);
			$scope.newItem = angular.copy(resetNewItemFd);
		};

		$scope.save = function() {
			var data = $scope.form;
			//sends the whole array of item objects to server for insertion into database.
			/*1) insert new receipt into db first (should get unique receiptid back)
			  2) insert payers into db with itemid and receiptid (should get unique payer number back)
			  3) insert items into db with the returned receiptid and payer number
			*/
			console.log(data.storename + "" + data.receiptDate+""+data.paid+""+data.sharedReceipt+""+data.total);
			$http.post('https://web.engr.illinois.edu/~heng3/getpaid/app/php/db_add.php',data)
			.success(function(response,status){
				console.log(response);
			})
			.error(function(response, status) {
     		// this isn't happening:
     		console.log(response);
   			});
			$scope.cancel();
		};

		$scope.addItem = function(newitem) {
			$scope.form.items.push(newitem);
			$scope.form.total+=parseFloat(newitem.cost);
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
		$scope.receiptPaid = function(obj, value){
			if(obj=="item")
				$scope.form.paid = value;
			else
				$scope.form.sharedReceipt = value;
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