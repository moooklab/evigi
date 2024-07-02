header = document.querySelector('header')
filter = document.querySelector('form.filter')

products = document.querySelectorAll('a.product')
products.forEach( product => {
    new Swiper(product.querySelector('div.swiper'), {
        slidesPerView: 1,
        spaceBetween: 0,
        // allowTouchMove: false,
        speed: 200,
        // direction: 'vertical',
        // autoHeight: true,
        pagination: {
            el: product.querySelector('div.swiper-pagination'),
            clickable: true
        },
        on: {
            init: function () {

                // Добавляем области для переключения фотографий
                navigationThumbs = document.createElement('div')
                navigationThumbs.classList.add('navigation-thumbs')

                for (let index = 0; index < this.slides.length; index++) {
                    let navigationThumb = document.createElement('div')
                        navigationThumb.classList.add('navigation-thumb')
                        navigationThumbs.append(navigationThumb)
                        
                    // Добавляем активный класс к первому элементу 
                    index == 0 && navigationThumb.classList.add('active')

                    // При наведении меняем слайд, добавляем активный класс
                    navigationThumb.addEventListener('mouseenter', event => {
                        thumbs = navigationThumb.parentElement.querySelectorAll('.navigation-thumb')
                        thumbs.forEach( thumb => {
                            thumb.classList.remove('active')
                        })
                        navigationThumb.classList.add('active')
                        this.slideTo(index)
                    })

                    // Возвращение на первое фото при покидании мышки
                    // navigationThumbs.addEventListener('mouseleave', event => {
                    //     thumbs = navigationThumb.parentElement.querySelectorAll('.navigation-thumb')
                    //     thumbs.forEach( thumb => {
                    //         thumb.classList.remove('active')
                    //     })
                    //     thumbs[0].classList.add('active')
                    //     this.slideTo(0) 
                    // })
                }

                this.el.prepend( navigationThumbs )

            }
        }
    })
})

capsuls = document.querySelectorAll('section.capsul div.swiper')
capsuls.forEach( capsul => {
    new Swiper(capsul, {
        slidesPerView: 1,
        spaceBetween: 1,
        pagination: {
            el: capsul.querySelector('div.swiper-pagination'),
            clickable: true
        }
    })
})

new Swiper('section.main div.swiper.main', {
    slidesPerView: 1,
    watchSlidesProgress: true,
    pagination: {
        el: document.querySelector('section.main div.swiper-pagination'),
        clickable: true
    }
})

new Swiper('section.collections div.swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    autoHeight: true,
    navigation: {
        prevEl: document.querySelector('section.collections div.swiper-navigation > *:first-child'),
        nextEl: document.querySelector('section.collections div.swiper-navigation > *:last-child')
    },
    breakpoints: {
        960: {
            slidesPerView: 3
        },
        640: {
            slidesPerView: 2
        }
    }
})

new Swiper('section.categories div.swiper', {
    slidesPerView: 2,
    spaceBetween: 16,
    grid: {
        rows: 3,
        fill: 'row'
    },
    breakpoints: {
        960: {
            slidesPerView: 4,
            spaceBetween: 24,
            grid: false
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 24,
            grid: false
        }
    },
    on: {
        'afterInit': function () {
            this.slideTo(1)
        }
    }
})

new Swiper('section.compilation div.container > div.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    autoHeight: true,
    watchSlidesProgress: true,
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 24
        }
    }
})

new Swiper('section.main div.swiper.reviews', {
    slidesPerView: 1,
    autoHeight: true,
    navigation: {
        prevEl: document.querySelector('section.main div.swiper.reviews + div.swiper-navigation > *:first-child'),
        nextEl: document.querySelector('section.main div.swiper.reviews + div.swiper-navigation > *:last-child')
    }
})

new Swiper('section.main div.swiper.product', {
    slidesPerView: 1,
    spaceBetween: 1,
    // direction: 'vertical',
    // autoHeight: true,
    pagination: {
        el: document.querySelector('section.main div.swiper.product div.swiper-pagination'),
        clickable: true
    }
})

const observer = new IntersectionObserver( ([entries]) => { entries.target.classList.toggle('sticky', entries.intersectionRatio < 1) }, { threshold: [1] } )
const headerOpen = ( modal ) => {
    header.classList.toggle(modal)
    console.log(modal)
    switch ( modal ) {
        case 'search':
            header.classList.remove('catalog')
            break
        case 'catalog':
            header.classList.remove('search')
            break
    }
}

filter?.addEventListener('change', event => {
    selected = filter.querySelectorAll('input:checked:not(:first-child)')
    selected.forEach( select => {
        selectName = select.getAttribute('name')
        selectTag = filter.querySelector('div.tag.' + selectName)
        selectTag.classList.remove('hidden')
        selectTag.querySelector('span').textContent = select.value
    })
})

filter?.querySelectorAll('div.tag div.cross').forEach( tag => {
    tag.addEventListener('click', event => {
        fieldset = filter.querySelector('fieldset.' + tag.parentNode.classList[1])
        fieldset.querySelector('input:first-child').checked = true
        tag.parentNode.classList.add('hidden')
    })
})

observer.observe(header)

// Добавляем в CSS переменную значение ширины скроллбара
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px")