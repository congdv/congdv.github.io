(function(global) {
	var dc = {};
	var homeSnippetHTML = "snippets/home-snippet.html";

	var menuItemHTML = "snippets/menu-item.html";
	var menuItemSpecialHTML = "snippets/menu-item-special.html";

	var menuItems = ['Lunch', 'Dinner', 'Sushi', 'Family Dinner', 'Apertizer', 'Pad Thai', 'Pho'];
	var menuItemsShortName = ["L","D","S","FD","A","PT","P"];

	function substitutePropertyValue(html, propName, propValue){
		return html.replace(new RegExp('{{'+propName+'}}','g'),propValue);
	}

	$ajaxUtils.sendGetRequest(homeSnippetHTML,
	function(responseContentText) {
		var specialItem = menuItemsShortName[Math.floor(Math.random() * menuItemsShortName.length)];
		responseContentText = substitutePropertyValue(responseContentText,'randomCategoryShortName',specialItem);
		document.querySelector("#main-content").innerHTML = responseContentText;
		// Change property for special button in navigaiton
		// document.documentElement.innerHTML = substitutePropertyValue(document.documentElement.innerHTML,'randomCategoryShortName',specialItem);
	}, false);

	dc.loadMenu = function(){
		$ajaxUtils.sendGetRequest(
			menuItemHTML,
			function(ItemHTMLResponse) {
				buildMenuPage(ItemHTMLResponse);
			},false)
	}


	function buildMenuPage(ItemHTMLResponse){
		// var menuComponent = "";
		var HTMLFinal = ' <h2 id="menu-categories-title" class="text-center">Our Menu</h2>'
    	HTMLFinal += '<div class="row">'
		
		for(var i = 0; i < menuItems.length; i++){
			var itemHTML = substitutePropertyValue(ItemHTMLResponse,'category_name',menuItems[i]);
			HTMLFinal += itemHTML;
		}
		HTMLFinal += '<div>';
		document.querySelector("#main-content").innerHTML = HTMLFinal;

	}

	dc.loadMenuItems = function (shortName){
		$ajaxUtils.sendGetRequest(
			menuItemSpecialHTML,
			function (menuItemSpecialHTMLResponse){
				var HTMLFinal = ' <h2 id="menu-categories-title" class="text-center">Our Specials Menu</h2>'
				HTMLFinal = substitutePropertyValue(menuItemSpecialHTMLResponse,'category_name',getMenuItemName(shortName));
				document.querySelector("#main-content").innerHTML = HTMLFinal;
			}, false);
	}

	function getMenuItemName(shortName){
		for(var i =0; i < menuItemsShortName.length; i++){
			console.log(menuItemsShortName[i] +" "+shortName);
			if(menuItemsShortName[i] === shortName){
				return menuItems[i];
			}
		}
		//Default name
		return menuItems[0];
	}

	global.$dc = dc;
	
})(window);