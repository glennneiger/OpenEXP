angular.module('OpenEXP')

    // passing services here as an array allows the the controller to be minified without losing track of the services
    .controller('ConnectCtrl', ['$scope','boardFactory', ($scope, boardFactory) => {

        // grab scope for debugging
        window.MY_SCOPE = $scope;

        // initialize variables
        $scope.devices = [];
        $scope.selected;

        // import hardware functions
        $scope.board = boardFactory.board;
        $scope.connect = boardFactory.connect;
        $scope.tryAutoConnect = boardFactory.tryAutoConnect;
        $scope.listDevices = boardFactory.listDevices;

        // envoking the function immediately
        $scope.listDevices().then((ports)=>{
          console.log(ports);
            $scope.devices = ports;
        });

        // refresh the list to look for newly connected devices
        $scope.refreshDevices = () => {
            $scope.listDevices().then((ports)=>{
            $scope.$apply(() => {
                $scope.devices = ports;
                $scope.selected=[];
              })
            })
        };

        // select a device to connect to
        $scope.select = (device) => {
            $scope.selected = device;
            console.log("Clicked: " + $scope.selected.comName)
        };

        // connect to the selected device
        $scope.connectSelectedDevice = () => {
          $scope.connect($scope.selected.comName).then(()=>{
            $scope.$apply();
          })
        };

    }]);
