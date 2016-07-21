angular.module('app', []).
  config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("");
    $routeProvider.
      when('/', {controller:WebsiteCtrl, templateUrl:'list.html'}).
	  when('/project/:projectId', {
            controller:ProjectCtrl,
            templateUrl:'details.html'
      }).
      when('/contact/', {templateUrl:'contact.html'}).
      otherwise({redirectTo:'/'});


  });

function WebsiteCtrl($scope, $http) {
    $http.get('/ip2014/json/projects.json')
        .then(function(res){
            $scope.projects  = res.data;
        });
}

function ProjectCtrl($scope, $routeParams, $http) {
    $http.get('/ip2014/json/projects.json').success(function(data){
        angular.forEach(data, function(project) {
            if (project.url_name == $routeParams.projectId)
                $scope.project = project;
        });
    });
}