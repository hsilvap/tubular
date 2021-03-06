﻿(function() {
    'use strict';

    angular.module('tubular-chart.directives', ['tubular.services', 'chart.js'])
        /**
         * @ngdoc directive
         * @name tbChartjs
         * @restrict E
         *
         * @description
         * The `tbChartjs` directive is the base to create any ChartJs component.
         * 
         * @scope
         * 
         * @param {string} serverUrl Set the HTTP URL where the data comes.
         * @param {string} chartName Defines the chart name.
         * @param {string} chartType Defines the chart type.
         * @param {bool} requireAuthentication Set if authentication check must be executed, default true.
         */
        .directive('tbChartjs', [
            function() {
                return {
                    template: '<div class="tubular-chart">' +
                        '<canvas class="chart chart-base" chart-type="chartType" chart-data="data" chart-labels="labels" ' +
                        ' chart-legend="{{showLegend}}" chart-series="series" chart-click="onClick">' +
                        '</canvas>' +
                        '<div class="alert alert-info" ng-show="isEmpty">{{emptyMessage}}</div>' +
                        '<div class="alert alert-warning" ng-show="hasError">{{errorMessage}}</div>' +
                        '</div>',
                    restrict: 'E',
                    replace: true,
                    scope: {
                        serverUrl: '@',
                        requireAuthentication: '=?',
                        showLegend: '@?',
                        name: '@?chartName',
                        chartType: '@?',
                        emptyMessage: '@?',
                        errorMessage: '@?',
                        onLoad: '=?',
                        onClick: '=?'
                    },
                    controller: [
                        '$scope', 'tubularHttp',
                        function($scope, tubularHttp) {
                            $scope.tubularDirective = 'tubular-chart';
                            $scope.dataService = tubularHttp.getDataService($scope.dataServiceName);
                            $scope.showLegend = angular.isUndefined($scope.showLegend) ? true : $scope.showLegend;
                            $scope.chartType = $scope.chartType || 'Line';

                            // Setup require authentication
                            $scope.requireAuthentication = angular.isUndefined($scope.requireAuthentication) ? true : $scope.requireAuthentication;

                            $scope.loadData = function() {
                                tubularHttp.setRequireAuthentication($scope.requireAuthentication);

                                tubularHttp.get($scope.serverUrl).promise.then(function (data) {
                                    if (!data || !data.Data || data.Data.length === 0) {
                                        $scope.isEmpty = true;
                                        $scope.options.series = [{ data: [] }];

                                        if ($scope.onLoad) {
                                            $scope.onLoad($scope.options, {});
                                        }

                                        return;
                                    }

                                    $scope.isEmpty = false;

                                    $scope.data = data.Data;
                                    $scope.series = data.Series;
                                    $scope.labels = data.Labels;

                                    if ($scope.onLoad) {
                                        $scope.onLoad($scope.options, data);
                                    }
                                }, function(error) {
                                    $scope.$emit('tbChart_OnConnectionError', error);
                                });
                            };

                            $scope.$watch('serverUrl', function(val) {
                                if (angular.isDefined(val) && val != null) {
                                    $scope.loadData();
                                }
                            });
                        }
                    ]
                };
            }
        ]);
})();