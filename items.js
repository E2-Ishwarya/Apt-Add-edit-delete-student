'use strict';

angular
.module('activeProtectiveApp')
.controller('items',function($scope, API_URL, $http, $window, $timeout, $state,$rootScope, alert, NgTableParams, $filter) {
    localStorage.setItem("dashboardAccountId",undefined);
    localStorage.setItem("dashboardCommunityId",undefined);
    localStorage.setItem("metricsdashboardAccountId",undefined);
    localStorage.setItem("metricsdashboardCommunityId",undefined);
    localStorage.setItem("metricswearerName",undefined);
    localStorage.setItem("wearerName",undefined);
    localStorage.setItem("metricsCount",undefined);
    localStorage.setItem("metricsPage",undefined);
    localStorage.setItem("dashboardCount",undefined);
    localStorage.setItem("dashboardPage",undefined);
    localStorage.setItem("dashboarddeviceId",undefined);
    localStorage.setItem("metricsdeviceId",undefined);
    var username = $window.localStorage.getItem("username");
    var accountId = $window.localStorage.getItem("accountId");
    var communityId = $window.localStorage.getItem("communityId");
    var accessRole = $window.localStorage.getItem("accessRole");
    $scope.showInventory = "show";
    $scope.accessRole = accessRole;

    var config = {
		headers: {
			"authorization": $window.localStorage.getItem("userToken"),
			"username": $window.localStorage.getItem("username"),
			"Content-Type": "application/json"
		}
	};

	getItem();
	getCategoryList();

	function getItem() {
            var Url = API_URL + 'api/v1/getItem';
            var data;
			$http.post(Url, data, config)
			.then(function (data, status, headers, config) {
				if (data.data.status == 0) {
					$scope.users="";
					alert('warning', 'Error : ', data.data.errorMessage, 5000);
				}
				else {
					console.log(data.data);
					$scope.data1 = data.data.Items;
					console.log(data.data.Items);
				}
			})  
        }

	$scope.createItem= function () {
		console.log("eeeee");
		var Url = API_URL + 'api/v1/createItem';
		var data = $scope.accountdata;
		console.log(data);
		$http.post(Url, data, config)
		.then(function (data, status, headers, config) {
			$('#exampleModal').modal('hide');
			 $scope.accountdata = {};
			if (data.data.status == 0) {
				$scope.users="";
				alert('warning', 'Error : ', data.data.errorMessage, 5000);
			}
			else {
				getItem();
			}
		},function (data, status, header, config) {
			$('#exampleModal').modal('hide');
			$scope.accountdata = {};
			if (data.data.status == 0) {
				alert('warning', 'Error : ', data.data.errorMessage, 5000);
			} else {
				alert('warning', 'Error : ', 'Server Failed to Respond', 5000);
			}
		})
	}

	$scope.viewCommunityAdd  = function (){
		$scope.communityForm.$setPristine();
		$scope.communityForm.$setUntouched();
		$('#timeZoneadd').val(Intl.DateTimeFormat().resolvedOptions().timeZone);
		$('#CommunityAddModal').modal('show');
		$('#communityForm :input:enabled:visible:not([readonly="readonly"]):first').focus();
		$("#phone").val("");
		$("#email").val("");
		$("#phones").html("");
		$("#emails").html("");
		$(".invalidEmailId").css('display','none');
		$(".invalidPhoneno").css('display','none');
		$('input[name=beltLicense]').prop("disabled", "");
	}
	$scope.ModalCancel  = function (){
		$('.modal').modal('hide');
	}
	function getCategoryList() {
		var Url = API_URL + 'api/v1/getCategory';
		var data;
		
		$http.post(Url, data, config)
			.then(function (data, status, headers, config) {
				if (data.data.status == 0) {
					$scope.users="";
					alert('warning', 'Error : ', data.data.errorMessage, 5000);
				}
				else {
					console.log(data.data);
					$scope.data1 = data.data.Items;
					console.log(data.data.Items);
				}
			})  
}

});