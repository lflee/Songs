// Client ID and API key from the Developer Console
var CLIENT_ID = '441648348265-c91c06piq030lati2ecsnejfmsce4hd9.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD64k9K7HXTKGDpg-5sWXfkfDEyPLn6ftQ';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var intro = document.getElementById('intro');
var ran = document.getElementById('ran');
var ranFung = document.getElementById('ranDan');
var ranJulian = document.getElementById('ranJulian');
var ranRicky = document.getElementById('ranRicky');
var ranAndy = document.getElementById('ranAndy');
var ranFung = document.getElementById('ranFung');


/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
}).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
}, function(error) {
    appendTable(JSON.stringify(error, null, 2));
});
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        intro.style.display = 'none';
        ran.style.display = 'inline-block';
        ranDan.style.display = 'inline-block';
        ranJulian.style.display = 'inline-block';
        ranRicky.style.display = 'inline-block';
        ranAndy.style.display = 'inline-block';
        ranFung.style.display = 'inline-block';
        
        signoutButton.style.display = 'block';
        // ranASong();
        // listLast15EventsSongs();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    location.reload(true);
}

/**
* Append a table element to the body containing the given message. 
* Used to display the results of the API call.
*
* @param {string} message Text to be placed in table element.
*/
// function appendTable(message) {
// var table = document.getElementById('content');
// var textContent = document.createTextNode(message);
// table.appendChild(message);
// }

/**
* Print the names and majors of students in a sample spreadsheet:
* https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit Sheet of Google example
* https://docs.google.com/spreadsheets/d/1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes/edit Songs
*/
// function listLast15EventsSongs() {
//     gapi.client.sheets.spreadsheets.values.get({
//         spreadsheetId: '1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes',
//         // range: '峰!A2:D90',
//         range: 'ChosenByAnyOfUs Last 15 Events!A2:B50',
        
//     }).then(function(response) {
//         var range = response.result;

//         // print number of results
//         var numOfResults = range.values.length ;
//         appendTable('Number of results is ' + numOfResults);

//         if (range.values.length > 0) {
//         appendTable('<tr><th>Song</th><th>Score</th></tr>');
//         for (i = 0; i < range.values.length; i++) {
//             var row = range.values[i];
//             // Print columns A and B, which correspond to indices 0 and 1.
//             appendTable('<tr><td>' + row[0] + '</td><td><a target="_blank rel="noopener" href="' + row[1] + '">譜</a></td></tr>');
//             }
//         } else {
//         appendTable('No data found.');
//         }
//     }, function(response) {
//         appendTable('Error: ' + response.result.error.message + "😛");
//     });
// }

function ranASong(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes',
        range: 'Events!C2:D533',
    }).then(function(response) {
        var range = response.result;

        var ranNumInRange =  Math.floor(Math.random() * Math.floor(range.values.length));

        var songData = range.values[ranNumInRange];
        
        if(songData[0] && songData[1]){
            var resultDot = document.createElement("div");
            resultDot.setAttribute("class", "link");


            var linkElement = document.createElement("a");
            linkElement.setAttribute("href", songData[1]);
            linkElement.setAttribute("class", "link");
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("rel", "noopener");
            var linkText = document.createTextNode(songData[0]);
            linkElement.appendChild(linkText);
            resultDot.appendChild(linkElement);

            var dotID = "fung" + songData[0];
            resultDot.setAttribute("id", dotID);
            
            document.getElementById("ran").appendChild(resultDot);

            document.getElementById(dotID).scrollIntoView();
        } else {
            ranASong();
        } ;
    }, function(response) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").setvalues('Error getting values from the sheet: ' + response.result.error.message + "😛");
        console.log('Error getting values from the sheet: ' + response.result.error.message + "😛");
    });
}

function ranDansSongs(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes',
        range: 'Danny!B2:D102',
    }).then(function(response) {
        var range = response.result;

        var ranNumInRange =  Math.floor(Math.random() * Math.floor(range.values.length));

        var songData = range.values[ranNumInRange];
        
        if(songData[0] && songData[2]){
            var resultDot = document.createElement("div");
            resultDot.setAttribute("class", "link");
            var dotID = "dan" + songData[0];
            resultDot.setAttribute("id", dotID);

            var linkElement = document.createElement("a");
            linkElement.setAttribute("href", songData[2]);
            linkElement.setAttribute("class", "link");
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("rel", "noopener");
            var linkText = document.createTextNode(songData[0]);
            linkElement.appendChild(linkText);
            resultDot.appendChild(linkElement);

            document.getElementById("ranDan").appendChild(resultDot);
            document.getElementById(dotID).scrollIntoView();
        } else {
            ranDansSongs();
        } ;
    }, function(response) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").setvalues('Error getting values from the sheet: ' + response.result.error.message + "😛");
        console.log('Error getting values from the sheet: ' + response.result.error.message + "😛");
    });
}


