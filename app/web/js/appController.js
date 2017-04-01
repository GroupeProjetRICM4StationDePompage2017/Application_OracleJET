/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'login': {label: 'Login', isDefault: true},
         'pageAccueil': {label: 'PageAccueil'},
         'Order': {label: 'Order'},
         'sign':{label : 'Sign'}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
      
      //Gestion de la connexion (à refaire proprement)
      var yetVisited = localStorage['visited'];
        if (yetVisited !== "true") {
            var navData = [
      {name: 'Login', id: 'login',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: 'Sign', id: 'sign',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'}
      ];
        }else{
      // Navigation setup
      var navData = [
      {name: 'PageAccueil', id: 'pageAccueil',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Order', id: 'Order',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'}
      ];
      }
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Cuve connectée");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About The Project', 'aboutProject', 'http://air.imag.fr/index.php/Station_de_pompage_connect%C3%A9e'),
        new footerLink('About AiR', 'aboutAiR', 'http://air.imag.fr/index.php/Main_Page'),
        new footerLink('About Polytech', 'aboutPolytech', 'www.polytech-grenoble.fr')
      ]);
     }

     return new ControllerViewModel();
  }
);
