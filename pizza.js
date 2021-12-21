var a = angular.module("app", ["ngRoute"]);

a.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })
        .when("/Menu", {
            templateUrl: "menu.html"
        })
        .when("/Cart", {
            templateUrl: "cart.html"
        })
        .when("/About", {
            templateUrl: "contact.html"
        });
});




//dinh nghia bien ds o pham vi ung dung a
a.run(function ($rootScope, $http) {

    $http.get("pizza.json").then(function (response) {
        $rootScope.menu = response.data.menu;
        console.log($rootScope.menu);

    });
    
    $rootScope.cart = [];
    $rootScope.total = 0;
});


a.controller("productControl", function ($scope, $rootScope) {
    $scope.addCart = function (id) {
        var item = $rootScope.menu[id];

        for (var i = 0; i < $rootScope.cart.length; ++i) {
            if ($rootScope.cart[i].id == id) {
                $rootScope.cart[i].qty++;
                $rootScope.total += $rootScope.cart[i].price
                return;
            }
        }


        var newEle = {
            "id": id,
            "name": item.name,
            "price": item.price,
            "qty": 1
        }
        $rootScope.total += item.price
        $rootScope.cart.push(newEle);
        console.log($rootScope.cart)
    }
});



a.controller("cartControl", function ($scope, $rootScope) {

    $scope.isShow = false;
    $scope.removeAll = function () {
        $rootScope.total = 0
        $rootScope.cart = [];
    }

    $scope.checkout = function () {
        if ($rootScope.cart.length > 0) {
            $scope.isShow = true;
        }
        else {
            $scope.isShow = false;
        }
    }

    $scope.thank = function () {
        alert("Thanks for your order !");
        $scope.isShow = false;
        $rootScope.total = 0
        $rootScope.cart = [];
    }
});