function ranJuliansSongs(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes',
        range: 'Julian!B2:D117',
    }).then(function(response) {
        var range = response.result;

        var ranNumInRange =  Math.floor(Math.random() * Math.floor(range.values.length));

        var songData = range.values[ranNumInRange];
        
        if(songData[0] && songData[2]){
            var resultDot = document.createElement("div");
            resultDot.setAttribute("class", "link");
            var dotID = "julian" + songData[0];
            resultDot.setAttribute("id", dotID);

            var linkElement = document.createElement("a");
            linkElement.setAttribute("href", songData[2]);
            linkElement.setAttribute("class", "link");
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("rel", "noopener");
            var linkText = document.createTextNode(songData[0]);
            linkElement.appendChild(linkText);
            resultDot.appendChild(linkElement);

            document.getElementById("ranJulian").appendChild(resultDot);
            document.getElementById(dotID).scrollIntoView();
        } else {
            ranJuliansSongs();
        } ;
    }, function(response) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").setvalues('Error getting values from the sheet: ' + response.result.error.message + "😛");
        console.log('Error getting values from the sheet: ' + response.result.error.message + "😛");
    });
}

function ranRickysSongs(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes',
        range: 'Ricky!B2:D69',
    }).then(function(response) {
        var range = response.result;

        var ranNumInRange =  Math.floor(Math.random() * Math.floor(range.values.length));

        var songData = range.values[ranNumInRange];
        
        if(songData[0] && songData[2]){
            var resultDot = document.createElement("div");
            resultDot.setAttribute("class", "link");
            var dotID = "ricky" + songData[0];
            resultDot.setAttribute("id", dotID);

            var linkElement = document.createElement("a");
            linkElement.setAttribute("href", songData[2]);
            linkElement.setAttribute("class", "link");
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("rel", "noopener");
            var linkText = document.createTextNode(songData[0]);
            linkElement.appendChild(linkText);
            resultDot.appendChild(linkElement);

            document.getElementById("ranRicky").appendChild(resultDot);
            document.getElementById(dotID).scrollIntoView();
        } else {
            ranRickysSongs();
        } ;
    }, function(response) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").setvalues('Error getting values from the sheet: ' + response.result.error.message + "😛");
        console.log('Error getting values from the sheet: ' + response.result.error.message + "😛");
    });
}

function ranAndysSongs(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes',
        range: 'Andy!B2:D75',
    }).then(function(response) {
        var range = response.result;

        var ranNumInRange =  Math.floor(Math.random() * Math.floor(range.values.length));

        var songData = range.values[ranNumInRange];
        
        if(songData[0] && songData[2]){
            var resultDot = document.createElement("div");
            resultDot.setAttribute("class", "link");
            var dotID = "andy" + songData[0];
            resultDot.setAttribute("id", dotID);

            var linkElement = document.createElement("a");
            linkElement.setAttribute("href", songData[2]);
            linkElement.setAttribute("class", "link");
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("rel", "noopener");
            var linkText = document.createTextNode(songData[0]);
            linkElement.appendChild(linkText);
            resultDot.appendChild(linkElement);

            document.getElementById("ranJulian").appendChild(resultDot);
            document.getElementById(dotID).scrollIntoView();
        } else {
            ranAndysSongs();
        } ;
    }, function(response) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").setvalues('Error getting values from the sheet: ' + response.result.error.message + "😛");
        console.log('Error getting values from the sheet: ' + response.result.error.message + "😛");
    });
}

function ranFungsSongs(){
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rsTEXvPp8e9DYN1XQlwA0Ds8P3CRAYvQjerZdOLpfes',
        range: '峰!B2:D91',
    }).then(function(response) {
        var range = response.result;

        var ranNumInRange =  Math.floor(Math.random() * Math.floor(range.values.length));

        var songData = range.values[ranNumInRange];
        
        if(songData[0] && songData[2]){
            var resultDot = document.createElement("div");
            resultDot.setAttribute("class", "link");
            var dotID = "fung" + songData[0];
            resultDot.setAttribute("id", dotID);


            var linkElement = document.createElement("a");
            linkElement.setAttribute("href", songData[2]);
            linkElement.setAttribute("class", "link");
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("rel", "noopener");
            var linkText = document.createTextNode(songData[0]);
            linkElement.appendChild(linkText);
            resultDot.appendChild(linkElement);

            document.getElementById("ranFung").appendChild(resultDot);

            document.getElementById(dotID).scrollIntoView();
        } else {
            ranFungsSongs();
        } ;
    }, function(response) {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").setvalues('Error getting values from the sheet: ' + response.result.error.message + "😛");
        console.log('Error getting values from the sheet: ' + response.result.error.message + "😛");
    });
}
