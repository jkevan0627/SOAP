var Cloud = require('ti.cloud');

/*
 * Main Window of the app
 */
var mainWindow = Ti.UI.createWindow({
	title: 'Welcome',
    backgroundColor: 'white',
    barColor:'#024731'
});

//Window to hold the navigation group
var SecondaryWindow = Ti.UI.createWindow();

//Main view
var mainView = Ti.UI.createView ({
 	backgroundColor: 'white',
 	top: 39,
 	left: 0,
 	width: '100%',
 	height: '100%',
 	layout: 'horizontal'
}); 

//Create a navigationGroup
var nav = Titanium.UI.iPhone.createNavigationGroup({
   window: mainWindow
});

//Get the names of the general cases from the server
function getApplicationWindow () {
    
    Cloud.Objects.show({
        classname: 'soap',
        ids: '5134fd9205037324640d3b0e'
    
        }, function (e) {
        if (e.success) {
            for (var i = 0; i < e.soap[0].databases.length; i++) {
                var generalCaseName = e.soap[0].databases[i];
                mainView.add(createGeneralCaseIcon('/images/'+generalCaseName+'_Main.png', generalCaseName, e.soap[0].databases, i));
            }
        } else {
            alert('Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
        }
    });

	mainWindow.add(mainView);
    SecondaryWindow.add(nav);
    SecondaryWindow.open();
    
}

//Create each testCase and align it to the view
function createGeneralCaseIcon (image, generalName, allGeneralCases, activeTab) {
	var generalTestCase = 	Ti.UI.createView ({
		top:0,
		left:10,
		width:145,
		height:169,
		layout: 'vertical',
	});
	
	var button = Ti.UI.createButton ({
		image: image,
		width:145,
		height:145
	});
	
	var label = Ti.UI.createLabel ({
		top:1,
		text:generalName,
		font:{fontFamily:'Helvetica', fontSize: 14},
		color:'#58595B' 
		
	});
	
	button.addEventListener('click', function(){
		var tabWindow= require('/ui/common/TabGroup');
		//Open the navigation group, passing the nav as parameter to keep navigating
    	tabWindow.createTab(allGeneralCases, activeTab);
	});
	
	generalTestCase.add(button);
	generalTestCase.add(label);
	
	return generalTestCase;
}

module.exports = getApplicationWindow;