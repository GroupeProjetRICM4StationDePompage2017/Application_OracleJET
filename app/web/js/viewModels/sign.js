/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Login module
 */
define(['ojs/ojcore', 'knockout','jquery', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojknockout-validation','ojs/ojdialog'
], function (oj, ko) {
     /**
       * Custom validator associated with a dependent observable 
       * that ensures that its value is not 
       * empty when the base observable has a value that matches 
       * the baseTriggerValue. 
       * 
       * Both emailAddress and phoneNumber are dependent 
       * observables that depend on contactPref, the 
       * base observable. 
       * 
       * Specifically, emailAddress must have a value when 
       * contactPref is set to 'email'. 
       * Similarly phoneNumber must have a value when contactPref 
       * is set to 'phone'. 
       * 
       * @param {Object} options an Object literal with the 
       * following property values
       * 
       * @param {Object} options.base the observable whose 
       * value drives validation of dependent 
       * observables. Example, contactPref observable 
       * 
       * @param {string} options.baseTriggerValue the value 
       * that needs to be set on the base 
       * observable, to trigger validation on the dependent 
       * observable. Example, when contactPref is 
       * set to 'email', the emailAddress observable cannot be 
       * empty. So 'email' is a trigger value.
       * 
       * @param {string} options.label the label of the dependent 
       * field, that is being validated. 
       * This is used when constructing the error message.
       */
      function CrossFieldValidator(options)
      {
        this._options = options;
      }
      ;
      
      //Requete d'inscription
      function inscription(p) {
        $.ajax({
            url: "http://stationpompeco2017.hopto.org/inscription.php",
            type: 'POST',
            data:p,
            dataType: 'json',
            async: 'false',
            success: function (data, textStatus, jqXHR) {
                if(data[0]["message"]==="True"){
                    $("#modalDialog1").ojDialog("open");
                    setTimeout(function () {
                    window.location.href = 'index.html';}, 3500);
                }else{
                    $("#modalDialog2").ojDialog("open");
                }
                

            }});
    }

      /** 
       * If the value of base observable matches baseTriggerValue, 
       * then the valueOnDependent cannot be empty. 
       * 
       * @param {Object} valueOnDependent current value of the 
       * dependent observable
       * @returns {boolean|null}
       * @throws oj.ValidationError when validation fails
       */
      CrossFieldValidator.prototype.validate = function (valueOnDependent)
      {
        var summary, detail, params, validatorOptions = this._options;

        if (validatorOptions)
        {
          var baseObs = validatorOptions['base'];
          if (baseObs)
          {
            var baseValue = ko.utils.unwrapObservable(baseObs);
            var triggerValue = validatorOptions['baseTriggerValue'];

            // if baseValue matches the triggerValue and value on dependent
            //  observable is empty throw error
            if ((triggerValue && baseValue &&
                    triggerValue === baseValue) && !valueOnDependent)
            {
              params = {'label': validatorOptions['label']};
              summary = oj.Translations.applyParameters(
                bundle['app']['validator-crossField']['summary'], params);
              detail = oj.Translations.applyParameters(
                bundle['app']['validator-crossField']['detail'], params);
              throw new oj.ValidatorError(summary, detail);
            }
          }
        }

        return true;
      };
    /**
     * The view model for the main content view template
     */
    function AccueilContentViewModel() {
        var self = this;
        
        //Declaration de l'aide
        this._HELP_SOURCE = "";
        this._HELP_DEF = "Ce champ est obligatoire";

        this.isRequired = ko.observable(true);
        this.isHelpSource = ko.observable(true);
        this.isHelpDef = ko.observable(true);
        this.helpSource = ko.observable(this._HELP_SOURCE);
        this.helpDef = ko.observable(this._HELP_DEF);
        

       // for invalidComponentTracker attribute
        self.tracker = ko.observable();

        // Username field
        self.userName = ko.observable();

        // Password fields
        self.password = ko.observable();
        self.passwordRepeat = ko.observable();
        
        //Name field
        self.nameOfUser = ko.observable();
        
        self.firstNameOfUser = ko.observable();



        /**
         * When password observable changes, validate the Confirm Password 
         * component if it holds a non-empty value. 
         */
        self.password.subscribe(function (newValue)
        {
          var $cPassword = $("#cpassword"), cpUIVal = $cPassword.val();

          if (newValue && cpUIVal)
          {
            $cPassword.ojInputPassword("validate");
          }
        });

        /**
         * A validator associated to the Confirm Password field, that 
         * compares the value in the password observable matches the 
         * value entered in Confirm Password field.
         */
        self.equalToPassword = {
          validate: function (value)
          {
            var compareTo = self.password.peek();
            if (!value && !compareTo)
              return true;
            else if (value !== compareTo)
            {
              throw new Error(bundle['app']['validator-equalTo']['summary']);
            }
            return true;
          }
        };

        
        

        /**
         * Determines when the Create button will be disabled, the 
         * method implements best practices 
         * for form submission.
         * 
         * - If there are invalid components currently showing messaages 
         * this method returns true 
         * and the button is disabled. 
         * - If there are no visible errors, this method returns false 
         * and the button is enabled. 
         * E.g., when there are deferred errors on the component the 
         * button is enabled.
         * Note: If you see an error like "Message: Cannot read property 
         * 'invalidShown' of undefined",
         * make sure you have included the 'ojs/ojknockout-validation' 
         * dependency.
         * @return {boolean} 
         */
        self.shouldDisableCreate = function ()
        {
          var trackerObj = ko.utils.unwrapObservable(self.tracker),
                  hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
          return  hasInvalidComponents;
        };

        /**
         * Click handler that demonstrates best practices for form based 
         * validation. 
         * 
         * Step 1: If there are deferred errors they are displayed to 
         * the end-user by calling the 
         *         InvalidComponentTracker#showMessages method. Then 
         *         focus is set on the first 
         *         invalid component - InvalidComponentTracker#focusOnFirstInvalid 
         *         and method returns.
         * Step 2: Run app validation because user has fixed all component 
         * errors.  The cross-field 
         *         business validation is run and if there are validation 
         *         errors, the observable 
         *         bound to the 'messagesCustom' option is updated 
         *         and method returns.
         * Step 3: All client-side validations passes. Data ready to
         *  be submitted to server. (This 
         *         is not demo-ed.)
         */
        self.createNewMember = function ()
        {
          var trackerObj = ko.utils.unwrapObservable(self.tracker);

          // Step 1
          if (!this._showComponentValidationErrors(trackerObj))
          {
            return;
          }

          // Step 2
          if (!this._runAppLevelValidation(trackerObj))
          {
            return;
          }
          
            //Tous les parametres sont bon
            var params = {login: self.userName, mdp: self.password, nom: self.nameOfUser, prenom: self.firstNameOfUser, jar: "False"};
            // Load the artists data
            inscription(params);


            // Step 3 
          // Server could come back with new errors on components. 
          // Update 'messagesCustom' option.
        };

        // Returns false if there are components showing errors. 
        // Returns true if all components 
        // are valid.
        self._showComponentValidationErrors = function (trackerObj)
        {
          trackerObj.showMessages();
          if (trackerObj.focusOnFirstInvalid())
            return false;

          return true;
        };

        /**
         * Runs app-level validation. Returns false if app-level 
         * validation fails, true otherwise.
         */
        self._runAppLevelValidation = function (trackerObj)
        {
          var valid = true;

          if (!valid)
          {
            trackerObj.focusOnFirstInvalid();
            return false;
          }

          return true;
        };


        /**
         * Validates observable 'obs' using 'validator' and updates the 
         * 'messages' observable if 
         * there are validation errors.
         * @param {Object} obs the observable that is being validated
         * @param {Object} validator instance of the validator used to 
         * run the conditional check.
         * @param {Array} messages the observable used to bind to the
         *  'messagesCustom' option
         */
        self._validateObservable = function (obs, validator, messages)
        {
          var message, valid = true, msgs = [];
          try
          {
            // clear all messages before validating property
            messages([]);
            validator.validate(ko.utils.unwrapObservable(obs));
          } catch (e)
          {
            if (e instanceof oj.ValidatorError)
            {
              message = e.getMessage();
            } else
            {
              var summary = 
                e.message ? e.message : bundle['app']['validation-failed'];
              message = new oj.Message(summary);
            }

            valid = false;
            msgs.push(message);
            messages(msgs);
          }

          return valid;
        };}
    
    
    
    return AccueilContentViewModel;
});