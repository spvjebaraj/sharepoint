(function () {
    'use strict';

    angular
        .module('buildAutomationApp', [])
        .controller('BuildAutomationAppController', buildAutomationAppController);

    buildAutomationAppController.$inject = ['dataService'];

    function buildAutomationAppController(dataService) {
        var vm = this;
        vm.requestData = [];

        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getRequestDetails);
        function getRequestDetails() {
            return requestInfo().then(function (data) {
                if (typeof vm.requestData !== "undefined" && vm.requestData.length > 0) {
                    var html = "";
                    for (var i = 0; i < vm.requestData.length; i++) {
                        html += "<tr>";
                        html +=     "<td>" + vm.requestData[i].Title + "</td>";
                        html +=     "<td>" + vm.requestData[i].AssignedTo + "</td>";
                        html +=     "<td>" + vm.requestData[i].Priority + "</td>";
                        html +=     "<td>" + vm.requestData[i].RequestStatus + "</td>";
                        html += "</tr>";
                    }
                    angular.element("#requestTable").html(html);
                }
            })
            .catch(function (error) {
                vm.errorMessage = "Error in getting request details : " + Error;
            })
        }

        function requestInfo() {
            var listName = "Request Details";
            return dataService.getRequestData(listName).then(function (response) {
                if (response !== null) {
                    var itemCount = response.get_count();
                    var html = "";
                    for (var i = 0; i < itemCount; i++) {
                        var listItem = response.itemAt(i);
                        var assignedTo = listItem.get_item("AssignedTo");
                        vm.requestData.push({
                            "Title": listItem.get_item("Title"),
                            "AssignedTo": assignedTo.get_lookupValue(),
                            "Priority": listItem.get_item("Priority"),
                            "RequestStatus": listItem.get_item("RequestStatus")
                        });
                    }
                }
            });
        }
    }
})();
