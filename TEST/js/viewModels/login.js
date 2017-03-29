/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Login module
 */
define(['ojs/ojcore', 'knockout','jquery'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function AccueilContentViewModel() {
        var self = this;
        self.login = ko.observable("Shinigami_remplaçant");
        self.mdp = ko.observable("bankai");
    }
    
    return AccueilContentViewModel;
});

//Verifie si l'utilisateur est inscrit
function check() {
    console.log("===> Check\n");
    
    //Création donnée
    var xhr = new XMLHttpRequest();
    var l = document.getElementById('l').value;//'Shinigami_remplaçant'
    var m = document.getElementById('m').value;//'bankai'
    var params = 'login='+l+"&mdp="+m;
    var response;
    //Début requête
    xhr.open('POST', 'http://stationpompeco2017.hopto.org/server/verification.php',true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            //Afficher résultat  (response=json)
            response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep = document.createTextNode(xhr.responseText);
            
            paragraphe.appendChild(rep);
            document.getElementById('verif').appendChild(paragraphe);
            
            //console.log(response[0]["message"]);
            //if(response[0]["message"].equals("True")) {window.location.href='js/views/Accueil.html';}
            $(function () {
                    $.ajax({
                        url: "http://stationpompeco2017.hopto.org/server/verification.php",
                        type: 'POST',
                        data : params,
                        dataType: 'json',
                        async: 'false',
                        success: function (data, textStatus, jqXHR) {
                            console.log("ajax Success");

                            console.log(data[0]["message"]);
                           if(data[0]["message"]==="True") {//simple !!! equals
                                window.location.href='js/views/Accueil.html';
                            }
                            else
                                alert('not correct Name or Password');
                            
                            console.log("ajax fin  ");
                          
                            
                        },
                    error: function() {
              alert('ajax n\'a pas abouti'); }
        });
                });
        }

        
    });
    
    xhr.send(params);
    //params=[{login:l,mdp:m}];
    

    
}
