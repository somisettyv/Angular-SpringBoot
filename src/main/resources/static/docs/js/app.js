
var app = angular.module("app", ["xeditable", "ngMockE2E", 'ui.bootstrap', 'checklist-model','ngRoute']);

//add delay to $httpBackend
app.config(
    /*
    function($provide) {
  var l = window.location.href;
  var delay = /\?test/.test(l) ? 400 : 800;

  $provide.decorator('$httpBackend', function($delegate) {
      var proxy = function(method, url, data, callback, headers) {
          var interceptor = function() {
              var _this = this,
                  _arguments = arguments;
              setTimeout(function() {
                  callback.apply(_this, _arguments);
              }, delay);
          };
          return $delegate.call(this, method, url, data, interceptor, headers);
      };
      for(var key in $delegate) {
          proxy[key] = $delegate[key];
      }
      return proxy;
  });

}*/

     function ($httpProvider,$routeProvider, $locationProvider) {
      //delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
      $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
      $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
      $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
      $httpProvider.defaults.useXDomain = true;

      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.headers.common = 'Content-Type: application/json';
      delete $httpProvider.defaults.headers.common['X-Requested-With'];


      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
      
      
      
      $routeProvider.when('/home',
    		    {
    		      templateUrl:    'home.html',
    		      controller:     'HomeCtrl'
    		    });
    		    $routeProvider.when('/about',
    		    {
    		      templateUrl:    'about.html',
    		      controller:     'AboutCtrl'
    		    });
    		    $routeProvider.when('/contact',
    		    {
    		      templateUrl:    'contact.html',
    		      controller:     'ContactCtrl'
    		    });
    		    $routeProvider.otherwise(
    		    {
    		      redirectTo:     '/home',
    		      controller:     'HomeCtrl', 
    		    }
    		  );

    }
     
     


);

app.controller('Test', function($scope, $filter, $http) {
  $scope.dt = new Date();
  $scope.a = 123;
});

app.controller('NavCtrl', 
		['$scope', '$location', function ($scope, $location) {  
		  $scope.navClass = function (page) {
		    var currentRoute = $location.path().substring(1) || 'home';
		    return page === currentRoute ? 'active' : '';
		  };
		}]);

		app.controller('AboutCtrl', function($scope, $compile) {
		  console.log('inside about controller');

		});

		app.controller('HomeCtrl', function($scope, $compile) {
		  console.log('inside home controller');

		});

		app.controller('ContactCtrl', function($scope, $compile) {
		  console.log('inside contact controller');

		});


/*
app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});
*/

app.run(function($rootScope, $httpBackend, editableOptions, editableThemes) {
  $rootScope.debug = {};




  //detecting query params. Angular $location.search() works in html5mode only!
  /*
  var l = $window.location.href;
  var theme;
  if(/theme=default/.test(l)) {
    theme = 'default';
  } else if(/theme=bs2/.test(l)) {
    theme = 'bs2';
  } else {
    theme = 'bs3';
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
  }

  editableOptions.theme = theme;
  $rootScope.theme = theme;

  if(theme === 'bs3' || theme === 'bs3sm') {
    $rootScope.css = ['bootstrap300/css/bootstrap.css'];  
  } else if(theme === 'bs2') {
    $rootScope.css = ['bootstrap232/css/bootstrap.css', 'bootstrap232/css/bootstrap-responsive.css'];  
  } else {
    $rootScope.css = [];
  }
*/
  
  /*
  editableOptions.theme = 'default';
  $rootScope.css = [];
  */

  editableOptions.theme = 'bs3';
  editableOptions.activate = 'focus';


  $rootScope.css = ['libs/bootstrap/3.0.0/css/bootstrap.css'];

 
  /*
  editableOptions.theme = 'bs2';
  $rootScope.css = ['libs/bootstrap/2.3.2/css/bootstrap.css', 'libs/bootstrap/2.3.2/css/bootstrap-responsive.css']; 
  */

  // -- mocks --

  //groups
  $httpBackend.whenGET('/groups').respond([
    {id: 1, text: 'getIncidentByAccountandSource'},
    {id: 2, text: 'getUisDevices'},
    {id: 3, text: 'postRefreshToXray'},
    {id: 4, text: 'postToContextStore'}
  ]);



  //groups err
  $httpBackend.whenGET('/groups-err').respond(function(method, url, data) {
    return [500, 'server error', {}];
  });

  //check name
  $httpBackend.whenPOST(/\/checkName/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    if(data.value !== 'awesome') {
      return [200, {status: 'error', msg: 'Username should be `awesome`'}]; 
    } else {
      return [200, {status: 'ok'}]; 
    }
  });

  //update user (for single field)
  $httpBackend.whenPOST(/\/updateUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    if(data.name !== 'awesome') {
      return [500, 'Server-side error: username should be `awesome`!']; 
    } else {
      return [200, 'ok']; 
    }
  });

  //save user (for forms)
  $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    window.alert("Hello " + data);
    if(data.name === 'error') {
      return [500, {field: 'name', msg: 'Server-side error for this username!'}]; 
    } else {
      return [200, {status: 'ok'}]; 
    }
  });

  //save column
  $httpBackend.whenPOST(/\/saveColumn/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    if(data.column === 'name' && data.value !== 'awesome') {
      return [500, 'Username should be `awesome`']; 
    } else {
      return [200, {status: 'ok'}]; 
    }
  });

  $httpBackend.whenGET(/\.(html|css|js|)$/).passThrough();

  $httpBackend.whenGET(/\/scenario/).passThrough();

  $httpBackend.when('GET', /\/scenario/).passThrough();


});

function isProd() {
  //return true;
  return window.location.href.indexOf('http://vitalets.github.io/angular-xeditable') >= 0;
}
