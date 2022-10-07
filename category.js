'use strict';

angular
.module('activeProtectiveApp')
.controller('category',function($scope, API_URL, $http, $window, $timeout, $state,$rootScope, alert, NgTableParams, $filter) {
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

	var uploadConfig = {
		headers: {
			"authorization": $window.localStorage.getItem("userToken"),
			"username": $window.localStorage.getItem("username"),
			"Content-Type": undefined
		}
	};

	getCategoryList();

	function getCategoryList() {
            var Url = API_URL + 'api/v1/getCategories';
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

	$scope.createCategory = function () {
		console.log("eeeee");
		var Url = API_URL + 'api/v1/createCategory';
		var data = $scope.accountdata;
		console.log(data);
		var categoryImage = document.getElementById("categoryImage").files[0];
		var formData = new FormData(); 
		formData.append('category_id', $scope.accountdata.category_id);
		formData.append('categoryName', $scope.accountdata.categoryName);
		formData.append('categoryImage',categoryImage);

		$http.post(Url, formData, uploadConfig)
			.then(function (data, status, headers, config) {
				$('#exampleModal').modal('hide');
				 $scope.accountdata = {};
				if (data.data.status == 0) {
					$scope.users="";
					alert('warning', 'Error : ', data.data.errorMessage, 5000);
				}
				else {
					getCategoryList();
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

	$scope.viewAddAccount  = function (){
		// $scope.accountdata = {};
		$scope.addAccountform.$setPristine();
		$scope.addAccountform.$setUntouched();
		$('#exampleModal').modal('show');
		$("#addAccountform").trigger("reset");
		$('#addAccountform :input:enabled:visible:not([readonly="readonly"]):first').focus();
		$('input[name="userName"]').val("");
		$('input[name="password"]').val("");
	}
	$scope.viewUpdateAccount  = function (data){
		$('#editPopup').modal('show');
		$('#updateAccountform :input:enabled:visible:not([readonly="readonly"]):first').focus();
		$scope.editData = {
			"category_id"  :data.category_id,
			"categoryName":data.categoryName,
		};
	}
	$scope.cancelAdd  = function (){
		$('#exampleModal').modal('hide');
	}
	$scope.cancelUpdate  = function (){
	  $('.modal').modal('hide');
	}
	$scope.updateAccount  = function (editData){
		//jsonEmpty.check(editData);
		var Url = API_URL + 'api/v1/updateCategory';
		alert('warning', '', 'Please Wait ...', 8000);
		$http.post(Url, editData, config)
			.then(function (data, status, headers, config) {
				$('#resetPopup').modal('hide');
				$('.modal').modal('hide');
				$scope.editData = {};
					alert('success', 'Success!', 'Account updated successfully.', 5000);
					getCategoryList();
				
			})
	}
	$scope.deleteAccountModal  = function (category_id,categoryName){
		$scope.deleteitem = {
			"category_id"  :category_id,
			"categoryName":categoryName,
		};
		$("#UserConfirmPopup").modal("show");
	}

	$scope.deleteAccount  = function (category_id,categoryName){
		$("#UserConfirmPopup").modal("hide");
		var data = {
			"category_id"  :category_id,
			"categoryName":categoryName,
		};
		console.log(data.categoryName)
		var Url = API_URL + 'api/v1/deleteCategory';

			alert('warning', '', 'Please Wait ...', 8000);
			$http.post(Url, data, config)
				.then(function (data, status, headers, config) {
					if (data.data.status == 0) {
						alert('warning', 'Error : ', data.data.errorMessage, 5000);
					}
					else {
						alert('success', 'Success!', 'category deleted successfully.', 5000);
						getCategoryList();
					}
				})
	} 
  

	/*var uploadConfig = {
		headers: {
			"authorization": $window.localStorage.getItem("userToken"),
			"username": $window.localStorage.getItem("username"),
			"Content-Type": undefined
		}
	}; 


	var accId = $window.localStorage.getItem("accountId");
	$scope.firmwareAssignPage = function(firmwareVersion,createdEpochMs,firmwareName,compatibility){
		$window.localStorage.setItem("firmwareVersion", firmwareVersion);
		$window.localStorage.setItem("firmwareName", firmwareName);
		$state.go("main.firmwareAssign");
	};

	var accessRole = $window.localStorage.getItem("accessRole");
	$scope.accessRole = accessRole;

	var compatibility = $window.localStorage.getItem("compatibility");
	$scope.compatibility = compatibility;
	
	var firmwareVersion = $window.localStorage.getItem("firmwareVersion");
	$scope.firmwareVersion = firmwareVersion;

	var firmwareName = $window.localStorage.getItem("firmwareName");
	$scope.firmwareName = firmwareName;

   $scope.uploadImage = function () {
			var notes = document.getElementById("notes").value;
            var firmwareName = document.getElementById("firmwareName").value;
            var firmwareVersion = document.getElementById("firmwareVersion").value;
            var userName = document.getElementById("userNameTemp").value;
            var Url = API_URL + 'api/v1/cateUpload';
			var formData = new FormData(); 
			formData.append('firmwareName', firmwareName);
			formData.append('notes', notes);
			formData.append('firmwareVersion', tmpFileName);
			formData.append('userName', userName);
			formData.append('firmWareUpload',firmWareUpload);
			alert('warning', 'Please Wait', '.....', 40000);
			$http.post(Url, formData,uploadConfig)
			.then(function (data, status, headers, uploadConfig) {
				if (data.data.status == 0) {
					alert('warning', 'Error : ', data.data.errorMessage, 5000);
				}
				else {
					document.getElementById("firmwareVersion").value="";
					document.getElementById("firmwareName").value="";
					document.getElementById("firmWareUpload").value="";
					alert('success', 'Success!', data.data.message, 5000);
				}
			},function (data, status, header, uploadConfig) {
					if (data.data.status == 0) {
						alert('warning', 'Error : ', data.data.errorMessage, 5000);
					} else {
						alert('warning', 'Error : ', 'Server Failed to Respond');
					}
				}); 
		},function (data, status, header, config) {
			if (data) {
				alert('warning', 'Error : ', data.errorMessage, 5000);
			} else {
				alert('warning', 'Error : ', 'No Response from Server', 5000);
			}
		}	 */
});


 

 






