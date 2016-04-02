// Load any browser specific code. This is selected by webpack
var browser = require( 'browser-specific' );

// Include the stylesheets
require( './eradicate.css' );

var forEach = require('lodash/collection/forEach');

var React = require('react');

var NewsFeedEradicator = require('./components/index.jsx');

var date = new Date();
var current_hour = date.getHours();

var starting_time;
var ending_time;

chrome.storage.sync.get('start', function (starting_time) {
	starting_time = starting_time.start;
	console.log('start should now be ', starting_time);
}
);


chrome.storage.sync.get('end', function (ending_time) {
	ending_time = ending_time.end;
	console.log('end should now be ', ending_time);
}
);

if (current_hour < ending_time || current_hour >= starting_time) {	

// This delay ensures that the elements have been created by Facebook's
// scripts before we attempt to replace them
setTimeout(function(){

	
	// Add News Feed Eradicator display
	var streamContainer = document.getElementById('stream_pagelet');
	var nfeContainer = document.createElement("div");
	nfeContainer.id = "nfe-container";
	streamContainer.appendChild(nfeContainer);

	// Delete the stream to prevent its infinite scroll infinitely loading
	// new stories (even though they are hidden)
	// If time is between 08:00 and 17:00 - eradicate!


	
	var streamMatcher = /^topnews_main_stream/;
	forEach(streamContainer.children, (child) => {
		if(streamMatcher.test(child.id)) {
			streamContainer.removeChild(child);

			// Exit the foreach
			return false;
		}
	});



	React.render(
		React.createElement(NewsFeedEradicator, null),
		nfeContainer
		);



}, 1000);

};
