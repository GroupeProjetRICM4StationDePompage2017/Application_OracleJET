/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dayChart module
 */
define(['ojs/ojcore', 'knockout','ojs/ojchart', 'ojs/ojgauge'
], function (oj, ko) {
    /**
     * The view model for the last 24 hours graph
     */
    function dayChartContentViewModel() {
                var self = this;
                var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
                rootViewModel.day = this;
                var donnee = [];
                var axe = [];
                var areaSeries = [];
                
                //Variables du graphes
                self.areaSeriesValue = ko.observableArray([]);
                self.areaGroupsValue = ko.observableArray([]);
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('vertical');
                
                
                var params = {periode:'24',id:localStorage['idCarte']};
                // Load the last data 24 hours data
                
                var update= function(){   $.ajax({
                        url: "http://stationpompeco2017.hopto.org/data.php",
                        type: 'GET',
                        data : params,
                        dataType: 'json',
                        async: 'false',
                        success: function (data, textStatus, jqXHR) {
                            self.areaGroupsValue.removeAll();
                            self.areaSeriesValue.removeAll();
                            
                            //Mise à jour du graph
                            var taille = data.length;
                            for (var i = 1; i <= taille; i++) 
                            {
                                areaSeries[i-1] = parseInt(data[taille-i]["level"]);
                                axe[i-1] = data[taille-i]["time"];
                            }
                            donnee.push({name : "Aujourd'hui", items : areaSeries})
                            self.areaGroupsValue(axe);
                            self.areaSeriesValue(donnee);
                            self.stackValue = ko.observable('on');
                            
                        }});
            };
    update();    
    }
            return dayChartContentViewModel;

});

/**/