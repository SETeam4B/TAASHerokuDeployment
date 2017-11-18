(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('RecommendationAssignmentController', RecommendationAssignmentController);

    RecommendationAssignmentController.inject =  ['$scope','CoursesService','Authentication','$state','$rootScope','$stateParams','AssignmentrecommendationsService',"Users"];

    function RecommendationAssignmentController($scope, CoursesService,Authentication, $state,$rootScope, $stateParams,AssignmentrecommendationsService,Users) {

     $scope.courseId = $stateParams.courseId;
     $scope.courseTitle = $stateParams.courseTitle;
     $scope.TAlist = {};
     $scope.UTAlist = {};
     $scope.Graderlist = {};
     $scope.Rejectedlist= {};
     $scope.course = CoursesService.get($stateParams.courseId);

     $scope.FacultyRecommendationList = []

     $scope.recommendTA =function (form)
        {
            var recommendationObj = {course: $scope.courseId, user:form.user, form:form, assigned: "No"};
            $scope.FacultyRecommendationList.push(recommendationObj);

        };

     $scope.removeFromRecommendation= function(form)
     {
         var index = $scope.FacultyRecommendationList.indexOf(form);
            $scope.FacultyRecommendationList.splice(index,1);
     }

     $scope.submitMyRecommendation = function()
     {
         //passing FacultyRecommendationList to backend services

         for(var i = 0; i < $scope.FacultyRecommendationList.length; i++) {

             var obj= new AssignmentrecommendationsService(
                 {
                     course: $scope.courseId + "",
                     user: $scope.FacultyRecommendationList[i].form.user +"",
                     form: $scope.FacultyRecommendationList[i].form._id + "",
                     assigned: false
                 }
             );

             obj.$save();
         }
         $state.go('ta-coordinators.facultyCourseList');


     }
        AssignmentrecommendationsService.getAccepted(successCallback, errorCallback);
        function successCallback(res) {
            console.log("success");
            $scope.TAlist = res.data.TA;
            $scope.UTAlist = res.data.UTA;
            $scope.Graderlist = res.data.Grader;
        }
        function errorCallback() {
            console.log("failed");
        }
        AssignmentrecommendationsService.getRejected(successCallback2, errorCallback2);
        function successCallback2(res) {
            console.log("success");
            $scope.Rejectedlist = res.data;
        }
        function errorCallback2() {
            console.log("failed");
        }




    }

}());
