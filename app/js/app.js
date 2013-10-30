'use strict';


// Declare app level module which depends on filters, and services
var getpaidApp = angular.module('getpaidApp', [
  'ngRoute',
  'ngTouch',
  'getpaidControllers',
  'getpaidApp.filters',
  'getpaidApp.services',
  'getpaidApp.directives',
]);

getpaidApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/receipts', {templateUrl: 'partials/receipt-list.html', controller: 'ReceiptListCtrl'});
  $routeProvider.when('/receipts/add', {templateUrl: 'partials/receipt-new.html', controller: 'NewReceiptCtrl'});
  $routeProvider.when('/receipts/:receiptId', {templateUrl: 'partials/receipt-details.html', controller: 'ReceiptDetailCtrl'});
  $routeProvider.otherwise({redirectTo: '/receipts'});
}]);
