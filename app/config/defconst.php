<?php

	/* Defined Constants for various purposes */
    // * You can add your own error and success messages with their codes here for use

	// Data Types
	define('BOOLEAN', 	'1');
	define('INTEGER', 	'2');
	define('STRING', 	'3');

	/* Error Codes */
    // Requests
	define('REQUEST_METHOD_NOT_VALID',		        100);
	define('REQUEST_CONTENT_TYPE_NOT_VALID',	    101);
	define('REQUEST_NOT_VALID', 			        102);
    // Methods
	define('METHOD_NAME_REQUIRED', 					103);
	define('METHOD_PARAMS_REQUIRED', 				104);
	define('METHOD_DOES_NOT_EXIST', 				105);
    // Parameters
    define('VALIDATE_PARAMETER_REQUIRED', 			106);
	define('VALIDATE_PARAMETER_DATATYPE', 			107);
    // Authentication
	define('INVALID_ACCOUNT',   					108);
	define('ACCOUNT_NOT_ACTIVE', 					109);
	define('ACCOUNT_NOT_FOUND', 					110);

    // Response Codes 
	define('RESPONSE_MESSAGE', 						200);

	// JWT Token Authentication Errors
	define('JWT_PROCESSING_ERROR',					300);
	define('AUTHORIZATION_HEADER_NOT_FOUND',		301);
	define('ACCESS_TOKEN_ERRORS',					302);