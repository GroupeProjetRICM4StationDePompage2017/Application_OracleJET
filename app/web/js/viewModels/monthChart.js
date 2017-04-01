/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * mothChart module
 */
define(['ojs/ojcore', 'knockout','ojs/ojchart', 'ojs/ojselectcombobox'
], function (oj, ko) {
    
    //Graphique d'archive
    function monthChartContentViewModel() {
        //récupération données globales
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        rootViewModel.monthVM = this;
        
        var self = this;
        
        //==================================>SELECTEUR
        self.month = ko.observableArray([
            {value: 'january', label: 'january'}, 
            {value: 'february', label: 'february'}, 
            {value: 'march', label: 'march'}, 
            {value: 'april', label: 'april'},
            {value: 'may', label: 'may'},
            {value: 'june', label: 'june'},
            {value: 'jully', label: 'jully'},
            {value: 'august', label: 'august'},
            {value: 'september', label: 'september'},
            {value: 'october', label: 'october'},
            {value: 'november', label: 'november'},
            {value: 'december', label: 'december'}
        ]);
        
        
        self.selectedMonth = ko.observable('january');
  
        //==================================>SELECTEUR YEAR
        var year = [];
        var yearNow = new Date().getFullYear();
        var firstyear = 2016;
        for(var y = firstyear; y<=parseInt(yearNow); y++)
        {
            year.push({value: y.toString(), label: y.toString()});
        }
        self.year = ko.observableArray(year);
        self.selectedYear = ko.observable(yearNow);
        
        
        //==================================>BAR
        self.barSeriesValue = ko.observableArray([]);
        self.barGroupsValue = ko.observableArray([]);
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
        
        //Charge les données du graphiques
        var update = function(params){
            $.ajax({
                url: "http://stationpompeco2017.hopto.org/data.php",
                type: 'GET',
                data : params,
                dataType: 'json',
                async: 'false',
                success: function (data, textStatus, jqXHR) {
                    
                    //On efface les valeurs précédentes
                    self.barSeriesValue.removeAll();
                    self.barGroupsValue.removeAll();
                    self.stackValue = ko.observable('off');
                    
                    //initialisation des varaibles
                    var taille = data.length;
                    var date = "";
                    var j;
                    var total;
                    var nb;
                    var donnee = [];
                    var axe = [];
                    var areaSeries = [];
                    
                    //rempllissage du tableau de donnée et de l'axe
                    for (var i = 0; i < taille; i++) 
                    {
                        if(date=="")
                        {
                            date=data[i]["date"];
                            total = 0;
                            j=0;
                            nb=0;
                        }
                        else if(date!=data[i]["date"])
                        {
                            axe[j]=date;
                            date=data[i]["date"];
                            areaSeries[j] = total/nb;
                            total=0;
                            nb=0;
                            j++;

                        }
                        total += parseInt(data[i]["level"]);
                        nb++;
                    }
                    //On ajoute les dernière valeurs
                    axe[j]=date;
                    areaSeries[j] = total/nb;
                    
                    donnee.push({name : 'niveau moyen/jours', items : areaSeries})
                    
                    //Mise à jour des valeurs
                    self.barGroupsValue(axe);
                    self.barSeriesValue(donnee);
                    self.stackValue = ko.observable('on');

                }});
        };
        
        //Si changement de selection du mois
        self.changeMonth = function(event, data) {
            if(data.value[0]!=undefined)
            {
                self.selectedMonth = ko.observable(data.value[0]);
                var params = {periode:self.selectedMonth.valueOf(),year:self.selectedYear.valueOf(),id:localStorage['idCarte']};
                update(params);
            }
        };
        
        //Si changement selection de l'année
        self.changeYear = function(event, data) {
            if(data.value[0]!=undefined)
            {
                self.selectedyear = ko.observable(data.value[0]);
                var params = {periode:self.selectedMonth.valueOf(),year:self.selectedYear.valueOf(),id:localStorage['idCarte']};
                update(params);
            }
        };
    }
    
    monthChartContentViewModel();
});

