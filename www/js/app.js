/* global angular */

(function() {
  'use strict';
  angular.module('pf', ['ionic', 'ionic-datepicker', 'chart.js', 'pf.dashboard', 'pf.charts', 'pf.account', 'pf.datacontext', 'pf.categories', 'pf.transactions',
                        'pf.common-directives', 'pf.recurrence-runner', 'pf.constants', 'pf.filters', 'pf.logging'])
    .run(['$ionicPlatform', function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    },])
    .run(['$rootScope', '$state', '$timeout', 'recurrenceRunnerService', 'logging', 'Auth', function($rootScope, $state, $timeout, recurrenceRunnerService, logging, Auth) {
      $rootScope.$on('$stateChangeStart', function(event, next) {
        if (!Auth.signedIn()) {
          // all controllers need authentication unless otherwise specified
          if (!next.data || !next.data.anonymous) {
            event.preventDefault();
            $state.go('account.login');
          }
        } else {
          // the user is signed in, we can try to run recurrences
          recurrenceRunnerService.start();
        }
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error('$stateChangeError: ', error);
        console.log(arguments);
      });

    },]);

})();
