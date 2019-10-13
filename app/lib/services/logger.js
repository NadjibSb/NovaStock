
// functions

/**
 * args.tag string
 * args.hideLog bool
 * @param {Object || string} args
 * how to use:
 * info log : log()({args});
 * info log with tag: log(tag as string)({args});
 * info log with tag: log({tag, hideLog})({args});
 * warn log : log(tag).w({args});
 * debug log : log(tag).d({args});
 * error log : log(tag).e({args});
 */
module.exports = function log(args){
  //Ti.API.info(args);
  var params = {};
	switch( typeof( args ) ) {
		case "string":
			params.tag = args;
			break;

		case "object":
			params = args;
			break;
	}

	const defaultTag = ( params.tag || "" ) + " ";
	const hideLog = params.hideLog == true;

	var logger = function( obj, tag, type ) {
		if( hideLog ) {
			return;
		}
		var logMsg = obj;
		try {
			if( !_.isString( obj ) ) {
				logMsg = JSON.stringify( obj );
			}
			logMsg = ( tag ? tag + " > " : "" ) + logMsg;
			Ti.API[ ( type || 'info' ) ]( defaultTag + ' > ' + logMsg );
		} catch( e ) {
			Ti.API.error( "Logger " + e );
		}

		//httpLog(logMsg, defaultTag, type);
	};
	logger.e = function( obj, tag ) {
		this( obj, tag, "error" );
	};
	logger.d = function( obj, tag ) {
		this( obj, tag, "debug" );
	};
	logger.w = function( obj, tag ) {
		this( obj, tag, "warn" );
	};

	return logger;
}
