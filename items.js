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
					console.log("1",data.data);
					$scope.data1 = data.data.Items;
					console.log("2",data.data.Items);
					
				}
			})  
        }

	$scope.createItem= function () {
		var Url = API_URL + 'api/v1/createItem';
		var data = $scope.Communitydata;
		console.log("eeeee",data);
		$http.post(Url, data, config)
		.then(function (data, status, headers, config) {
			$('#CommunityAddModal').modal('hide');
			 $scope.Communitydata = {};
			if (data.data.status == 0) {
				$scope.users="";
				alert('warning', 'Error : ', data.data.errorMessage, 5000);
			}
			else {
				getItem();
			}
		},function (data, status, header, config) {
			$('#CommunityAddModal').modal('hide');
			$scope.Communitydata = {};
			if (data.data.status == 0) {
				alert('warning', 'Error : ', data.data.errorMessage, 5000);
			} else {
				alert('warning', 'Error : ', 'Server Failed to Respond', 5000);
			}
		})
	} 
	function getCategoryList() {
		var Url = API_URL + 'api/v1/getCategories';
		var data;
		
		$http.post(Url, data, config)
			.then(function (data, status, headers, config) {
				if (data.data.status == 0) {
					$scope.categories="";
					alert('warning', 'Error : ', data.data.errorMessage, 5000);
				}
				else {
					console.log(data.data);
					$scope.categories = data.data.Items;
					// console.log("s")
					// console.log(data.data.Items);
					// for(var i = 0;i<categories.length;i++){
					// 	categories[i].categoryName = categories[i].category_id
					// }
					
				}
			})  
}
$scope.viewCommunityAdd  = function (){
	$scope.communityForm.$setPristine();
	$scope.communityForm.$setUntouched();
	$('#timeZoneadd').val(Intl.DateTimeFormat().resolvedOptions().timeZone);
	$('#CommunityAddModal').modal('show');
	$('#communityForm :input:enabled:visible:not([readonly="readonly"]):first').focus();
}
$scope.viewUpdateCommunity  = function (data){
	$('#CommunityeditModal').modal('show');
	$('#PropertyForm :input:enabled:visible:not([readonly="readonly"]):first').focus();
	$scope.editData = {
		"item_id"  :data.item_id,
		"itemName" :data.itemName,
		//"categoryName": categoryName
	};
}
$scope.ModalCancel  = function (){
	$('.modal').modal('hide');
}
	$scope.updateCommunity  = function (editData){
		var Url = API_URL + 'api/v1/updateItem';
		//editData.categoryName = $('#accountIdEdit option:selected').text();
		alert('warning', '', 'Please Wait ...', 8000);
		$http.post(Url, editData, config)
			.then(function (data, status, headers, config) {
			$('.modal').modal('hide');
				$scope.editData = {};
				alert('success', 'Success!','updated successfully.', 5000);
				getItem();
			})
	}
		$scope.deleteCommunityModal  = function(item_id,itemName){
			$scope.deleteitem = {
			"item_id"  : item_id,
			"itemName" :itemName
		   };
			$("#CommunityConfirmPopup").modal("show");
			}

		$scope.deleteCommunity  = function (item_id,itemName){
			$('.modal').modal('hide');
			var data = {
				"item_id"  : item_id,
				"itemName" :itemName
			};
			$("#CommunityConfirmPopup").modal("hide");
			var Url = API_URL + 'api/v1/deleteItem';

			alert('warning', '', 'Please Wait ...', 8000);
            $http.post(Url, data, config)
                .then(function (data, status, headers, config) {
                $scope.aptAdmindata = {};
                if (data.data.status == 0) {
                    alert('warning', 'Error : ', data.data.errorMessage, 5000);
                }
                else {
                    alert('success', 'Success!', data.data.message, 5000);
                    getItem();
                }
            },function (data, status, header, config) {
                $scope.aptAdmindata = {};
                if (data.data.status == 0) {
                    alert('warning', 'Error : ', data.data.errorMessage, 5000);
                } else {
                    alert('warning', 'Error : ', 'Server Failed to Respond', 5000);
                }
				
			});
		}

});