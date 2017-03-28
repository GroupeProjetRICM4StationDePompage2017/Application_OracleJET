/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['knockout'],
        function(ko)
        {
            function chartViewModel() {
                var self = this;

                self.chartType = ko.observable("line");
                self.chartTypes = ko.observableArray([{value: 'line', label: 'Line'}, {value: 'pie', label: 'Pie'}, {value: 'bar', label: 'Bar'}, {value: 'area', label: 'Area'}]);
                self.selectionValue = ko.observable('Nothing selected');

                self.groupDataSeries = ko.observableArray(["Amy", "Gary", "Kris", "Paul", "Marge"]);
                self.seriesData = ko.observableArray([{name: "Build", items: [1, 0, 0, 2, 4]},
                    {name: "Code Revew", items: [0, 10, 1, 3, 8]},
                    {name: "Core", items: [4, 5, 3, 0, 1]},
                    {name: "Deployment", items: [0, 3, 1, 1, 5]},
                    {name: "Source Browsing", items: [0, 5, 2, 0, 2]},
                    {name: "Tasks", items: [0, 3, 1, 3, 4]},
                    {name: "Wiki", items: [1, 2, 3, 2, 1]}]);

                self.changeHandler = function(event, data) {
                    self.chartType(data.value[0]);
               };
            }

            return {'chartVM': chartViewModel};

        });