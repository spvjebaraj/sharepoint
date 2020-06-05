(function () {
    'use strict';

    angular
        .module('buildAutomationApp')
        .factory('dataService', dataService);

    dataService.$inject = ['listService'];

    function dataService(listService) {
        var service = {
            getRequestData: getRequestData
        };

        return service;

        function getRequestData(listName) {
            var query = '<View>'
                        +   '<Query>'
                        +       '<OrderBy><FieldRef Name="ID" Ascending=\'TRUE\' /></OrderBy>'
                        +       '<Where>'
                        +           '<IsNotNull>'
                        +               '<FieldRef Name="Title" />'
                        +           '</IsNotNull>'
                        +       '</Where>'
                        +   '</Query>'
                        + '</View>';
            return listService.getListItems(query, listName);
        }
    }
})();