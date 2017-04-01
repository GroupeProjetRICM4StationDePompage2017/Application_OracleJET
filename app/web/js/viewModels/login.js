/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Login module
 */
define(['ojs/ojcore', 'knockout','jquery', 'ojs/ojinputtext', 'ojs/ojbutton'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function AccueilContentViewModel() {
        localStorage['visited'] = "false";
        var self = this;
        
        //Configuration de l'aide
        this._HELP_SOURCE = "";
        this._HELP_DEF = "Ce champ est obligatoire";

        this.isRequired = ko.observable(true);
        this.isHelpSource = ko.observable(true);
        this.isHelpDef = ko.observable(true);
        this.helpSource = ko.observable(this._HELP_SOURCE);
        this.helpDef = ko.observable(this._HELP_DEF);
    }
    
    return AccueilContentViewModel;
});

//Verifie si l'utilisateur est inscrit
function check() {
    //Création donnée
   
    var l = document.getElementById('l').value;//
    var m = document.getElementById('m').value;//
    var params = 'login=' + l + "&mdp=" + m;
    var response;
    //Début requête

    $.ajax({
        url: "http://stationpompeco2017.hopto.org/verification.php",
        type: 'POST',
        data: params,
        dataType: 'json',
        async: 'false',
        success: function (data, textStatus, jqXHR) {
            if (data[0]["message"] === "True") {//simple !!! equals
                $(document).ready(function () {
                    var yetVisited = localStorage['visited'];
                    if (yetVisited !== "true") {
                        localStorage['visited'] = "true";
                    }
                });
                window.location.href = 'index.html?root=pageAccueil';
            } else {
                localStorage['visited'] = "false";
                alert('not correct Name or Password');
            }

        },
        error: function () {
            alert('ajax n\'a pas abouti');
        }
    });


    
}
