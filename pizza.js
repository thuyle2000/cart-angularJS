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
a.run(function ($rootScope) {
    $rootScope.menu = [
        { "id": 0, "name": "Fried Pork Rolls", "description": "Deep fried pork spring roll, carrot, wood ear mushroom, taro, Chinese rice vermicelli served with fresh herb, sweet and sour fish sauce", "price": 8.95, "image": "p01.jpg" },

        { "id": 1, "name": "Soft Shell Crab & Green Mango Salad", "description": "Green mango, palm heart, red pomelo, fresh herbs and soft shell crab", "price": 9.42, "image": "p02.jpg" },

        { "id": 2, "name": "Grilled 5 Spices Free Range Chicken", "description": "Grilled 5 spices free range chicken, fresh herbs, baby leek & thien ly flower ", "price": 9.42, "image": "p03.jpg" },

        { "id": 3, "name": "Wok Tossed Cubed Pepper Beef Tenderloin with Smoked Potato Mash", "description": "Beef tenderloin, wok tossed with capsicum, onion, Phu Quoc black pepper, garlic & oyster sauce", "price": 22.28, "image": "p04.jpg" },

        { "id": 4, "name": "Wagyu Beef Noodle Soup", "description": "Wagyu beef rice noodle soup served with herbs, bean sprouts, lime & chili", "price": 14.19, "image": "p05.jpg" },

        { "id": 5, "name": "Shrimp Mousse Grilled On Sugar Cane", "description": "Shrimp mousse on sugar cane, spring onion oil, peanut, purple angel hair noodle, served with Vietnamese mixed herbs & sweet and sour fish sauce", "price": 11.33, "image": "p06.jpg" },

        { "id": 6, "name": "Seabass & Asian Celery Salad Ca Mau Style", "description": "Thinly sliced citrus cured seabass fillet, carrot, spring onion, Asian celery", "price": 10.38, "image": "p07.jpg" },

        { "id": 7, "name": "Vietnam House Coffee Flan", "description": "Vietnam House coffee flan with tropical fruit & coffee ganache ", "price": 8, "image": "p08.jpg" },
    ];

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
        else{
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