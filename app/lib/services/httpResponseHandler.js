// DEPENDENCIES
var log = require( 'services/logger' )( {
		tag: "httpResponseHandler",
		hideLog: false
	} ),
	alertManager = require( 'services/alertManager' );



// PUBLIC INTERFACE
$ = module.exports = {
	handleSuccessResponse: handleSuccessResponse,
	handleErrorResponse: handleErrorResponse,
	ignorePreviousWsCall: ignorePreviousWsCall
};


// PRIVATE VARIABLES
var ignoreCallBefore = 0;
const API_ERROR = 'HTTP_CLIENT_API_ERROR';
const SUCCESS_CALLBACK_ERROR = "HTTP_CLIENT_SUCCESS_CALLBACK_ERROR"
const ignoredApiAlert = [ "HTTP_CLIENT_NETWORK_TIMEOUT", "HTTP_CLIENT_NETWORK_OFFLINE" ]


// PRIVATE FUNCTIONS

function handleSuccessResponse( reqArgs, response, successCallback, errorCallback ) {
	if( reqArgs.__sendAt < ignoreCallBefore ) {
		log.w( reqArgs.url, "#### ignore response " );
		return;
	}

	try {
		var responseJson = typeof( response.responseText ) == "string" ? JSON.parse( response.responseText ) : response.responseText;
	}catch (e) {
        log.e( e, "json parse error " );
        log.e( response.responseText, "response " );
    }

/*
	if( !responseJson.success ) {
		handleErrorResponse( reqArgs, API_ERROR, responseJson, errorCallback );
		return;
	}*/
	try {
		_.isFunction( successCallback ) && successCallback( responseJson.data );
	} catch( e ) {
		handleErrorResponse( reqArgs, SUCCESS_CALLBACK_ERROR, e, errorCallback );
	}

};

function getErrorMessage( errorType, response ) {
	var msg;
	if( response && response.errorMessage ) {
		msg = response.errorMessage;
	} else {
		msg = L( errorType );
		if( !msg || msg == errorType ) {
			msg = L( 'HTTP_DEFAULT_ERROR_MESSAGE' );
		}
	}
	return msg
}

function handleErrorResponse( reqArgs, errorType, responseError, callback ) {
	if( reqArgs.__sendAt < ignoreCallBefore ) {
		log.w( reqArgs.url, "#### ignore response " );
		return;
	}

	if( Alloy.Globals.isAndroid && responseError ) {
		log.w( "DELETE responce.source", "#### handleErrorResponse if Android  " );
		delete responseError.source
	}

	if( responseError ) {
		if( responseError.responseText ) {
			try {
				responseError = typeof( responseError.responseText ) == "string" ? JSON.parse( responseError.responseText ) : responseError.responseText;
			}
			catch (e) {
                log.e( e, "json parse error " );
                log.e( responseError.responseText, "response " );
            }
		}
	} else {
		responseError = {};
	}

	log.e( '#--------------------------------------------------------------------------------------#' );
	log.e( reqArgs.params ||  "", "REQUEST   " + reqArgs.url );
	log.e( errorType, "errorType" );
	log.e( responseError, "response " );
	log.e( responseError.message, "message  " );
	log.e( '----------------------------------------------------------------------------------------' );

	responseError.errorMessage = getErrorMessage( errorType, responseError )
	if( !reqArgs.ignoreAlert ) {
		_.defer( function() {
			alertManager.show( responseError.errorMessage );
		} );
	}

	// code 401 unauthenticated (token expired) >> logout
    /*
	if(Number(responseError.errorCode) == 401){
		require("dataHandlers/session").deleteUserData();
		require("dataHandlers/notificationRepository").unsubscribe();
		return;
	}*/
	_.isFunction( callback ) && callback( errorType, responseError );

};

function ignorePreviousWsCall() {
	ignoreCallBefore = new Date().getTime() + 2000;
}
