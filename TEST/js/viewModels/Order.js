/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Order module
 */
define(['ojs/ojcore', 'knockout','jquery'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function OrderContentViewModel() {
        var self = this;
        self.login = ko.observable('Shinigami_remplaçant');
        self.mdp = ko.observable('bankai');
        
        self.levelrequire = ko.observable();
        
    }
    
    return OrderContentViewModel;
});

//Verifie si l'utilisateur est inscrit
function order() {
    console.log("===> Order\n");
    
    //Création donnée
    var xhr = new XMLHttpRequest();
    var l = document.getElementById('lo').value;//'Shinigami_remplaçant'
    var m = document.getElementById('mo').value;//'bankai'
    var ni = document.getElementById('ni').value;//
    var params = 'login='+l+"&mdp="+m+"&levelrequire="+ni;
    var Js=[{login:l,mdp:m,levelrequire:ni}];
    //Début requête
    xhr.open('POST', 'http://stationpompeco2017.hopto.org/server/ordres.php',true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            //Afficher résultat
            var response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep ;
            
            
            
            $(function () {
                    $.ajax({
                        url: "http://stationpompeco2017.hopto.org/server/ordres.php",
                        type: 'POST',
                        data : params,
                        dataType: 'json',
                        async: 'false',
                        success: function (data, textStatus, jqXHR) {
                            console.log("ajax Success");

                            console.log(data[0]["message"]);
                           if(data[0]["message"]==="True") {//simple !!! equals
                                //////////////////
                                console.log("come!!");
                                rep= document.createTextNode("on ajoute");
                            }
                            else
                                rep= document.createTextNode("sorry~~~"+data[0]["erreur"]);
                            
                            console.log("ajax fin  ");
                          paragraphe.appendChild(rep);
            document.getElementById('verifo').appendChild(paragraphe);
                            
                        },
                    error: function() {
              alert('La requête n\'a pas abouti'); }
        });
                });
        }

    });
    xhr.send(params);
}



function dataMarch() {
    console.log("March Order\n");
    var xhr = new XMLHttpRequest();
    var params = 'periode=march&year=2016';//'php'+params
    xhr.open('GET', 'http://stationpompeco2017.hopto.org/server/getOrdre.php?',true);
      
    xhr.send(null);
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            var response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep;
            
            
            
            
            $(function () {
                    $.ajax({
                        url: "http://stationpompeco2017.hopto.org/server/getOrdre.php",
                        type: 'GET',
                        dataType: 'json',
                        async: 'false',
                        success: function (data, textStatus, jqXHR) {
                            console.log("ajax Success");

                           if(data[0]["message"]==="True") {//simple !!! equals
                                //window.location.href='js/views/Accueil.html';
                                console.log("deja  ");
                                 rep= document.createTextNode("there is an unfinished order");
                            }
                            else {
                                //alert('not correct Name or Password');
                                console.log("new  ");
                                    rep= document.createTextNode("maybe you can create a new order");
                                }
                            
                          paragraphe.appendChild(rep);
            document.getElementById('order').appendChild(paragraphe);
                            
                        },
                    error: function() {
              alert('La requête n\'a pas abouti'); }
        });
                });
                
                
        }

    });
    
}