// DEPENDENCIES
var log = require( 'services/logger' )( {
		tag: "HttpManager",
		hideLog: true
	} ),
	responseHandler = require( 'services/httpResponseHandler' );



//PUBLIC INTERFACE
var $ = module.exports = {
	request: request
};


//REQUEST ERROR
const ERROR_ONLOAD = 'HTTP_CLIENT_ERROR_ONLOAD';
const ERROR_ONERROR = 'HTTP_CLIENT_ERROR_ONERROR';
const ERROR_SEND = 'HTTP_CLIENT_ERROR_SEND';
const NETWORK_TIMEOUT = 'HTTP_CLIENT_NETWORK_TIMEOUT';
const NETWORK_OFFLINE = 'HTTP_CLIENT_NETWORK_OFFLINE';
const URL_NOT_FOUND = 'HTTP_CLIENT_URL_NOT_FOUND';
const REQUEST_ERROR = 'HTTP_CLIENT_REQUEST_ERROR';
const API_ERROR = 'HTTP_CLIENT_API_ERROR';

// PRIVATE FUNCTIONS

/**
 * Make a request for the required url with the specefied parameters and manage the api response
 * @param {Object} args
 * @param {Function} successCallback params (succesRequest.responseText, succesRequest.responseData)
 * @param {Function} errorCallback params (response, error)
 * @return {Function} abort request
 */

function request( args, successCallback, errorCallback ) {
	var url = args.url,
		fullResponse = args.fullResponse, //true if you want to get all successRequest without json parsing
		method = args.method, //['GET' , 'POST' , 'PUT' , 'DELETE']
		params = args.params, //request parametres
		header = args.header, //request header as an object
		ignoreAlert = args.ignoreAlert, // ignore Alert in case of error
		timeout = args.timeout,
		onProgress = args.onProgress; // function request on progress

	//information to add in the header of request
	if( !url ) {
		log( "args.url can't be null" );
		return;
	}
	args.__sendAt = new Date().getTime();
	if( !Ti.Network.online ) {
		responseHandler.handleErrorResponse( args, NETWORK_OFFLINE, null, errorCallback );
		return;
	}

	var requestAborted = false;
	var client = Ti.Network.createHTTPClient();
	var parameters;

	if( timeout ) {
		client.setTimeout( timeout );
	}


	client.onload = function() {
		try {
			if( requestAborted ) {
				log.w( ' Request Aborted ignore successCallback' );
				return;
			}
			if( fullResponse == true ) {
				_.isFunction( successCallback ) && successCallback( this.responseText );
			} else {
				responseHandler.handleSuccessResponse( args, this, successCallback, errorCallback );
			}
		} catch( e ) {
			responseHandler.handleErrorResponse( args, ERROR_ONLOAD, e, errorCallback );
		}
	};

	client.onerror = function( errorRequest ) {
		var error;
		switch( errorRequest.code ) {
			case -1:
			case -1001:
				error = NETWORK_TIMEOUT;
				break;
			case -1009:
			case -1100:
				error = NETWORK_OFFLINE;
				break;
			default:
				error = REQUEST_ERROR;
		}
        log.e(errorRequest , "full error");
		responseHandler.handleErrorResponse( args, error, this, errorCallback );
	};
	if(_.isFunction(onProgress)){
		client.onsendstream = onProgress;
	}

	try {
		if( method == "GET" && params ) {
			var paramsString = [];
			_.each( params, function( value, key ) {
				paramsString.push( key + '=' + value );
			} );
			if( paramsString.length > 0 ) {
				if( url.indexOf( '?' ) == -1 ) {
					url += '?';
				}
				url += paramsString.join( '&' );
			}
		} else {
			parameters = params;
		}
		log( parameters, url );

		client.open( method, url );
		setRequestHeader( client, header );
		client.send( parameters );

		return {
			abort: function() {
				log( "aborted request " + url );
				requestAborted = true;
				client.abort();
			}
		};
	} catch( e ) {
		responseHandler.handleErrorResponse( args, ERROR_SEND, e, errorCallback );
	}
};

/**
 * add session of user and auther analitics informations on header of request
 * @param {Ti.Network.Client} client
 */

function setRequestHeader( client, header ) {
    /*
	client.setRequestHeader( "language", Ti.Locale.currentLanguage );
	client.setRequestHeader( "country", Ti.Locale.currentCountry );
	client.setRequestHeader( "deployType", Ti.App.deployType );
	client.setRequestHeader( "app-version", Ti.App.version );
	client.setRequestHeader( "os-name", Alloy.Globals.isIOS ? "ios" : "android" );
	client.setRequestHeader( "os-version", Ti.Platform.version );
	client.setRequestHeader( "platform-name", Ti.Platform.name );
	client.setRequestHeader( "environment", Alloy.CFG.environment );*/

	if( typeof( header ) == "object" ) {
		for( var key in header ) {
			client.setRequestHeader( key, header[ key ] );
		}
	}
}
