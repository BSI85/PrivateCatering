const iconMenu = document.querySelector('.header-menu__icon');
const menuBody = document.querySelector('.header-menu');
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

const menuLinks = document.querySelectorAll('.header-bottom-menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }
}

$(window).resize(function (e) {
  adaptive_function();
});
function adaptive_header(w, h) {
  //language
  let headerMenu = $('.header-menu');
  let headerLang = $('.header-top-lang');
  if (w < 768) {
    if (!headerLang.hasClass('done')) {
      headerLang.addClass('done').appendTo(headerMenu);
    }
  } else {
    if (headerLang.hasClass('done')) {
      headerLang.removeClass('done').prependTo($('.header-top'));
    }
  }

  //menu
  if (w < 768) {
    if (!$('.header-bottom-menu').hasClass('done')) {
      $('.header-bottom-menu').addClass('done').appendTo(headerMenu);
    }
  } else {
    $.each($('.header-bottom-menu'), function (index, val) {
      if ($(this).hasClass('header-bottom-menu--right')) {
        if ($(this).hasClass('done')) {
          $(this).removeClass('done').prependTo($('.header-bottom__column').eq(2));
        }
      } else {
        if ($(this).hasClass('done')) {
          $(this).removeClass('done').prependTo($('.header-bottom__column').eq(0));
        }
      }
    });
  }
}
function adaptive_function() {
  let w = $(window).outerWidth();
  let h = $(window).outerHeight();
  adaptive_header(w, h);
}
adaptive_function();

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerView } = await google.maps.importLibrary('marker');

  // The map, centered at Uluru
  map = new Map(document.getElementById('map'), {
    zoom: 4,
    center: position,
    mapId: 'DEMO_MAP_ID',
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: 'Uluru',
  });
}

initMap();
