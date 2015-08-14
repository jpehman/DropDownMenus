(function () {
	"use strict";

	function DropDownMenus (configObj) {
		var dropDown = this;
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

		var menuOpen = null, hideTimer = (configObj.timeout ? configObj.timeout : 4000), menuTimeout = null;

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
			var left = $(tgt).position().left,
			$ddMenu = $(ddMenu);

			$ddMenu.css({
				"position": "fixed",
			}).width("auto");

			while ($ddMenu.width() + left > $(window).width()) {
				left -= 2;
			}

			$ddMenu.css("left", left);
		},

		showMenu = function (ddMenu) {
			ddMenu.style.display = "block";
			menuOpen = ddMenu;
		},

		tgtClickFunc = function (event) {
			var src = event.target ? event.target : event.srcElement,
			menu = dropDown.getTargetMenu(src);
			if (menuOpen !== null && menu.id == menuOpen.id) {
				return hideMenu();
			}
			setMenuPosition(src, menu);
			showMenu(menu);

			menuTimeout = setTimeout(hideMenu, hideTimer);
		},

		docClickFunc = function (event) {
			hideMenu();
		},

		menuMouseLeaveFunc = function (event) {
			menuTimeout = setTimeout(hideMenu, 1000);
		},

		menuMouseEnterFunc = function (event) {
			clearMenuTimeout();
		};

		var idx = this.targets.length;
		while (idx--) {
			dropDown.targets[idx].onclick = tgtClickFunc;
		}

		idx = this.menus.length;
		while (idx--) {
			dropDown.menus[idx].onmouseenter = menuMouseEnterFunc;
			dropDown.menus[idx].onmouseleave = menuMouseLeaveFunc;
		}
	}

	window.DropDownMenus = DropDownMenus;

	new DropDownMenus({});
}());