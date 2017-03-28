/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Accueil module
 */
define(['ojs/ojcore', 'knockout'
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
    
    //Début requête
    xhr.open('POST', 'http://stationpompeco2017.hopto.org/server/verification.php',true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            //Afficher résultat
            var response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep = document.createTextNode(xhr.responseText);
            
            paragraphe.appendChild(rep);
            document.getElementById('verif').appendChild(paragraphe);
        }

    });
    xhr.send(params);
}

function inscription() {
    console.log("===> Check\n");
    
    //Création donnée
    var xhr = new XMLHttpRequest();
    var l = document.getElementById('li').value;
    var m = document.getElementById('mi').value;
    var p = document.getElementById('p').value;
    var n = document.getElementById('n').value;
    var jar = ''
    
    if(document.getElementById('jar').value=='True'){jar = 'True';}
    else{jar = 'False';}
    
    var params = 'login='+l+"&mdp="+m+"&nom="+n+"&prenom="+p+"&jar="+jar;
    
    //Début requête
    xhr.open('POST', 'http://stationpompeco2017.hopto.org/server/inscription.php',true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            //Afficher résultat
            var response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep = document.createTextNode(xhr.responseText);
            
            paragraphe.appendChild(rep);
            document.getElementById('verif').appendChild(paragraphe);
        }

    });
    xhr.send(params);
}


function dataLast() {
    console.log("Last\n");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://stationpompeco2017.hopto.org/server/data.php',true);
    xhr.send(null);
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            var response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep = document.createTextNode(xhr.responseText);
            
            paragraphe.appendChild(rep);
            document.getElementById('last').appendChild(paragraphe);
        }

    });
}

function dataMarch() {
    console.log("March\n");
    var xhr = new XMLHttpRequest();
    var params = 'periode=march&year=2016';
    xhr.open('GET', 'http://stationpompeco2017.hopto.org/server/data.php?'+params,true);
      
    xhr.send(null);
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            var response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep = document.createTextNode(xhr.responseText);
            
            paragraphe.appendChild(rep);
            document.getElementById('march').appendChild(paragraphe);
        }

    });
}

function data24() {
    console.log("March\n");
    var xhr = new XMLHttpRequest();
    var params = 'periode=24';
    xhr.open('GET', 'http://stationpompeco2017.hopto.org/server/data.php?'+params,true);
      
    xhr.send(null);
    xhr.addEventListener('readystatechange', function() {
        
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale
            var response = JSON.parse(xhr.responseText);
            
            var paragraphe = document.createElement('p');
            var rep = document.createTextNode(xhr.responseText);
            
            paragraphe.appendChild(rep);
            document.getElementById('24').appendChild(paragraphe);
        }

    });
}