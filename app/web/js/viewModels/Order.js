/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Order module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
       'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojbutton', 'ojs/ojpopup', 'ojs/ojselectcombobox'
   ],
    function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function OrderContentViewModel() {
        //Gestion de la connexion
        var yetVisited = localStorage['visited'];
        console.log(yetVisited);
        if(yetVisited!=="true") {
            console.log("SessionOK");
            window.location.href='index.html';
            return;
        }
        
                 
        var self = this;
        
         self.blop = "-1";
        self.count = 0;
    
       //Lors d'un changement de device, mise a jours de tous les graphiques.
        self.changeDevice = function(event, data) {
            var s = self.selectVal()[0];
            if(localStorage['idCarteOrdre'] !== s ){
                localStorage['idCarteOrdre']= s;
            }
            if(self.blop!=s){
                self.blop = s;
                self.count++;
                if(self.count>2){
                    update();
                }
            }
        };
        
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
        
        
        //Variables de configuration pour le formulaire (aide)
        this._HELP_SOURCE = "";
        this._HELP_DEF = "Ce champ est obligatoire";

        this.isRequired = ko.observable(true);
        this.isHelpSource = ko.observable(true);
        this.isHelpDef = ko.observable(true);
        this.helpSource = ko.observable(this._HELP_SOURCE);
        this.helpDef = ko.observable(this._HELP_DEF);
        
        //Choix du niveau
        self.currentValue = ko.observable(8);
        self.max = ko.observable(8);
        self.min = ko.observable(1);
        self.step = ko.observable(1);
        
        self.levelrequire = ko.observable();
        self.ordreEnCours = ko.observable("");
        
        //Cherche si un ordre est en cours
         var update =function () {
                    $.ajax({
                        url: "http://stationpompeco2017.hopto.org/getOrdre.php",
                        type: 'GET',
                        dataType: 'json',
                        data:{id:localStorage['idCarteOrdre']},
                        async: 'false',
                        success: function (data, textStatus, jqXHR) {
                            
                            if (data[0]["message"] === "True") {//Ordre deja demandé
                                self.ordreEnCours("Un ordre est en cours. Niveau demandé : "+data[0]["value"]["level_require"]);
                            } else {
                                self.ordreEnCours("Aucun ordre en cours.");
                            }
                           
                        },
                        error: function () {
                            alert('Echec de connexion avec le serveur');
                        }
                    });
            };
            
       
           
    }

    return OrderContentViewModel;
});



//Envoie la demande d'ordre au serveur
function order() {
    
    //Récupération des données
    var l = document.getElementById('lo').value;//
    var m = document.getElementById('mo').value;//
    var ni = document.getElementById('ni').value;//
    if(l==""||m==""||ni==""){return;}
    
    
    var Js = {login: l, mdp: m, levelrequire: ni, id:localStorage['idCarteOrdre']};

    $(function () {
        $.ajax({
            url: "http://stationpompeco2017.hopto.org/ordres.php",
            type: 'POST',
            data: Js,
            dataType: 'json',
            async: 'false',
            header:{"Content-type":"application/x-www-form-urlencoded"},
            success: function (data, textStatus, jqXHR) {
                if (data[0]["message"] === "True") {
                    rep= document.createTextNode("Ordre Envoyé");
                } else
                    rep= document.createTextNode("Echec : "+data[0]["erreur"]);
                
                if(document.getElementById('respOrder').lastChild!==null){
                    document.getElementById('respOrder').innerHTML = "";
                }
                document.getElementById('respOrder').appendChild(rep);

            },
            error: function () {
                alert('Echec de connexion avec le serveur...');
            }
        });
    });
}


