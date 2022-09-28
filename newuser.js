'use strict';

angular
.module('activeProtectiveApp')
.controller('newUser',function($scope, API_URL, $http, $window, $timeout, $state,$rootScope, alert, NgTableParams, $filter) {
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
	var communityMap = new Map();
	var accessRole = $window.localStorage.getItem("accessRole");
	$scope.accessRole = accessRole;
	var userDetails="";
	$scope.getNumbers = function() {
		console.log("test---");
		var Url = API_URL + 'api/v1/getnumbers';
		var data = {
			number1 : 7,
			number2 : 3
		}
		$http.post(Url, data, config)
			.then(function (data, status, headers, config) {
				if (data.data.status == 0) {
					$scope.users="";
					alert('warning', 'Error : ', data.data.errorMessage, 5000);
				}
				else {
				console.log(data.data);

				}
			},function (data, status, header, config) {
				if (data) {
					alert('warning', 'Error : ', data.errorMessage, 5000);
				} else {
					alert('warning', 'Error : ', 'No Response from Server', 5000);
				}
			});
	}
	getStudentList();

	function getStudentList() {
            var Url = API_URL + 'api/v1/getStudents';
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
						$scope.tableParams = new NgTableParams({
                            page: 1,
                            count: 10,
                            sorting: { userName: "asc" } 
                        }, {
                            getData: function(params) {
                                params.total(data.data.length);
                                var orderedData = params.sorting() ?$filter('orderBy')(data.data, params.orderBy()) :data.data;
                                params.settings({ counts: data.data.length > 10 ? [10, 25, 50,100] : []});
                                $scope.data1 = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                return $scope.data1;
                            }

                        });
                    }
                })
				
        
	}

	$scope.createStudents = function () {
		console.log("eeeee");
		var Url = API_URL + 'api/v1/createStudent';
		var data = $scope.accountdata;
		$http.post(Url, data, config)
			.then(function (data, status, headers, config) {
				if (data.data.status == 0) {
					$scope.users="";
					alert('warning', 'Error : ', data.data.errorMessage, 5000);
				}
				else {
					getStudentList();
				}
			})
	}

	$scope.viewAddAccount  = function (){
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
			"studentId": data.studentId,
			"name": data.name,
			"studentAge": data.studentAge,
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
		var Url = API_URL + 'api/v1/updateStudent';
		alert('warning', '', 'Please Wait ...', 8000);
		$http.post(Url, editData, config)
			.then(function (data, status, headers, config) {
				$('.modal').modal('hide');
				$scope.editData = {};
					alert('success', 'Success!', 'Account updated successfully.', 5000);
					getStudentList();
				
			})
	}
	$scope.deleteAccountModal  = function (studentId,name,studentAge){
		$scope.deleteitem = {
			"studentId"  :studentId,
			"name":name,
			"studentAge":studentAge
		};
		$("#UserConfirmPopup").modal("show");
	}

	$scope.deleteAccount  = function (studentId,name,studentAge){
		$("#UserConfirmPopup").modal("hide");
		var data = {
			"studentId"  :studentId,
			"name":name,
			"studentAge":studentAge
		};
		console.log(data.studentId)
		var Url = API_URL + 'api/v1/deleteStudent';

			alert('warning', '', 'Please Wait ...', 8000);
			$http.post(Url, data, config)
				.then(function (data, status, headers, config) {
					if (data.data.status == 0) {
						alert('warning', 'Error : ', data.data.errorMessage, 5000);
					}
					else {
						alert('success', 'Success!', 'Student deleted successfully.', 5000);
						getStudentList();
					}
				})
	}

});