(function () {
	"use strict";

	/*
	* @param {object} configObj : required 
	* 	- configuration object for the DropDownMenus constructor
	* @param {string} configObj.bgColor : optional : default = #f9f9f9
	*	- hex color string for the background color of the drop down menu
	* @param {string} configObj.borderColor : optional : default = #cccccc
	*	- hex color string for the border color of the drop down menu
	* @param {string} configObj.textColor : optional : default = #333333
	*   - hex color string for the color of the text in the drop down menus
	* @param {string} configObj.hoverColor : optional : default = #cccccc
	* @param {number} configObj.hideTimer : optional : default = 4000ms
	*   - time it takes for the drop down menu to hide if not hoveered over
	*/
	function DropDownMenus (configObj) {
		var dropDown, menuBgColor, menuBorderColor,
			menuTextColor, menuHoverColor, menuOpen,
			hideTimer, menuTimeout, idx, $menu;

		if (typeof configObj !== "object") {
			throw "configObj must be an object";
		}

		dropDown = this;
		menuBgColor = configObj.bgColor || null;
		menuBorderColor = configObj.borderColor || null;
		menuTextColor = configObj.textColor || null;
		menuHoverColor = configObj.hoverColor || null;

		try {
			this.menus = document.querySelectorAll(".dd-menu");

			if (this.menus.length < 1) {
				throw "no dd-menu classes found in the document";
			}

			this.targets = document.querySelectorAll(".dd-menu-target");
			
			if (this.targets.length < 1) {
				throw "no dd-menu-target classes found in the document";
			}

		}
		catch (ex) {
			console.log(ex);
		}

		menuOpen = null;
		hideTimer = (configObj.hideTimer ? configObj.hideTimer : 4000);
		menuTimeout = null;

		var getTargetMenu = function (tgt) {
			var i = dropDown.menus.length, tgtClasses = tgt.className;
			while (i--) {
				if (tgtClasses.indexOf("ddm-" + dropDown.menus[i].id) !== -1) {
					return dropDown.menus[i];
				}
			}
		},

		clearMenuTimeout = function () {
			clearTimeout(menuTimeout);
			menuTimeout = null;
		},

		hideMenu = function () {
			if (menuOpen === null) {
				return;
			}
			menuOpen.style.display = "none";
			clearMenuTimeout();
			menuOpen = null;
		},

		setMenuPosition = function (tgt, ddMenu) {
			var left = $(tgt).position().left,
			winWidth = $(window).width(),
			menuWidth = null,
			$ddMenu = $(ddMenu);

			$ddMenu.css({
				"position": "fixed"
			}).width("auto");

			menuWidth = $ddMenu.width();
			if ($ddMenu.hasClass("ddm-left")) {
				left += $(tgt).width();
			}
			else if ($ddMenu.hasClass("ddm-top")) {

			}
			else if ($ddMenu.hasClass("ddm-bottom")) {

			}
			else if ($ddMenu.hasClass("ddm-right")) {
				
			}
			if (menuWidth + left > winWidth) {
				while (menuWidth + left > winWidth) {
					left -= 2;
				}
			}
			else if (left < 10) {
				left = 10;
			}

			$ddMenu.css("left", left);
		},

		showMenu = function (ddMenu) {
			ddMenu.style.display = "block";
			menuOpen = ddMenu;
		},

		tgtClickFunc = function (evt) {
			var src = evt.target ? evt.target : evt.srcElement,
			menu = getTargetMenu(src);
			if (menuOpen !== null && menu.id == menuOpen.id) {
				return hideMenu();
			}
			else if (menuOpen !== null) {
				hideMenu();
			}
			setMenuPosition(src, menu);
			showMenu(menu);

			menuTimeout = setTimeout(hideMenu, hideTimer);
		},

		docClickFunc = function (evt) {
			var src = evt.target ? evt.target : evt.srcElement;
			if ($(src).hasClass("dd-menu-target")) {
				return;
			}
			hideMenu();
		},

		menuMouseLeaveFunc = function (evt) {
			menuTimeout = setTimeout(hideMenu, 1000);
		},

		menuMouseEnterFunc = function (evt) {
			clearMenuTimeout();
		};

		idx = this.targets.length;
		while (idx--) {
			dropDown.targets[idx].onclick = tgtClickFunc;
		}

		idx = this.menus.length;
		while (idx--) {
			$menu = $(dropDown.menus[idx]);
			dropDown.menus[idx].onmouseenter = menuMouseEnterFunc;
			dropDown.menus[idx].onmouseleave = menuMouseLeaveFunc;
			$menu.css({
				"background-color": menuBgColor !== null ? menuBgColor : "",
				"border-color": menuBorderColor !== null ? menuBorderColor : "",
				"color": menuTextColor !== null ? menuTextColor : ""
			});

			if (menuHoverColor !== null) {
				$menu.find("li").hover(function (evt) {
					$(this).css("background-color", menuHoverColor);
				}, function (evt) {
					$(this).css("background-color", " ");
				});
			}
		}
		document.onclick = docClickFunc;
	}

	window.DropDownMenus = DropDownMenus;
}());