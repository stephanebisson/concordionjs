angular.module('concordion', [])
    .factory('util', function(){
        var wrap = function(cssClass){
            return function(element, text) { 
                text = text || element[0].innerText;
                element[0].innerHTML = '<span class="' + cssClass + '">' + text + '</span>';
            };
        };
        return {
            pass: wrap('pass'),
            fail: wrap('fail')           
        };        
    })
    .directive('concordionSet', function(){
        return function($scope, $element, attr) {
            $scope.$eval(attr.concordionSet + "='" + $element[0].innerText + "'");
            console.log($scope);
        };
    })
    .directive('concordionAssertequals', function(util){
        return function($scope, $element, attr){
            var expected = $element[0].innerText;
            var actual = $scope.$eval(attr.concordionAssertequals);
            if (expected === actual) {
                util.pass($element);
            } else {
                util.fail($element, 'expected: ' + expected + '  actual: ' + actual);
            }
            
        };        
    })
    .directive('concordionExecute', function(util){
        return function($scope, $element, attr){
            try {
                $scope.$eval(attr.concordionExecute);
                util.pass($element);
            } catch (e) {
                util.fail($element, $element[0].innerText + 
                          ' (' + e + ')');
                }
        };        
    });