(function () {
  'use strict';

  angular.module('pf.categories')
    .controller('CategoryCtrl', CategoryCtrl);


  CategoryCtrl.$inject = ['$state', '$ionicHistory', '$ionicPopup', 'CONST', 'CategoryService', 'logging', 'category', 'user'];
  function CategoryCtrl($state, $ionicHistory, $ionicPopup, CONST, categoriesService, logging, category, user) {
    logging.debug('Entering Add/Edit category controller');
    var self = this;
    this.category = angular.copy(category);

    this.categoryTypes = [{
      name: 'Income',
      id: CONST.TransactionType.Income
    }, {
        name: 'Expense',
        id: CONST.TransactionType.Expense
      }];


    this.execute = execute;
    this.delete = _delete;

    activate();
    function activate() { }

    function execute(categoryFrm) {
      if (!categoryFrm.$valid) {
        return;
      }

      if (self.category.$id) {
        _updateCategory();
      } else {
        _addCategory();
      }
    }

    function _addCategory() {
      categoriesService.add(self.category.name, self.category.type, user).then(function () {
        _goBack();
      }).catch(function (result) {
        console.log('oooops', result);
      });
    }

    function _updateCategory() {
      categoriesService.update(self.category).then(function () {
        _goBack();
      }).catch(function (result) {
        console.log('oooops', result);
      });
    }

    function _delete() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'NO UNDO',
        template: 'Are you sure you want to delete this category?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          categoriesService.delete(self.category);
          _goBack();
        }
      });
    }

    function _goBack() {
      if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      } else {
        $state.go('category.list');
      }
    }
  }
})();