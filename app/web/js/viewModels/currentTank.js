define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojpictochart'
], function (oj, ko) {
    /**
     * The view model for the current state of the selected tank
     */
    function currentTankViewModel() {
        //Récupération des données globales
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        rootViewModel.currTank = this;
        
        var self = this;
        
        //Création du graphe de niveau
        self.pourcentCuve = ko.observable("0%");
        var colorHandler = new oj.ColorAttributeGroupHandler();
        var colorMap = {jb: 0, jb2: 0};
        var donnee = [
            {id: "jb", name: 'Niveau de la Cuve: 0%', shape: 'circle', count: 64},
            {id: "jb2", name: 'Niveau de la Cuve: 0%', shape: 'circle', color: colorHandler.getValue(colorMap["jb"]), count: 0}
        ];
        this.pictoChartItems1 = ko.observableArray(donnee);

        $(".stat1").css({color: colorHandler.getValue(colorMap["jb"])});
        
        //Création des données du graphe de batterie
        self.batterie = ko.observable(0);
        /*
         * Rouge de 0 à 33, jaune de 33 à 67 et vert >67
         */
        self.thresholdValues = [{max: 33}, {max: 67}, {}];
        
        
        //Fonction permettant d'actualiser les informations concernant la cuve selectionnée
        var update = function(){
            $.ajax({
        url: "http://stationpompeco2017.hopto.org/data.php",
        type: 'GET',
        dataType: 'json',
        async: 'false',
        data:{id:localStorage['idCarte']},
        success: function (data, textStatus, jqXHR) {
            //Mise a jour du graphe de niveau
            var mesure = data["level"];
            var niveau = 100 * mesure / 8;                        
            donnee[0]["count"] = 64 - (mesure*8);
            donnee[1]["count"] = mesure*8;
            donnee[0]["name"] = "Niveau de la Cuve: "+niveau+"%";
            donnee[1]["name"] = "Niveau de la Cuve: "+niveau+"%";

            self.pourcentCuve(niveau+"%");
            self.pictoChartItems1(donnee);
            self.stackValue = ko.observable('on');
            //Mise a jour du graphe de baterrie
            self.batterie(data["levelbaterie"]*10);

        }});
};
        
        
        // Tooltip elem for data items
        var tooltipElem = document.createElement('div');
        tooltipElem.style.padding = '3px';
        tooltipElem.style.textAlign = 'center';
        tooltipElem.style.fontWeight = 'bold';
        tooltipElem.style.color = '#606060';

        this.tooltipFunction = function (dataContext) {
            // Set a thick border for the data item tooltip
            var colorVal = colorMap[dataContext.id];
            dataContext.parentElement.style.borderWidth = "4px";
            dataContext.parentElement.style.borderColor = colorHandler.getValue(colorVal);
            tooltipElem.textContent = dataContext.name;
            // Return the elem and the chart will append it to the parentElement
            return tooltipElem;
        }
        
       update();
    
       
        
    }

    return currentTankViewModel;
});
