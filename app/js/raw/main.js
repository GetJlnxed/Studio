$(document).ready(function () {
  $('#fullpage').fullpage({
    autoScrolling: true,
    anchors: ['welcome', 'studio', 'process', 'forthPage', 'fifthPage'],
    menu: '#menu',
    css3: true,
    verticalCentered: false,
    afterLoad: function (origin, destination, direction) {
      if (this[0].querySelector('.contentContainer__paragraph')) {
        this[0].querySelector('.contentContainer__paragraph').classList.remove('hidden');
      }
    },
    onLeave: function () {
      if (this[0].querySelector('.contentContainer__paragraph')) {
        this[0].querySelector('.contentContainer__paragraph').classList.add('hidden');
      }
    }
  });

  //methods
  $.fn.fullpage.setAllowScrolling(true);
})
