app.controller("viewDataController", function ($http, $scope, NgMap,$location) {

    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });

    $scope.searchCity = function (event, city) {
        $scope.cityName = city;
        $scope.map.showInfoWindow('displayInfo', this);
    };

    var name, image, address, phoneNo,rating;
    function requestFilterData(requestData) {
        if (!_.isUndefined(requestData)) {
            var filterArray = [];
            for (var i = 0; i < requestData.length; i++) {
                if (!_.isUndefined(requestData[i].name)) {
                    name = requestData[i].name;
                } else {
                    name = 'Not available';
                }

                if (!_.isUndefined(requestData[i].location.display_address)) {
                    address = requestData[i].location.display_address;
                } else {
                    address = 'Not available';
                }
                if (!_.isUndefined(requestData[i].image_url)) {
                    image = requestData[i].image_url;
                } else {
                    image = 'images/noIcon.png';
                }
                if (!_.isUndefined(requestData[i].rating)) {
                    rating = requestData[i].rating;
                } else {
                    rating = 'Not available';
                }
                if (!_.isUndefined(requestData[i].display_phone)) {
                    phoneNo = requestData[i].display_phone;
                } else {
                    phoneNo = 'Not available';
                }

                filterArray[i] = {
                    image: image,
                    name: name,
                    phoneNo: phoneNo,
                    address: address,
                    rating:rating
                };
            }
            return filterArray;
        }
    }

    function searchData(city, item) {
        $scope.responseData = [];
        $http({
            method: 'GET',
            url: '/search?location=' + city + '&term=' + item + ''
        }).then(function successCallback(response) {
            var responseData = response.data.businesses;
            var filterData = requestFilterData(responseData);
            for (var i = 0; i < responseData.length; i++) {
                $scope.responseData.push({
                    name: filterData[i].name,
                    address: filterData[i].address,
                    rating:filterData[i].rating,
                    image: filterData[i].image,
                    phoneNo: filterData[i].phoneNo,
                    lat: responseData[i].location.coordinate.latitude,
                    lan: responseData[i].location.coordinate.longitude,
                    url: responseData[i].mobile_url
                });
            }
        }, function errorCallback(response) {
            console.log('error in searching', response);
        });
    }

    $scope.menuClick = function (event) {
        var clickId = event.target.id;
        var itemSearch = clickId.split('#')[1];
        var citySearch = 'california';
        searchData(citySearch, itemSearch);
    };

    $scope.clickItem = function (event) {
        if (!_.isUndefined($scope.getCity) && !_.isUndefined($scope.getItems)) {
            searchData($scope.getCity, $scope.getItems);
            $location.path('/data');
        }
    };
});
