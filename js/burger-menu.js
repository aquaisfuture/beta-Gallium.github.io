const $menu = $('#burger');
const $sidebar = $('.sidebar');
const $sidebarItemTitles = $('.sidebar-item-title');

let isOpen = true;

$menu.on('click', () => {
	if(isOpen) {
		$sidebarItemTitles.addClass('hide');
		$sidebar.removeClass('expanded');
	} else {
		$sidebarItemTitles.removeClass('hide');
		$sidebar.addClass('expanded');
	}
	isOpen = !isOpen
})