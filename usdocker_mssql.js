'use strict';

const usdocker = require('usdocker');
//const path = require('path');

const SCRIPTNAME = 'mssql';

let config = usdocker.config(SCRIPTNAME);
let configGlobal = usdocker.configGlobal();
const CONTAINERNAME = SCRIPTNAME + configGlobal.get('container-suffix');

function getContainerDef() {

    let docker = usdocker.dockerRunWrapper(configGlobal);
    return docker
        .containerName(CONTAINERNAME)
        .port(config.get('port'), 1433)
        .volume(config.get('folder'), '/var/opt/mssql/data')
        .env('TZ', configGlobal.get('timezone'))
        .env('ACCEPT_EULA', 'Y')
        .env('SA_PASSWORD', config.get('password'))
        .isDetached(true)
        .isRemove(true)
        .imageName(config.get('image'))
    ;
}

module.exports = {
    setup: function(callback)
    {
        config.setEmpty('image', 'microsoft/mssql-server-linux');
        config.setEmpty('folder', config.getDataDir());
        config.setEmpty('password', 'Pa$$word!');
        config.setEmpty('port', 1433);

        //config.copyToUserDir(path.join(__dirname, 'mssql', 'conf'));
        //config.copyToDataDir(path.join(__dirname, 'mssql', 'data'));

        callback(null, 'setup loaded for ' + SCRIPTNAME);
    },

    debugcli(callback) {
        let result = usdocker.outputRaw('cli', getContainerDef());
        callback(result);
    },

    debugapi(callback) {
        let result = usdocker.outputRaw('api', getContainerDef());
        callback(result);
    },

    up: function(callback)
    {
        usdocker.up(CONTAINERNAME, getContainerDef(), callback);
    },

    status: function(callback) {
        usdocker.status(CONTAINERNAME, callback);
    },

    down: function(callback)
    {
        usdocker.down(CONTAINERNAME, callback);
    },

    restart: function(callback)
    {
        usdocker.restart(CONTAINERNAME, getContainerDef(), callback);
    }
};
