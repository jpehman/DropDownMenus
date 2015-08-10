(function () {
	"use strict";

	function DropDownMenus (configObj) {
		var dropDown = this;
		try {
			this.menus = document.querySelector("div.dd-menu");

			if (this.menus.length < 1) {
				throw "no dd-menu classes found in the document";
			}

			this.targets = document.querySelector(".dd-menu-target");
			
			if (this.targets.length < 1) {
				throw "no dd-menu-target classes found in the document";
			}

		}
		catch (ex) {
			console.log(ex);
		}

		var menuOpen = null, timer = configObj.timeout, menuTimeout = null;

		this.getTargetMenu = function (tgt) {
			var i = this.menus.length, tgtClasses = tgt.className;
			while (i--) {
				if (tgtClasses.indexOf("ddm-" + this.menus[i].id) !== -1) {
					return this.menus[i];
				}
			}
		};

		var clearMenuTimeout = function () {
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
			ddMenu.style.position = "fixed";
				 
		},

		showMenu = function (ddMenu) {
			
		},

		tgtClickFunc = function (event) {
			var src = event.target ? event.target : event.srcElement,
			menu = dropDown.getTargetMenu(src);

			setMenuPosition(src, menu);
			showMenu(menu);

			menuTimeout = setTimeout(hideMenu, dropDown.timer);
		},

		docClickFunc = function (event) {
			hideMenu();
		},

		menuMouseLeaveFunc = function (event) {
			menuTImeout = setTimeout(hideMenu, 1500);
		},

		menuMouseEnterFunc = function (event) {
			clearMenuTimeout();
		};

		this.init = function () {
			var idx = this.targets.length;
			while (idx--) {
				dropDown.targets[idx].onclick = tgtClickFunc;
			}
		};

	}


}());