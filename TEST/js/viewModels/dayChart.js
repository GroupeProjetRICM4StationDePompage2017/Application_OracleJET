/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dayChart module
 */
define(['ojs/ojcore', 'knockout','ojs/ojchart'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function dayChartContentViewModel() {
                var self = this;
 
                var donnee = [];
                var axe = [];
                var areaSeries = [];
                
                self.areaSeriesValue = ko.observableArray([]);
                self.areaGroupsValue = ko.observableArray([]);
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('vertical');
                
                var params = {periode:'24'};
                // Load the artists data
                ko.computed(function () {
                    $.ajax({
                        url: "http://stationpompeco2017.hopto.org/server/data.php",
                        type: 'GET',
                        data : params,
                        dataType: 'json',
                        async: 'false',
                        success: function (data, textStatus, jqXHR) {
                            console.log("Success");
                            var taille = data.length;
                            for (var i = 1; i <= taille; i++) 
                            {
                                //console.log(data[taille-i]);
                                areaSeries[i-1] = parseInt(data[taille-i]["level"]);
                                axe[i-1] = data[taille-i]["time"];
                            }
                            console.log("fin chargement data");
                            
                            donnee.push({name : "Data24", items : areaSeries})
                            //console.log("mise à jour");
                            //console.log(donnee);
                            //console.log(axe);
                            
                            self.areaGroupsValue(axe);
                            self.areaSeriesValue(donnee);
                            self.stackValue = ko.observable('on');
                            
                        }});
                }, this);
  
                
                
      
            }
            return new dayChartContentViewModel();

});

/**/