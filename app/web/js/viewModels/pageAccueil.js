/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * pageAccueil module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojinputnumber', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox'
], function (oj, ko) {
     /**
     * The view model for the main content view template
     */
    function pageAccueilContentViewModel() {
        //Vérification de connexion
        var yetVisited = localStorage['visited'];
        if (yetVisited !== "true") {
            window.location.href = 'index.html';
            return;
        }
        
        var self = this;
        //Selection de l'id de la carte
        self.selectVal = ko.observableArray([]);
        self.boards = ko.observableArray([]);
        //Récupération des id de toutes les cartes
        $.ajax({
                url: "http://stationpompeco2017.hopto.org/device.php",
                type: 'GET',
                dataType: 'json',
                async: 'true',
                success: function (data, textStatus, jqXHR) {
                    for(var i=0; i<data.length;i++){
                        self.boards.push({value:data[i]["idDevice"],label:data[i]["idDevice"]});
                    }
                    //self.selectVal.push(data[0]["idDevice"]);
                    self.selectVal.push(data[0]["idDevice"]);
        }});
        self.blop = "-1";
        self.count = 0;
    
        //Lors d'un changement de device, mise a jours de tous les graphiques.
        self.changeDevice = function(event, data) {
            var s = self.selectVal()[0];
            if(localStorage['idCarte'] !== s ){
                localStorage['idCarte']= s;
            }
            if(self.blop!=s){
                self.blop = s;
                self.count++;
                if(self.count>2){
                    var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
                    
                    ko.cleanNode(document.getElementById('complementaryContent'))
                    ko.applyBindings(rootViewModel.currentTankViewModel, document.getElementById('complementaryContent'))
                    
                    ko.cleanNode(document.getElementById('dayContent'))                    
                    ko.applyBindings(rootViewModel.dayChartContentViewModel, document.getElementById('dayContent'))
                    
                    ko.cleanNode(document.getElementById('month'))                    
                    ko.applyBindings(rootViewModel.monthChartContentViewModel, document.getElementById('month'))
                }
            }
        };
        
    
    }
    
    return pageAccueilContentViewModel;
});
