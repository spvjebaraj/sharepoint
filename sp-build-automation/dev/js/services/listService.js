(function () {
    'use strict';

    angular
        .module('buildAutomationApp')
        .factory('listService', listService);

    listService.$inject = ['$http', '$q'];

    function listService($http, $q) {
        var baseUrl = _spPageContextInfo.siteAbsoluteUrl;

        var service = {
            getListItems: getListItems
        };

        return service;

        function getListItems(query, listName) {
            var d = $q.defer();
            var context = null;
            if (baseUrl != '') {
                context = new SP.ClientContext(baseUrl);
            }
            else {
                context = new SP.ClientContext();
            }
            var web = context.get_web();
            var list = web.get_lists().getByTitle(listName);
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(query);
            var items = list.getItems(camlQuery);
            context.load(items);
            context.executeQueryAsync(
                function () {
                    d.resolve(items);
                },
                function (sender, args) {
                    d.reject(args);
                }
            );
            return d.promise;
        }
    }
})();