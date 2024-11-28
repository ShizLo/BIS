document.addEventListener('DOMContentLoaded', () => {
  $(document).on('click', '[data-usluga]', function () {
    console.log('here')
    $('#consultationForm2_usluga').val($(this).data('usluga'))
  })
  if (document.querySelector('.product-description')) {
    const productDescriptionContent = document.querySelector('.product-description__content')
    const productDescriptionShowBtn = document.getElementById('product-description-more-btn')
    const productDescriptionContentHeight = productDescriptionContent.offsetHeight
    let showProductDescription = false
    if (productDescriptionContentHeight > 100) {
      productDescriptionShowBtn.style.display = 'block'
      productDescriptionContent.style.maxHeight = '100px'
    }
    if (productDescriptionShowBtn)
      productDescriptionShowBtn.addEventListener('click', () => {
        if (showProductDescription === false) {
          productDescriptionContent.style.maxHeight = `${productDescriptionContentHeight}px`
          showProductDescription = true
          productDescriptionShowBtn.textContent = 'Скрыть текст'
        } else {
          productDescriptionContent.style.maxHeight = '100px'
          showProductDescription = false
          productDescriptionShowBtn.textContent = 'Показать текст'
        }
      })
  }
  const accordions = document.querySelectorAll('.accordion-item')
  accordions.forEach((el) => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget
      const control = self.querySelector('.accordion-header')
      const content = self.querySelector('.accordion-body')
      self.classList.toggle('open')
      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true)
        content.setAttribute('aria-hidden', false)
        content.style.maxHeight = content.scrollHeight + 'px'
      } else {
        control.setAttribute('aria-expanded', false)
        content.setAttribute('aria-hidden', true)
        content.style.maxHeight = null
      }
    })
  })
  function toggleTooltip() {
    let icon = document.querySelector('.product-page__tooltip-icon')
    let textBlock = document.querySelector('.product-page__tooltip-text')
    const toggle = () => {
      icon.classList.toggle('product-page__tooltip-icon_active')
      textBlock.classList.toggle('product-page__tooltip-text_active')
    }
    if (icon) {
      icon.addEventListener('click', (e) => {
        e.stopPropagation()
        toggle()
      })
      document.addEventListener('click', (e) => {
        let target = e.target
        let its_textBlock = target == textBlock || textBlock.contains(target)
        let textBlock_is_active = textBlock.classList.contains('product-page__tooltip-text_active')
        if (!its_textBlock && textBlock_is_active) {
          toggle()
        }
      })
    }
  }
  toggleTooltip()
  function toggleBtnModific() {
    if (document.querySelector('.product-page__modific-list1')) {
      let list1 = document.querySelectorAll(
        '.product-page__modific-list1 .product-page__modific-item',
      )
      list1.forEach((item) => {
        item.addEventListener('click', () => {
          list1.forEach((item) => item.classList.remove('product-page__modific-item_active'))
          item.classList.add('product-page__modific-item_active')
        })
      })
    }
    if (document.querySelector('.product-page__modific-list2')) {
      let list2 = document.querySelectorAll(
        '.product-page__modific-list2 .product-page__modific-item',
      )
      list2.forEach((item) => {
        item.addEventListener('click', () => {
          list2.forEach((item) => item.classList.remove('product-page__modific-item_active'))
          item.classList.add('product-page__modific-item_active')
        })
      })
    }
  }
  toggleBtnModific()
  function btnAllSpecific() {
    if (document.querySelector('.product-page__specific-btn')) {
      let btn = document.querySelector('.product-page__specific-btn')
      let tabWrap = document.querySelector('.product-page__tabs-wrap')
      let tab = document.querySelectorAll('.product-page__triggers-item')[1]
      btn.addEventListener('click', () => {
        tabWrap.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        tab.click()
      })
    }
  }
  btnAllSpecific()
  function toggleTabs() {
    if (document.querySelector('.product-page__triggers-item')) {
      let tabList = document.querySelectorAll('.product-page__triggers-item')
      let contentList = document.querySelectorAll('.product-page__content-item')
      tabList.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault()
          const id = e.target.getAttribute('href').replace('#', '')
          tabList.forEach((item) => item.classList.remove('product-page__triggers-item_active'))
          contentList.forEach((item) => item.classList.remove('product-page__content-item_active'))
          item.classList.add('product-page__triggers-item_active')
          document.getElementById(id).classList.add('product-page__content-item_active')
        })
      })
      if (document.querySelector('.product-page__triggers-item')) {
        document.querySelector('.product-page__triggers-item').click()
      }
    }
  }
  toggleTabs()
  function countProducts() {
    if (document.querySelector('.product-page__input')) {
      const btnsPlus = document.querySelectorAll('.product-page__plus')
      const btnsMinus = document.querySelectorAll('.product-page__minus')
      const inputs = document.querySelectorAll('.product-page__input')
      let productPrice = document.querySelector('.product-page__new')
      btnsPlus.forEach((btn) =>
        btn.addEventListener('click', () => {
          let input = btn.closest('.product-page__amount').querySelector('.product-page__input')
          input.value = Number(input.value) + 1
          productPrice.innerText =
            (Number(productPrice.dataset.price) * input.value).toLocaleString() +
            ' ' +
            productPrice.dataset.currency
          if (document.querySelector('.product-page__old')) {
            let oldPrice = document.querySelector('.product-page__old')
            oldPrice.innerText =
              (Number(oldPrice.dataset.price) * input.value).toLocaleString() +
              ' ' +
              oldPrice.dataset.currency
          }
        }),
      )
      btnsMinus.forEach((btn) =>
        btn.addEventListener('click', () => {
          let input = btn.closest('.product-page__amount').querySelector('.product-page__input')
          if (input.value <= 1) return
          input.value = Number(input.value) - 1
          productPrice.innerText =
            (Number(productPrice.dataset.price) * input.value).toLocaleString() +
            ' ' +
            productPrice.dataset.currency
          if (document.querySelector('.product-page__old')) {
            let oldPrice = document.querySelector('.product-page__old')
            oldPrice.innerText =
              (Number(oldPrice.dataset.price) * input.value).toLocaleString() +
              ' ' +
              oldPrice.dataset.currency
          }
        }),
      )
      inputs.forEach((input) =>
        input.addEventListener('change', () => {
          if (input.value <= 1) input.value = 1
          input.value = Math.ceil(input.value)
          productPrice.innerText =
            (Number(productPrice.dataset.price) * input.value).toLocaleString() +
            ' ' +
            productPrice.dataset.currency
          if (document.querySelector('.product-page__old')) {
            let oldPrice = document.querySelector('.product-page__old')
            oldPrice.innerText =
              (Number(oldPrice.dataset.price) * input.value).toLocaleString() +
              ' ' +
              oldPrice.dataset.currency
          }
        }),
      )
    }
  }
  countProducts()
  const galleryThumbsProduct = new Swiper(
    '.product-page__gallery-nav .swiper:not(.swiper-initialized)',
    {
      spaceBetween: 0,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        320: {
          spaceBetween: 21.51,
        },
        1021: {
          spaceBetween: 23.01,
        },
        1351: {
          spaceBetween: 32.76,
        },
      },
    },
  )
  const galleryTopProduct = new Swiper(
    '.product-page__gallery-for .swiper:not(.swiper-initialized)',
    {
      spaceBetween: 0,
      navigation: {
        nextEl: '.product-page__gallery-nav .swiper-button.next',
        prevEl: '.product-page__gallery-nav .swiper-button.prev',
      },
      thumbs: {
        swiper: galleryThumbsProduct,
      },
    },
  )
  const tabsSlider = new Swiper('.product-page__tabs:not(.swiper-initialized)', {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 0,
    breakpoints: {
      320: {
        grabCursor: true,
        allowTouchMove: true,
      },
      1021: {
        grabCursor: false,
        allowTouchMove: false,
      },
    },
  })
  let url = new URL(window.location.href)
  let scroll = url.searchParams.get('scroll')
  if (scroll === 'reviews' && document.getElementById('reviews-tab')) {
    document.getElementById('reviews-tab').click()
    document.getElementById('reviews-tab').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
})
productReviewPagination = (page, product_id) => {
  let url = `/index.php?route=product/product/review&page=${page}&product_id=${product_id}`
  $('#tab-4').load(url, function () {
    updateReview()
  })
}
function showReviewsTab() {
  if (document.getElementById('reviews-tab')) {
    document.getElementById('reviews-tab').click()
    document.getElementById('reviews-tab').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
function sendFormProductReview() {
  let formProductReview = document.getElementById('product-form-review')
  let files = document.getElementById('formFileReview').files
  let formData = new FormData(formProductReview)
  formData.append('images[]', files)
  let url = '/index.php?route=product/product/add_review'
  formProductReview.querySelector('button').disabled = 'disabled'
  let xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.send(formData)
  xhr.onload = () => {
    let result = xhr.response
    result = JSON.parse(result)
    formProductReview.querySelector('button').disabled = 'disabled'
    if (result['success']) {
      console.log(result['success'])
      document.getElementById('form-review-error').style.display = 'none'
      document
        .getElementById('product-review-wrap')
        .insertAdjacentHTML('afterbegin', result['success'])
      formProductReview.querySelectorAll('input[type="text"]').forEach((elem) => {
        elem.value = ''
      })
      formProductReview.querySelectorAll('textarea').forEach((elem) => {
        elem.value = ''
        elem.innerHTML = ''
      })
      document.querySelector('.product-page__triggers-score').innerText =
        Number(document.querySelector('.product-page__triggers-score').innerText) + 1
      document
        .querySelector('.product-feedbacks__form')
        .classList.remove('product-feedbacks__form_open')
      updateReview()
    } else {
      if (result['error']) {
        document.getElementById('form-review-error').style.display = 'block'
        document.getElementById('form-review-error').innerText = result['error']
      }
      formProductReview.querySelector('button').disabled = false
    }
  }
  xhr.onprogress = () => {}
  xhr.onerror = () => {
    load = false
    document.querySelector('.loader').classList.remove('active')
    console.log('Ошибка', xhr.status)
  }
}
function formAddReviews() {
  let tabFeedbacks = document.getElementById('tab-4')
  if (tabFeedbacks) {
    const inputImage = document.querySelector('#formFileReview')
    const preview = document.querySelector('#output')
    inputImage.addEventListener('change', () => {
      let count = inputImage.files.length
      uploadFile(count)
      preview.addEventListener('DOMSubtreeModified', deletePhoto)
    })
    function uploadFile(count) {
      preview.innerHTML = `
                    <div class="form__count-files">
                        Загружено файлов: ${count}
				        <button type="button" class="form__delete">Удалить</button>
                    </div>
				`
    }
    function deletePhoto() {
      const btnDelete = document.querySelector('.form__delete')
      if (btnDelete) {
        btnDelete.addEventListener('click', () => {
          preview.innerHTML = ''
          inputImage.value = ''
        })
      }
    }
  }
}
function openAddReviewsForm() {
  let tabFeedbacks = document.getElementById('tab-4')
  if (tabFeedbacks) {
    let blockBtn = document.querySelector('.product-feedbacks__btn-block')
    let blockForm = document.querySelector('.product-feedbacks__form')
    blockForm.classList.add('product-feedbacks__form_open')
    blockBtn.classList.add('product-feedbacks__btn-block_hidden')
    formAddReviews()
  }
}
function setSliderReviews() {
  document.querySelectorAll('.product-feedbacks__slider-wrap').forEach((slider) => {
    new Swiper(slider.querySelector('.swiper:not(.swiper-initialized)'), {
      loop: false,
      allowTouchMove: true,
      breakpoints: {
        320: {
          slidesPerView: 4,
          spaceBetween: 3.61,
        },
        483: {
          slidesPerView: 5,
          spaceBetween: 17.67,
        },
        605: {
          slidesPerView: 6,
          spaceBetween: 17.67,
        },
        686: {
          slidesPerView: 7,
          spaceBetween: 17.67,
        },
        768: {
          slidesPerView: 8,
          spaceBetween: 17.67,
        },
        1021: {
          slidesPerView: 9,
          spaceBetween: 11,
        },
        1351: {
          slidesPerView: 10,
          spaceBetween: 25.91,
        },
      },
      navigation: {
        nextEl: slider.querySelector('.swiper-button.next'),
        prevEl: slider.querySelector('.swiper-button.prev'),
      },
    })
  })
}
updateReview = () => {
  let tabFeedbacks = document.getElementById('tab-4')
  function btnExpand() {
    setTimeout(() => {
      if (tabFeedbacks) {
        if (document.querySelector('.product-feedbacks__review-list').offsetHeight === 0) {
          btnExpand()
        } else {
          setSliderReviews()
          document.querySelectorAll('.product-feedbacks__review').forEach((feedback) => {
            let textBlock = feedback.querySelector('.product-feedbacks__text-block')
            let btn = feedback.querySelector('.product-feedbacks__btn-expand')
            if ((textBlock !== null || btn !== null) && textBlock.offsetHeight > 265) {
              textBlock.classList.add('product-feedbacks__text-block__hidden')
              btn.classList.add('product-feedbacks__btn-expand_active')
              btn.dataset.height = textBlock.offsetHeight
            }
          })
        }
      }
    }, 1)
  }
  btnExpand()
}
function showFullReview(btn) {
  let textBlock = btn.parentElement.querySelector('.product-feedbacks__text-block')
  let scrollElem = btn.parentElement
  if (textBlock) {
    textBlock.classList.toggle('open')
    if (textBlock.classList.contains('open')) {
      btn.innerHTML = 'Свернуть отзыв'
    } else {
      btn.innerHTML = 'Показать полностью'
      if (scrollElem) {
        scrollElem.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      }
    }
  }
}
function sortHrefLinks(btn) {
  let currentUrl = btn.dataset.sortHref
  let currentUrlHref = new URL(btn.dataset.sortHref)
  let currentUrlAsc = btn.dataset.sortDataHref
  let currentUrlAscHref = new URL(btn.dataset.sortDataHref)
  let url = window.location.href
  let urlHref = new URL(window.location.href)
  let order = urlHref.searchParams.get('order')
  if (currentUrlHref.href == urlHref.href || currentUrlAscHref.href == urlHref.href) {
    if (order == 'DESC') {
      order = 'ASC'
    } else {
      order = 'DESC'
    }
    if (localStorage.getItem('order') == 'DESC') {
      localStorage.setItem('order', 'ASC')
      window.location.href = currentUrlAsc
    } else {
      localStorage.setItem('order', 'DESC')
      window.location.href = currentUrl
    }
    url.searchParams.set('order', order)
    window.location.href = url
  } else if (localStorage.getItem('order')) {
    if (order == 'null') {
      localStorage.setItem('order', 'ASC')
      window.location.href = currentUrlAsc
    } else {
      if (localStorage.getItem('order') == 'DESC') {
        window.location.href = currentUrl
      } else {
        window.location.href = currentUrlAsc
      }
    }
  } else {
    window.location.href = currentUrl
  }
}
var wishlist = {
  add: function (product_id, btn) {
    if (document.querySelector('.product-page__favorites')) {
      document.querySelectorAll('.product-page__favorites').forEach((elem) => {
        elem.classList.toggle('active')
      })
    } else {
      btn.classList.toggle('active')
    }
    let url = document.querySelector('#wishlist-nav a').href
    $.ajax({
      url: 'index.php?route=account/wishlist/add',
      type: 'post',
      data: 'product_id=' + product_id,
      dataType: 'json',
      success: function (json) {
        if (json.count > 0) {
          document.getElementById('wishlist_toolbar').classList.add('toolbar-mob__icon_active')
          document.getElementById('wishlist_mob-menu').classList.add('wish_active')
          document.getElementById('wishlist_burger').classList.add('nav__burger_active')
          document.getElementById('wishlist-nav').classList.add('wish_active')
        } else {
          document.getElementById('wishlist_toolbar').classList.remove('toolbar-mob__icon_active')
          document.getElementById('wishlist_mob-menu').classList.remove('wish_active')
          document.getElementById('wishlist_burger').classList.remove('nav__burger_active')
          document.getElementById('wishlist-nav').classList.remove('wish_active')
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText)
      },
    })
  },
  remove: function () {},
}
function closeLikeClose(btn) {
  btn.closest('.catalog-item__top-right__like-add').remove()
}
document.addEventListener('DOMContentLoaded', () => {
  function accordionToggle() {
    if (document.querySelector('.table-block__item')) {
      const items = Array.from(document.querySelectorAll('.table-block__item'))
      items.forEach((item) => {
        item.addEventListener('click', (e) => {
          let currentHead = item.querySelector('.table-block__head')
          let currentContentList = item.querySelectorAll('.table-block__body-content')
          if (
            (e.target.closest('.table-block__head') &&
              !e.target.closest('.table-block__order-btn')) ||
            (e.target.closest('.table-block__body') && !e.target.closest('.table-block__order-btn'))
          ) {
            currentHead.classList.toggle('open')
            currentContentList.forEach((content) => {
              if (content.style.maxHeight) {
                content.style.maxHeight = null
                content.classList.remove('open')
              } else {
                content.style.maxHeight = content.scrollHeight + 'px'
                content.classList.add('open')
              }
            })
          }
        })
      })
    }
  }
  accordionToggle()
})
document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.popular-services__item .swiper', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.popular-services__next',
      prevEl: '.popular-services__prev',
    },
    pagination: {
      el: '.popular-services__dots',
      type: 'bullets',
    },
  })
})
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.nav__item')) {
    let navItems = document.querySelectorAll('.nav__item')
    navItems.forEach((item) => {
      let count = 0
      item.addEventListener('click', () => {
        if (item.classList.contains('nav__item_active')) {
          item.classList.remove('nav__item_active')
        } else {
          navItems.forEach((item) => item.classList.remove('nav__item_active'))
          item.classList.add('nav__item_active')
        }
      })
      item.addEventListener('mouseover', () => {
        navItems.forEach((item) => {
          if (item.classList.contains('nav__item_active')) count += 1
        })
        if (count === 0) {
          item.classList.add('nav__item_hover')
          item.addEventListener('mouseout', () => {
            item.classList.remove('nav__item_hover')
          })
        }
        count = 0
      })
    })
    document.addEventListener('click', (e) => {
      let navItem = e.target.closest('.nav__item')
      if (navItem === null) {
        navItems.forEach((item) => item.classList.remove('nav__item_active'))
      } else return
    })
  }
  function toggleBurger() {
    const body = document.querySelector('body')
    const cover = document.querySelector('.mob-menu-cover')
    const btnsClose = document.querySelector('.mob-menu__btn-close')
    const mobMenu = document.querySelector('.mob-menu')
    const btnMenu = document.querySelector('.toolbar-mob__item_menu')
    const toggleClasses = () => {
      btnMenu.classList.toggle('toolbar-mob__item_active')
      mobMenu.classList.toggle('mob-menu_open')
      cover.classList.toggle('mob-menu-cover_active')
      body.classList.toggle('mob-menu-open')
    }
    if (btnMenu) {
      btnMenu.addEventListener('click', toggleClasses)
    }
    if (cover) {
      cover.addEventListener('click', toggleClasses)
    }
    if (btnsClose) {
      btnsClose.addEventListener('click', toggleClasses)
    }
  }
  toggleBurger()
  if (document.querySelector('.accordion')) {
    const items = Array.from(document.querySelectorAll('.accordion'))
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        let currentHead = item.querySelector('.accordion__head')
        let currentBody = item.querySelector('.accordion__body')
        if ($(e.target).closest('.accordion__head').length) {
          if (currentBody.style.maxHeight) {
            currentHead.classList.remove('accordion__head_open')
            currentBody.style.maxHeight = null
          } else {
            items.forEach((item) => {
              item.querySelector('.accordion__head').classList.remove('accordion__head_open')
              item.querySelector('.accordion__body').style.maxHeight = null
            })
            currentHead.classList.add('accordion__head_open')
            currentBody.style.maxHeight = currentBody.scrollHeight + 'px'
          }
        }
      })
    })
  }
  if (document.querySelector('.call-back')) {
    const forms = Array.from(document.querySelectorAll('.call-back'))
    forms.forEach((form) => {
      form.querySelector('.call-back__btn').addEventListener('click', (event) => {
        let formData = new FormData(form)
        let url = '/index.php?route=common/footer/form_submit'
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.send(formData)
        xhr.onload = () => {
          let result = xhr.response
          result = JSON.parse(result)
          console.log(result)
          if (result.success) {
            window.location = window.location.origin + '/index.php?route=product/submitted'
          }
        }
        xhr.onprogress = () => {
          console.log('send')
        }
        xhr.onerror = () => {
          load = false
          console.log('error', xhr.status)
        }
      })
    })
  }
})
!(function (t, e) {
  'function' == typeof define && define.amd
    ? define('jquery-bridget/jquery-bridget', ['jquery'], function (i) {
        return e(t, i)
      })
    : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('jquery')))
      : (t.jQueryBridget = e(t, t.jQuery))
})(window, function (t, e) {
  'use strict'
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
        r = '$().' + i + '("' + e + '")'
      return (
        t.each(function (t, h) {
          var u = a.data(h, i)
          if (!u) return void s(i + ' not initialized. Cannot call methods, i.e. ' + r)
          var d = u[e]
          if (!d || '_' == e.charAt(0)) return void s(r + ' is not a valid method')
          var l = d.apply(u, n)
          o = void 0 === o ? l : o
        }),
        void 0 !== o ? o : t
      )
    }
    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i)
        o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o))
      })
    }
    ;(a = a || e || t.jQuery),
      a &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
          }),
        (a.fn[i] = function (t) {
          if ('string' == typeof t) {
            var e = o.call(arguments, 1)
            return h(this, t, e)
          }
          return u(this, t), this
        }),
        n(a))
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i)
  }
  var o = Array.prototype.slice,
    r = t.console,
    s =
      'undefined' == typeof r
        ? function () {}
        : function (t) {
            r.error(t)
          }
  return n(e || t.jQuery), i
}),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('ev-emitter/ev-emitter', e)
      : 'object' == typeof module && module.exports
        ? (module.exports = e())
        : (t.EvEmitter = e())
  })('undefined' != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || [])
          return -1 == n.indexOf(e) && n.push(e), this
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e)
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || {})
          return (n[e] = !0), this
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t]
        if (i && i.length) {
          var n = i.indexOf(e)
          return -1 != n && i.splice(n, 1), this
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t]
        if (i && i.length) {
          ;(i = i.slice(0)), (e = e || [])
          for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
            var r = i[o],
              s = n && n[r]
            s && (this.off(t, r), delete n[r]), r.apply(this, e)
          }
          return this
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents
      }),
      t
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('get-size/get-size', e)
      : 'object' == typeof module && module.exports
        ? (module.exports = e())
        : (t.getSize = e())
  })(window, function () {
    'use strict'
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf('%') && !isNaN(e)
      return i && e
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e]
        t[i] = 0
      }
      return t
    }
    function n(t) {
      var e = getComputedStyle(t)
      return (
        e ||
          a(
            'Style returned ' +
              e +
              '. Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1',
          ),
        e
      )
    }
    function o() {
      if (!d) {
        d = !0
        var e = document.createElement('div')
        ;(e.style.width = '200px'),
          (e.style.padding = '1px 2px 3px 4px'),
          (e.style.borderStyle = 'solid'),
          (e.style.borderWidth = '1px 2px 3px 4px'),
          (e.style.boxSizing = 'border-box')
        var i = document.body || document.documentElement
        i.appendChild(e)
        var o = n(e)
        ;(s = 200 == Math.round(t(o.width))), (r.isBoxSizeOuter = s), i.removeChild(e)
      }
    }
    function r(e) {
      if (
        (o(),
        'string' == typeof e && (e = document.querySelector(e)),
        e && 'object' == typeof e && e.nodeType)
      ) {
        var r = n(e)
        if ('none' == r.display) return i()
        var a = {}
        ;(a.width = e.offsetWidth), (a.height = e.offsetHeight)
        for (var d = (a.isBorderBox = 'border-box' == r.boxSizing), l = 0; u > l; l++) {
          var c = h[l],
            f = r[c],
            m = parseFloat(f)
          a[c] = isNaN(m) ? 0 : m
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width)
        b !== !1 && (a.width = b + (E ? 0 : p + _))
        var x = t(r.height)
        return (
          x !== !1 && (a.height = x + (E ? 0 : g + z)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (g + z)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        )
      }
    }
    var s,
      a =
        'undefined' == typeof console
          ? e
          : function (t) {
              console.error(t)
            },
      h = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth',
      ],
      u = h.length,
      d = !1
    return r
  }),
  (function (t, e) {
    'use strict'
    'function' == typeof define && define.amd
      ? define('desandro-matches-selector/matches-selector', e)
      : 'object' == typeof module && module.exports
        ? (module.exports = e())
        : (t.matchesSelector = e())
  })(window, function () {
    'use strict'
    var t = (function () {
      var t = window.Element.prototype
      if (t.matches) return 'matches'
      if (t.matchesSelector) return 'matchesSelector'
      for (var e = ['webkit', 'moz', 'ms', 'o'], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + 'MatchesSelector'
        if (t[o]) return o
      }
    })()
    return function (e, i) {
      return e[t](i)
    }
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(
          'fizzy-ui-utils/utils',
          ['desandro-matches-selector/matches-selector'],
          function (i) {
            return e(t, i)
          },
        )
      : 'object' == typeof module && module.exports
        ? (module.exports = e(t, require('desandro-matches-selector')))
        : (t.fizzyUIUtils = e(t, t.matchesSelector))
  })(window, function (t, e) {
    var i = {}
    ;(i.extend = function (t, e) {
      for (var i in e) t[i] = e[i]
      return t
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e
      })
    var n = Array.prototype.slice
    ;(i.makeArray = function (t) {
      if (Array.isArray(t)) return t
      if (null === t || void 0 === t) return []
      var e = 'object' == typeof t && 'number' == typeof t.length
      return e ? n.call(t) : [t]
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e)
        ;-1 != i && t.splice(i, 1)
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; ) if (((t = t.parentNode), e(t, i))) return t
      }),
      (i.getQueryElement = function (t) {
        return 'string' == typeof t ? document.querySelector(t) : t
      }),
      (i.handleEvent = function (t) {
        var e = 'on' + t.type
        this[e] && this[e](t)
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t)
        var o = []
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t)
              e(t, n) && o.push(t)
              for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
            }
          }),
          o
        )
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100
        var n = t.prototype[e],
          o = e + 'Timeout'
        t.prototype[e] = function () {
          var t = this[o]
          clearTimeout(t)
          var e = arguments,
            r = this
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o]
          }, i)
        }
      }),
      (i.docReady = function (t) {
        var e = document.readyState
        'complete' == e || 'interactive' == e
          ? setTimeout(t)
          : document.addEventListener('DOMContentLoaded', t)
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + '-' + i
          })
          .toLowerCase()
      })
    var o = t.console
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var r = i.toDashed(n),
            s = 'data-' + r,
            a = document.querySelectorAll('[' + s + ']'),
            h = document.querySelectorAll('.js-' + r),
            u = i.makeArray(a).concat(i.makeArray(h)),
            d = s + '-options',
            l = t.jQuery
          u.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(d)
            try {
              i = r && JSON.parse(r)
            } catch (a) {
              return void (o && o.error('Error parsing ' + s + ' on ' + t.className + ': ' + a))
            }
            var h = new e(t, i)
            l && l.data(t, n, h)
          })
        })
      }),
      i
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('outlayer/item', ['ev-emitter/ev-emitter', 'get-size/get-size'], e)
      : 'object' == typeof module && module.exports
        ? (module.exports = e(require('ev-emitter'), require('get-size')))
        : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)))
  })(window, function (t, e) {
    'use strict'
    function i(t) {
      for (var e in t) return !1
      return (e = null), !0
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = {
          x: 0,
          y: 0,
        }),
        this._create())
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return '-' + t.toLowerCase()
      })
    }
    var r = document.documentElement.style,
      s = 'string' == typeof r.transition ? 'transition' : 'WebkitTransition',
      a = 'string' == typeof r.transform ? 'transform' : 'WebkitTransform',
      h = {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend',
      }[s],
      u = {
        transform: a,
        transition: s,
        transitionDuration: s + 'Duration',
        transitionProperty: s + 'Property',
        transitionDelay: s + 'Delay',
      },
      d = (n.prototype = Object.create(t.prototype))
    ;(d.constructor = n),
      (d._create = function () {
        ;(this._transn = {
          ingProperties: {},
          clean: {},
          onEnd: {},
        }),
          this.css({
            position: 'absolute',
          })
      }),
      (d.handleEvent = function (t) {
        var e = 'on' + t.type
        this[e] && this[e](t)
      }),
      (d.getSize = function () {
        this.size = e(this.element)
      }),
      (d.css = function (t) {
        var e = this.element.style
        for (var i in t) {
          var n = u[i] || i
          e[n] = t[i]
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption('originLeft'),
          i = this.layout._getOption('originTop'),
          n = t[e ? 'left' : 'right'],
          o = t[i ? 'top' : 'bottom'],
          r = parseFloat(n),
          s = parseFloat(o),
          a = this.layout.size
        ;-1 != n.indexOf('%') && (r = (r / 100) * a.width),
          -1 != o.indexOf('%') && (s = (s / 100) * a.height),
          (r = isNaN(r) ? 0 : r),
          (s = isNaN(s) ? 0 : s),
          (r -= e ? a.paddingLeft : a.paddingRight),
          (s -= i ? a.paddingTop : a.paddingBottom),
          (this.position.x = r),
          (this.position.y = s)
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption('originLeft'),
          n = this.layout._getOption('originTop'),
          o = i ? 'paddingLeft' : 'paddingRight',
          r = i ? 'left' : 'right',
          s = i ? 'right' : 'left',
          a = this.position.x + t[o]
        ;(e[r] = this.getXValue(a)), (e[s] = '')
        var h = n ? 'paddingTop' : 'paddingBottom',
          u = n ? 'top' : 'bottom',
          d = n ? 'bottom' : 'top',
          l = this.position.y + t[h]
        ;(e[u] = this.getYValue(l)), (e[d] = ''), this.css(e), this.emitEvent('layout', [this])
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption('horizontal')
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + '%'
          : t + 'px'
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption('horizontal')
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + '%'
          : t + 'px'
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition()
        var i = this.position.x,
          n = this.position.y,
          o = t == this.position.x && e == this.position.y
        if ((this.setPosition(t, e), o && !this.isTransitioning)) return void this.layoutPosition()
        var r = t - i,
          s = e - n,
          a = {}
        ;(a.transform = this.getTranslate(r, s)),
          this.transition({
            to: a,
            onTransitionEnd: {
              transform: this.layoutPosition,
            },
            isCleaning: !0,
          })
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption('originLeft'),
          n = this.layout._getOption('originTop')
        return (t = i ? t : -t), (e = n ? e : -e), 'translate3d(' + t + 'px, ' + e + 'px, 0)'
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        ;(this.position.x = parseFloat(t)), (this.position.y = parseFloat(e))
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to)
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t)
        var e = this._transn
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]
        for (i in t.to) (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0)
        if (t.from) {
          this.css(t.from)
          var n = this.element.offsetHeight
          n = null
        }
        this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0)
      })
    var l = 'opacity,' + o(a)
    ;(d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration
        ;(t = 'number' == typeof t ? t + 'ms' : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(h, this, !1)
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t)
      })
    var c = {
      '-webkit-transform': 'transform',
    }
    ;(d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = c[t.propertyName] || t.propertyName
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean && ((this.element.style[t.propertyName] = ''), delete e.clean[n]),
          n in e.onEnd)
        ) {
          var o = e.onEnd[n]
          o.call(this), delete e.onEnd[n]
        }
        this.emitEvent('transitionEnd', [this])
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(h, this, !1),
          (this.isTransitioning = !1)
      }),
      (d._removeStyles = function (t) {
        var e = {}
        for (var i in t) e[i] = ''
        this.css(e)
      })
    var f = {
      transitionProperty: '',
      transitionDuration: '',
      transitionDelay: '',
    }
    return (
      (d.removeTransitionStyles = function () {
        this.css(f)
      }),
      (d.stagger = function (t) {
        ;(t = isNaN(t) ? 0 : t), (this.staggerDelay = t + 'ms')
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({
            display: '',
          }),
          this.emitEvent('remove', [this])
      }),
      (d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration)
          ? (this.once('transitionEnd', function () {
              this.removeElem()
            }),
            void this.hide())
          : void this.removeElem()
      }),
      (d.reveal = function () {
        delete this.isHidden,
          this.css({
            display: '',
          })
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty('visibleStyle')
        ;(e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          })
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent('reveal')
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t]
        if (e.opacity) return 'opacity'
        for (var i in e) return i
      }),
      (d.hide = function () {
        ;(this.isHidden = !0),
          this.css({
            display: '',
          })
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty('hiddenStyle')
        ;(e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          })
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({
            display: 'none',
          }),
          this.emitEvent('hide'))
      }),
      (d.destroy = function () {
        this.css({
          position: '',
          left: '',
          right: '',
          top: '',
          bottom: '',
          transition: '',
          transform: '',
        })
      }),
      n
    )
  }),
  (function (t, e) {
    'use strict'
    'function' == typeof define && define.amd
      ? define(
          'outlayer/outlayer',
          ['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'],
          function (i, n, o, r) {
            return e(t, i, n, o, r)
          },
        )
      : 'object' == typeof module && module.exports
        ? (module.exports = e(
            t,
            require('ev-emitter'),
            require('get-size'),
            require('fizzy-ui-utils'),
            require('./item'),
          ))
        : (t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item))
  })(window, function (t, e, i, n, o) {
    'use strict'
    function r(t, e) {
      var i = n.getQueryElement(t)
      if (!i)
        return void (
          h && h.error('Bad element for ' + this.constructor.namespace + ': ' + (i || t))
        )
      ;(this.element = i),
        u && (this.$element = u(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e)
      var o = ++l
      ;(this.element.outlayerGUID = o), (c[o] = this), this._create()
      var r = this._getOption('initLayout')
      r && this.layout()
    }
    function s(t) {
      function e() {
        t.apply(this, arguments)
      }
      return (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), e
    }
    function a(t) {
      if ('number' == typeof t) return t
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2]
      if (!i.length) return 0
      i = parseFloat(i)
      var o = m[n] || 1
      return i * o
    }
    var h = t.console,
      u = t.jQuery,
      d = function () {},
      l = 0,
      c = {}
    ;(r.namespace = 'outlayer'),
      (r.Item = o),
      (r.defaults = {
        containerStyle: {
          position: 'relative',
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: '0.4s',
        hiddenStyle: {
          opacity: 0,
          transform: 'scale(0.001)',
        },
        visibleStyle: {
          opacity: 1,
          transform: 'scale(1)',
        },
      })
    var f = r.prototype
    n.extend(f, e.prototype),
      (f.option = function (t) {
        n.extend(this.options, t)
      }),
      (f._getOption = function (t) {
        var e = this.constructor.compatOptions[t]
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
      }),
      (r.compatOptions = {
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer',
      }),
      (f._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle)
        var t = this._getOption('resize')
        t && this.bindResize()
      }),
      (f.reloadItems = function () {
        this.items = this._itemize(this.element.children)
      }),
      (f._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0;
          o < e.length;
          o++
        ) {
          var r = e[o],
            s = new i(r, this)
          n.push(s)
        }
        return n
      }),
      (f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
      }),
      (f.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element
        })
      }),
      (f.layout = function () {
        this._resetLayout(), this._manageStamps()
        var t = this._getOption('layoutInstant'),
          e = void 0 !== t ? t : !this._isLayoutInited
        this.layoutItems(this.items, e), (this._isLayoutInited = !0)
      }),
      (f._init = f.layout),
      (f._resetLayout = function () {
        this.getSize()
      }),
      (f.getSize = function () {
        this.size = i(this.element)
      }),
      (f._getMeasurement = function (t, e) {
        var n,
          o = this.options[t]
        o
          ? ('string' == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0)
      }),
      (f.layoutItems = function (t, e) {
        ;(t = this._getItemsForLayout(t)), this._layoutItems(t, e), this._postLayout()
      }),
      (f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored
        })
      }),
      (f._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems('layout', t), t && t.length)) {
          var i = []
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t)
            ;(n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n)
          }, this),
            this._processLayoutQueue(i)
        }
      }),
      (f._getItemLayoutPosition = function () {
        return {
          x: 0,
          y: 0,
        }
      }),
      (f._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
          }, this)
      }),
      (f.updateStagger = function () {
        var t = this.options.stagger
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger)
      }),
      (f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
      }),
      (f._postLayout = function () {
        this.resizeContainer()
      }),
      (f.resizeContainer = function () {
        var t = this._getOption('resizeContainer')
        if (t) {
          var e = this._getContainerSize()
          e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
      }),
      (f._getContainerSize = d),
      (f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth
              : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? 'width' : 'height'] = t + 'px')
        }
      }),
      (f._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + 'Complete', null, [e])
        }
        function n() {
          s++, s == r && i()
        }
        var o = this,
          r = e.length
        if (!e || !r) return void i()
        var s = 0
        e.forEach(function (e) {
          e.once(t, n)
        })
      }),
      (f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i
        if ((this.emitEvent(t, n), u))
          if (((this.$element = this.$element || u(this.element)), e)) {
            var o = u.Event(e)
            ;(o.type = t), this.$element.trigger(o, i)
          } else this.$element.trigger(t, i)
      }),
      (f.ignore = function (t) {
        var e = this.getItem(t)
        e && (e.isIgnored = !0)
      }),
      (f.unignore = function (t) {
        var e = this.getItem(t)
        e && delete e.isIgnored
      }),
      (f.stamp = function (t) {
        ;(t = this._find(t)),
          t && ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this))
      }),
      (f.unstamp = function (t) {
        ;(t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t)
            }, this)
      }),
      (f._find = function (t) {
        return t
          ? ('string' == typeof t && (t = this.element.querySelectorAll(t)), (t = n.makeArray(t)))
          : void 0
      }),
      (f._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
      }),
      (f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        }
      }),
      (f._manageStamp = d),
      (f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          }
        return r
      }),
      (f.handleEvent = n.handleEvent),
      (f.bindResize = function () {
        t.addEventListener('resize', this), (this.isResizeBound = !0)
      }),
      (f.unbindResize = function () {
        t.removeEventListener('resize', this), (this.isResizeBound = !1)
      }),
      (f.onresize = function () {
        this.resize()
      }),
      n.debounceMethod(r, 'onresize', 100),
      (f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
      }),
      (f.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t
        return e && t.innerWidth !== this.size.innerWidth
      }),
      (f.addItems = function (t) {
        var e = this._itemize(t)
        return e.length && (this.items = this.items.concat(e)), e
      }),
      (f.appended = function (t) {
        var e = this.addItems(t)
        e.length && (this.layoutItems(e, !0), this.reveal(e))
      }),
      (f.prepended = function (t) {
        var e = this._itemize(t)
        if (e.length) {
          var i = this.items.slice(0)
          ;(this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i)
        }
      }),
      (f.reveal = function (t) {
        if ((this._emitCompleteOnItems('reveal', t), t && t.length)) {
          var e = this.updateStagger()
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal()
          })
        }
      }),
      (f.hide = function (t) {
        if ((this._emitCompleteOnItems('hide', t), t && t.length)) {
          var e = this.updateStagger()
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide()
          })
        }
      }),
      (f.revealItemElements = function (t) {
        var e = this.getItems(t)
        this.reveal(e)
      }),
      (f.hideItemElements = function (t) {
        var e = this.getItems(t)
        this.hide(e)
      }),
      (f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e]
          if (i.element == t) return i
        }
      }),
      (f.getItems = function (t) {
        t = n.makeArray(t)
        var e = []
        return (
          t.forEach(function (t) {
            var i = this.getItem(t)
            i && e.push(i)
          }, this),
          e
        )
      }),
      (f.remove = function (t) {
        var e = this.getItems(t)
        this._emitCompleteOnItems('remove', e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t)
            }, this)
      }),
      (f.destroy = function () {
        var t = this.element.style
        ;(t.height = ''),
          (t.position = ''),
          (t.width = ''),
          this.items.forEach(function (t) {
            t.destroy()
          }),
          this.unbindResize()
        var e = this.element.outlayerGUID
        delete c[e],
          delete this.element.outlayerGUID,
          u && u.removeData(this.element, this.constructor.namespace)
      }),
      (r.data = function (t) {
        t = n.getQueryElement(t)
        var e = t && t.outlayerGUID
        return e && c[e]
      }),
      (r.create = function (t, e) {
        var i = s(r)
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          u && u.bridget && u.bridget(t, i),
          i
        )
      })
    var m = {
      ms: 1,
      s: 1e3,
    }
    return (r.Item = o), r
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(['outlayer/outlayer', 'get-size/get-size'], e)
      : 'object' == typeof module && module.exports
        ? (module.exports = e(require('outlayer'), require('get-size')))
        : (t.Masonry = e(t.Outlayer, t.getSize))
  })(window, function (t, e) {
    var i = t.create('masonry')
    i.compatOptions.fitWidth = 'isFitWidth'
    var n = i.prototype
    return (
      (n._resetLayout = function () {
        this.getSize(),
          this._getMeasurement('columnWidth', 'outerWidth'),
          this._getMeasurement('gutter', 'outerWidth'),
          this.measureColumns(),
          (this.colYs = [])
        for (var t = 0; t < this.cols; t++) this.colYs.push(0)
        ;(this.maxY = 0), (this.horizontalColIndex = 0)
      }),
      (n.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n),
          a = s && 1 > s ? 'round' : 'floor'
        ;(r = Math[a](r)), (this.cols = Math.max(r, 1))
      }),
      (n.getContainerWidth = function () {
        var t = this._getOption('fitWidth'),
          i = t ? this.element.parentNode : this.element,
          n = e(i)
        this.containerWidth = n && n.innerWidth
      }),
      (n._getItemLayoutPosition = function (t) {
        t.getSize()
        var e = t.size.outerWidth % this.columnWidth,
          i = e && 1 > e ? 'round' : 'ceil',
          n = Math[i](t.size.outerWidth / this.columnWidth)
        n = Math.min(n, this.cols)
        for (
          var o = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition',
            r = this[o](n, t),
            s = {
              x: this.columnWidth * r.col,
              y: r.y,
            },
            a = r.y + t.size.outerHeight,
            h = n + r.col,
            u = r.col;
          h > u;
          u++
        )
          this.colYs[u] = a
        return s
      }),
      (n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e)
        return {
          col: e.indexOf(i),
          y: i,
        }
      }),
      (n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t)
        return e
      }),
      (n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t]
        var i = this.colYs.slice(t, t + e)
        return Math.max.apply(Math, i)
      }),
      (n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          n = t > 1 && i + t > this.cols
        i = n ? 0 : i
        var o = e.size.outerWidth && e.size.outerHeight
        return (
          (this.horizontalColIndex = o ? i + t : this.horizontalColIndex),
          {
            col: i,
            y: this._getColGroupY(i, t),
          }
        )
      }),
      (n._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption('originLeft'),
          r = o ? n.left : n.right,
          s = r + i.outerWidth,
          a = Math.floor(r / this.columnWidth)
        a = Math.max(0, a)
        var h = Math.floor(s / this.columnWidth)
        ;(h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h))
        for (
          var u = this._getOption('originTop'), d = (u ? n.top : n.bottom) + i.outerHeight, l = a;
          h >= l;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l])
      }),
      (n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs)
        var t = {
          height: this.maxY,
        }
        return this._getOption('fitWidth') && (t.width = this._getContainerFitWidth()), t
      }),
      (n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++
        return (this.cols - t) * this.columnWidth - this.gutter
      }),
      (n.needsResizeLayout = function () {
        var t = this.containerWidth
        return this.getContainerWidth(), t != this.containerWidth
      }),
      i
    )
  })
!(function (a) {
  'function' == typeof define && define.amd
    ? define(['jquery'], a)
    : a('object' == typeof exports ? require('jquery') : jQuery)
})(function (a) {
  var b,
    c = navigator.userAgent,
    d = /iphone/i.test(c),
    e = /chrome/i.test(c),
    f = /android/i.test(c)
  ;(a.mask = {
    definitions: {
      9: '[0-9]',
      a: '[A-Za-z]',
      '*': '[A-Za-z0-9]',
    },
    autoclear: !0,
    dataName: 'rawMaskFn',
    placeholder: '_',
  }),
    a.fn.extend({
      caret: function (a, b) {
        var c
        if (0 !== this.length && !this.is(':hidden'))
          return 'number' == typeof a
            ? ((b = 'number' == typeof b ? b : a),
              this.each(function () {
                this.setSelectionRange
                  ? this.setSelectionRange(a, b)
                  : this.createTextRange &&
                    ((c = this.createTextRange()),
                    c.collapse(!0),
                    c.moveEnd('character', b),
                    c.moveStart('character', a),
                    c.select())
              }))
            : (this[0].setSelectionRange
                ? ((a = this[0].selectionStart), (b = this[0].selectionEnd))
                : document.selection &&
                  document.selection.createRange &&
                  ((c = document.selection.createRange()),
                  (a = 0 - c.duplicate().moveStart('character', -1e5)),
                  (b = a + c.text.length)),
              {
                begin: a,
                end: b,
              })
      },
      unmask: function () {
        return this.trigger('unmask')
      },
      mask: function (c, g) {
        var h, i, j, k, l, m, n, o
        if (!c && this.length > 0) {
          h = a(this[0])
          var p = h.data(a.mask.dataName)
          return p ? p() : void 0
        }
        return (
          (g = a.extend(
            {
              autoclear: a.mask.autoclear,
              placeholder: a.mask.placeholder,
              completed: null,
            },
            g,
          )),
          (i = a.mask.definitions),
          (j = []),
          (k = n = c.length),
          (l = null),
          a.each(c.split(''), function (a, b) {
            '?' == b
              ? (n--, (k = a))
              : i[b]
                ? (j.push(new RegExp(i[b])),
                  null === l && (l = j.length - 1),
                  k > a && (m = j.length - 1))
                : j.push(null)
          }),
          this.trigger('unmask').each(function () {
            function h() {
              if (g.completed) {
                for (var a = l; m >= a; a++) if (j[a] && C[a] === p(a)) return
                g.completed.call(B)
              }
            }
            function p(a) {
              return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
            }
            function q(a) {
              for (; ++a < n && !j[a]; );
              return a
            }
            function r(a) {
              for (; --a >= 0 && !j[a]; );
              return a
            }
            function s(a, b) {
              var c, d
              if (!(0 > a)) {
                for (c = a, d = q(b); n > c; c++)
                  if (j[c]) {
                    if (!(n > d && j[c].test(C[d]))) break
                    ;(C[c] = C[d]), (C[d] = p(d)), (d = q(d))
                  }
                z(), B.caret(Math.max(l, a))
              }
            }
            function t(a) {
              var b, c, d, e
              for (b = a, c = p(a); n > b; b++)
                if (j[b]) {
                  if (((d = q(b)), (e = C[b]), (C[b] = c), !(n > d && j[d].test(e)))) break
                  c = e
                }
            }
            function u() {
              var a = B.val(),
                b = B.caret()
              if (o && o.length && o.length > a.length) {
                for (A(!0); b.begin > 0 && !j[b.begin - 1]; ) b.begin--
                if (0 === b.begin) for (; b.begin < l && !j[b.begin]; ) b.begin++
                B.caret(b.begin, b.begin)
              } else {
                for (A(!0); b.begin < n && !j[b.begin]; ) b.begin++
                B.caret(b.begin, b.begin)
              }
              h()
            }
            function v() {
              A(), B.val() != E && B.change()
            }
            function w(a) {
              if (!B.prop('readonly')) {
                var b,
                  c,
                  e,
                  f = a.which || a.keyCode
                ;(o = B.val()),
                  8 === f || 46 === f || (d && 127 === f)
                    ? ((b = B.caret()),
                      (c = b.begin),
                      (e = b.end),
                      e - c === 0 &&
                        ((c = 46 !== f ? r(c) : (e = q(c - 1))), (e = 46 === f ? q(e) : e)),
                      y(c, e),
                      s(c, e - 1),
                      a.preventDefault())
                    : 13 === f
                      ? v.call(this, a)
                      : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
              }
            }
            function x(b) {
              if (!B.prop('readonly')) {
                var c,
                  d,
                  e,
                  g = b.which || b.keyCode,
                  i = B.caret()
                if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                  if (
                    (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)),
                    (c = q(i.begin - 1)),
                    n > c && ((d = String.fromCharCode(g)), j[c].test(d)))
                  ) {
                    if ((t(c), (C[c] = d), z(), (e = q(c)), f)) {
                      var k = function () {
                        a.proxy(a.fn.caret, B, e)()
                      }
                      setTimeout(k, 0)
                    } else B.caret(e)
                    i.begin <= m && h()
                  }
                  b.preventDefault()
                }
              }
            }
            function y(a, b) {
              var c
              for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
            }
            function z() {
              B.val(C.join(''))
            }
            function A(a) {
              var b,
                c,
                d,
                e = B.val(),
                f = -1
              for (b = 0, d = 0; n > b; b++)
                if (j[b]) {
                  for (C[b] = p(b); d++ < e.length; )
                    if (((c = e.charAt(d - 1)), j[b].test(c))) {
                      ;(C[b] = c), (f = b)
                      break
                    }
                  if (d > e.length) {
                    y(b + 1, n)
                    break
                  }
                } else C[b] === e.charAt(d) && d++, k > b && (f = b)
              return (
                a
                  ? z()
                  : k > f + 1
                    ? g.autoclear || C.join('') === D
                      ? (B.val() && B.val(''), y(0, n))
                      : z()
                    : (z(), B.val(B.val().substring(0, f + 1))),
                k ? b : l
              )
            }
            var B = a(this),
              C = a.map(c.split(''), function (a, b) {
                return '?' != a ? (i[a] ? p(b) : a) : void 0
              }),
              D = C.join(''),
              E = B.val()
            B.data(a.mask.dataName, function () {
              return a
                .map(C, function (a, b) {
                  return j[b] && a != p(b) ? a : null
                })
                .join('')
            }),
              B.one('unmask', function () {
                B.off('.mask').removeData(a.mask.dataName)
              })
                .on('focus.mask', function () {
                  if (!B.prop('readonly')) {
                    clearTimeout(b)
                    var a
                    ;(E = B.val()),
                      (a = A()),
                      (b = setTimeout(function () {
                        B.get(0) === document.activeElement &&
                          (z(), a == c.replace('?', '').length ? B.caret(0, a) : B.caret(a))
                      }, 10))
                  }
                })
                .on('blur.mask', v)
                .on('keydown.mask', w)
                .on('keypress.mask', x)
                .on('input.mask paste.mask', function () {
                  B.prop('readonly') ||
                    setTimeout(function () {
                      var a = A(!0)
                      B.caret(a), h()
                    }, 0)
                }),
              e && f && B.off('input.mask').on('input.mask', u),
              A()
          })
        )
      },
    })
})
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], e)
      : e(((t = 'undefined' != typeof globalThis ? globalThis : t || self).window = t.window || {}))
})(this, function (t) {
  'use strict'
  function e(t) {
    return (e =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              'function' == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          })(t)
  }
  function i(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
  }
  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i]
      ;(n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n)
    }
  }
  function o(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t
  }
  function s(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError('Super expression must either be null or a function')
    ;(t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0,
      },
    })),
      e && r(t, e)
  }
  function a(t) {
    return (a = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
  }
  function r(t, e) {
    return (r =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t
      })(t, e)
  }
  function l(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    return t
  }
  function c(t, e) {
    return !e || ('object' != typeof e && 'function' != typeof e) ? l(t) : e
  }
  function h(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var i,
        n = a(t)
      if (e) {
        var o = a(this).constructor
        i = Reflect.construct(n, arguments, o)
      } else i = n.apply(this, arguments)
      return c(this, i)
    }
  }
  function d(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t
      })(t) ||
      (function (t, e) {
        var i =
          null == t ? null : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']
        if (null == i) return
        var n,
          o,
          s = [],
          a = !0,
          r = !1
        try {
          for (
            i = i.call(t);
            !(a = (n = i.next()).done) && (s.push(n.value), !e || s.length !== e);
            a = !0
          );
        } catch (t) {
          ;(r = !0), (o = t)
        } finally {
          try {
            a || null == i.return || i.return()
          } finally {
            if (r) throw o
          }
        }
        return s
      })(t, e) ||
      f(t, e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        )
      })()
    )
  }
  function u(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return v(t)
      })(t) ||
      (function (t) {
        if (('undefined' != typeof Symbol && null != t[Symbol.iterator]) || null != t['@@iterator'])
          return Array.from(t)
      })(t) ||
      f(t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        )
      })()
    )
  }
  function f(t, e) {
    if (t) {
      if ('string' == typeof t) return v(t, e)
      var i = Object.prototype.toString.call(t).slice(8, -1)
      return (
        'Object' === i && t.constructor && (i = t.constructor.name),
        'Map' === i || 'Set' === i
          ? Array.from(t)
          : 'Arguments' === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
            ? v(t, e)
            : void 0
      )
    }
  }
  function v(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i]
    return n
  }
  function p(t, e) {
    var i = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']
    if (!i) {
      if (Array.isArray(t) || (i = f(t)) || (e && t && 'number' == typeof t.length)) {
        i && (t = i)
        var n = 0,
          o = function () {}
        return {
          s: o,
          n: function () {
            return n >= t.length
              ? {
                  done: !0,
                }
              : {
                  done: !1,
                  value: t[n++],
                }
          },
          e: function (t) {
            throw t
          },
          f: o,
        }
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      )
    }
    var s,
      a = !0,
      r = !1
    return {
      s: function () {
        i = i.call(t)
      },
      n: function () {
        var t = i.next()
        return (a = t.done), t
      },
      e: function (t) {
        ;(r = !0), (s = t)
      },
      f: function () {
        try {
          a || null == i.return || i.return()
        } finally {
          if (r) throw s
        }
      },
    }
  }
  var g = function (t) {
      return (
        'object' === e(t) &&
        null !== t &&
        t.constructor === Object &&
        '[object Object]' === Object.prototype.toString.call(t)
      )
    },
    m = function t() {
      for (var i = !1, n = arguments.length, o = new Array(n), s = 0; s < n; s++)
        o[s] = arguments[s]
      'boolean' == typeof o[0] && (i = o.shift())
      var a = o[0]
      if (!a || 'object' !== e(a)) throw new Error('extendee must be an object')
      for (var r = o.slice(1), l = r.length, c = 0; c < l; c++) {
        var h = r[c]
        for (var d in h)
          if (h.hasOwnProperty(d)) {
            var u = h[d]
            if (i && (Array.isArray(u) || g(u))) {
              var f = Array.isArray(u) ? [] : {}
              a[d] = t(!0, a.hasOwnProperty(d) ? a[d] : f, u)
            } else a[d] = u
          }
      }
      return a
    },
    y = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3
      return (t = parseFloat(t) || 0), Math.round((t + Number.EPSILON) * e) / e
    },
    b =
      ('undefined' != typeof window && window.ResizeObserver) ||
      (function () {
        function t(e) {
          i(this, t),
            (this.observables = []),
            (this.boundCheck = this.check.bind(this)),
            this.boundCheck(),
            (this.callback = e)
        }
        return (
          o(t, [
            {
              key: 'observe',
              value: function (t) {
                if (
                  !this.observables.some(function (e) {
                    return e.el === t
                  })
                ) {
                  var e = {
                    el: t,
                    size: {
                      height: t.clientHeight,
                      width: t.clientWidth,
                    },
                  }
                  this.observables.push(e)
                }
              },
            },
            {
              key: 'unobserve',
              value: function (t) {
                this.observables = this.observables.filter(function (e) {
                  return e.el !== t
                })
              },
            },
            {
              key: 'disconnect',
              value: function () {
                this.observables = []
              },
            },
            {
              key: 'check',
              value: function () {
                var t = this.observables
                  .filter(function (t) {
                    var e = t.el.clientHeight,
                      i = t.el.clientWidth
                    if (t.size.height !== e || t.size.width !== i)
                      return (t.size.height = e), (t.size.width = i), !0
                  })
                  .map(function (t) {
                    return t.el
                  })
                t.length > 0 && this.callback(t), window.requestAnimationFrame(this.boundCheck)
              },
            },
          ]),
          t
        )
      })(),
    w = function t(e) {
      return (
        !(!e || e.classList.contains('carousel__track') || e === document.body) &&
        ((function (t) {
          var e = window.getComputedStyle(t)['overflow-y'],
            i = window.getComputedStyle(t)['overflow-x'],
            n = ('scroll' === e || 'auto' === e) && Math.abs(t.scrollHeight - t.clientHeight) > 1,
            o = ('scroll' === i || 'auto' === i) && Math.abs(t.scrollWidth - t.clientWidth) > 1
          return n || o
        })(e)
          ? e
          : t(e.parentNode))
      )
    },
    x = function (t) {
      var e = 0
      return (
        t &&
          (e =
            t instanceof SVGElement
              ? Math.min(t.getClientRects()[0].height, t.height.baseVal.value)
              : Math.max(t.offsetHeight, t.scrollHeight)),
        e
      )
    },
    k = (function () {
      function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        i(this, t), (this.options = m(!0, {}, e)), (this.plugins = []), (this.events = {})
        for (var n = 0, o = ['on', 'once']; n < o.length; n++)
          for (var s = o[n], a = 0, r = Object.entries(this.options[s] || {}); a < r.length; a++) {
            var l = r[a]
            this[s].apply(this, u(l))
          }
      }
      return (
        o(t, [
          {
            key: 'option',
            value: function (t, e) {
              t = String(t)
              var i,
                n,
                o =
                  ((i = t),
                  (n = this.options),
                  i.split('.').reduce(function (t, e) {
                    return t[e]
                  }, n))
              return 'function' == typeof o && (o = o.call(this, t)), void 0 === o ? e : o
            },
          },
          {
            key: 'localize',
            value: function (t) {
              var e = this,
                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
              return String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, function (t, n, o) {
                var s = !1
                if (
                  !(s = o
                    ? e.option(''.concat(n[0] + n.toLowerCase().substring(1), '.l10n.').concat(o))
                    : e.option('l10n.'.concat(n)))
                )
                  return n
                for (var a = 0; a < i.length; a++) s = s.split(i[a][0]).join(i[a][1])
                return s
              })
            },
          },
          {
            key: 'on',
            value: function (t, e) {
              var i = this
              if (g(t)) {
                for (var n = 0, o = Object.entries(t); n < o.length; n++) {
                  var s = o[n]
                  this.on.apply(this, u(s))
                }
                return this
              }
              return (
                String(t)
                  .split(' ')
                  .forEach(function (t) {
                    var n = (i.events[t] = i.events[t] || [])
                    ;-1 == n.indexOf(e) && n.push(e)
                  }),
                this
              )
            },
          },
          {
            key: 'once',
            value: function (t, e) {
              var i = this
              if (g(t)) {
                for (var n = 0, o = Object.entries(t); n < o.length; n++) {
                  var s = o[n]
                  this.once.apply(this, u(s))
                }
                return this
              }
              return (
                String(t)
                  .split(' ')
                  .forEach(function (t) {
                    var n = function n() {
                      i.off(t, n)
                      for (var o = arguments.length, s = new Array(o), a = 0; a < o; a++)
                        s[a] = arguments[a]
                      e.call.apply(e, [i, i].concat(s))
                    }
                    ;(n._ = e), i.on(t, n)
                  }),
                this
              )
            },
          },
          {
            key: 'off',
            value: function (t, e) {
              var i = this
              if (!g(t))
                return (
                  t.split(' ').forEach(function (t) {
                    var n = i.events[t]
                    if (!n || !n.length) return i
                    for (var o = -1, s = 0, a = n.length; s < a; s++) {
                      var r = n[s]
                      if (r && (r === e || r._ === e)) {
                        o = s
                        break
                      }
                    }
                    ;-1 != o && n.splice(o, 1)
                  }),
                  this
                )
              for (var n = 0, o = Object.entries(t); n < o.length; n++) {
                var s = o[n]
                this.off.apply(this, u(s))
              }
            },
          },
          {
            key: 'trigger',
            value: function (t) {
              for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
                i[n - 1] = arguments[n]
              var o,
                s = p(u(this.events[t] || []).slice())
              try {
                for (s.s(); !(o = s.n()).done; ) {
                  var a = o.value
                  if (a && !1 === a.call.apply(a, [this, this].concat(i))) return !1
                }
              } catch (t) {
                s.e(t)
              } finally {
                s.f()
              }
              var r,
                l = p(u(this.events['*'] || []).slice())
              try {
                for (l.s(); !(r = l.n()).done; ) {
                  var c = r.value
                  if (c && !1 === c.call.apply(c, [this, t, this].concat(i))) return !1
                }
              } catch (t) {
                l.e(t)
              } finally {
                l.f()
              }
              return !0
            },
          },
          {
            key: 'attachPlugins',
            value: function (t) {
              for (var e = {}, i = 0, n = Object.entries(t || {}); i < n.length; i++) {
                var o = d(n[i], 2),
                  s = o[0],
                  a = o[1]
                !1 !== this.options[s] &&
                  ((this.options[s] = m({}, a.defaults || {}, this.options[s])),
                  (e[s] = new a(this)))
              }
              for (var r = 0, l = Object.entries(e); r < l.length; r++) {
                var c = d(l[r], 2)
                c[0], c[1].attach(this)
              }
              return (this.plugins = Object.assign({}, this.plugins, e)), this
            },
          },
          {
            key: 'detachPlugins',
            value: function () {
              for (var t in this.plugins) {
                var e = void 0
                ;(e = this.plugins[t]) && 'function' == typeof e.detach && e.detach(this)
              }
              return (this.plugins = {}), this
            },
          },
        ]),
        t
      )
    })(),
    $ = {
      panOnlyZoomed: !1,
      lockAxis: !1,
      friction: 0.72,
      decelFriction: 0.92,
      zoomFriction: 0.72,
      bounceForce: 0.1,
      baseScale: 1,
      minScale: 1,
      maxScale: 2,
      step: 0.5,
      zoomInCentered: !0,
      pinchToZoom: !0,
      textSelection: !0,
      click: 'toggleZoom',
      clickDelay: 250,
      doubleClick: !1,
      wheel: 'zoom',
      wheelFactor: 30,
      wheelLimit: 3,
      touch: !0,
      draggableClass: 'is-draggable',
      draggingClass: 'is-dragging',
    },
    C = (function (t) {
      s(n, t)
      var e = h(n)
      function n(t) {
        var o,
          s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        if ((i(this, n), (s = m(!0, {}, $, s)), (o = e.call(this, s)), !(t instanceof HTMLElement)))
          throw new Error('Viewport not found')
        ;(o.state = 'init'), (o.$viewport = t)
        for (
          var a = 0, r = ['onPointerDown', 'onPointerMove', 'onPointerUp', 'onWheel', 'onClick'];
          a < r.length;
          a++
        ) {
          var c = r[a]
          o[c] = o[c].bind(l(o))
        }
        if (
          ((o.$content = o.option('content')),
          o.$content || (o.$content = o.$viewport.querySelector('.panzoom__content')),
          !o.$content)
        )
          throw new Error('Content not found')
        if (
          (!1 === o.option('textSelection') && o.$viewport.classList.add('not-selectable'),
          o.resetValues(),
          o.attachPlugins(n.Plugins),
          o.trigger('init'),
          o.handleContent(),
          o.attachEvents(),
          o.trigger('ready'),
          'init' === o.state)
        ) {
          var h = o.option('baseScale')
          1 === h
            ? ((o.state = 'ready'), o.handleCursor())
            : o.panTo({
                scale: h,
                friction: 0,
              })
        }
        return o
      }
      return (
        o(n, [
          {
            key: 'handleContent',
            value: function () {
              var t = this
              if (this.$content instanceof HTMLImageElement) {
                var e = function () {
                  var e = t.$content.naturalWidth
                  ;(t.maxScale = t.option('maxScale')),
                    (t.options.maxScale = function () {
                      var t = this.contentDim.width
                      return e > 0 && t > 0 ? (e / t) * this.maxScale : this.maxScale
                    }),
                    t.updateMetrics(),
                    t.trigger(e > 0 ? 'load' : 'error')
                }
                !0 !== this.$content.complete
                  ? ((this.$content.onload = function () {
                      return e()
                    }),
                    (this.$content.onerror = function () {
                      return e()
                    }))
                  : e()
              } else this.updateMetrics()
            },
          },
          {
            key: 'resetValues',
            value: function () {
              ;(this.viewportDim = {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
              }),
                (this.contentDim = {
                  width: 0,
                  height: 0,
                }),
                (this.friction = this.option('friction')),
                (this.current = {
                  x: 0,
                  y: 0,
                  scale: 1,
                }),
                (this.velocity = {
                  x: 0,
                  y: 0,
                  scale: 0,
                }),
                (this.pan = {
                  x: 0,
                  y: 0,
                  scale: 1,
                }),
                (this.drag = {
                  startTime: null,
                  firstPosition: null,
                  startPosition: null,
                  startPoint: null,
                  startDistance: null,
                  endPosition: null,
                  endPoint: null,
                  distance: 0,
                  distanceX: 0,
                  distanceY: 0,
                  elapsedTime: 0,
                }),
                (this.lockAxis = null),
                (this.pendingAnimateUpdate = null),
                (this.pendingResizeUpdate = null),
                (this.pointers = [])
            },
          },
          {
            key: 'updateMetrics',
            value: function () {
              var t,
                e,
                i = this.$viewport.getBoundingClientRect(),
                n = i.top,
                o = i.left,
                s = i.width,
                a = i.height,
                r = window.getComputedStyle(this.$viewport)
              ;(s -= parseFloat(r.paddingLeft) + parseFloat(r.paddingRight)),
                (a -= parseFloat(r.paddingTop) + parseFloat(r.paddingBottom)),
                (this.viewportDim = {
                  top: n,
                  left: o,
                  width: s,
                  height: a,
                }),
                (this.contentDim = {
                  width: this.option(
                    'width',
                    ((t = this.$content),
                    (e = 0),
                    t &&
                      (e =
                        t instanceof SVGElement
                          ? Math.min(t.getClientRects()[0].width, t.width.baseVal.value)
                          : Math.max(t.offsetWidth, t.scrollWidth)),
                    e),
                  ),
                  height: this.option('hidth', x(this.$content)),
                }),
                this.trigger('updateMetrics'),
                this.updateBounds()
            },
          },
          {
            key: 'updateBounds',
            value: function (t) {
              var e = {
                  from: 0,
                  to: 0,
                },
                i = {
                  from: 0,
                  to: 0,
                }
              if ((t || (t = this.velocity.scale ? this.pan.scale : this.current.scale), t < 1))
                return [e, i]
              var n = this.contentDim,
                o = this.viewportDim,
                s = n.width * t,
                a = n.height * t
              return (
                (e.to = y(0.5 * (s - n.width))),
                n.width > o.width ? (e.from = y(e.to + o.width - s)) : (e.from = y(-1 * e.to)),
                (i.to = y(0.5 * (a - n.height))),
                n.height > o.height ? (i.from = y(i.to + o.height - a)) : (i.from = y(-1 * i.to)),
                (this.boundX = e),
                (this.boundY = i),
                this.trigger('updateBounds', t),
                [this.boundX, this.boundY]
              )
            },
          },
          {
            key: 'zoomIn',
            value: function (t) {
              this.zoomTo(this.current.scale + (t || this.option('step')))
            },
          },
          {
            key: 'zoomOut',
            value: function (t) {
              this.zoomTo(this.current.scale - (t || this.option('step')))
            },
          },
          {
            key: 'toggleZoom',
            value: function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = this.option('maxScale'),
                i = this.option('baseScale')
              this.zoomTo(this.current.scale > i + 0.5 * (e - i) ? i : e, t)
            },
          },
          {
            key: 'zoomTo',
            value: function (t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = e.x,
                n = void 0 === i ? null : i,
                o = e.y,
                s = void 0 === o ? null : o,
                a = e.friction,
                r = void 0 === a ? this.option('zoomFriction') : a
              t || (t = this.option('baseScale')),
                (t = Math.max(Math.min(t, this.option('maxScale')), this.option('minScale')))
              var l = this.contentDim.width,
                c = this.contentDim.height,
                h = l * this.current.scale,
                d = c * this.current.scale,
                u = l * t,
                f = c * t
              null === n && (n = 0.5 * h),
                null === s && (s = 0.5 * d),
                !1 === this.option('zoomInCentered') &&
                  (n < 0.5 * h && (n = h), n > h && (n = 0), s < 0 && (s = d), s > d && (s = 0))
              var v = h > 0 ? n / h : 0,
                p = d > 0 ? s / d : 0,
                g = (u - h) * (v - 0.5),
                m = (f - d) * (p - 0.5)
              Math.abs(g) < 1 && (g = 0),
                Math.abs(m) < 1 && (m = 0),
                (n = this.current.x - g),
                (s = this.current.y - m),
                this.panTo({
                  x: n,
                  y: s,
                  scale: t,
                  friction: r,
                })
            },
          },
          {
            key: 'panTo',
            value: function (t) {
              var e = t.x,
                i = void 0 === e ? 0 : e,
                n = t.y,
                o = void 0 === n ? 0 : n,
                s = t.scale,
                a = void 0 === s ? this.current.scale : s,
                r = t.friction,
                l = void 0 === r ? this.option('friction') : r,
                c = t.ignoreBounds,
                h = void 0 !== c && c
              if ((l || this.stopMoving(), !0 !== h)) {
                var u = d(this.updateBounds(a), 2),
                  f = u[0],
                  v = u[1]
                f && (i = Math.max(Math.min(i, f.to), f.from)),
                  v && (o = Math.max(Math.min(o, v.to), v.from))
              }
              return l > 0 &&
                (Math.abs(i - this.current.x) > 0.1 ||
                  Math.abs(o - this.current.y) > 0.1 ||
                  Math.abs(a - this.current.scale) > 0.1)
                ? ((this.state = 'panning'),
                  (this.friction = l),
                  (this.pan = {
                    x: i,
                    y: o,
                    scale: a,
                  }),
                  (this.velocity = {
                    x: (1 / this.friction - 1) * (i - this.current.x),
                    y: (1 / this.friction - 1) * (o - this.current.y),
                    scale: (1 / this.friction - 1) * (a - this.current.scale),
                  }),
                  this.animate(),
                  this)
                : (this.pendingAnimateUpdate &&
                    (cancelAnimationFrame(this.pendingAnimateUpdate),
                    (this.pendingAnimateUpdate = null)),
                  (this.state = 'ready'),
                  this.stopMoving(),
                  (this.current = {
                    x: i,
                    y: o,
                    scale: a,
                  }),
                  this.transform(),
                  this.handleCursor(),
                  this.trigger('afterAnimate', !0),
                  this)
            },
          },
          {
            key: 'animate',
            value: function () {
              var t = this
              if (!this.pendingAnimateUpdate) {
                if (
                  (this.applyBoundForce(),
                  this.applyDragForce(),
                  (this.velocity.x *= this.friction),
                  (this.velocity.y *= this.friction),
                  (this.velocity.scale *= this.friction),
                  (this.current.x += this.velocity.x),
                  (this.current.y += this.velocity.y),
                  (this.current.scale += this.velocity.scale),
                  'dragging' == this.state ||
                    'pointerdown' == this.state ||
                    Math.abs(this.velocity.x) > 0.05 ||
                    Math.abs(this.velocity.y) > 0.05 ||
                    Math.abs(this.velocity.scale) > 0.05)
                )
                  return (
                    this.transform(),
                    void (this.pendingAnimateUpdate = requestAnimationFrame(function () {
                      ;(t.pendingAnimateUpdate = null), t.animate()
                    }))
                  )
                ;(this.current.x = y(this.current.x + this.velocity.x / (1 / this.friction - 1))),
                  (this.current.y = y(this.current.y + this.velocity.y / (1 / this.friction - 1))),
                  Math.abs(this.current.x) < 0.5 && (this.current.x = 0),
                  Math.abs(this.current.y) < 0.5 && (this.current.y = 0),
                  (this.current.scale = y(
                    this.current.scale + this.velocity.scale / (1 / this.friction - 1),
                    1e4,
                  )),
                  Math.abs(this.current.scale - 1) < 0.01 && (this.current.scale = 1),
                  (this.state = 'ready'),
                  this.stopMoving(),
                  this.transform(),
                  this.handleCursor(),
                  this.trigger('afterAnimate')
              }
            },
          },
          {
            key: 'handleCursor',
            value: function () {
              var t = this.option('draggableClass')
              t &&
                this.option('touch') &&
                (this.contentDim.width <= this.viewportDim.width &&
                1 == this.option('panOnlyZoomed') &&
                this.current.scale <= this.option('baseScale')
                  ? this.$viewport.classList.remove(t)
                  : this.$viewport.classList.add(t))
            },
          },
          {
            key: 'isMoved',
            value: function () {
              return (
                0 !== this.current.x ||
                0 !== this.current.y ||
                1 !== this.current.scale ||
                this.velocity.x > 0 ||
                this.velocity.y > 0 ||
                this.velocity.scale > 0
              )
            },
          },
          {
            key: 'stopMoving',
            value: function () {
              this.velocity = {
                x: 0,
                y: 0,
                scale: 0,
              }
            },
          },
          {
            key: 'transform',
            value: function () {
              this.trigger('beforeTransform')
              var t = y(this.current.x, 100),
                e = y(this.current.y, 100),
                i = y(this.current.scale, 1e4)
              Math.abs(t) <= 0.1 && Math.abs(e) <= 0.1 && Math.abs(i - 1) <= 0.1
                ? (this.$content.style.transform = '')
                : (this.$content.style.transform = 'translate('
                    .concat(t, 'px, ')
                    .concat(e, 'px) scale(')
                    .concat(i, ')')),
                this.trigger('afterTransform')
            },
          },
          {
            key: 'applyBoundForce',
            value: function () {
              if ('decel' === this.state) {
                var t,
                  e,
                  i,
                  n,
                  o = {
                    x: 0,
                    y: 0,
                  },
                  s = this.option('bounceForce'),
                  a = this.boundX,
                  r = this.boundY
                if (
                  (a && ((t = this.current.x < a.from), (e = this.current.x > a.to)),
                  r && ((i = this.current.y < r.from), (n = this.current.y > r.to)),
                  t || e)
                ) {
                  var l = (t ? a.from : a.to) - this.current.x,
                    c = l * s,
                    h = this.current.x + (this.velocity.x + c) / (1 / this.friction - 1)
                  ;(t && h < a.from) || (e && h > a.to) || (c = l * s - this.velocity.x), (o.x = c)
                }
                if (i || n) {
                  var d = (i ? r.from : r.to) - this.current.y,
                    u = d * s,
                    f = this.current.y + (this.velocity.y + u) / (1 / this.friction - 1)
                  ;(i && f < r.from) || (n && f > r.to) || (u = d * s - this.velocity.y), (o.y = u)
                }
                ;(this.velocity.x += o.x), (this.velocity.y += o.y)
              }
            },
          },
          {
            key: 'applyDragForce',
            value: function () {
              'dragging' === this.state &&
                (this.velocity = {
                  x: (1 / this.friction - 1) * (this.drag.endPosition.x - this.current.x),
                  y: (1 / this.friction - 1) * (this.drag.endPosition.y - this.current.y),
                  scale:
                    (1 / this.friction - 1) * (this.drag.endPosition.scale - this.current.scale),
                })
            },
          },
          {
            key: 'attachEvents',
            value: function () {
              var t = this,
                e = this.$viewport
              ;(this.resizeObserver =
                this.resizeObserver ||
                new b(function (e) {
                  t.pendingResizeUpdate =
                    t.pendingResizeUpdate ||
                    setTimeout(
                      function () {
                        var i = e && e[0].contentRect
                        !i && t.$viewport && (i = t.$viewport.getBoundingClientRect()),
                          i &&
                            (Math.abs(i.width - t.viewportDim.width) > 1 ||
                              Math.abs(i.height - t.viewportDim.height) > 1) &&
                            t.updateMetrics(),
                          (t.pendingResizeUpdate = null)
                      },
                      t.option('updateRate', 250),
                    )
                })),
                this.resizeObserver.observe(e),
                e.addEventListener('click', this.onClick, {
                  passive: !1,
                }),
                e.addEventListener('wheel', this.onWheel, {
                  passive: !1,
                }),
                this.option('touch') &&
                  (window.PointerEvent
                    ? (e.addEventListener('pointerdown', this.onPointerDown, {
                        passive: !1,
                      }),
                      e.addEventListener('pointermove', this.onPointerMove, {
                        passive: !1,
                      }),
                      e.addEventListener('pointerup', this.onPointerUp),
                      e.addEventListener('pointercancel', this.onPointerUp))
                    : (e.addEventListener('touchstart', this.onPointerDown, {
                        passive: !1,
                      }),
                      e.addEventListener('touchmove', this.onPointerMove, {
                        passive: !1,
                      }),
                      e.addEventListener('touchend', this.onPointerUp),
                      e.addEventListener('touchcancel', this.onPointerUp),
                      e.addEventListener('mousedown', this.onPointerDown)))
            },
          },
          {
            key: 'detachEvents',
            value: function () {
              this.resizeObserver && this.resizeObserver.disconnect(),
                (this.resizeObserver = null),
                this.pendingResizeUpdate &&
                  (clearTimeout(this.pendingResizeUpdate), (this.pendingResizeUpdate = null))
              var t = this.$viewport
              window.PointerEvent
                ? (t.removeEventListener('pointerdown', this.onPointerDown, {
                    passive: !1,
                  }),
                  t.removeEventListener('pointermove', this.onPointerMove, {
                    passive: !1,
                  }),
                  t.removeEventListener('pointerup', this.onPointerUp),
                  t.removeEventListener('pointercancel', this.onPointerUp))
                : (t.removeEventListener('touchstart', this.onPointerDown, {
                    passive: !1,
                  }),
                  t.removeEventListener('touchmove', this.onPointerMove, {
                    passive: !1,
                  }),
                  t.removeEventListener('touchend', this.onPointerUp),
                  t.removeEventListener('touchcancel', this.onPointerUp),
                  t.removeEventListener('mousedown', this.onPointerDown)),
                t.removeEventListener('click', this.onClick, {
                  passive: !1,
                }),
                t.removeEventListener('wheel', this.onWheel, {
                  passive: !1,
                })
            },
          },
          {
            key: 'copyPointer',
            value: function (t) {
              return {
                pointerId: t.pointerId,
                clientX: t.clientX,
                clientY: t.clientY,
              }
            },
          },
          {
            key: 'findPointerIndex',
            value: function (t) {
              for (var e = this.pointers.length; e--; )
                if (this.pointers[e].pointerId === t.pointerId) return e
              return -1
            },
          },
          {
            key: 'addPointer',
            value: function (t) {
              var e = 0
              if (t.touches && t.touches.length) {
                var i,
                  n = p(t.touches)
                try {
                  for (n.s(); !(i = n.n()).done; ) {
                    var o = i.value
                    ;(o.pointerId = e++), this.addPointer(o)
                  }
                } catch (t) {
                  n.e(t)
                } finally {
                  n.f()
                }
              } else
                (e = this.findPointerIndex(t)) > -1 && this.pointers.splice(e, 1),
                  this.pointers.push(t)
            },
          },
          {
            key: 'removePointer',
            value: function (t) {
              if (t.touches) for (; this.pointers.length; ) this.pointers.pop()
              else {
                var e = this.findPointerIndex(t)
                e > -1 && this.pointers.splice(e, 1)
              }
            },
          },
          {
            key: 'getMiddlePoint',
            value: function () {
              var t = u(this.pointers),
                e = (t = t.sort(function (t, e) {
                  return e.pointerId - t.pointerId
                })).shift(),
                i = t.shift()
              return i
                ? {
                    clientX: 0.5 * (e.clientX - i.clientX) + i.clientX,
                    clientY: 0.5 * (e.clientY - i.clientY) + i.clientY,
                  }
                : {
                    clientX: e ? e.clientX : 0,
                    clientY: e ? e.clientY : 0,
                  }
            },
          },
          {
            key: 'getDistance',
            value: function (t, e) {
              if (!(t = (t = t || u(this.pointers)).slice()) || t.length < 2) return 0
              var i = (t = t.sort(function (t, e) {
                  return e.pointerId - t.pointerId
                })).shift(),
                n = t.shift(),
                o = Math.abs(n.clientX - i.clientX)
              if ('x' === e) return o
              var s = Math.abs(n.clientY - i.clientY)
              return 'y' === e ? s : Math.sqrt(Math.pow(o, 2) + Math.pow(s, 2))
            },
          },
          {
            key: 'resetDragState',
            value: function () {
              var t = this.$content.getClientRects()[0],
                e = t.left,
                i = t.top,
                n = this.getMiddlePoint(),
                o = {
                  top: i,
                  left: e,
                  x: this.current.x,
                  y: this.current.y,
                  scale: this.current.scale,
                }
              m(this.drag, {
                startPosition: m({}, o),
                startPoint: m({}, n),
                startDistance: this.getDistance(),
                endPosition: m({}, o),
                endPoint: m({}, n),
                distance: 0,
                distanceX: 0,
                distanceY: 0,
              }),
                'pointerdown' === this.state &&
                  ((this.lockAxis = null),
                  (this.drag.startTime = new Date()),
                  (this.drag.firstPosition = Object.assign({}, o))),
                this.stopMoving(),
                (this.friction = this.option('friction'))
            },
          },
          {
            key: 'onPointerDown',
            value: function (t) {
              if (t && !(t.button && t.button > 0))
                if (this.option('panOnlyZoomed') && this.velocity.scale) t.preventDefault()
                else {
                  if ((this.resetDragState(), !this.pointers.length)) {
                    if (
                      -1 !==
                      ['BUTTON', 'TEXTAREA', 'OPTION', 'INPUT', 'SELECT', 'VIDEO'].indexOf(
                        t.target.nodeName,
                      )
                    )
                      return
                    if (
                      this.option('textSelection') &&
                      (function (t, e, i) {
                        for (
                          var n = t.childNodes, o = document.createRange(), s = 0;
                          s < n.length;
                          s++
                        ) {
                          var a = n[s]
                          if (a.nodeType === Node.TEXT_NODE) {
                            o.selectNodeContents(a)
                            var r = o.getBoundingClientRect()
                            if (e >= r.left && i >= r.top && e <= r.right && i <= r.bottom) return a
                          }
                        }
                        return !1
                      })(t.target, t.clientX, t.clientY)
                    )
                      return
                    if (w(t.target)) return
                  }
                  var e
                  if (
                    ((e = window.getSelection ? window.getSelection() : document.selection) &&
                      e.rangeCount &&
                      e.getRangeAt(0).getClientRects().length &&
                      (e.removeAllRanges ? e.removeAllRanges() : e.empty && e.empty()),
                    this.pointers.length > 1 || (this.pointers.length && this.lockAxis))
                  )
                    t.preventDefault()
                  else if (!1 !== this.trigger('touchStart', t))
                    if (
                      (t.preventDefault(),
                      (this.state = 'pointerdown'),
                      this.addPointer(this.copyPointer(t)),
                      this.resetDragState(),
                      window.PointerEvent)
                    )
                      try {
                        t.target.setPointerCapture(t.pointerId)
                      } catch (t) {}
                    else
                      document.addEventListener('mousemove', this.onPointerMove, {
                        passive: !1,
                      }),
                        document.addEventListener('mouseup', this.onPointerUp, {
                          passive: !1,
                        })
                }
            },
          },
          {
            key: 'onPointerMove',
            value: function (t) {
              if (
                !(
                  (t.targetTouches && t.targetTouches.length > 1) ||
                  ('pointerdown' !== this.state && 'dragging' !== this.state)
                )
              )
                if (0 != this.trigger('touchMove', t)) {
                  if (
                    (this.addPointer(this.copyPointer(t)),
                    !(this.pointers.length > 1 && !1 === this.option('pinchToZoom')))
                  )
                    if (
                      1 == this.option('panOnlyZoomed') &&
                      this.current.scale === this.option('baseScale') &&
                      this.pointers.length < 2
                    )
                      t.preventDefault()
                    else {
                      var e = this.getMiddlePoint(),
                        i = [e, this.drag.startPoint]
                      this.drag.distance = this.getDistance(i)
                      var n =
                        (this.events.click && this.events.click.length) ||
                        (this.events.doubleClick && this.events.doubleClick.length) ||
                        this.option.click ||
                        this.option.doubleClick
                      if (
                        !(
                          this.drag.distance < 6 &&
                          (n || (this.option('lockAxis') && !this.lockAxis))
                        ) &&
                        ('pointerdown' == this.state && (this.state = 'dragging'),
                        'dragging' === this.state)
                      ) {
                        var o = this.option('lockAxis')
                        if (!this.lockAxis && o)
                          if ('xy' === o) {
                            var s = this.getDistance(i, 'x'),
                              a = this.getDistance(i, 'y'),
                              r = Math.abs((180 * Math.atan2(a, s)) / Math.PI)
                            this.lockAxis = r > 45 && r < 135 ? 'y' : 'x'
                          } else this.lockAxis = o
                        t.preventDefault(),
                          t.stopPropagation(),
                          this.$viewport.classList.add(this.option('draggingClass')),
                          this.animate()
                        var l = this.current.scale,
                          c = 0,
                          h = 0
                        if (
                          ((this.current.scale === this.option('baseScale') &&
                            'y' === this.lockAxis) ||
                            (c = e.clientX - this.drag.startPoint.clientX),
                          (this.current.scale === this.option('baseScale') &&
                            'x' === this.lockAxis) ||
                            (h = e.clientY - this.drag.startPoint.clientY),
                          (this.drag.endPosition.x = this.drag.startPosition.x + c),
                          (this.drag.endPosition.y = this.drag.startPosition.y + h),
                          this.pointers.length > 1)
                        ) {
                          ;(this.drag.middlePoint = e),
                            (l =
                              (this.drag.startPosition.scale * this.getDistance()) /
                              this.drag.startDistance),
                            (l = Math.max(
                              Math.min(l, 2 * this.option('maxScale')),
                              0.5 * this.option('minScale'),
                            ))
                          var d = this.$content.width,
                            u = this.$content.height,
                            f = d * this.drag.startPosition.scale,
                            v = u * this.drag.startPosition.scale,
                            p = u * l,
                            g =
                              (d * l - f) *
                              ((this.drag.startPoint.clientX - this.drag.startPosition.left) / f -
                                0.5),
                            m =
                              (p - v) *
                              ((this.drag.startPoint.clientY - this.drag.startPosition.top) / v -
                                0.5)
                          ;(this.drag.endPosition.x -= g),
                            (this.drag.endPosition.y -= m),
                            (this.drag.endPosition.scale = l),
                            this.updateBounds(l)
                        }
                        this.applyDragResistance()
                      }
                    }
                } else t.preventDefault()
            },
          },
          {
            key: 'onPointerUp',
            value: function (t) {
              if ((this.removePointer(t), window.PointerEvent))
                try {
                  t.target.releasePointerCapture(t.pointerId)
                } catch (t) {}
              else
                document.removeEventListener('mousemove', this.onPointerMove, {
                  passive: !1,
                }),
                  document.removeEventListener('mouseup', this.onPointerUp, {
                    passive: !1,
                  })
              if (this.pointers.length > 0) return t.preventDefault(), void this.resetDragState()
              if ('pointerdown' === this.state || 'dragging' === this.state) {
                this.$viewport.classList.remove(this.option('draggingClass'))
                var e = this.$content.getClientRects()[0],
                  i = e.top,
                  n = e.left,
                  o = this.drag
                if (
                  (m(!0, o, {
                    elapsedTime: new Date() - o.startTime,
                    distanceX: o.endPosition.x - o.firstPosition.x,
                    distanceY: o.endPosition.y - o.firstPosition.y,
                    endPosition: {
                      top: i,
                      left: n,
                    },
                  }),
                  (o.distance = Math.sqrt(Math.pow(o.distanceX, 2) + Math.pow(o.distanceY, 2))),
                  (this.state = 'decel'),
                  (this.friction = this.option('decelFriction')),
                  (this.pan = {
                    x: this.current.x + this.velocity.x / (1 / this.friction - 1),
                    y: this.current.y + this.velocity.y / (1 / this.friction - 1),
                    scale: this.current.scale + this.velocity.scale / (1 / this.friction - 1),
                  }),
                  !1 !== this.trigger('touchEnd', t) && 'decel' === this.state)
                ) {
                  var s = this.option('minScale')
                  if (this.current.scale < s)
                    this.zoomTo(s, {
                      friction: 0.64,
                    })
                  else {
                    var a = this.option('maxScale')
                    if (this.current.scale - a > 0.01) {
                      var r = {
                        friction: 0.64,
                      }
                      o.middlePoint &&
                        ((r.x = o.middlePoint.clientX - n), (r.y = o.middlePoint.clientY - i)),
                        this.zoomTo(a, r)
                    }
                  }
                }
              }
            },
          },
          {
            key: 'applyDragResistance',
            value: function () {
              var t,
                e,
                i,
                n,
                o = this.boundX,
                s = this.boundY
              if (
                (o &&
                  ((t = this.drag.endPosition.x < o.from), (e = this.drag.endPosition.x > o.to)),
                s && ((i = this.drag.endPosition.y < s.from), (n = this.drag.endPosition.y > s.to)),
                t || e)
              ) {
                var a = t ? o.from : o.to,
                  r = this.drag.endPosition.x - a
                this.drag.endPosition.x = a + 0.3 * r
              }
              if (i || n) {
                var l = i ? s.from : s.to,
                  c = this.drag.endPosition.y - l
                this.drag.endPosition.y = l + 0.3 * c
              }
            },
          },
          {
            key: 'onWheel',
            value: function (t) {
              !1 !== this.trigger('wheel', t) &&
                'zoom' == this.option('wheel', t) &&
                this.zoomWithWheel(t)
            },
          },
          {
            key: 'zoomWithWheel',
            value: function (t) {
              void 0 === this.changedDelta && (this.changedDelta = 0)
              var e = this.current.scale,
                i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || t.wheelDelta || -t.detail))
              if (
                (i < 0 && e <= this.option('minScale')) ||
                (i > 0 && e >= this.option('maxScale'))
              ) {
                if (
                  ((this.changedDelta += Math.abs(i)),
                  this.changedDelta > this.option('wheelLimit'))
                )
                  return
              } else this.changedDelta = 0
              ;(e = (e * (100 + i * this.option('wheelFactor'))) / 100), t.preventDefault()
              var n = this.$content.getClientRects()[0],
                o = n.top,
                s = n.left,
                a = t.clientX - s,
                r = t.clientY - o
              this.zoomTo(e, {
                x: a,
                y: r,
              })
            },
          },
          {
            key: 'onClick',
            value: function (t) {
              var e = this
              if (!t.defaultPrevented) {
                if (window.getSelection().toString().length)
                  return t.stopPropagation(), void t.stopImmediatePropagation()
                if (
                  this.drag.startPosition &&
                  this.drag.endPosition &&
                  (Math.abs(this.drag.endPosition.top - this.drag.startPosition.top) > 1 ||
                    Math.abs(this.drag.endPosition.left - this.drag.startPosition.left) > 1)
                )
                  return t.stopPropagation(), void t.stopImmediatePropagation()
                if (this.drag.distance > (this.lockAxis ? 6 : 1))
                  return t.preventDefault(), t.stopPropagation(), void t.stopImmediatePropagation()
                var i = null,
                  n = null
                void 0 !== t.clientX &&
                  void 0 !== t.clientY &&
                  ((i = t.clientX - this.$content.getClientRects()[0].left),
                  (n = t.clientY - this.$content.getClientRects()[0].top))
                var o = this.options.doubleClick
                if (
                  (!o && this.events.doubleClick && this.events.doubleClick.length && (o = !0), o)
                ) {
                  if (!this.clickTimer)
                    return (
                      (this.lastClickEvent = t),
                      void (this.clickTimer = setTimeout(function () {
                        ;(e.clickTimer = null),
                          !1 !== e.trigger('click', t) &&
                            'toggleZoom' === e.option('click') &&
                            e.toggleZoom({
                              x: i,
                              y: n,
                            })
                      }, this.option('clickDelay')))
                    )
                  this.getDistance([t, this.lastClickEvent]) >= 6 ||
                    (clearTimeout(this.clickTimer),
                    (this.clickTimer = null),
                    !1 !== this.trigger('doubleClick', t) &&
                      'toggleZoom' === this.option('doubleClick') &&
                      this.toggleZoom({
                        x: i,
                        y: n,
                      }))
                } else {
                  if (!1 === this.trigger('click', t)) return
                  'toggleZoom' === this.option('click') &&
                    this.toggleZoom({
                      x: i,
                      y: n,
                    })
                }
              }
            },
          },
          {
            key: 'destroy',
            value: function () {
              'destroy' !== this.state &&
                ((this.state = 'destroy'),
                this.$viewport.classList.remove('not-selectable'),
                this.$content instanceof HTMLImageElement &&
                  !this.$content.complete &&
                  ((this.$content.onload = null), (this.$content.onerror = null)),
                this.pendingAnimateUpdate &&
                  (cancelAnimationFrame(this.pendingAnimateUpdate),
                  (this.pendingAnimateUpdate = null)),
                this.clickTimer && (clearTimeout(this.clickTimer), (this.clickTimer = null)),
                this.detachEvents(),
                (this.pointers = []),
                this.resetValues(),
                (this.$viewport = null),
                (this.$content = null),
                (this.options = {}),
                (this.events = {}))
            },
          },
        ]),
        n
      )
    })(k)
  ;(C.version = '4.0.0-alpha.4'), (C.Plugins = {})
  var P = function (t, e) {
      var i = 0
      return function () {
        var n = new Date().getTime()
        if (!(n - i < e)) return (i = n), t.apply(void 0, arguments)
      }
    },
    S = (function () {
      function t(e) {
        i(this, t),
          (this.$container = null),
          (this.$prev = null),
          (this.$next = null),
          (this.carousel = e),
          (this.onRefresh = this.onRefresh.bind(this))
      }
      return (
        o(t, [
          {
            key: 'option',
            value: function (t) {
              return this.carousel.option('Navigation.'.concat(t))
            },
          },
          {
            key: 'createButton',
            value: function (t) {
              var e,
                i = this,
                n = document.createElement('button')
              n.setAttribute('title', this.carousel.localize('{{'.concat(t.toUpperCase(), '}}')))
              var o = this.option('classNames.button') + ' ' + this.option('classNames.'.concat(t))
              return (
                (e = n.classList).add.apply(e, u(o.split(' '))),
                n.setAttribute('tabindex', '0'),
                (n.innerHTML = this.carousel.localize(this.option(''.concat(t, 'Tpl')))),
                n.addEventListener('click', function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    i.carousel['slide'.concat('next' === t ? 'Next' : 'Prev')]()
                }),
                n
              )
            },
          },
          {
            key: 'build',
            value: function () {
              this.$container ||
                ((this.$container = document.createElement('div')),
                this.$container.classList.add(this.option('classNames.main')),
                this.carousel.$element.appendChild(this.$container)),
                this.$next ||
                  ((this.$next = this.createButton('next')),
                  this.$container.appendChild(this.$next)),
                this.$prev ||
                  ((this.$prev = this.createButton('prev')),
                  this.$container.appendChild(this.$prev))
            },
          },
          {
            key: 'onRefresh',
            value: function () {
              var t = this.carousel.pages.length
              t <= 1 ||
              (t > 1 &&
                this.carousel.elemDimWidth < this.carousel.wrapDimWidth &&
                !Number.isInteger(this.carousel.option('slidesPerPage')))
                ? this.cleanup()
                : (this.build(),
                  this.$prev.removeAttribute('disabled'),
                  this.$next.removeAttribute('disabled'),
                  this.carousel.option('infiniteX', this.carousel.option('infinite')) ||
                    (this.carousel.page <= 0 && this.$prev.setAttribute('disabled', ''),
                    this.carousel.page >= t - 1 && this.$next.setAttribute('disabled', '')))
            },
          },
          {
            key: 'cleanup',
            value: function () {
              this.$prev && this.$prev.remove(),
                (this.$prev = null),
                this.$next && this.$next.remove(),
                (this.$next = null),
                this.$container && this.$container.remove(),
                (this.$container = null)
            },
          },
          {
            key: 'attach',
            value: function () {
              this.carousel.on('refresh change', this.onRefresh)
            },
          },
          {
            key: 'detach',
            value: function () {
              this.carousel.off('refresh change', this.onRefresh), this.cleanup()
            },
          },
        ]),
        t
      )
    })()
  S.defaults = {
    prevTpl:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
    nextTpl:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
    classNames: {
      main: 'carousel__nav',
      button: 'carousel__button',
      next: 'is-next',
      prev: 'is-prev',
    },
  }
  var E = (function () {
      function t(e) {
        i(this, t),
          (this.carousel = e),
          (this.$list = null),
          (this.events = {
            change: this.onChange.bind(this),
            refresh: this.onRefresh.bind(this),
          })
      }
      return (
        o(t, [
          {
            key: 'buildList',
            value: function () {
              var t = this
              if (!(this.carousel.pages.length < 2)) {
                var e = document.createElement('ol')
                return (
                  e.classList.add('carousel__dots'),
                  e.addEventListener('click', function (e) {
                    if ('page' in e.target.dataset) {
                      e.preventDefault(), e.stopPropagation()
                      var i = parseInt(e.target.dataset.page, 10),
                        n = t.carousel
                      i !== n.page &&
                        (n.pages.length < 3 && n.option('infinite')
                          ? n[0 == i ? 'slidePrev' : 'slideNext']()
                          : n.slideTo(i))
                    }
                  }),
                  (this.$list = e),
                  this.carousel.$element.appendChild(e),
                  this.carousel.$element.classList.add('has-dots'),
                  e
                )
              }
            },
          },
          {
            key: 'removeList',
            value: function () {
              this.$list && (this.$list.parentNode.removeChild(this.$list), (this.$list = null))
            },
          },
          {
            key: 'rebuildDots',
            value: function () {
              var t = this,
                e = this.$list,
                i = !!e,
                n = this.carousel.pages.length
              if (n < 2) i && this.removeList()
              else {
                i || (e = this.buildList())
                var o = this.$list.children.length
                if (o > n) for (var s = n; s < o; s++) this.$list.removeChild(this.$list.lastChild)
                else {
                  for (
                    var a = function (e) {
                        var i = document.createElement('li')
                        i.classList.add('carousel__dot'),
                          (i.dataset.page = e),
                          i.setAttribute('role', 'button'),
                          i.setAttribute('tabindex', '0'),
                          i.setAttribute('title', t.carousel.localize('{{GOTO}}', [['%d', e + 1]])),
                          i.addEventListener('keydown', function (t) {
                            var e,
                              n = t.code
                            'Enter' === n || 'NumpadEnter' === n
                              ? (e = i)
                              : 'ArrowRight' === n
                                ? (e = i.nextSibling)
                                : 'ArrowLeft' === n && (e = i.previousSibling),
                              e && e.click()
                          }),
                          t.$list.appendChild(i)
                      },
                      r = o;
                    r < n;
                    r++
                  )
                    a(r)
                  this.setActiveDot()
                }
              }
            },
          },
          {
            key: 'setActiveDot',
            value: function () {
              if (this.$list) {
                this.$list.childNodes.forEach(function (t) {
                  t.classList.remove('is-selected')
                })
                var t = this.$list.childNodes[this.carousel.page]
                t && t.classList.add('is-selected')
              }
            },
          },
          {
            key: 'onChange',
            value: function () {
              this.setActiveDot()
            },
          },
          {
            key: 'onRefresh',
            value: function () {
              this.rebuildDots()
            },
          },
          {
            key: 'attach',
            value: function () {
              this.carousel.on(this.events)
            },
          },
          {
            key: 'detach',
            value: function () {
              this.removeList(), this.carousel.off(this.events), (this.carousel = null)
            },
          },
        ]),
        t
      )
    })(),
    L = (function () {
      function t(e) {
        i(this, t),
          (this.nav = e),
          (this.selectedIndex = null),
          (this.onNavReady = this.onNavReady.bind(this)),
          (this.onNavClick = this.onNavClick.bind(this)),
          (this.onNavCreateSlide = this.onNavCreateSlide.bind(this)),
          (this.onTargetChange = this.onTargetChange.bind(this))
      }
      return (
        o(t, [
          {
            key: 'onNavReady',
            value: function () {
              this.onTargetChange(!0),
                this.nav.on('createSlide', this.onNavCreateSlide),
                this.nav.on('Panzoom.updateMetrics', this.onTargetChange),
                this.nav.Panzoom.on('click', this.onNavClick),
                this.sync.on('change', this.onTargetChange)
            },
          },
          {
            key: 'onNavCreateSlide',
            value: function (t, e) {
              e.index === this.selectedIndex && this.markSelectedSlide(e.index)
            },
          },
          {
            key: 'onNavClick',
            value: function (t, e) {
              var i = e.target.closest('.carousel__slide')
              if (i) {
                e.preventDefault()
                var n = parseInt(i.dataset.index, 10),
                  o = this.sync.getPageforSlide(n)
                this.sync.page !== o &&
                  this.sync.slideTo(o, {
                    friction: this.nav.option('Sync.friction'),
                  }),
                  this.markSelectedSlide(n)
              }
            },
          },
          {
            key: 'markSelectedSlide',
            value: function (t) {
              ;(this.selectedIndex = t),
                u(this.nav.slides).filter(function (t) {
                  return t.$el && t.$el.classList.remove('is-nav-selected')
                })
              var e = this.nav.slides[t]
              e && e.$el && e.$el.classList.add('is-nav-selected')
            },
          },
          {
            key: 'onTargetChange',
            value: function (t) {
              var e = this.sync.pages[this.sync.page].indexes[0],
                i = this.nav.getPageforSlide(e)
              null !== i &&
                (this.nav.slideTo(
                  i,
                  !0 === t
                    ? {
                        friction: 0,
                      }
                    : {},
                ),
                this.markSelectedSlide(e))
            },
          },
          {
            key: 'attach',
            value: function () {
              var t = this.nav.options.Sync
              t &&
                (g(t) && 'object' === e(t.with) && (this.sync = t.with),
                this.sync && this.nav.on('ready', this.onNavReady))
            },
          },
          {
            key: 'detach',
            value: function () {
              this.sync &&
                (this.nav.off('ready', this.onNavReady),
                this.nav.off('createSlide', this.onNavCreate),
                this.nav.on('Panzoom.updateMetrics', this.onTargetChange),
                this.sync.off('change', this.onTargetChange)),
                this.nav.Panzoom.off('click', this.onNavClick),
                (this.sync = null),
                (this.selectedIndex = null)
            },
          },
        ]),
        t
      )
    })()
  L.defaults = {
    friction: 0.92,
  }
  var T = {
      Navigation: S,
      Dots: E,
      Sync: L,
    },
    M = {
      slides: [],
      preload: 0,
      slidesPerPage: 'auto',
      initialPage: 0,
      friction: 0.92,
      center: !0,
      infinite: !0,
      fill: !0,
      dragFree: !1,
      classNames: {
        viewport: 'carousel__viewport',
        track: 'carousel__track',
        slide: 'carousel__slide',
        slideSelected: 'is-selected',
      },
      l10n: {
        NEXT: 'Next slide',
        PREV: 'Previous slide',
        GOTO: 'Go to slide %d',
      },
    },
    D = (function (t) {
      s(n, t)
      var e = h(n)
      function n(t) {
        var o,
          s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        return (
          i(this, n),
          (s = m(!0, {}, M, s)),
          ((o = e.call(this, s)).state = 'init'),
          (o.$element = t),
          (t.Carousel = l(o)),
          (o.page = o.pageIndex = null),
          (o.prevPage = o.prevPageIndex = null),
          (o.slideNext = P(o.slideNext.bind(l(o)), 250)),
          (o.slidePrev = P(o.slidePrev.bind(l(o)), 250)),
          o.attachPlugins(n.Plugins),
          o.trigger('init'),
          o.initLayout(),
          o.initSlides(),
          o.initPanzoom(),
          (o.state = 'ready'),
          o.trigger('ready'),
          o
        )
      }
      return (
        o(n, [
          {
            key: 'initLayout',
            value: function () {
              if (!(this.$element instanceof HTMLElement))
                throw new Error('No root element provided')
              var t,
                e,
                i = this.option('classNames')
              ;((this.$viewport =
                this.option('viewport') || this.$element.querySelector('.' + i.viewport)),
              this.$viewport) ||
                ((this.$viewport = document.createElement('div')),
                this.$viewport.classList.add(i.viewport),
                (t = this.$viewport).append.apply(t, u(this.$element.childNodes)),
                this.$element.appendChild(this.$viewport))
              ;((this.$track = this.option('track') || this.$element.querySelector('.' + i.track)),
              this.$track) ||
                ((this.$track = document.createElement('div')),
                this.$track.classList.add(i.track),
                (e = this.$track).append.apply(e, u(this.$viewport.childNodes)),
                this.$viewport.appendChild(this.$track))
            },
          },
          {
            key: 'initSlides',
            value: function () {
              var t = this
              ;(this.slides = []),
                this.$viewport
                  .querySelectorAll('.' + this.option('classNames.slide'))
                  .forEach(function (e) {
                    var i = {
                      $el: e,
                      isDom: !0,
                    }
                    t.slides.push(i), t.trigger('createSlide', i, t.slides.length)
                  }),
                Array.isArray(this.options.slides) &&
                  (this.slides = m(!0, u(this.slides), this.options.slides))
            },
          },
          {
            key: 'updatePage',
            value: function () {
              var t = this.page
              null === t && (t = this.page = this.option('initialPage')), this.updateMetrics()
              var e = this.pages
              e[t] || (t = e.length ? e[e.length - 1].index : 0),
                this.slideTo(t, {
                  friction: 0,
                })
            },
          },
          {
            key: 'updateBounds',
            value: function () {
              var t = this.Panzoom,
                e = this.option('infinite'),
                i = this.option('infiniteX', e),
                n = this.option('infiniteY', e)
              i && (t.boundX = null),
                n && (t.boundY = null),
                i ||
                  n ||
                  (t.boundX = {
                    from: -1 * this.pages[this.pages.length - 1].left,
                    to: -1 * this.pages[0].left,
                  })
            },
          },
          {
            key: 'initPanzoom',
            value: function () {
              var t = this,
                e = m(
                  !0,
                  {},
                  {
                    content: this.$track,
                    click: !1,
                    doubleClick: !1,
                    wheel: !1,
                    pinchToZoom: !1,
                    lockAxis: 'x',
                    textSelection: function () {
                      return t.option('textSelection', !1)
                    },
                    panOnlyZoomed: function () {
                      return t.option('panOnlyZoomed', t.elemDimWidth < t.wrapDimWidth)
                    },
                    on: {
                      '*': function (e) {
                        for (
                          var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1;
                          o < i;
                          o++
                        )
                          n[o - 1] = arguments[o]
                        return t.trigger.apply(t, ['Panzoom.'.concat(e)].concat(n))
                      },
                      init: function (e) {
                        return (t.Panzoom = e)
                      },
                      updateMetrics: function () {
                        t.updatePage()
                      },
                      updateBounds: function () {
                        t.updateBounds()
                      },
                      beforeTransform: this.onBeforeTransform.bind(this),
                      afterAnimate: this.onAfterAnimate.bind(this),
                      touchEnd: this.onTouchEnd.bind(this),
                    },
                  },
                  this.option('Panzoom'),
                )
              new C(this.$viewport, e)
            },
          },
          {
            key: 'onBeforeTransform',
            value: function () {
              this.option('infiniteX', this.option('infinite')) && this.manageInfiniteTrack(),
                this.manageSlideVisiblity()
            },
          },
          {
            key: 'onAfterAnimate',
            value: function (t, e) {
              e || this.trigger('settle')
            },
          },
          {
            key: 'onTouchEnd',
            value: function (t) {
              var e = this.option('dragFree')
              if (
                !e &&
                this.pages.length > 1 &&
                t.drag.elapsedTime < 350 &&
                Math.abs(t.drag.distanceY) < 1 &&
                Math.abs(t.drag.distanceX) > 5
              )
                this[t.drag.distanceX < 0 ? 'slideNext' : 'slidePrev']()
              else if (e) {
                var i = d(this.getPageFromPosition(-1 * this.Panzoom.pan.x), 2)[1]
                this.setPage(i)
              } else this.slideToClosest()
            },
          },
          {
            key: 'manageInfiniteTrack',
            value: function () {
              if (
                !(
                  !this.option('infiniteX', this.option('infinite')) ||
                  this.pages.length < 2 ||
                  this.elemDimWidth < this.wrapDimWidth
                )
              ) {
                var t = this.Panzoom,
                  e = !1
                return (
                  t.current.x < -1 * (t.contentDim.width - t.viewportDim.width) &&
                    ((t.current.x += t.contentDim.width),
                    t.drag.firstPosition && (t.drag.firstPosition.x += t.contentDim.width),
                    (this.pageIndex = this.pageIndex - this.pages.length),
                    (e = !0)),
                  t.current.x > t.viewportDim.width &&
                    ((t.current.x -= t.contentDim.width),
                    t.drag.firstPosition && (t.drag.firstPosition.x -= t.contentDim.width),
                    (this.pageIndex = this.pageIndex + this.pages.length),
                    (e = !0)),
                  e && 'dragging' === t.state && t.resetDragState(),
                  e
                )
              }
            },
          },
          {
            key: 'manageSlideVisiblity',
            value: function () {
              var t = this,
                e = this.elemDimWidth,
                i = this.wrapDimWidth,
                n = -1 * this.Panzoom.current.x
              Math.abs(n) < 0.1 && (n = 0)
              var o = this.option('preload'),
                s = this.option('infiniteX', this.option('infinite')),
                a = parseFloat(
                  window.getComputedStyle(this.$viewport, null).getPropertyValue('padding-left'),
                ),
                r = parseFloat(
                  window.getComputedStyle(this.$viewport, null).getPropertyValue('padding-right'),
                )
              this.slides.forEach(function (l) {
                var c,
                  h,
                  d = 0
                ;(c = n - a), (h = n + i + r), (c -= o * (i + a + r)), (h += o * (i + a + r))
                var u = l.left + l.width > c && l.left < h
                ;(c = n + e - a), (h = n + e + i + r), (c -= o * (i + a + r))
                var f = s && l.left + l.width > c && l.left < h
                ;(c = n - e - a), (h = n - e + i + r), (c -= o * (i + a + r))
                var v = s && l.left + l.width > c && l.left < h
                f || u || v
                  ? (t.createSlideEl(l),
                    u && (d = 0),
                    f && (d = -1),
                    v && (d = 1),
                    l.left + l.width > n && l.left <= n + i + r && (d = 0))
                  : t.removeSlideEl(l),
                  (l.hasDiff = d)
              })
              var l = 0,
                c = 0
              this.slides.forEach(function (t, i) {
                var n = 0
                t.$el
                  ? (i !== l || t.hasDiff ? (n = c + t.hasDiff * e) : (c = 0),
                    (t.$el.style.left =
                      Math.abs(n) > 0.1 ? ''.concat(c + t.hasDiff * e, 'px') : ''),
                    l++)
                  : (c += t.width)
              }),
                (this.Panzoom.viewportDim.height = this.Panzoom.$content.clientHeight),
                this.markSelectedSlides()
            },
          },
          {
            key: 'markSelectedSlides',
            value: function () {
              var t = this,
                e = this.option('classNames.slideSelected'),
                i = 'aria-hidden'
              this.slides.forEach(function (n, o) {
                var s = n.$el
                if (s) {
                  var a = t.pages[t.page]
                  a && a.indexes && a.indexes.indexOf(o) > -1
                    ? (e &&
                        !s.classList.contains(e) &&
                        (s.classList.add(e), t.trigger('selectSlide', n)),
                      s.removeAttribute(i))
                    : (e &&
                        s.classList.contains(e) &&
                        (s.classList.remove(e), t.trigger('unselectSlide', n)),
                      s.setAttribute(i, !0))
                }
              })
            },
          },
          {
            key: 'createSlideEl',
            value: function (t) {
              if (t) {
                if (!t.$el) {
                  var e,
                    i = document.createElement('div')
                  if (
                    ((i.dataset.index = t.index),
                    i.classList.add(this.option('classNames.slide')),
                    t.customClass)
                  )
                    (e = i.classList).add.apply(e, u(t.customClass.split(' ')))
                  t.html && (i.innerHTML = t.html)
                  var n = []
                  this.slides.forEach(function (t, e) {
                    t.$el && n.push(e)
                  })
                  var o = t.index,
                    s = null
                  if (n.length) {
                    var a = n.reduce(function (t, e) {
                      return Math.abs(e - o) < Math.abs(t - o) ? e : t
                    })
                    s = this.slides[a]
                  }
                  return (
                    this.$track.insertBefore(
                      i,
                      s && s.$el ? (s.index < t.index ? s.$el.nextSibling : s.$el) : null,
                    ),
                    (t.$el = i),
                    this.trigger('createSlide', t, o),
                    t
                  )
                }
                var r
                parseInt(t.$el.dataset.index, 10) !== t.index &&
                  ((t.$el.dataset.index = t.index),
                  t.$el.querySelectorAll('[data-lazy-src]').forEach(function (t) {
                    var e = t.dataset.lazySrc
                    t instanceof HTMLImageElement
                      ? (t.src = e)
                      : (t.style.backgroundImage = "url('".concat(e, "')"))
                  }),
                  (r = t.$el.dataset.lazySrc) &&
                    (t.$el.style.backgroundImage = "url('".concat(r, "')")),
                  (t.state = 'ready'))
              }
            },
          },
          {
            key: 'getSlideMetrics',
            value: function (t) {
              if (!t) {
                var e,
                  i = this.slides[0]
                if (
                  (((t = document.createElement('div')).dataset.isTestEl = 1),
                  (t.style.visibility = 'hidden'),
                  t.classList.add(this.option('classNames.slide')),
                  i.customClass)
                )
                  (e = t.classList).add.apply(e, u(i.customClass.split(' ')))
                this.$track.prepend(t)
              }
              var n = y(t.getBoundingClientRect().width),
                o = t.currentStyle || window.getComputedStyle(t)
              return (
                (n = n + (parseFloat(o.marginLeft) || 0) + (parseFloat(o.marginRight) || 0)),
                window.visualViewport && (n *= window.visualViewport.scale),
                t.dataset.isTestEl && t.remove(),
                n
              )
            },
          },
          {
            key: 'updateMetrics',
            value: function () {
              var t,
                e = this,
                i = 0,
                n = []
              this.slides.forEach(function (o, s) {
                var a = o.$el,
                  r = o.isDom || !t ? e.getSlideMetrics(a) : t
                ;(o.index = s), (o.width = r), (o.left = i), (t = r), (i += r), n.push(s)
              }),
                (this.elemDimWidth = y(i)),
                (this.Panzoom.contentDim.width = this.elemDimWidth),
                (this.wrapDimWidth = y(this.$viewport.getBoundingClientRect().width))
              var o = window.getComputedStyle(this.$viewport),
                s = parseFloat(o.paddingLeft) + parseFloat(o.paddingRight)
              ;(this.wrapDimWidth = this.wrapDimWidth - s),
                window.visualViewport && (this.wrapDimWidth *= window.visualViewport.scale),
                (this.Panzoom.viewportDim.width = this.wrapDimWidth)
              var a = [],
                r = this.option('slidesPerPage')
              if (Number.isInteger(r) && this.elemDimWidth > this.wrapDimWidth)
                for (var l = 0; l < this.slides.length; l += r)
                  a.push({
                    indexes: n.slice(l, l + r),
                    slides: this.slides.slice(l, l + r),
                  })
              else
                for (var c = 0, h = 0, d = 0; d < this.slides.length; d += 1) {
                  var f = this.slides[d]
                  ;(!a.length || h + f.width > this.wrapDimWidth) &&
                    (a.push({
                      indexes: [],
                      slides: [],
                    }),
                    (c = a.length - 1),
                    (h = 0)),
                    (h += f.width),
                    a[c].indexes.push(d),
                    a[c].slides.push(f)
                }
              var v = this.option('center'),
                p = this.option('fill')
              a.forEach(function (t, i) {
                ;(t.index = i),
                  (t.width = t.slides.reduce(function (t, e) {
                    return t + e.width
                  }, 0)),
                  (t.left = t.slides[0].left),
                  v && (t.left += 0.5 * (e.wrapDimWidth - t.width) * -1),
                  p &&
                    !e.option('infiniteX', e.option('infinite')) &&
                    e.elemDimWidth > e.wrapDimWidth &&
                    ((t.left = Math.max(t.left, 0)),
                    (t.left = Math.min(t.left, e.elemDimWidth - e.wrapDimWidth)))
              })
              var g,
                m = []
              a.forEach(function (t) {
                g && t.left === g.left
                  ? ((g.width += t.width),
                    (g.slides = [].concat(u(g.slides), u(t.slides))),
                    (g.indexes = [].concat(u(g.indexes), u(t.indexes))))
                  : ((t.index = m.length), (g = t), m.push(t))
              }),
                (this.pages = m),
                this.manageSlideVisiblity(),
                this.trigger('refresh')
            },
          },
          {
            key: 'setPage',
            value: function (t, e) {
              var i = 0,
                n = parseInt(t, 10) || 0,
                o = this.page,
                s = this.pageIndex,
                a = this.pages.length
              if (
                ((t = ((n % a) + a) % a),
                this.option('infiniteX', this.option('infinite')) &&
                  this.elemDimWidth > this.wrapDimWidth)
              ) {
                var r = Math.floor(n / a) || 0,
                  l = this.elemDimWidth
                if (((i = this.pages[t].left + r * l), !0 === e && a > 2)) {
                  var c = -1 * this.Panzoom.current.x,
                    h = i - l,
                    d = i + l,
                    u = Math.abs(c - i),
                    f = Math.abs(c - h),
                    v = Math.abs(c - d)
                  v < u && v <= f ? ((i = d), (n += a)) : f < u && f < v && ((i = h), (n -= a))
                }
              } else (t = n = Math.max(0, Math.min(n, a - 1))), (i = this.pages[t].left)
              return (
                (this.page = t),
                (this.pageIndex = n),
                null !== o &&
                  t !== o &&
                  ((this.prevPage = o), (this.prevPageIndex = s), this.trigger('change', t, o)),
                i
              )
            },
          },
          {
            key: 'slideTo',
            value: function (t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = e.friction,
                n = void 0 === i ? this.option('friction') : i
              this.Panzoom.panTo({
                x: -1 * this.setPage(t, !0),
                y: 0,
                friction: n,
              })
            },
          },
          {
            key: 'slideToClosest',
            value: function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = this.getPageFromPosition(-1 * this.Panzoom.pan.x),
                i = d(e, 2),
                n = i[1]
              this.slideTo(n, t)
            },
          },
          {
            key: 'slideNext',
            value: function () {
              this.slideTo(this.pageIndex + 1)
            },
          },
          {
            key: 'slidePrev',
            value: function () {
              this.slideTo(this.pageIndex - 1)
            },
          },
          {
            key: 'getPageforSlide',
            value: function (t) {
              var e = this.pages.find(function (e) {
                return e.indexes.indexOf(t) > -1
              })
              return e ? e.index : null
            },
          },
          {
            key: 'getPageFromPosition',
            value: function (t) {
              var e = this.pages.length
              this.option('center') && (t += 0.5 * this.wrapDimWidth)
              var i = Math.floor(t / this.elemDimWidth)
              t -= i * this.elemDimWidth
              var n = this.slides.find(function (e) {
                return e.left < t && e.left + e.width > t
              })
              if (n) {
                var o = this.getPageforSlide(n.index)
                return [o, o + i * e]
              }
              return [0, 0]
            },
          },
          {
            key: 'removeSlideEl',
            value: function (t) {
              t.$el && !t.isDom && (this.trigger('deleteSlide', t), t.$el.remove(), (t.$el = null))
            },
          },
          {
            key: 'destroy',
            value: function () {
              var t = this
              ;(this.state = 'destroy'),
                this.slides.forEach(function (e) {
                  t.removeSlideEl(e)
                }),
                this.Panzoom.destroy(),
                (this.options = {}),
                (this.events = {})
            },
          },
        ]),
        n
      )
    })(k)
  ;(D.version = '4.0.0-alpha.4'), (D.Plugins = T)
  var A = !('undefined' == typeof window || !window.document || !window.document.createElement),
    z = (function () {
      function t(e) {
        i(this, t), (this.fancybox = e), (this.viewport = null), (this.pendingUpdate = null)
        for (
          var n = 0, o = ['onReady', 'onResize', 'onTouchstart', 'onTouchmove'];
          n < o.length;
          n++
        ) {
          var s = o[n]
          this[s] = this[s].bind(this)
        }
      }
      return (
        o(t, [
          {
            key: 'onReady',
            value: function () {
              var t = window.visualViewport
              t &&
                ((this.viewport = t),
                (this.startY = 0),
                t.addEventListener('resize', this.onResize),
                this.updateViewport()),
                window.addEventListener('touchstart', this.onTouchstart, {
                  passive: !1,
                }),
                window.addEventListener('touchmove', this.onTouchmove, {
                  passive: !1,
                })
            },
          },
          {
            key: 'onResize',
            value: function () {
              this.updateViewport()
            },
          },
          {
            key: 'updateViewport',
            value: function () {
              var t = this.fancybox,
                e = this.viewport,
                i = e.scale,
                n = t.$container
              if (n) {
                var o = '',
                  s = '',
                  a = ''
                Math.abs(i - 1) > 0.1 &&
                  ((o = ''.concat(e.width * i, 'px')),
                  (s = ''.concat(e.height * i, 'px')),
                  (a = 'translate3d('
                    .concat(e.offsetLeft, 'px, ')
                    .concat(e.offsetTop, 'px, 0) scale(')
                    .concat(1 / i, ')'))),
                  (n.style.width = o),
                  (n.style.height = s),
                  (n.style.transform = a)
              }
            },
          },
          {
            key: 'onTouchstart',
            value: function (t) {
              this.startY = t.touches ? t.touches[0].screenY : t.screenY
            },
          },
          {
            key: 'onTouchmove',
            value: function (t) {
              var e = this.startY,
                i = window.innerWidth / window.document.documentElement.clientWidth
              if (!(t.touches.length > 1 || 1 !== i)) {
                var n = t.target,
                  o = w(n)
                if (o) {
                  var s = window.getComputedStyle(o),
                    a = parseInt(s.getPropertyValue('height'), 10),
                    r = t.touches ? t.touches[0].screenY : t.screenY,
                    l = e <= r && 0 === o.scrollTop,
                    c = e >= r && o.scrollHeight - o.scrollTop === a
                  ;(l || c) && t.preventDefault()
                } else t.preventDefault()
              }
            },
          },
          {
            key: 'cleanup',
            value: function () {
              this.pendingUpdate &&
                (cancelAnimationFrame(this.pendingUpdate), (this.pendingUpdate = null))
              var t = this.viewport
              t && (t.removeEventListener('resize', this.onResize), (this.viewport = null)),
                window.removeEventListener('touchstart', this.onTouchstart, !1),
                window.removeEventListener('touchmove', this.onTouchmove, !1)
            },
          },
          {
            key: 'attach',
            value: function () {
              this.fancybox.on('initLayout', this.onReady)
            },
          },
          {
            key: 'detach',
            value: function () {
              this.fancybox.off('initLayout', this.onReady), this.cleanup()
            },
          },
        ]),
        t
      )
    })(),
    I = (function () {
      function t(e) {
        i(this, t), (this.fancybox = e), (this.$wrap = null), (this.state = 'init')
        for (var n = 0, o = ['onReady', 'onClosing', 'onKeydown']; n < o.length; n++) {
          var s = o[n]
          this[s] = this[s].bind(this)
        }
        this.events = {
          ready: this.onReady,
          closing: this.onClosing,
          keydown: this.onKeydown,
        }
      }
      return (
        o(t, [
          {
            key: 'onReady',
            value: function () {
              !0 === this.fancybox.option('Thumbs.autoStart') && this.initLayout()
            },
          },
          {
            key: 'onClosing',
            value: function () {
              this.Carousel && this.Carousel.Panzoom.detachEvents()
            },
          },
          {
            key: 'onKeydown',
            value: function (t, e) {
              e === t.option('Thumbs.key') && this.toggle()
            },
          },
          {
            key: 'initLayout',
            value: function () {
              var t = this
              if ('init' === this.state) {
                var e = this.getSlides()
                if (e.length < this.fancybox.option('Thumbs.minSlideCount')) return !1
                var i = document.createElement('div')
                i.classList.add('fancybox__thumbs'),
                  this.fancybox.$container.appendChild(i),
                  (this.Carousel = new D(
                    i,
                    m(
                      !0,
                      {
                        Dots: !1,
                        Navigation: !1,
                        Sync: {
                          friction: 0,
                        },
                        infinite: !1,
                        center: !0,
                        fill: !0,
                        dragFree: !0,
                        slidesPerPage: 1,
                        preload: 1,
                      },
                      this.fancybox.option('Thumbs.Carousel'),
                      {
                        Sync: {
                          with: this.fancybox.Carousel,
                        },
                        slides: e,
                      },
                    ),
                  )),
                  this.Carousel.Panzoom.on('wheel', function (e, i) {
                    i.preventDefault(), t.fancybox[i.deltaY < 0 ? 'prev' : 'next']()
                  }),
                  (this.$wrap = i),
                  (this.state = 'ready')
              }
            },
          },
          {
            key: 'getSlides',
            value: function () {
              var t = []
              return (
                this.fancybox.items.forEach(function (e) {
                  var i = e.thumb
                  i &&
                    t.push({
                      html: '<div class="fancybox__thumb" style="background-image:url('.concat(
                        i,
                        ')"></div>',
                      ),
                      customClass: 'has-thumb has-'.concat(e.type || 'image'),
                    })
                }),
                t
              )
            },
          },
          {
            key: 'toggle',
            value: function () {
              return 'ready' === this.state
                ? (this.Carousel.Panzoom.detachEvents(),
                  (this.$wrap.style.display = 'none'),
                  void (this.state = 'hidden'))
                : 'hidden' === this.state
                  ? ((this.$wrap.style.display = ''),
                    this.Carousel.Panzoom.attachEvents(),
                    void (this.state = 'ready'))
                  : void this.initLayout()
            },
          },
          {
            key: 'cleanup',
            value: function () {
              this.Carousel && (this.Carousel.destroy(), (this.Carousel = null)),
                this.$wrap && (this.$wrap.remove(), (this.$wrap = null)),
                (this.state = 'init')
            },
          },
          {
            key: 'attach',
            value: function () {
              this.fancybox.on(this.events)
            },
          },
          {
            key: 'detach',
            value: function () {
              this.fancybox.off(this.events), this.cleanup()
            },
          },
        ]),
        t
      )
    })()
  I.defaults = {
    autoStart: !0,
    minSlideCount: 3,
    key: 't',
  }
  var _ = function (t) {
      return Object.entries(t)
        .map(function (t) {
          return t.map(encodeURIComponent).join('=')
        })
        .join('&')
    },
    R = (function () {
      function t(e) {
        i(this, t), (this.fancybox = e)
        for (
          var n = 0,
            o = [
              'onPrepare',
              'onCreateSlide',
              'onDeleteSlide',
              'onSelectSlide',
              'onUnselectSlide',
              'onRefresh',
              'onMessage',
            ];
          n < o.length;
          n++
        ) {
          var s = o[n]
          this[s] = this[s].bind(this)
        }
        this.events = {
          init: this.onPrepare,
          'Carousel.createSlide': this.onCreateSlide,
          'Carousel.deleteSlide': this.onDeleteSlide,
          'Carousel.selectSlide': this.onSelectSlide,
          'Carousel.unselectSlide': this.onUnselectSlide,
          'Carousel.refresh': this.onRefresh,
        }
      }
      return (
        o(t, [
          {
            key: 'onPrepare',
            value: function () {
              var t = this
              this.fancybox.items.forEach(function (e) {
                t.processType(e)
              })
            },
          },
          {
            key: 'processType',
            value: function (t) {
              if (t.html) return (t.src = t.html), (t.type = 'html'), void delete t.html
              var e = t.src || '',
                i = t.type || this.fancybox.options.type,
                n = null
              if (!e || 'string' == typeof e) {
                if (
                  (n = e.match(
                    /(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i,
                  ))
                ) {
                  var o = _(this.fancybox.option('Html.youtube')),
                    s = encodeURIComponent(n[1])
                  ;(t.videoId = s),
                    (t.src = 'https://www.youtube-nocookie.com/embed/'.concat(s, '?').concat(o)),
                    (t.thumb = t.thumb || 'https://i.ytimg.com/vi/'.concat(s, '/mqdefault.jpg')),
                    (t.vendor = 'youtube'),
                    (i = 'video')
                } else if ((n = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)(.*)?/))) {
                  var a = _(this.fancybox.option('Html.vimeo')),
                    r = encodeURIComponent(n[1])
                  ;(t.videoId = r),
                    (t.src = 'https://player.vimeo.com/video/'.concat(r, '?').concat(a)),
                    (t.vendor = 'vimeo'),
                    (i = 'video')
                } else
                  (n = e.match(
                    /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i,
                  ))
                    ? ((t.src = '//maps.google.'
                        .concat(n[1], '/?ll=')
                        .concat(
                          (n[2]
                            ? n[2] +
                              '&z=' +
                              Math.floor(n[3]) +
                              (n[4] ? n[4].replace(/^\//, '&') : '')
                            : n[4] + ''
                          ).replace(/\?/, '&'),
                          '&output=',
                        )
                        .concat(n[4] && n[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed')),
                      (i = 'map'))
                    : (n = e.match(
                        /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i,
                      )) &&
                      ((t.src = '//maps.google.'
                        .concat(n[1], '/maps?q=')
                        .concat(
                          n[2].replace('query=', 'q=').replace('api=1', ''),
                          '&output=embed',
                        )),
                      (i = 'map'))
                i ||
                  ('#' === e.charAt(0)
                    ? (i = 'inline')
                    : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                      ? ((i = 'html5video'),
                        (t.format = t.format || 'video/' + ('ogv' === n[1] ? 'ogg' : n[1])))
                      : e.match(
                            /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i,
                          )
                        ? (i = 'image')
                        : e.match(/\.(pdf)((\?|#).*)?$/i) && (i = 'pdf')),
                  (t.type = i || this.fancybox.option('defaultType', 'image')),
                  ('html5video' !== i && 'video' !== i) ||
                    ((t.video = m({}, this.fancybox.option('Html.video'), t.video)),
                    t.width && t.height
                      ? (t.ratio = parseFloat(t.width) / parseFloat(t.height))
                      : (t.ratio = t.ratio || t.video.ratio))
              }
            },
          },
          {
            key: 'loadInlineContent',
            value: function (t) {
              var e
              if (t.src instanceof HTMLElement) e = t.src
              else if ('string' == typeof t.src) {
                var i = t.src.split('#', 2),
                  n = 2 === i.length && '' === i[0] ? i[1] : i[0]
                e = document.getElementById(n)
              }
              if (e) {
                if ('clone' === t.type || e.$placeHolder) {
                  var o = (e = e.cloneNode(!0)).getAttribute('id')
                  ;(o = o
                    ? ''.concat(o, '--clone')
                    : 'clone-'.concat(this.fancybox.id, '-').concat(t.index)),
                    e.setAttribute('id', o)
                } else {
                  var s = document.createElement('div')
                  s.classList.add('fancybox-placeholder'),
                    e.parentNode.insertBefore(s, e),
                    (e.$placeHolder = s)
                }
                this.fancybox.setContent(t, e)
              } else this.fancybox.setError(t, '{{ELEMENT_NOT_FOUND}}')
            },
          },
          {
            key: 'loadAjaxContent',
            value: function (t) {
              var e = this.fancybox,
                i = new XMLHttpRequest()
              e.showLoading(t),
                (i.onreadystatechange = function () {
                  i.readyState === XMLHttpRequest.DONE &&
                    'ready' === e.state &&
                    (e.hideLoading(t),
                    200 === i.status
                      ? e.setContent(t, i.responseText)
                      : e.setError(
                          t,
                          404 === i.status ? '{{AJAX_NOT_FOUND}}' : '{{AJAX_FORBIDDEN}}',
                        ))
                }),
                i.open('GET', t.src),
                i.send(t.ajax || null),
                (t.xhr = i)
            },
          },
          {
            key: 'loadIframeContent',
            value: function (t) {
              var e = this,
                i = this.fancybox,
                n = document.createElement('iframe')
              if (
                ((n.className = 'fancybox__iframe'),
                n.setAttribute('id', 'fancybox__iframe_'.concat(i.id, '_').concat(t.index)),
                n.setAttribute('allow', 'autoplay; fullscreen'),
                n.setAttribute('scrolling', 'auto'),
                (t.$iframe = n),
                'iframe' !== t.type || !1 === t.preload)
              )
                return n.setAttribute('src', t.src), void this.fancybox.setContent(t, n)
              i.showLoading(t)
              var o = document.createElement('div')
              ;(o.style.visibility = 'hidden'),
                this.fancybox.setContent(t, o),
                o.appendChild(n),
                (n.onerror = function () {
                  i.setError(t, '{{IFRAME_ERROR}}')
                }),
                (n.onload = function () {
                  i.hideLoading(t)
                  var o = !1
                  'yes' !== n.dataset.ready && ((n.dataset.ready = 'yes'), (o = !0)),
                    n.src.length &&
                      ((n.parentNode.style.visibility = ''),
                      !1 !== t.autoSize && e.autoSizeIframe(n),
                      o && i.revealContent(t))
                }),
                n.setAttribute('src', t.src)
            },
          },
          {
            key: 'setAspectRatio',
            value: function (t) {
              var e = t.ratio
              if (e && t.$content) {
                ;(t.$content.style.maxWidth = ''), (t.$content.style.maxHeight = '')
                var i = t.$content.offsetWidth,
                  n = t.$content.offsetHeight,
                  o = t.width,
                  s = t.height
                if (o && s && (i > o || n > s)) {
                  var a = Math.min(o / i, s / n)
                  ;(i *= a), (n *= a)
                }
                e < i / n ? (i = n * e) : (n = i / e),
                  (t.$content.style.maxWidth = ''.concat(i, 'px')),
                  (t.$content.style.maxHeight = ''.concat(n, 'px'))
              }
            },
          },
          {
            key: 'autoSizeIframe',
            value: function (t) {
              if (t.dataset && 'yes' === t.dataset.ready) {
                var e = t.parentNode.style
                ;(e.flex = '1 1 auto'), (e.width = ''), (e.height = '')
                try {
                  var i = t.contentWindow.document,
                    n = i.getElementsByTagName('html')[0],
                    o = i.body,
                    s = window.getComputedStyle(t.parentNode),
                    a = parseFloat(s.paddingLeft) + parseFloat(s.paddingRight),
                    r = parseFloat(s.paddingTop) + parseFloat(s.paddingBottom)
                  o.style.overflow = 'hidden'
                  var l = n.scrollWidth
                  ;(e.width = ''.concat(l + a, 'px')),
                    (o.style.overflow = ''),
                    (e.flex = ''),
                    (e.flexShrink = '0'),
                    (e.height = ''.concat(o.scrollHeight, 'px'))
                  var c = n.scrollHeight
                  e.height = ''.concat(c + r, 'px')
                } catch (t) {
                  e = ''
                }
              }
            },
          },
          {
            key: 'onRefresh',
            value: function (t, e) {
              var i = this
              e.slides.forEach(function (t) {
                t.$el &&
                  (t.$iframe && !1 !== t.autoSize && i.autoSizeIframe(t.$iframe),
                  t.ratio && i.setAspectRatio(t))
              })
            },
          },
          {
            key: 'onCreateSlide',
            value: function (t, e, i) {
              if (i && !i.isDom) {
                switch (i.type) {
                  case 'html':
                    this.fancybox.setContent(i, i.src)
                    break
                  case 'html5video':
                    this.fancybox.setContent(
                      i,
                      this.fancybox
                        .option('Html.html5video.tpl')
                        .replace(/\{\{src\}\}/gi, i.src)
                        .replace(
                          '{{format}}',
                          i.format || (i.html5video && i.html5video.format) || '',
                        )
                        .replace('{{poster}}', i.thumb || ''),
                    )
                    break
                  case 'inline':
                  case 'clone':
                    this.loadInlineContent(i)
                    break
                  case 'ajax':
                    this.loadAjaxContent(i)
                    break
                  case 'iframe':
                  case 'pdf':
                  case 'video':
                  case 'map':
                    this.loadIframeContent(i)
                }
                i.ratio && this.setAspectRatio(i)
              }
            },
          },
          {
            key: 'onSelectSlide',
            value: function (t, e, i) {
              if (
                ('html5video' === i.type && i.$el.querySelector('video').play(),
                'video' === i.type && i.$iframe && i.$iframe.contentWindow)
              ) {
                !(function t() {
                  if ('done' === i.state && i.$iframe.contentWindow) {
                    var e
                    if (i.$iframe.isReady)
                      return (
                        i.video &&
                          i.video.autoplay &&
                          (e =
                            'youtube' == i.vendor
                              ? {
                                  event: 'command',
                                  func: 'playVideo',
                                }
                              : {
                                  method: 'play',
                                  value: 'true',
                                }),
                        void (e && i.$iframe.contentWindow.postMessage(JSON.stringify(e), '*'))
                      )
                    'youtube' === i.vendor &&
                      ((e = {
                        event: 'listening',
                        id: i.$iframe.getAttribute('id'),
                      }),
                      i.$iframe.contentWindow.postMessage(JSON.stringify(e), '*')),
                      (i.poller = setTimeout(t, 250))
                  }
                })()
              }
            },
          },
          {
            key: 'onUnselectSlide',
            value: function (t, e, i) {
              if ('html5video' !== i.type) {
                var n = !1
                'vimeo' == i.vendor
                  ? (n = {
                      method: 'pause',
                      value: 'true',
                    })
                  : 'youtube' === i.vendor &&
                    (n = {
                      event: 'command',
                      func: 'pauseVideo',
                    }),
                  n &&
                    i.$iframe &&
                    i.$iframe.contentWindow &&
                    i.$iframe.contentWindow.postMessage(JSON.stringify(n), '*'),
                  clearTimeout(i.poller)
              } else
                try {
                  i.$el.querySelector('video').pause()
                } catch (t) {}
            },
          },
          {
            key: 'onDeleteSlide',
            value: function (t, e, i) {
              i.xhr && (i.xhr.abort(), (i.xhr = null)),
                i.$iframe &&
                  ((i.$iframe.onload = i.$iframe.onerror = null),
                  (i.$iframe.src = '//about:blank'),
                  (i.$iframe = null))
              var n = i.$content
              'inline' === i.type &&
                n &&
                (n.classList.remove('fancybox__content'),
                'none' !== n.style.display && (n.style.display = 'none'),
                i.$closeButton && (i.$closeButton.remove(), (i.$closeButton = null)))
              var o = n && n.$placeHolder
              o && (o.parentNode.insertBefore(n, o), o.remove(), (n.$placeHolder = null))
            },
          },
          {
            key: 'onMessage',
            value: function (t) {
              try {
                var e = JSON.parse(t.data)
                if ('https://player.vimeo.com' === t.origin) {
                  if ('ready' === e.event) {
                    var i,
                      n = p(document.getElementsByClassName('fancybox__iframe'))
                    try {
                      for (n.s(); !(i = n.n()).done; ) {
                        var o = i.value
                        o.contentWindow === t.source && (o.isReady = 1)
                      }
                    } catch (t) {
                      n.e(t)
                    } finally {
                      n.f()
                    }
                  }
                } else
                  'https://www.youtube-nocookie.com' === t.origin &&
                    'onReady' === e.event &&
                    (document.getElementById(e.id).isReady = 1)
              } catch (t) {}
            },
          },
          {
            key: 'attach',
            value: function () {
              this.fancybox.on(this.events), window.addEventListener('message', this.onMessage, !1)
            },
          },
          {
            key: 'detach',
            value: function () {
              this.fancybox.off(this.events),
                window.removeEventListener('message', this.onMessage, !1)
            },
          },
        ]),
        t
      )
    })()
  R.defaults = {
    video: {
      autoplay: !0,
      ratio: 16 / 9,
    },
    youtube: {
      autohide: 1,
      fs: 1,
      rel: 0,
      hd: 1,
      wmode: 'transparent',
      enablejsapi: 1,
      html5: 1,
    },
    vimeo: {
      hd: 1,
      show_title: 1,
      show_byline: 1,
      show_portrait: 0,
      fullscreen: 1,
    },
    html5video: {
      tpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />\n  Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!\n</video>',
      format: '',
    },
  }
  var O = function (t) {
      var e = t.naturalWidth,
        i = t.naturalHeight,
        n = t.width,
        o = t.height,
        s = e / i,
        a = {
          width: n,
          height: o,
        }
      return (
        s > n / o ? (a.height = n / s) : (a.width = o * s),
        (a.left = 0.5 * (n - a.width)),
        (a.right = e + a.left),
        a
      )
    },
    N = (function () {
      function t(e) {
        i(this, t), (this.fancybox = e)
        for (
          var n = 0,
            o = [
              'onReady',
              'onClosing',
              'onPageChange',
              'onCreateSlide',
              'onRemoveSlide',
              'onRefresh',
              'onImageStatusChange',
            ];
          n < o.length;
          n++
        ) {
          var s = o[n]
          this[s] = this[s].bind(this)
        }
        this.events = {
          ready: this.onReady,
          closing: this.onClosing,
          'Carousel.change': this.onPageChange,
          'Carousel.createSlide': this.onCreateSlide,
          'Carousel.deleteSlide': this.onRemoveSlide,
          'Carousel.Panzoom.updateMetrics': this.onRefresh,
        }
      }
      return (
        o(t, [
          {
            key: 'onReady',
            value: function () {
              var t = this.fancybox.getSlide()
              'ready' === t.state && this.revealContent(t)
            },
          },
          {
            key: 'onCreateSlide',
            value: function (t, e, i) {
              var n = this
              if (!(i.isDom || i.html || (i.type && 'image' !== i.type))) {
                ;(i.type = 'image'), (i.state = 'loading')
                var o = document.createElement('div')
                o.style.visibility = 'hidden'
                var s = document.createElement('img')
                ;(s.onload = function () {
                  return n.onImageStatusChange(i)
                }),
                  (s.onerror = function () {
                    return n.onImageStatusChange(i)
                  }),
                  (s.src = i.src),
                  (s.alt = ''),
                  (s.draggable = !1),
                  s.classList.add('fancybox__image'),
                  i.srcset && s.setAttribute('srcset', i.srcset),
                  i.sizes && s.setAttribute('sizes', i.sizes),
                  (i.$image = s),
                  o.appendChild(s),
                  (i.$el.dataset.imageFit = this.fancybox.option('Image.fit')),
                  (i.$el.style.display = 'none'),
                  i.$el.offsetHeight,
                  (i.$el.style.display = ''),
                  this.fancybox.setContent(i, o),
                  s.complete || s.error
                    ? ((s.onload = s.onerror = null), this.onImageStatusChange(i))
                    : s.complete || this.fancybox.showLoading(i)
              }
            },
          },
          {
            key: 'initSlidePanzoom',
            value: function (t) {
              var e = this
              t.Panzoom ||
                ((t.Panzoom = new C(
                  t.$el,
                  m(!0, this.fancybox.option('Image.Panzoom'), {
                    content: t.$image,
                    panOnlyZoomed: !0,
                    click: null,
                    doubleClick: null,
                    wheel: null,
                    on: {
                      afterAnimate: function (i) {
                        'zoomIn' === t.state && (i.attachEvents(), e.fancybox.done(t)),
                          e.handleCursor(t)
                      },
                      updateMetrics: function () {
                        e.handleCursor(t)
                      },
                      touchMove: function () {
                        if (e.fancybox.Carousel.Panzoom.lockAxis) return !1
                      },
                    },
                  }),
                )),
                this.fancybox.option('Image.wheel') &&
                  t.Panzoom.on('wheel', function (t, i) {
                    return e.onWheel(t, i)
                  }),
                this.fancybox.option('Image.click') &&
                  t.Panzoom.on('click', function (t, i) {
                    return e.onClick(t, i)
                  }),
                'toggleZoom' === this.fancybox.option('Image.doubleClick') &&
                  t.Panzoom.on('doubleClick', function (t, e) {
                    if (e.target.closest('.fancybox__content')) {
                      e.preventDefault(), e.stopPropagation()
                      var i = e.clientX - t.$content.getClientRects()[0].left,
                        n = e.clientY - t.$content.getClientRects()[0].top
                      t.toggleZoom({
                        x: i,
                        y: n,
                      })
                    }
                  }))
            },
          },
          {
            key: 'onImageStatusChange',
            value: function (t) {
              this.fancybox.hideLoading(t)
              var e = t.$image
              e.complete && e.width && e.height
                ? ((t.state = 'ready'),
                  this.updateDimensions(t),
                  this.initSlidePanzoom(t),
                  this.revealContent(t))
                : this.fancybox.setError(t, '{{IMAGE_ERROR}}')
            },
          },
          {
            key: 'updateDimensions',
            value: function (t) {
              if ('cover' !== t.$el.dataset.imageFit) {
                var e = t.$image,
                  i = t.$content
                i.style.maxWidth = ''
                var n = e.offsetWidth - e.clientWidth
                i.style.maxWidth = ''.concat(O(e).width + n, 'px')
              }
              this.handleCursor(t)
            },
          },
          {
            key: 'revealContent',
            value: function (t) {
              this.updateDimensions(t),
                null === this.fancybox.Carousel.prevPage &&
                t.index === this.fancybox.options.startIndex &&
                this.canZoom(t)
                  ? this.zoomIn()
                  : this.fancybox.revealContent(t)
            },
          },
          {
            key: 'canZoom',
            value: function (t) {
              var e = this.fancybox,
                i = e.$container,
                n = !1
              if (!e.option('Image.zoom')) return n
              var o = t.$thumb
              if (!o || 'loading' === t.state) return n
              i.style.pointerEvents = 'none'
              var s = o.getBoundingClientRect()
              if (this.fancybox.option('Image.ignoreCoveredThumbnail')) {
                var a = document.elementFromPoint(s.left + 1, s.top + 1) === o,
                  r = document.elementFromPoint(s.right - 1, s.bottom - 1) === o
                n = a && r
              } else
                n = document.elementFromPoint(s.left + 0.5 * s.width, s.top + 0.5 * s.height) === o
              return (i.style.pointerEvents = ''), n
            },
          },
          {
            key: 'getZoomInfo',
            value: function (t) {
              var e = t.$thumb.getBoundingClientRect(),
                i = e.width,
                n = e.height,
                o = t.$content.getBoundingClientRect(),
                s = O(t.$image),
                a = s.width,
                r = s.height,
                l = o.top + 0.5 * r - (e.top + 0.5 * n),
                c = o.left + 0.5 * a - (e.left + 0.5 * i),
                h = this.fancybox.option('Image.zoomOpacity')
              return (
                'auto' === h && (h = Math.abs(i / n - a / r) > 0.1),
                {
                  top: l,
                  left: c,
                  scale: e.width / a,
                  opacity: h,
                }
              )
            },
          },
          {
            key: 'zoomIn',
            value: function () {
              var t = this.fancybox
              if ('init' !== t.Carousel.state) {
                var e = t.getSlide(),
                  i = e.Panzoom,
                  n = this.getZoomInfo(e),
                  o = n.top,
                  s = n.left,
                  a = n.scale,
                  r = n.opacity
                ;(e.state = 'zoomIn'),
                  i.detachEvents(),
                  t.trigger('reveal', e),
                  i.panTo({
                    x: -1 * s,
                    y: -1 * o,
                    scale: a,
                    friction: 0,
                    ignoreBounds: !0,
                  }),
                  (e.$content.style.visibility = ''),
                  !0 === r &&
                    i.on('afterTransform', function (t) {
                      ;('zoomIn' !== e.state && 'zoomOut' !== e.state) ||
                        (t.$content.style.opacity = Math.min(1, t.current.scale))
                    }),
                  i.panTo({
                    x: 0,
                    y: 0,
                    scale: 1,
                    friction: this.fancybox.option('Image.zoomFriction'),
                  })
              }
            },
          },
          {
            key: 'zoomOut',
            value: function () {
              var t = this,
                e = this.fancybox,
                i = e.getSlide(),
                n = i.Panzoom
              if (n) {
                ;(i.state = 'zoomOut'),
                  (e.state = 'customClosing'),
                  i.$caption && (i.$caption.style.visibility = 'hidden')
                var o = 0.75 * this.fancybox.option('Image.zoomFriction'),
                  s = function () {
                    var e = t.getZoomInfo(i),
                      s = e.top,
                      a = e.left,
                      r = e.scale
                    n.panTo({
                      x: -1 * a,
                      y: -1 * s,
                      scale: r,
                      ignoreBounds: !0,
                      friction: o,
                    }),
                      (o *= 0.98)
                  }
                window.addEventListener('scroll', s),
                  n.on('afterAnimate', function () {
                    window.removeEventListener('scroll', s), e.destroy()
                  }),
                  s()
              }
            },
          },
          {
            key: 'handleCursor',
            value: function (t) {
              var e = t.Panzoom,
                i = this.fancybox.option('Image.click'),
                n = t.$el.classList
              e && 'toggleZoom' === i
                ? n[
                    e && 1 === e.current.scale && e.option('maxScale') - e.current.scale > 0.01
                      ? 'add'
                      : 'remove'
                  ](this.fancybox.option('Image.canZoomInClass'))
                : 'close' === i && n.add(this.fancybox.option('Image.canZoomOutClass'))
            },
          },
          {
            key: 'onWheel',
            value: function (t, e) {
              switch (this.fancybox.option('Image.wheel')) {
                case 'zoom':
                  t.zoomWithWheel(e)
                  break
                case 'close':
                  this.fancybox.close()
                  break
                case 'slide':
                  this.fancybox[e.deltaY < 0 ? 'prev' : 'next']()
              }
              e.preventDefault()
            },
          },
          {
            key: 'onClick',
            value: function (t, e) {
              if (
                !(
                  this.fancybox.Carousel.Panzoom.drag.distance >= 6 ||
                  this.fancybox.Carousel.Panzoom.lockAxis ||
                  ('IMG' != e.target.tagName && !e.target.classList.contains('fancybox__content'))
                )
              )
                switch (
                  (e.preventDefault(), e.stopPropagation(), this.fancybox.option('Image.click'))
                ) {
                  case 'toggleZoom':
                    var i = e.clientX - t.$content.getClientRects()[0].left,
                      n = e.clientY - t.$content.getClientRects()[0].top
                    t.toggleZoom({
                      x: i,
                      y: n,
                    })
                    break
                  case 'close':
                    this.fancybox.close()
                    break
                  case 'next':
                    this.fancybox.next()
                    break
                  case 'prev':
                    this.fancybox.prev()
                }
            },
          },
          {
            key: 'onRefresh',
            value: function (t, e) {
              var i = this
              e.slides.forEach(function (t) {
                t.Panzoom && i.updateDimensions(t)
              })
            },
          },
          {
            key: 'onRemoveSlide',
            value: function (t, e, i) {
              i.$image &&
                (i.$el.classList.remove(t.option('Image.canZoomInClass')),
                (i.$image.onload = i.$image.onerror = null),
                i.$image.remove(),
                (i.$image = null)),
                i.Panzoom && (i.Panzoom.destroy(), (i.Panzoom = null)),
                delete i.$el.dataset.imageFit
            },
          },
          {
            key: 'onClosing',
            value: function (t) {
              t.Carousel.slides.forEach(function (t) {
                t.$image && (t.$image.onload = t.$image.onerror = null),
                  t.Panzoom && t.Panzoom.detachEvents()
              }),
                'closing' === this.fancybox.state && this.canZoom(t.getSlide()) && this.zoomOut()
            },
          },
          {
            key: 'onPageChange',
            value: function (t, e) {
              var i = this,
                n = t.getSlide()
              e.slides.forEach(function (t) {
                t.Panzoom &&
                  'done' === t.state &&
                  (t.index !== n.index
                    ? t.Panzoom.panTo({
                        x: 0,
                        y: 0,
                        scale: 1,
                        friction: 0.8,
                      })
                    : 0 === e.Panzoom.velocity.x && i.revealContent(t))
              })
            },
          },
          {
            key: 'attach',
            value: function () {
              this.fancybox.on(this.events)
            },
          },
          {
            key: 'detach',
            value: function () {
              this.fancybox.off(this.events)
            },
          },
        ]),
        t
      )
    })()
  N.defaults = {
    Panzoom: {
      maxScale: 1,
    },
    canZoomInClass: 'can-zoom_in',
    canZoomOutClass: 'can-zoom_out',
    zoom: !0,
    zoomOpacity: 'auto',
    zoomFriction: 0.8,
    ignoreCoveredThumbnail: !1,
    click: 'toggleZoom',
    doubleClick: null,
    wheel: 'zoom',
    fit: 'contain',
  }
  var F = function () {
      var t = window.location.hash.substr(1),
        e = t.split('-'),
        i = (e.length > 1 && /^\+?\d+$/.test(e[e.length - 1]) && parseInt(e.pop(-1), 10)) || null
      return {
        hash: t,
        slug: e.join('-'),
        index: i,
      }
    },
    B = {
      ScrollLock: z,
      Thumbs: I,
      Html: R,
      Image: N,
      Hash: (function () {
        function t(e) {
          i(this, t),
            (this.fancybox = e),
            (this.events = {
              closing: this.onClosing.bind(this),
              'Carousel.ready Carousel.change': this.onChange.bind(this),
            }),
            (this.hasCreatedHistory = !1),
            (this.origHash = ''),
            (this.timer = null)
        }
        return (
          o(
            t,
            [
              {
                key: 'onChange',
                value: function (t, e) {
                  var i = this
                  this.timer && clearTimeout(this.timer)
                  var n = null === e.prevPage,
                    o = t.getSlide(),
                    s = o.$trigger && o.$trigger.dataset,
                    a = window.location.hash.substr(1),
                    r = !1
                  if (o.slug) r = o.slug
                  else {
                    var l = s && s.fancybox
                    l &&
                      l.length &&
                      'true' !== l &&
                      (r = l + (e.slides.length > 1 ? '-' + (o.index + 1) : ''))
                  }
                  n && (this.origHash = a !== r ? this.origHash : ''),
                    r &&
                      a !== r &&
                      (this.timer = setTimeout(function () {
                        try {
                          window.history[n ? 'pushState' : 'replaceState'](
                            {},
                            document.title,
                            window.location.pathname + window.location.search + '#' + r,
                          ),
                            n && (i.hasCreatedHistory = !0)
                        } catch (t) {}
                      }, 300))
                },
              },
              {
                key: 'onClosing',
                value: function () {
                  if ((this.timer && clearTimeout(this.timer), !0 !== this.hasSilentClose)) {
                    if (!this.hasCreatedHistory)
                      try {
                        return void window.history.replaceState(
                          {},
                          document.title,
                          window.location.pathname +
                            window.location.search +
                            (this.origHash ? '#' + this.origHash : ''),
                        )
                      } catch (t) {}
                    window.history.back()
                  }
                },
              },
              {
                key: 'attach',
                value: function (t) {
                  t.on(this.events)
                },
              },
              {
                key: 'detach',
                value: function (t) {
                  t.off(this.events)
                },
              },
            ],
            [
              {
                key: 'startFromUrl',
                value: function () {
                  if (!t.Fancybox.getInstance()) {
                    var e = F(),
                      i = e.hash,
                      n = e.slug,
                      o = e.index
                    if (n) {
                      var s = document.querySelector('[data-slug="'.concat(i, '"]'))
                      if (
                        (s &&
                          s.dispatchEvent(
                            new CustomEvent('click', {
                              bubbles: !0,
                              cancelable: !0,
                            }),
                          ),
                        !t.Fancybox.getInstance())
                      ) {
                        var a = document.querySelectorAll('[data-fancybox="'.concat(n, '"]'))
                        a.length &&
                          (null === o && 1 === a.length ? (s = a[0]) : o && (s = a[o - 1]),
                          s &&
                            s.dispatchEvent(
                              new CustomEvent('click', {
                                bubbles: !0,
                                cancelable: !0,
                              }),
                            ))
                      }
                    }
                  }
                },
              },
              {
                key: 'onHashChange',
                value: function () {
                  var e = F(),
                    i = e.slug,
                    n = e.index,
                    o = t.Fancybox.getInstance()
                  if (o) {
                    if (i) {
                      var s,
                        a = o.Carousel,
                        r = p(a.slides)
                      try {
                        for (r.s(); !(s = r.n()).done; ) {
                          var l = s.value
                          if (l.slug && l.slug === i) return a.slideTo(l.index)
                        }
                      } catch (t) {
                        r.e(t)
                      } finally {
                        r.f()
                      }
                      var c = o.getSlide(),
                        h = c.$trigger && c.$trigger.dataset
                      if (h && h.fancybox === i) return a.slideTo(n - 1)
                    }
                    ;(o.plugins.Hash.hasSilentClose = !0), o.close()
                  }
                  t.startFromUrl()
                },
              },
              {
                key: 'onReady',
                value: function () {
                  window.addEventListener('hashchange', t.onHashChange, !1), t.startFromUrl()
                },
              },
              {
                key: 'create',
                value: function () {
                  A &&
                    window.requestAnimationFrame(function () {
                      t.onReady()
                    })
                },
              },
              {
                key: 'destroy',
                value: function () {
                  window.removeEventListener('hashchange', t.onHashChange, !1)
                },
              },
            ],
          ),
          t
        )
      })(),
    },
    W = 0,
    H = null,
    U = (function (t) {
      s(n, t)
      var e = h(n)
      function n(t) {
        var o,
          s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        i(this, n)
        var a,
          r = function (t, e) {
            var i = m(!0, {}, t[e.startIndex] || {})
            return (
              t.forEach(function (t) {
                var e = t.$trigger
                if (e) {
                  var i = e.dataset || {}
                  ;(t.src = i.src || e.getAttribute('href') || t.src), (t.type = i.type || t.type)
                }
              }),
              m(!0, {}, n.defaults, e, i)
            )
          }
        return (
          (a = !1),
          document.createElement('div').focus({
            get preventScroll() {
              return (a = !0), !1
            },
          }),
          (H = a),
          ((o = e.call(this, r(t, s))).state = 'init'),
          (o.items = t),
          o.bindHandlers(),
          o.attachPlugins(n.Plugins),
          o.trigger('init'),
          !0 === o.option('hideScrollbar') && o.hideScrollbar(),
          o.initLayout(),
          o.initCarousel(o.getSlides()),
          o.attachEvents(),
          (o.state = 'ready'),
          o.trigger('ready'),
          o.$container.setAttribute('aria-hidden', 'false'),
          o
        )
      }
      return (
        o(
          n,
          [
            {
              key: 'bindHandlers',
              value: function () {
                for (
                  var t = 0,
                    e = [
                      'onMousedown',
                      'onKeydown',
                      'onClick',
                      'onCreateSlide',
                      'onSettle',
                      'onTouchMove',
                      'onTouchEnd',
                      'onTransform',
                    ];
                  t < e.length;
                  t++
                ) {
                  var i = e[t]
                  this[i] = this[i].bind(this)
                }
              },
            },
            {
              key: 'attachEvents',
              value: function () {
                document.addEventListener('mousedown', this.onMousedown),
                  document.addEventListener('keydown', this.onKeydown),
                  this.$container.addEventListener('click', this.onClick)
              },
            },
            {
              key: 'detachEvents',
              value: function () {
                document.removeEventListener('mousedown', this.onMousedown),
                  document.removeEventListener('keydown', this.onKeydown),
                  this.$container.removeEventListener('click', this.onClick)
              },
            },
            {
              key: 'initLayout',
              value: function () {
                var t = this
                this.$root = this.option('parentEl') || document.body
                var e = this.option('template.main')
                e &&
                  (this.$root.insertAdjacentHTML('beforeend', this.localize(e)),
                  (this.$container = this.$root.querySelector('.fancybox__container'))),
                  this.$container ||
                    ((this.$container = document.createElement('div')),
                    this.$root.appendChild(this.$container)),
                  (this.$container.onscroll = function () {
                    return (t.$container.scrollLeft = 0), !1
                  }),
                  Object.entries({
                    class: 'fancybox__container',
                    role: 'dialog',
                    'aria-modal': 'true',
                    'aria-hidden': 'true',
                    'aria-label': this.localize('{{MODAL}}'),
                  }).forEach(function (e) {
                    var i
                    return (i = t.$container).setAttribute.apply(i, u(e))
                  }),
                  this.option('animated') && this.$container.classList.add('is-animated'),
                  (this.$backdrop = this.$container.querySelector('.fancybox__backdrop')),
                  this.$backdrop ||
                    ((this.$backdrop = document.createElement('div')),
                    this.$backdrop.classList.add('fancybox__backdrop'),
                    this.$container.appendChild(this.$backdrop)),
                  (this.$carousel = this.$container.querySelector('.fancybox__carousel')),
                  this.$carousel ||
                    ((this.$carousel = document.createElement('div')),
                    this.$carousel.classList.add('fancybox__carousel'),
                    this.$container.appendChild(this.$carousel)),
                  (this.$container.Fancybox = this),
                  (this.id = this.$container.getAttribute('id')),
                  this.id ||
                    ((this.id = this.options.id || ++W),
                    this.$container.setAttribute('id', 'fancybox-' + this.id))
                var i,
                  n = this.options.mainClass
                n && (i = this.$container.classList).add.apply(i, u(n.split(' ')))
                return (
                  document.documentElement.classList.add('with-fancybox'),
                  this.trigger('initLayout'),
                  this
                )
              },
            },
            {
              key: 'getSlides',
              value: function () {
                var t = u(this.items)
                return (
                  t.forEach(function (t) {
                    !t.src &&
                      t.$trigger &&
                      t.$trigger instanceof HTMLImageElement &&
                      (t.src = t.$trigger.currentSrc || t.$trigger.src)
                    var e = t.$thumb,
                      i = t.$trigger && t.$trigger.origTarget
                    i && (e = i instanceof HTMLImageElement ? i : i.querySelector('img')),
                      !e &&
                        t.$trigger &&
                        (e =
                          t.$trigger instanceof HTMLImageElement
                            ? t.$trigger
                            : t.$trigger.querySelector('img')),
                      (t.$thumb = e || null)
                    var n = t.thumb
                    !n && t.$thumb && (n = e.currentSrc || e.src),
                      n || (t.type && 'image' !== t.type) || (n = t.src),
                      (t.thumb = n || null)
                  }),
                  t
                )
              },
            },
            {
              key: 'initCarousel',
              value: function (t) {
                var e = this
                return (
                  new D(
                    this.$carousel,
                    m(
                      !0,
                      {},
                      {
                        classNames: {
                          viewport: 'fancybox__viewport',
                          track: 'fancybox__track',
                          slide: 'fancybox__slide',
                        },
                        textSelection: !0,
                        preload: this.option('preload'),
                        friction: 0.88,
                        slides: t,
                        initialPage: this.options.startIndex,
                        slidesPerPage: 1,
                        infiniteX: this.option('infinite'),
                        infiniteY: !0,
                        l10n: this.option('l10n'),
                        Dots: !1,
                        Navigation: {
                          classNames: {
                            main: 'fancybox__nav',
                            button: 'carousel__button',
                            next: 'is-next',
                            prev: 'is-prev',
                          },
                        },
                        Panzoom: {
                          panOnlyZoomed: function () {
                            return e.Carousel.pages.length < 2 && !e.options.dragToClose
                          },
                          lockAxis: function () {
                            var t = e.Carousel.pages.length > 1 ? 'x' : ''
                            return e.options.dragToClose && (t += 'y'), t
                          },
                        },
                        on: {
                          '*': function (t) {
                            for (
                              var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), o = 1;
                              o < i;
                              o++
                            )
                              n[o - 1] = arguments[o]
                            return e.trigger.apply(e, ['Carousel.'.concat(t)].concat(n))
                          },
                          init: function (t) {
                            return (e.Carousel = t)
                          },
                          createSlide: this.onCreateSlide,
                          settle: this.onSettle,
                        },
                      },
                      this.option('Carousel'),
                    ),
                  ),
                  this.options.dragToClose &&
                    this.Carousel.Panzoom.on({
                      touchMove: this.onTouchMove,
                      afterTransform: this.onTransform,
                      touchEnd: this.onTouchEnd,
                    }),
                  this.trigger('initCarousel'),
                  this
                )
              },
            },
            {
              key: 'onCreateSlide',
              value: function (t, e) {
                var i = e.caption
                if (i) {
                  var n = document.createElement('div'),
                    o = 'fancybox__caption_'.concat(this.id, '_').concat(e.index)
                  ;(n.className = 'fancybox__caption'),
                    (n.innerHTML = i),
                    n.setAttribute('id', o),
                    (e.$caption = e.$el.appendChild(n)),
                    e.$el.classList.add('has-caption'),
                    e.$el.setAttribute('aria-labelledby', o)
                }
              },
            },
            {
              key: 'onSettle',
              value: function () {
                this.focus()
              },
            },
            {
              key: 'onClick',
              value: function (t) {
                if (
                  !t.defaultPrevented &&
                  !t.target.closest('.fancybox__content') &&
                  !window.getSelection().toString().length
                ) {
                  var e = this.option('click')
                  if ('function' == typeof e) return e.call(this)
                  switch (e) {
                    case 'close':
                      this.close()
                      break
                    case 'next':
                      this.next()
                  }
                }
              },
            },
            {
              key: 'onTouchMove',
              value: function () {
                var t = this.getSlide().Panzoom
                return !t || 1 === t.current.scale
              },
            },
            {
              key: 'onTouchEnd',
              value: function (t) {
                var e = t.drag.distanceY
                ;(Math.abs(e) >= 150 || (Math.abs(e) >= 35 && t.drag.elapsedTime < 350)) &&
                  (this.option('hideClass') &&
                    (this.getSlide().hideClass = 'fancybox-throwOut'.concat(
                      t.current.y < 0 ? 'Up' : 'Down',
                    )),
                  this.close())
              },
            },
            {
              key: 'onTransform',
              value: function (t) {
                if (this.$backdrop) {
                  var e = Math.abs(t.current.y),
                    i =
                      e < 1 ? '' : Math.max(0, Math.min(1, 1 - (e / t.$content.clientHeight) * 1.5))
                  this.$container.style.setProperty('--fancybox-ts', i ? '0s' : ''),
                    this.$container.style.setProperty('--fancybox-opacity', i)
                }
              },
            },
            {
              key: 'onMousedown',
              value: function () {
                document.body.classList.add('is-using-mouse')
              },
            },
            {
              key: 'onKeydown',
              value: function (t) {
                if (n.getInstance().id === this.id) {
                  document.body.classList.remove('is-using-mouse')
                  var e = t.key
                  if ('Tab' === e && this.option('trapFocus')) this.focus(t)
                  else {
                    var i = this.option('keyboard')
                    if (i && !t.ctrlKey && !t.altKey && !t.shiftKey) {
                      var o = document.activeElement && document.activeElement.classList,
                        s = o && o.contains('carousel__button')
                      if ('Escape' !== e && !s)
                        if (
                          t.target.isContentEditable ||
                          -1 !==
                            ['BUTTON', 'TEXTAREA', 'OPTION', 'INPUT', 'SELECT', 'VIDEO'].indexOf(
                              t.target.nodeName,
                            )
                        )
                          return
                      if (!1 !== this.trigger('keydown', e)) {
                        'Enter' !== e && t.preventDefault()
                        var a = i[e]
                        'function' == typeof this[a] && this[a]()
                      }
                    }
                  }
                }
              },
            },
            {
              key: 'getSlide',
              value: function () {
                var t = this.Carousel
                if (!t) return null
                var e = null === t.page ? t.option('initialPage') : t.page,
                  i = t.pages || []
                return i.length && i[e] ? i[e].slides[0] : null
              },
            },
            {
              key: 'focus',
              value: function (t) {
                var e = function (t) {
                  t.setActive
                    ? t.setActive()
                    : H
                      ? t.focus({
                          preventScroll: !0,
                        })
                      : t.focus()
                }
                t && t.preventDefault()
                var i = this.getSlide().$el
                i.tabIndex = 0
                var n,
                  o = [],
                  s = p(
                    [].slice.call(
                      this.$container.querySelectorAll([
                        'a[href]',
                        'area[href]',
                        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                        'select:not([disabled]):not([aria-hidden])',
                        'textarea:not([disabled]):not([aria-hidden])',
                        'button:not([disabled]):not([aria-hidden])',
                        'iframe',
                        'object',
                        'embed',
                        'video',
                        'audio',
                        '[contenteditable]',
                        '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])',
                      ]),
                    ),
                  )
                try {
                  for (s.s(); !(n = s.n()).done; ) {
                    var a = n.value
                    if (!a.classList || !a.classList.contains('fancybox__slide')) {
                      var r = a.closest('.fancybox__slide')
                      r
                        ? r === i && o[a.hasAttribute('autofocus') ? 'unshift' : 'push'](a)
                        : o.push(a)
                    }
                  }
                } catch (t) {
                  s.e(t)
                } finally {
                  s.f()
                }
                if (o.length) {
                  this.Carousel.pages.length > 1 && o.push(i)
                  var l = o.indexOf(document.activeElement),
                    c = t && !t.shiftKey,
                    h = t && t.shiftKey
                  return c
                    ? l === o.length - 1
                      ? e(o[0])
                      : e(o[l + 1])
                    : h
                      ? e(0 === l ? o[o.length - 1] : o[l - 1])
                      : l < 0
                        ? e(o[0])
                        : void 0
                }
              },
            },
            {
              key: 'hideScrollbar',
              value: function () {
                if (A) {
                  var t =
                      window.innerWidth - document.documentElement.getBoundingClientRect().width,
                    e = 'fancybox-style-noscroll',
                    i = document.getElementById(e)
                  i ||
                    (t &&
                      (((i = document.createElement('style')).id = e),
                      (i.type = 'text/css'),
                      (i.innerHTML = '.compensate-for-scrollbar {padding-right: '.concat(
                        t,
                        'px;}',
                      )),
                      document.getElementsByTagName('head')[0].appendChild(i),
                      document.body.classList.add('compensate-for-scrollbar')))
                }
              },
            },
            {
              key: 'revealScrollbar',
              value: function () {
                document.body.classList.remove('compensate-for-scrollbar')
                var t = document.getElementById('fancybox-style-noscroll')
                t && t.remove()
              },
            },
            {
              key: 'clearContent',
              value: function (t) {
                this.Carousel.trigger('deleteSlide', t),
                  t.$content && (t.$content.remove(), (t.$content = null)),
                  t._className && t.$el.classList.remove(t._className)
              },
            },
            {
              key: 'setContent',
              value: function (t, e) {
                var i,
                  n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                  o = t.$el
                if (
                  (e instanceof HTMLElement
                    ? ['img', 'iframe', 'video', 'audio'].indexOf(e.nodeName.toLowerCase()) > -1
                      ? (i = document.createElement('div')).appendChild(e)
                      : (i = e)
                    : ((i = document.createElement('div')).innerHTML = e),
                  !(i instanceof Element))
                )
                  throw new Error('Element expected')
                return (
                  (t._className = 'has-'.concat(n.suffix || t.type || 'unknown')),
                  o.classList.add(t._className),
                  i.classList.add('fancybox__content'),
                  ('none' !== i.style.display &&
                    'none' !== window.getComputedStyle(i).getPropertyValue('display')) ||
                    (i.style.display = 'flex'),
                  t.id && i.setAttribute('id', t.id),
                  (t.$content = i),
                  o.insertBefore(i, o.querySelector('.fancybox__caption')),
                  this.manageCloseButton(t),
                  'loading' !== t.state && this.revealContent(t),
                  i
                )
              },
            },
            {
              key: 'manageCloseButton',
              value: function (t) {
                var e = this,
                  i = void 0 === t.closeButton ? this.option('closeButton') : t.closeButton
                if (i && (!this.$closeButton || 'inside' === i)) {
                  var n = document.createElement('button')
                  n.classList.add('carousel__button', 'is-close'),
                    n.setAttribute('title', this.options.l10n.CLOSE),
                    (n.innerHTML = this.option('template.closeButton')),
                    n.addEventListener('click', function (t) {
                      return e.close(t)
                    }),
                    'inside' === i
                      ? (t.$closeButton && t.$closeButton.remove(),
                        (t.$closeButton = t.$content.appendChild(n)))
                      : (this.$closeButton = this.$container.insertBefore(
                          n,
                          this.$container.firstChild,
                        ))
                }
              },
            },
            {
              key: 'revealContent',
              value: function (t) {
                var e = this
                this.trigger('reveal', t), (t.$content.style.visibility = '')
                var i = !1
                'error' !== t.state &&
                  'ready' !== t.state &&
                  null === this.Carousel.prevPage &&
                  t.index === this.options.startIndex &&
                  (i = void 0 === t.showClass ? this.option('showClass') : t.showClass),
                  i
                    ? ((t.state = 'animating'),
                      this.animateCSS(t.$content, i, function () {
                        e.done(t)
                      }))
                    : this.done(t)
              },
            },
            {
              key: 'animateCSS',
              value: function (t, e, i) {
                if (
                  (t &&
                    t.dispatchEvent(
                      new CustomEvent('animationend', {
                        bubbles: !0,
                        cancelable: !0,
                      }),
                    ),
                  t && e)
                ) {
                  t.addEventListener('animationend', function n(o) {
                    o.currentTarget === this &&
                      (t.classList.remove(e), t.removeEventListener('animationend', n), i && i())
                  }),
                    t.classList.add(e)
                } else 'function' == typeof i && i()
              },
            },
            {
              key: 'done',
              value: function (t) {
                if ('init' === this.state || 'ready' === this.state) {
                  ;(t.state = 'done'), this.trigger('done', t)
                  var e = this.getSlide()
                  e && t.index === e.index && this.option('autoFocus') && this.focus()
                }
              },
            },
            {
              key: 'setError',
              value: function (t, e) {
                ;(t.state = 'error'), this.hideLoading(t), this.clearContent(t)
                var i = document.createElement('div')
                i.classList.add('fancybox-error'),
                  (i.innerHTML = this.localize(e || '<p>{{ERROR}}</p>')),
                  this.setContent(t, i, {
                    suffix: 'error',
                  })
              },
            },
            {
              key: 'showLoading',
              value: function (t) {
                var e = this
                ;(t.state = 'loading'), this.trigger('load', t), t.$el.classList.add('is-loading')
                var i = t.$el.querySelector('.fancybox__spinner')
                i ||
                  ((i = document.createElement('div')).classList.add('fancybox__spinner'),
                  (i.innerHTML = this.option('template.spinner')),
                  i.addEventListener('click', function () {
                    e.Carousel.Panzoom.velocity || e.close()
                  }),
                  t.$el.insertBefore(i, t.$el.firstChild))
              },
            },
            {
              key: 'hideLoading',
              value: function (t) {
                var e = t.$el && t.$el.querySelector('.fancybox__spinner')
                e && (e.remove(), t.$el.classList.remove('is-loading')),
                  'loading' === t.state && (t.state = 'ready')
              },
            },
            {
              key: 'next',
              value: function () {
                var t = this.Carousel
                t && t.pages.length > 1 && t.slideNext()
              },
            },
            {
              key: 'prev',
              value: function () {
                var t = this.Carousel
                t && t.pages.length > 1 && t.slidePrev()
              },
            },
            {
              key: 'jumpTo',
              value: function () {
                var t
                this.Carousel && (t = this.Carousel).slideTo.apply(t, arguments)
              },
            },
            {
              key: 'close',
              value: function (t) {
                var e = this
                if (
                  (t && t.preventDefault(),
                  !(['closing', 'customClosing', 'destroy'].indexOf(this.state) > -1) &&
                    !1 !== this.trigger('shouldClose', t) &&
                    ((this.state = 'closing'),
                    this.Carousel.Panzoom.destroy(),
                    this.detachEvents(),
                    this.trigger('closing', t),
                    'destroy' !== this.state))
                ) {
                  this.$container.setAttribute('aria-hidden', 'true'),
                    this.$container.classList.add('is-closing')
                  var i = this.getSlide()
                  if (
                    (this.Carousel.slides.forEach(function (t) {
                      t.$content && t.index !== i.index && t.$content.remove()
                    }),
                    'closing' === this.state)
                  ) {
                    var n = void 0 === i.hideClass ? this.option('hideClass') : i.hideClass
                    this.animateCSS(i.$content, n, function () {
                      e.destroy()
                    })
                  }
                }
              },
            },
            {
              key: 'destroy',
              value: function () {
                ;(this.state = 'destroy'), this.trigger('destroy')
                var t = this.option('placeFocusBack') ? this.getSlide().$trigger : null
                if (
                  (this.Carousel.destroy(),
                  this.detachPlugins(),
                  (this.Carousel = null),
                  (this.options = {}),
                  (this.events = {}),
                  this.$container.remove(),
                  (this.$container = this.$backdrop = this.$carousel = null),
                  t)
                )
                  if (H)
                    t.focus({
                      preventScroll: !0,
                    })
                  else {
                    var e = document.body.scrollTop
                    t.focus(), (document.body.scrollTop = e)
                  }
                var i = n.getInstance()
                i
                  ? i.focus()
                  : (document.documentElement.classList.remove('with-fancybox'),
                    document.body.classList.remove('is-using-mouse'),
                    this.revealScrollbar())
              },
            },
          ],
          [
            {
              key: 'show',
              value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                return new n(t, e)
              },
            },
            {
              key: 'fromEvent',
              value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                if (
                  !t.defaultPrevented &&
                  !((t.button && 0 !== t.button) || t.ctrlKey || t.metaKey || t.shiftKey)
                ) {
                  var i,
                    o,
                    s,
                    a = !1,
                    r = t.target
                  if (
                    ((r.matches('[data-fancybox-trigger]') ||
                      (r = r.closest('[data-fancybox-trigger]'))) &&
                      (s = r && r.dataset && r.dataset.fancyboxTrigger),
                    s)
                  ) {
                    var l = document.querySelectorAll('[data-fancybox="'.concat(s, '"]')),
                      c = parseInt(r.dataset.fancyboxIndex, 10) || 0
                    r = l.length ? l[c] : r
                  }
                  r || (r = t.target),
                    Array.from(n.openers.keys())
                      .reverse()
                      .some(function (e) {
                        if ((i = r).matches(e) || (i = i.closest(e)))
                          return t.preventDefault(), (o = e), !0
                      }),
                    o && ((e.target = i), (i.origTarget = t.target), (a = n.fromOpener(o, e)))
                  var h = n.getInstance()
                  return (
                    h &&
                      'ready' === h.state &&
                      t.detail &&
                      document.body.classList.add('is-using-mouse'),
                    a
                  )
                }
              },
            },
            {
              key: 'fromOpener',
              value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  i = function (t) {
                    for (
                      var e = ['false', '0', 'no', 'null'],
                        i = ['true', '1', 'yes'],
                        n = Object.assign({}, t.dataset),
                        o = 0,
                        s = Object.entries(n);
                      o < s.length;
                      o++
                    ) {
                      var a = d(s[o], 2),
                        r = a[0],
                        l = a[1]
                      if ('string' == typeof l || l instanceof String)
                        if (e.indexOf(l) > -1) n[r] = !1
                        else if (i.indexOf(n[r]) > -1) n[r] = !0
                        else
                          try {
                            n[r] = JSON.parse(l)
                          } catch (t) {
                            n[r] = l
                          }
                    }
                    return (
                      delete n.fancybox, delete n.type, t instanceof Element && (n.$trigger = t), n
                    )
                  },
                  o = [],
                  s = e.startIndex || 0,
                  a = (e = m({}, e, n.openers.get(t))).groupAttr
                void 0 === a && (a = 'data-fancybox')
                var r = e.target
                if (a) {
                  if (r && t && t === '['.concat(a, ']')) {
                    var l = r.getAttribute(''.concat(a))
                    t = !(!l || !l.length || 'true' === l) && '['.concat(a, "='").concat(l, "']")
                  }
                } else t = !1
                if (
                  (t && (o = [].slice.call(document.querySelectorAll(t))),
                  !o.length && r && (o = [r]),
                  !o.length)
                )
                  return !1
                var c = n.getInstance()
                return (
                  !(c && o.indexOf(c.options.$trigger) > -1) &&
                  ((s = r ? o.indexOf(r) : s),
                  new n(
                    (o = o.map(i)),
                    m({}, e, {
                      startIndex: s,
                      $trigger: r,
                    }),
                  ))
                )
              },
            },
            {
              key: 'bind',
              value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                if (A) {
                  if (!n.openers.size) {
                    document.body.addEventListener('click', n.fromEvent, !1)
                    for (var i = 0, o = Object.entries(n.Plugins || {}); i < o.length; i++) {
                      var s = d(o[i], 2)
                      s[0]
                      var a = s[1]
                      ;(a.Fancybox = this), 'function' == typeof a.create && a.create()
                    }
                  }
                  n.openers.set(t, e)
                }
              },
            },
            {
              key: 'unbind',
              value: function (t) {
                n.openers.delete(t), n.openers.size || n.destroy()
              },
            },
            {
              key: 'destroy',
              value: function () {
                for (var t; (t = n.getInstance()); ) t.destroy()
                ;(n.openers = new Map()),
                  document.body.removeEventListener('click', n.fromEvent, !1)
              },
            },
            {
              key: 'getInstance',
              value: function (t) {
                var e,
                  i = p(
                    t
                      ? [document.getElementById('fancybox-'.concat(t))]
                      : Array.from(document.querySelectorAll('.fancybox__container')).reverse(),
                  )
                try {
                  for (i.s(); !(e = i.n()).done; ) {
                    var n = e.value,
                      o = n && n.Fancybox
                    if (o && 'closing' !== o.state && 'customClosing' !== o.state) return o
                  }
                } catch (t) {
                  i.e(t)
                } finally {
                  i.f()
                }
                return null
              },
            },
            {
              key: 'close',
              value: function () {
                for (
                  var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                    e = null;
                  (e = n.getInstance());

                )
                  if ((e.close(), !t)) return
              },
            },
          ],
        ),
        n
      )
    })(k)
  ;(U.version = '4.0.0-alpha.4'),
    (U.defaults = {
      startIndex: 0,
      preload: 1,
      infinite: !0,
      showClass: 'fancybox-zoomInUp',
      hideClass: 'fancybox-fadeOut',
      animated: !0,
      hideScrollbar: !0,
      parentEl: null,
      mainClass: null,
      autoFocus: !0,
      trapFocus: !0,
      placeFocusBack: !0,
      click: 'close',
      closeButton: 'inside',
      dragToClose: !0,
      keyboard: {
        Escape: 'close',
        Delete: 'close',
        Backspace: 'close',
        PageUp: 'next',
        PageDown: 'prev',
        ArrowUp: 'next',
        ArrowDown: 'prev',
        ArrowRight: 'next',
        ArrowLeft: 'prev',
      },
      template: {
        closeButton:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg>',
        spinner:
          '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
        main: null,
      },
      l10n: {
        CLOSE: 'Close',
        NEXT: 'Next',
        PREV: 'Previous',
        MODAL: 'You can close this modal content with the ESC key',
        ERROR: 'Something Went Wrong, Please Try Again Later',
        IMAGE_ERROR: 'Image Not Found',
        ELEMENT_NOT_FOUND: 'HTML Element Not Found',
        AJAX_NOT_FOUND: 'Error Loading AJAX : Not Found',
        AJAX_FORBIDDEN: 'Error Loading AJAX : Forbidden',
        IFRAME_ERROR: 'Error Loading Page',
      },
    }),
    (U.openers = new Map()),
    (U.Plugins = B),
    (U.isMobile = function () {
      return (
        !!navigator &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
    }),
    U.bind('[data-fancybox]'),
    (t.Carousel = D),
    (t.Fancybox = U),
    (t.Panzoom = C)
})
function popupsInit(newPopup) {
  $('.page-width').css('min-height', '100%')
  var bodyH = $(window).outerHeight()
  var pageH = $('.page-width').outerHeight()
  if (pageH < bodyH) {
    pageH = bodyH
  }
  var scrollH = $(window).scrollTop()
  var popupH = $(newPopup).outerHeight()
  if (pageH < popupH) {
    if ($('body').hasClass('show-popups-preload') == true) {
      $('.page-width').css('min-height', popupH + 30)
      pageH = popupH + 30
    }
  }
  var popupTop = scrollH + 20
  if (popupH < bodyH) {
    popupTop = (bodyH - popupH) / 2 + scrollH
  }
  if (popupTop + popupH > pageH) {
    popupTop = pageH - popupH
  }
  if ($(newPopup).hasClass('show') != true) {
    $(newPopup).css('top', popupTop + 'px')
  }
}
function mobInit() {
  $(document).on(
    'click',
    '.mobile-nav .sub-btn, .mobile-nav.click-btn .have-sub .sub_open',
    function () {
      if ($(this).parent().hasClass('open') != true) {
        $(this).parent().parent().find('.sub-nav').eq(0).show(200)
      } else {
        $(this).parent().parent().find('.sub-nav').eq(0).hide(200)
      }
      $(this).parent().toggleClass('open')
      return false
    },
  )
  $(document).on(
    'click',
    '.mobile-sbm, .catalog-mobile__close, .mobile-toolbar__item_cataog',
    function () {
      $('.mobile-toolbar__item_cataog').toggleClass('mobile-toolbar__item_active')
      if ($('body').hasClass('show-category') != true) {
        $('body').addClass('show-category')
        jQuery('html:not(:animated),body:not(:animated)').animate(
          {
            scrollTop: 0,
          },
          0,
        )
        $('.catalog-nav-wrap').show(0)
      } else {
        $('body').removeClass('show-category')
        $('.catalog-nav-wrap').hide(0)
        var oldScr = $('body').data('scroll')
        if (oldScr > 0) {
        } else {
          oldScr = 0
        }
        jQuery('html:not(:animated),body:not(:animated)').animate(
          {
            scrollTop: oldScr,
          },
          0,
        )
      }
      return false
    },
  )
}
function upInit() {
  var bodyH = $(window).outerHeight()
  var scroll = $(window).scrollTop()
  if (scroll > bodyH && $('body').hasClass('show-up') != true) {
    $('body').toggleClass('show-up')
  }
  if (scroll < bodyH && $('body').hasClass('show-up') == true) {
    $('body').removeClass('show-up')
  }
}
function abc2(n) {
  n += ''
  n = new Array(4 - (n.length % 3)).join('U') + n
  return n.replace(/([0-9U]{3})/g, '$1 ').replace(/U/g, '')
}
function tabsRow() {
  var tabsLen = $('.tabs-row').length
  for (var i = 0; i < tabsLen; i++) {
    var tabRow = $('.tabs-row').eq(i)
    var liLen = $(tabRow).find('li').length
    $(tabRow)
      .find('.line')
      .css('width', 100 / liLen + '%')
    var liLen = $(tabRow).find('li').length
    var tabInd = $(tabRow).find('.active').index()
    var step = (100 / liLen) * tabInd + '%'
    $(tabRow).find('.line').css('left', step)
  }
}
function audioPl() {
  $(document).on('click', '.audio-bl .audio-btn', function () {
    glyphicon = $(this).find('.glyphicon')
    toggleClass = glyphicon.data('toggle-class')
    glyphicon.data('toggle-class', glyphicon.attr('class')).removeClass().addClass(toggleClass)
    audio = $(this).closest('.audio-bl').find('audio')
    timeline = audio.closest('.audio-bl').find('.audio-line')
    rate = audio.closest('.audio-bl').find('.audio-rate')
    image = audio.closest('.audio-bl_container').find('.audio-bl_img')
    rate.toggleClass('active')
    image.toggleClass('active')
    duration = audio.prop('duration')
    width = timeline.width()
    if ($(this).hasClass('on') != true) {
      $(this).addClass('on')
    }
    if (audio.prop('paused')) {
      audio.trigger('play')
      if ($(this).hasClass('on') != true) {
        $(this).addClass('on')
      }
      idInterval = setInterval(function () {
        currentTime = audio.prop('currentTime')
        left = (width * currentTime) / duration
        timeline.find('span').css('width', left + 'px')
        var date = new Date(currentTime * 1000)
        var dateMin = date.getMinutes()
        if (dateMin < 10) {
          dateMin = '0' + dateMin
        }
        var dateSec = date.getSeconds()
        if (dateSec < 10) {
          dateSec = '0' + dateSec
        }
        audio
          .closest('.audio-bl')
          .find('.audio-time')
          .html(dateMin + ':' + dateSec)
        if (currentTime == duration) {
          $('.audio-btn.on').removeClass('on')
          rate.removeClass('active')
          image.removeClass('active')
          clearInterval(idInterval)
        }
      }, 2)
    } else {
      audio.trigger('pause')
      $('.audio-btn.on').removeClass('on')
      clearInterval(idInterval)
    }
    return false
  })
  $(document).on('click', '.audio-bl .audio-line', function (e) {
    audioTime = $(this).closest('.audio-bl').find('audio')
    duration = audioTime.prop('duration')
    if (duration > 0) {
      offset = $(this).offset()
      left = e.clientX - offset.left
      width = $(this).width()
      $(this)
        .find('span')
        .css('width', left + 'px')
      currentTime = audio.prop('currentTime')
      audioTime.prop('currentTime', (duration * left) / width)
    }
    return false
  })
  $(document).on('click', '.audio-bl .audio-rate', function (e) {
    audioTime = $(this).closest('.audio-bl').find('audio')
    let rate = audioTime[0].playbackRate
    audioTime[0].playbackRate = rate < 2 ? (rate += 0.5) : (rate = 0.5)
    $(this)
      .closest('.audio-bl')
      .find('.audio-rate')
      .text(rate + 'x')
  })
}
function tblRow() {
  var tblLen = $('.tbl-row').length
  for (var i = 0; i < tblLen; i++) {
    var trHed = $('.tbl-row').eq(i).find('.tbl thead tr').eq(0).find('td').outerHeight() + 10
    $('.tbl-row').eq(i).find('.tbl thead tr').eq(0).outerHeight(trHed).css({
      display: 'flex',
      'align-items': 'center',
    })
    $('.tbl-row').eq(i).find('.tbl thead tr').eq(0).find('td').css({
      display: 'flex',
      'align-items': 'center',
    })
    var trLen = $('.tbl-row').eq(i).find('.tbl tbody tr').length
    var bLen = $('.tbl-row').eq(i).find('.sw-tbl-head').length
    for (var k = 0; k < bLen; k++) {
      $('.tbl-row')
        .eq(i)
        .find('.sw-tbl-head')
        .eq(k)
        .css('min-height', trHed + 'px')
    }
    var bLen = $('.tbl-row').eq(i).find('.sw-tbl-body').length
    for (var j = 0; j < trLen; j++) {
      var temp = $('.tbl-row').eq(i).find('.tbl tbody tr').eq(j).outerHeight()
      for (var k = 0; k < bLen; k++) {
        $('.tbl-row')
          .eq(i)
          .find('.sw-tbl-body')
          .eq(k)
          .find('.sw-tr')
          .eq(j)
          .css('min-height', temp + 'px')
      }
    }
  }
}
$(document).ready(function () {
  mobInit()
  upInit()
  tabsRow()
  audioPl()
  tblRow()
  if ($('.content-bar__container_hidden')[0]) {
    $('.content-bar__container_hidden').css(
      'height',
      $('.content-bar__container_hidden')[0].scrollHeight + 'px',
    )
  }
  $(document).on('click', '.tabs-row li', function () {
    if ($(this).hasClass('active') != true) {
      $(this).parent().find('.active').removeClass('active')
      $(this).toggleClass('active')
      var liLen = $(this).parent().find('li').length
      var tabInd = $(this).parent().find('.active').index()
      var step = (100 / liLen) * tabInd + '%'
      $(this).parent().parent().find('.line').css('left', step)
    }
  })
  $(document).on('mouseenter', '.tabs-row li', function () {
    var liLen = $(this).parent().find('li').length
    var tabInd = $(this).index()
    var step = (100 / liLen) * tabInd + '%'
    $(this).parent().parent().find('.line').css('left', step)
  })
  $(document).on('mouseleave', '.tabs-row li', function () {
    var liLen = $(this).parent().find('li').length
    var tabInd = $(this).parent().find('.active').index()
    var step = (100 / liLen) * tabInd + '%'
    $(this).parent().parent().find('.line').css('left', step)
  })
  $(document).on('click', '.popup-link', function () {
    var newPopup = $(this).attr('href')
    if ($('body').hasClass('show-popups-preload') != true) {
      $('body').toggleClass('show-popups-preload')
    }
    popupsInit($(newPopup))
    if ($('body').hasClass('show-popups') != true) {
      $('body').toggleClass('show-popups')
      if ($(newPopup).hasClass('show') != true) {
        $(newPopup).toggleClass('show')
      }
    } else {
      $('.popup-bl').removeClass('show')
      $(newPopup).toggleClass('show')
    }
    $('body').removeClass('show-popups-preload')
    if ($('body').hasClass('show-popups-hide') != true) {
      $('body').toggleClass('show-popups-hide')
    }
    return false
  })
  $(document).on('click', '.pr-small .modific-sbm', function () {
    var newBl = $(this).parent().parent().parent().parent().parent()
    $(newBl).toggleClass('fix-active')
    if ($('body').hasClass('show-popups') != true) {
      $('body').toggleClass('show-popups')
    }
    if ($('body').hasClass('show-popups-hide') != true) {
      $('body').toggleClass('show-popups-hide')
    }
    return false
  })
  $(document).on('click', '.open-link', function () {
    if ($('body').hasClass('filt-active') != true) {
      $('body').toggleClass('filt-active')
      $('.mfilter-box').toggleClass('active')
    }
    if ($('body').hasClass('show-popups') != true) {
      $('body').toggleClass('show-popups')
    }
    if ($('body').hasClass('show-popups-hide') != true) {
      $('body').toggleClass('show-popups-hide')
    }
    return false
  })
  $(document).on('click', '.popup-bl .close,.close-popup', function () {
    $('.popup-bl').removeClass('show')
    $('body').removeClass('filt-active')
    $('body').removeClass('select-active')
    $('body').removeClass('show-popups')
    $('body').removeClass('show-w-popup')
    $('body .fix-active').removeClass('fix-active')
    $('body').removeClass('show-popups-hide')
    $('.mfilter-box').removeClass('active')
    $('.page-width').css('min-height', '100%')
    return false
  })
  $(document).on('mouseenter', '.popup-bl,.fix-active .modific-bl', function (e) {
    if ($('body').hasClass('show-popups-hide') == true) {
      $('body').removeClass('show-popups-hide')
    }
  })
  $(document).on('mouseleave', '.popup-bl,.fix-active .modific-bl', function (e) {
    if ($('body').hasClass('show-popups-hide') != true) {
      $('body').toggleClass('show-popups-hide')
    }
  })
  $(document).on('click', 'body', function () {
    $('.show-popups-hide .popup-bl.show').removeClass('show')
    $('.show-popups-hide .page-width').css('min-height', '100%')
    $('.show-popups-hide').removeClass('show-popups')
    $('.show-popups-hide .fix-active').removeClass('fix-active')
    $('.show-popups-hide').removeClass('show-popups-hide')
  })
  $(document).on('click', '.select-bl .title', function () {
    var newSel = $(this).parent()
    var temp = $('body').outerWidth()
    if ($(newSel).hasClass('open') != true) {
      $(newSel).find('ul').fadeIn(150)
      $(newSel).toggleClass('open')
    } else {
      $(newSel).find('ul').fadeOut(150)
      $(newSel).removeClass('open')
    }
    if ($('body').hasClass('select-active') != true) {
      $('body').toggleClass('select-active')
    }
    if ($('body').hasClass('show-popups') != true && temp < 720) {
      $('body').toggleClass('show-popups')
    }
    if ($('body').hasClass('show-popups-hide') != true && temp < 720) {
      $('body').toggleClass('show-popups-hide')
    }
    return false
  })
  $(document).on('mouseenter', '.select-bl .title', function () {
    var newSel = $(this).parent()
    var temp = $('body').outerWidth()
    if ($(newSel).hasClass('open') != true && temp > 720) {
      if ($(newSel).hasClass('open') != true) {
        $(newSel).find('ul').fadeIn(150)
        $(newSel).toggleClass('open')
      } else {
        $(newSel).find('ul').fadeOut(150)
        $(newSel).removeClass('open')
      }
      if ($('body').hasClass('select-active') != true) {
        $('body').toggleClass('select-active')
      }
      if ($('body').hasClass('show-popups') != true && temp < 720) {
        $('body').toggleClass('show-popups')
      }
      if ($('body').hasClass('show-popups-hide') != true && temp < 720) {
        $('body').toggleClass('show-popups-hide')
      }
    }
    return false
  })
  $(document).on('mouseleave', '.select-bl', function () {
    var newSel = $(this)
    var temp = $('body').outerWidth()
    if ($(newSel).hasClass('open') == true && temp > 720) {
      $(newSel).find('ul').fadeOut(150)
      $(newSel).removeClass('open')
      if ($('body').hasClass('select-active') == true) {
        $('body').removeClass('select-active')
      }
    }
    return false
  })
  $(document).on('click', '.select-bl li span', function () {
    var newSel = $(this).parent().parent().parent()
    var newVal = $(this).html()
    $(newSel).find('.title span').html(newVal)
    $(newSel).find('ul .active').removeClass('active')
    $(this).parent().toggleClass('active')
    $(newSel).find('ul').hide(200)
    $(newSel).removeClass('open')
    if ($('body').hasClass('select-active') == true) {
      $('body').removeClass('select-active')
    }
  })
  $(document).mouseup(function (e) {
    var div = $('.select-bl.open').eq(0)
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      $('.select-bl.open ul').hide(200)
      if ($('.select-bl.open').length > 0) {
        $('.close-popup').eq(0).trigger('click')
      }
      $('.select-bl.open').removeClass('open')
    }
  })
  $(document).on('click', '.tab-link', function () {
    var newBl = $(this).attr('href')
    var oldBl = '#' + $('.tab-bl.open').eq(0).attr('id')
    var oldActive = "a[href='" + oldBl + "']"
    $(oldActive).removeClass('active')
    $(oldBl).removeClass('open')
    var newActive = "a[href='" + newBl + "']"
    $(newActive).toggleClass('active')
    $(newBl).toggleClass('open')
    return false
  })
  $(document).on('click', '.tabs-nav a', function () {
    if ($(this).hasClass('active') != true) {
      var oldLink = $(this).parent().parent().find('.active').eq(0)
      var oldBl = $(oldLink).attr('href')
      $(oldLink).removeClass('active')
      $(oldBl).hide(0)
      var newLink = $(this)
      var newBl = $(this).attr('href')
      $(newLink).toggleClass('active')
      $(newBl).fadeIn(500)
    }
    return false
  })
  $(document).on('click', '.size-bl i', function () {
    var newVal = parseInt($(this).parent().find('input').val())
    if ($(this).hasClass('left') == true) {
      if (newVal > 1) {
        newVal--
      } else {
        newVal = 1
      }
    }
    if ($(this).hasClass('right') == true) {
      if (newVal > 0) {
        newVal++
      } else {
        newVal = 1
      }
    }
    $(this).parent().find('input').val(newVal)
  })
  $(document).on('change, keyup', '.size-bl input', function () {
    var newVal = $(this).val()
    if (newVal > 0) {
    } else {
      $(this).val('1')
    }
  })
  $(document).on('click', '.up-link', function () {
    jQuery('html:not(:animated),body:not(:animated)').animate(
      {
        scrollTop: 0,
      },
      800,
    )
    return false
  })
  $(document).on('click', 'div.i-btn', function () {
    if ($(this).hasClass('open') != true) {
      $(this).addClass('open')
    } else {
      $(this).removeClass('open')
    }
    return false
  })
  $(document).on('mouseenter', '.i-btn.open', function () {
    $('body').removeClass('show-ibtn')
  })
  $(document).on('mouseleave', '.i-btn.open', function () {
    if ($('body').hasClass('show-ibtn') != true) {
      $('body').toggleClass('show-ibtn')
    }
  })
  $(document).on('click', '.quest-bl .q-head,.cat-filter .filt-head,.cat-qw .qw-head', function () {
    $(this).parent().toggleClass('open')
  })
  $(document).on('click', '.modific-bl .modific-head', function () {
    if ($('body').hasClass('show-ibtn') == true) {
      $('div.i-btn').removeClass('open')
      $('body').removeClass('show-ibtn')
    }
    var newBl = $(this).parent()
    if ($(newBl).hasClass('open') != true) {
      $(newBl).find('.modific-body').show(200)
    } else {
      $(newBl).find('.modific-body').hide(200)
    }
    $(newBl).toggleClass('open')
    return false
  })
  $(document).on('click', '.cat-vis span', function () {
    if ($(this).hasClass('active') != true) {
      var oldVal = $(this).parent().parent().find('.active').data('val')
      $('body').removeClass(oldVal)
      $(this).parent().parent().find('.active').removeClass('active')
      var newVal = $(this).data('val')
      $('body').toggleClass(newVal)
      $(this).toggleClass('active')
    }
    return false
  })
  $(document).on('click', '.quiz-sbmts .prev', function () {
    var swSlide = $(this).parent().parent().parent().parent()
    var slIndex = $(swSlide).index()
    var oldBl = $(this).parent()
    var result = 0
    while (result == 0) {
      if ($(oldBl).hasClass('quiz-show-bl') == true) {
        result = 1
      }
      if ($(oldBl).hasClass('page-width') == true) {
        result = 1
      }
      if (result == 0) {
        oldBl = $(oldBl).parent()
      }
    }
    var blTop = $(oldBl).offset().top - 160
    var qizBl = $(oldBl).find('.quiz-slider').eq(0)
    if ($(qizBl).hasClass('result') == true) {
      $(qizBl).removeClass('result')
    }
    if (slIndex !== 0) {
      $(oldBl).find('.sw-quiz .swiper-button.prev').trigger('click')
    } else {
      var modal = this.closest('.quiz-modal')
      $('body').removeClass('quiz_body_open')
      modal.classList.remove('active')
    }
    return false
  })
  $(document).on('click', '.quiz-sbmts .next', function () {
    var oldBl = $(this).parent()
    var result = 0
    while (result == 0) {
      if ($(oldBl).hasClass('quiz-show-bl') == true) {
        result = 1
      }
      if ($(oldBl).hasClass('page-width') == true) {
        result = 1
      }
      if (result == 0) {
        oldBl = $(oldBl).parent()
      }
    }
    var blTop = $(oldBl).offset().top - 160
    var qizBl = $(oldBl).find('.quiz-slider').eq(0)
    if (
      $(qizBl).find('.swiper-slide:last-child').hasClass('swiper-slide-active') == true ||
      $(qizBl).find('.swiper-slide:last-child').hasClass('swiper-slide-next') == true
    ) {
      if ($(qizBl).hasClass('result') != true) {
        $(qizBl).addClass('result')
      }
    } else {
      if ($(qizBl).hasClass('result') == true) {
        $(qizBl).removeClass('result')
      }
    }
    $(oldBl).find('.sw-quiz .swiper-button.next').trigger('click')
    return false
  })
  $(document).on('click', '.nav-more', function () {
    $(this).parent().find('.n-hide').removeClass('n-hide')
    $(this).remove()
    return false
  })
  $(document).on('click', '.foot-nav .nav-head', function () {
    $(this).parent().toggleClass('open')
    return false
  })
  $(document).on('click', '.btn-cat', function () {
    if ($('body').hasClass('show-category') != true) {
      var scroll = $(window).scrollTop()
      $('.header-wrap').css('z-index', 1000)
      setTimeout(function () {
        $('body').addClass('show-category')
        $('body').attr('data-scroll', scroll)
        var windH = $(window).outerHeight()
        var headH = $('.site-header').outerHeight()
        $('.catalog-nav-wrap .cat-nav-row').css('min-height', windH - headH + 'px')
        $('.catalog-nav-wrap').show(0)
      }, 300)
    } else {
      $('body').removeClass('show-category')
      $('.header-wrap').css('z-index', 100)
      $('.catalog-nav-wrap').hide(10, function () {
        $('.catalog-nav-wrap').removeClass('show-sub')
        $('.catalog-nav-wrap .have-sub.open').removeClass('open')
        $('.catalog-nav-wrap .cat-sbm.active').removeClass('active')
        $('.catalog-nav-wrap .nav-tab').hide(0)
      })
    }
    return false
  })
  $(document).on('click', '.nav-main .have-sub .sub_open', function () {
    if ($(this).parents('.have-sub').hasClass('open') != true) {
      $('.nav-main .open').removeClass('open')
      $(this).parents('.have-sub').toggleClass('open')
    } else {
      $('.nav-main .open').removeClass('open')
    }
    return false
  })
  $(document).on('mouseenter', '.nav-main .cat-sbm', function () {
    if ($(this).hasClass('active') != true) {
      $('.nav-sub-col .nav-tab').hide(0)
      $('.nav-main .active').removeClass('active')
      $(this).addClass('active')
      var newTab = '#' + $(this).data('val')
      if ($(newTab).find('.col').length > 0) {
        if ($('.catalog-nav-wrap').hasClass('show-sub') != true) {
          $('.catalog-nav-wrap').addClass('show-sub')
        }
        $(newTab).show(0)
      } else {
        if ($('.catalog-nav-wrap').hasClass('show-sub') == true) {
          $('.catalog-nav-wrap').removeClass('show-sub')
        }
      }
    }
  })
  $(document).on('click', 'body.show-category .popups-bg', function () {
    $('.btn-cat').trigger('click')
  })
  $(document).on('click', 'body.show-category .nav-sub-col', function () {
    if ($('.catalog-nav-wrap').hasClass('show-sub') != true) {
      $('.btn-cat').trigger('click')
    }
  })
  $(document).on('click', '.s-wind-btn', function () {
    var valScr = $(window).scrollTop()
    $('body').attr('data-scroll', valScr)
    $('body').toggleClass('show-wsearch')
    $('.search-result').slideDown('300')
    $("#search input[name='search']").val('').focus()
  })
  $(document).on('click', '.wind-close', function () {
    $(".wind-search .search-form input[type='text']").val('')
    $('body').removeClass('show-wsearch')
    var valScr = parseInt($('body').attr('data-scroll')) + 'px'
    $('.search-result').slideUp('fast')
    jQuery('html:not(:animated),body:not(:animated)').animate(
      {
        scrollTop: valScr,
      },
      0,
    )
  })
  $(document).on('click', 'body', function () {
    if ($('body').hasClass('show-ibtn') == true) {
      $('div.i-btn').removeClass('open')
      $('body').removeClass('show-ibtn')
    }
  })
  $("#search input[name='search']")
    .parent()
    .find('[type="button"]')
    .on('click', function () {
      var url = $('base').attr('href') + 'index.php?route=product/search'
      var value = $("#search input[name='search']").val()
      if (value) {
        url += '&search=' + encodeURIComponent(value) + '&description=true'
      }
      location = url
    })
  $("#search input[name='search']").on('keydown', function (e) {
    if (e.keyCode == 13) {
      $("#search input[name='search']").parent().find('[type="button"]').trigger('click')
    }
  })
  $(document).on('click', '.quiz-btn', function () {
    var newBl = $(this).attr('href')
    var oldBl = $(this).parent()
    var result = 0
    while (result == 0) {
      if ($(oldBl).hasClass('quiz-hide-bl') == true) {
        result = 1
      }
      if ($(oldBl).hasClass('page-width') == true) {
        result = 1
      }
      if (result == 0) {
        oldBl = $(oldBl).parent()
      }
    }
    $(newBl).addClass('open')
    $('body').addClass('quiz_body_open')
    $(newBl).parent().addClass('active')
    return false
  })
  $(document).on('click', '.quiz-close, .quiz-modal', function (e) {
    if (
      e.target.classList.contains('quiz-close') ||
      e.target.closest('.quiz-close') ||
      !e.target.closest('.quiz_overlay')
    ) {
      var modal = this.closest('.quiz-modal')
      $('body').removeClass('quiz_body_open')
      modal.classList.remove('active')
    }
  })
  $(document).on('click', '.w-btn', function () {
    const id = $(this).data('id')
    const form = $(this).data('form')
    if (id) {
      if (form) {
        $(id).find('input[name="form"]').val(form)
      } else {
        $(id).find('input[name="form"]').val('')
      }
      $(id).addClass('show')
      $(id).addClass('active')
      $('body').addClass('hidden')
    }
    return false
  })
  $(document).on('click', '.w-btn-promo', function () {
    const id = $(this).data('id')
    const form = $(this).data('form')
    if (id) {
      if (form) {
        $(id).find('input[name="form"]').val(form)
      } else {
        $(id).find('input[name="form"]').val('')
      }
      $(id).addClass('show')
      $(id).addClass('active')
      $('body').addClass('show-w-popup')
    }
    return false
  })
  $(document).on('click', '.w-popup .btn-close', function () {
    $('body').removeClass('show-w-popup')
    $('body').removeClass('show-m-popup')
    $('.w-popup.show').removeClass('show')
    $('.js-btn-bl').html('')
    $('.w-btn').removeClass('show')
  })
  $(document).on('click', '.mob-w-btn', function () {
    if ($('body').hasClass('show-m-popup') != true) {
      $('body').addClass('show-m-popup')
    } else {
      $('body').removeClass('show-m-popup')
    }
    return false
  })
  $(document).on('mouseenter', '.w-popup.show', function () {
    if ($(this).hasClass('onhover') != true) {
      $(this).addClass('onhover')
    }
  })
  $(document).on('mouseleave', '.w-popup.show', function () {
    if ($(this).hasClass('onhover') == true) {
      $(this).removeClass('onhover')
    }
  })
  $(document).on('click', 'body', function () {
    var wPopupLen = $('.w-popup.show').length
    if (wPopupLen > 0) {
      if ($('.w-popup.show').eq(0).hasClass('onhover') != true) {
        $('.w-popup.show').eq(0).find('.btn-close').trigger('click')
      }
    }
  })
})
$(window).resize(function () {
  upInit()
  tblRow()
  var popupsLen = $('.popup-bl.show').length
  for (var i = 0; i < popupsLen; i++) {
    popupsInit($('.popup-bl').eq(i))
  }
  if ($('body').hasClass('show-w-popup') == true) {
    var posX = $('.head-sub-bl').offset().left
    $('.w-popup').css('right', posX)
    var newBtn = $('.w-btn.show').eq(0)
    var btnTop = $(newBtn).offset().top
    var btnLeft = $(newBtn).offset().left
    var btnW = $(newBtn).outerWidth()
    var btnH = $(newBtn).outerHeight()
    var btnFont = $(newBtn).css('font-size')
    $('.js-btn').css('top', btnTop + 'px')
    $('.js-btn').css('left', btnLeft + 'px')
    $('.js-btn').css('width', btnW + 'px')
    $('.js-btn').css('height', btnH + 'px')
    $('.js-btn').css('font-size', btnFont)
    $('.js-btn').css('opacity', '1')
  }
})
$(window).load(function () {
  var popupsLen = $('.popup-bl.show').length
  for (var i = 0; i < popupsLen; i++) {
    popupsInit($('.popup-bl').eq(i))
  }
})
$(window).scroll(function () {
  upInit()
  if ($('body').hasClass('show-w-popup') == true) {
    var newBtn = $('.w-btn.show').eq(0)
    var newBl = $('.w-popup.show').eq(0)
    var wScr = $(window).scrollTop()
    var posY = $(newBtn).offset().top + $(newBtn).outerHeight() + 8 - wScr
    if (posY < 0) {
      posY = 0
    }
    var windH = $(newBl).outerHeight()
    var windHtop = $(newBtn).offset().top - wScr - 10 - windH
    if (windHtop > 0) {
      posY = windHtop
    }
    $(newBl).css('top', posY)
    if ($(newBtn).parent().parent().parent().parent().hasClass('head-sub-bl') == true) {
      $('.js-btn').css('opacity', '0')
      setTimeout(function () {
        var btnTop = $(newBtn).offset().top
        var btnLeft = $(newBtn).offset().left
        $('.js-btn').css('top', btnTop + 'px')
        $('.js-btn').css('left', btnLeft + 'px')
        $('.js-btn').css('opacity', '1')
      }, 250)
    }
  }
})
$(document).on('keyup', function (e) {
  if (e.key == 'Escape') {
    $('.popup-bl.show .close').trigger('click')
  }
})
function showAmoChat() {
  $('.amo-button-holder').addClass('active')
}
function hideAmoChat() {
  $('.amo-button-holder').removeClass('active')
}
if (window.matchMedia('(max-width: 720px)').matches) {
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      amoSocialButton('onChatHide', function () {
        hideAmoChat()
        amoSocialButton('runChatHide')
      })
      amoSocialButton('onConversationsChange', function (conversations) {})
    }, 100)
  })
}
document.addEventListener('DOMContentLoaded', function () {
  $(document).on('click', '.modification_load', function () {
    var product_id = $(this).data('id')
    var category_id = $(this).data('category_id')
    var category_data = ''
    if (category_id) {
      category_data = '&category_id=' + category_id
    }
    var parent_item = $(this).parents('.pr-small')
    $.ajax({
      url: '/index.php?route=product/product/getProduct',
      type: 'post',
      data: 'product_id=' + product_id + category_data,
      success: function (result) {
        if (result) {
          var div = document.createElement('div')
          div.innerHTML = result
          parent_item.find('.img').html($(div).find('.img').html())
          parent_item.find('.txt').html($(div).find('.txt').html())
          parent_item.find('.btns-row').html($(div).find('.btns-row').html())
          parent_item.find('.modific-bl').html($(div).find('.modific-bl').html())
          parent_item
            .find('.catalog-item__bottom__prices')
            .html($(div).find('.catalog-item__bottom__prices').html())
          parent_item.find('.catalog-item__body').html($(div).find('.catalog-item__body').html())
          parent_item.find('.catalog-item__top').html($(div).find('.catalog-item__top').html())
          tabsRow()
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText)
      },
    })
  })
  $(document).on('submit', '.form-submit', function () {
    var th = $(this)
    $('.load__preloader').fadeIn('', function () {
      $.ajax({
        type: 'POST',
        url: '/index.php?route=common/footer/form_submit_success',
        data: th.serialize(),
        dataType: 'json',
        success: function (json) {
          window.location = window.location.origin + '/index.php?route=product/submitted'
        },
      })
    })
    return false
  })
  $(document).on('submit', '.form-submit-question', function () {
    var th = $(this)
    $.ajax({
      type: 'POST',
      url: '/index.php?route=common/footer/form_submit',
      data: th.serialize(),
      dataType: 'json',
    }).done(function (json) {
      if (json['success']) {
        th.parent().html(json['html'])
        setTimeout(function () {
          $('.success-checkbox[value="0"]').trigger('click')
        }, 10000)
      }
    })
    return false
  })
  $(document).on('click', '.success-checkbox', function () {
    var th = $(this).parents('form')
    $.ajax({
      type: 'POST',
      url: '/index.php?route=common/footer/form_submit_success',
      data: th.serialize(),
      dataType: 'json',
    }).done(function (json) {
      if (json['success']) {
        th.parent().html(json['html'])
      }
    })
    return false
  })
  $(document).on('submit', '.form-submit-top', function () {
    var th = $(this)
    $.ajax({
      type: 'POST',
      url: '/index.php?route=common/footer/form_submit_top',
      data: th.serialize(),
      dataType: 'json',
    }).done(function (json) {
      if (json['success']) {
        th.parent().html(json['html'])
        setTimeout(function () {
          $('.success-checkbox-top[value="0"]').trigger('click')
        }, 10000)
      }
    })
    return false
  })
  $(document).on('submit', '.form-submit-recaptcha', function () {
    window.currentForm = this
    if (config_captcha_enabled) {
      window.event.preventDefault()
      grecaptcha.execute()
    } else {
      window[this.querySelector('.g-recaptcha').dataset.callback]()
    }
    return false
  })
  $(document).on('submit', '.form-submit-quiz-uni', function () {
    var th = $(this)
    $.ajax({
      type: 'POST',
      url: '/index.php?route=common/footer/form_submit_quiz_uni',
      data: th.serialize(),
      dataType: 'json',
    }).done(function (json) {
      if (json['success']) {
        th.find('.quiz-uni').html(json['html'])
      }
    })
    return false
  })
  let quhT = null
  $('.quiz-uni-help').on('mouseover', function () {
    quhT = new Date().getTime()
    this.firstElementChild.style.display = 'block'
  })
  $('.quiz-uni-help').on('mouseout', function () {
    this.firstElementChild.style.display = 'none'
  })
  $('.quiz-uni-help').on('click', function () {
    if (new Date().getTime() - quhT > 500)
      this.firstElementChild.style.display =
        this.firstElementChild.style.display == 'none' ? 'block' : 'none'
  })
  $(document).on('click', '.success-checkbox-top', function () {
    var th = $(this).parents('form')
    $.ajax({
      type: 'POST',
      url: '/index.php?route=common/footer/form_submit_success_top',
      data: th.serialize(),
      dataType: 'json',
    }).done(function (json) {
      if (json['success']) {
        th.parent().html(json['html'])
      }
    })
    return false
  })
  $(document).on('submit', '.form-quiz', function () {
    var th = $(this)
    $('.load__preloader').fadeIn('', function () {
      $.ajax({
        type: 'POST',
        url: '/index.php?route=common/footer/quiz_submit',
        data: th.serialize(),
        dataType: 'json',
      }).done(function (json) {
        if (json['success']) {
          window.location = window.location.origin + '/index.php?route=product/submitted'
        }
      })
    })
    return false
  })
  $(document).on('submit', '.modal-block__form', function () {
    var th = $(this)
    $('.load__preloader').fadeIn('', function () {
      $.ajax({
        type: 'POST',
        url: '/index.php?route=common/footer/form_submit_modal',
        data: th.serialize(),
        dataType: 'json',
      }).done(function (json) {
        if (json['success']) {
          window.location = window.location.origin + '/index.php?route=product/submitted'
        }
      })
    })
    return false
  })
  if (document.querySelector('.hover-group-input')) {
    let feedbackFormInputs = document.querySelectorAll('.hover-group-input')
    feedbackFormInputs.forEach(function (input) {
      input.addEventListener('keyup', () => {
        if (
          input.value != '' &&
          !(input.classList.contains('phone_mask') && input.value[input.value.length - 1] === '_')
        ) {
          input.classList.add('hover-group-input-active')
        } else {
          input.classList.remove('hover-group-input-active')
        }
      })
    })
  }
  $(document).on('submit', '.feedback_form__form', function () {
    var th = $(this)
    $('.load__preloader').fadeIn('', function () {
      $.ajax({
        type: 'POST',
        url: '/index.php?route=common/footer/form_submit_modal',
        data: th.serialize(),
        dataType: 'json',
      }).done(function (json) {
        if (json['success']) {
          window.location = window.location.origin + '/index.php?route=product/submitted'
        }
      })
    })
    return false
  })
  $(document).on('submit', '.form-feedback__form', function () {
    var th = $(this)
    $('.load__preloader').fadeIn('', function () {
      $.ajax({
        type: 'POST',
        url: '/index.php?route=common/footer/form_submit_modal',
        data: th.serialize(),
        dataType: 'json',
      }).done(function (json) {
        if (json.success) {
          window.location = window.location.origin + '/index.php?route=product/submitted'
        }
      })
    })
    return false
  })
  $(document).on('click', '.other_quiz', function (e) {
    e.preventDefault()
    var id_quiz = $(this).data('id')
    var th = $(this)
    if (th.parents('.quiz_parent').find('.quiz_overlay').is(':empty')) {
      $('.load__preloader').fadeIn('', function () {
        $.ajax({
          url: '/index.php?route=product/quiz',
          type: 'POST',
          data: 'quiz_id=' + id_quiz,
          success: function (result) {
            if (result) {
              th.parents('.quiz_parent').find('.quiz_overlay').html(result)
              th.parents('.quiz_parent')
                .find('.quiz_overlay')
                .find('.link_source')
                .val(window.location.href)
              setTimeout(function () {
                $('.load__preloader').fadeOut('slow')
              }, 500)
            }
          },
        })
      })
    }
  })
  $(document).on('click', '.clicked_question', function (e) {
    e.preventDefault()
    var id_module = $(this).data('module')
    var id_question = $(this).data('key')
    var th = $(this)
    if (th.parents('.quiz_parent').find('.quiz_overlay').is(':empty')) {
      $('.load__preloader').fadeIn('', function () {
        $.ajax({
          url: '/index.php?route=product/quiz/click',
          type: 'POST',
          data: 'id_module=' + id_module + '&id_question=' + id_question,
          success: function () {
            setTimeout(function () {
              $('.load__preloader').fadeOut('slow')
            }, 500)
          },
        })
      })
    }
  })
  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange && $(this).val().replace(/\D/g, '').length != 11) {
      $(this).get(0).setSelectionRange(pos, pos)
    }
  }
  $.mask.definitions['N'] = '[/0-6|9/]'
  $('.phone_mask')
    .click(function () {
      $(this).setCursorPosition(2)
    })
    .mask('+7 N99 999-99-99')
  $('#send_telephone').keyup(function () {
    if ($(this).val().replace(/\D/g, '').length == 11) {
      $('#get_code').removeAttr('disabled')
    } else {
      $('#get_code').attr('disabled', 'disabled')
    }
  })
  $('#send_telephone')
    .click(function () {
      $(this).setCursorPosition(2)
    })
    .mask('+7 N99 999-99-99')
  $('#sms_code').keyup(function () {
    if ($(this).val().length == 6) {
      $('#send_code').removeAttr('disabled')
    } else {
      $('#send_code').attr('disabled', 'disabled')
    }
  })
  $('#sms_code').mask('999999', {
    placeholder: '',
  })
  if (window.matchMedia('(max-width: 720px)').matches) {
    $('.h-3-container').html('<h1 class="h-3">' + $('.h-2-main').text() + '</h1>')
    $('.h-2-main').remove()
  }
  $('a[href*=#module]').bind('click', function (e) {
    var anchor = $(this)
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr('href')).offset().top - 70,
        },
        400,
      )
    e.preventDefault()
  })
  $('a[href*=#category]').bind('click', function (e) {
    var anchor = $(this)
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr('href')).offset().top - 70,
        },
        400,
      )
    e.preventDefault()
  })
})
function formSubmitRecaptcha_part2(token) {
  if (config_captcha_enabled)
    window.currentForm.elements['g-recaptcha-response'].value = grecaptcha.getResponse()
  let url = '/index.php?route=common/footer/form_submit_top'
  if ($(window.currentForm).data('type') == 'form_submit')
    url = '/index.php?route=common/footer/form_submit'
  $.ajax({
    type: 'POST',
    url: url,
    data: $(window.currentForm).serialize(),
    dataType: 'json',
  }).done(function (json) {
    if (json['success']) {
      if ($(window.currentForm).data('type') == 'form_submit') {
        $(window.currentForm)
          .parent()
          .html('<div class="form_w">' + json['html'] + '</div>')
      } else {
        $(window.currentForm).parent().html(json['html'])
      }
      setTimeout(function () {
        $('.success-checkbox-top[value="0"]').trigger('click')
      }, 10000)
    }
  })
  return false
}
document.body.addEventListener('keydown', function (event) {
  if (event.keyCode === 27 && document.querySelector('.form-feedback.show')) {
    document.querySelector('.form-feedback.show .form-feedback__close-btn').click()
  }
})
function closeFormFeedback(event) {
  let form = null
  console.log(event.target)
  if (
    event.target.closest('.form-feedback__close-btn') ||
    !event.target.closest('.form-feedback__container')
  ) {
    form = event.target.closest('.form-feedback')
  }
  if (form != null) {
    form.classList.remove('active')
    form.classList.remove('show')
    $('body').removeClass('hidden')
  }
}
function cabColScroll() {
  if (jQuery('.cab-col-scroll').css('display') == 'block') {
    var scrBox = jQuery('.cab-col-scroll').eq(0)
    var scrBl = jQuery(scrBox).parent()
    var boxH = jQuery(scrBox).outerHeight()
    var blH = jQuery(scrBl).parent().outerHeight()
    blH = blH - boxH
    var blT = jQuery(scrBl).offset().top - 23
    var scroll = jQuery(window).scrollTop()
    var top = scroll - blT
    if (top < 0) {
      top = 0
    }
    if (top > blH) {
      top = blH
    }
    var headH = jQuery('.header-wrap').outerHeight()
    if (
      jQuery('.header-wrap').hasClass('scr') == true &&
      (jQuery('.header-wrap').hasClass('scr-top') == true ||
        jQuery('.header-wrap').hasClass('scr-fix') == true)
    ) {
      if (blT > scroll) {
        headH = blT - scroll - headH
        if (headH < 0) {
          headH = 0
        } else {
          headH = headH * -1
        }
      }
      top = top + headH
      if (top < 0) {
        top = 0
      }
    }
    jQuery(scrBox).css('transform', 'translateY(' + top + 'px)')
  }
}
jQuery(document).ready(function () {
  cabColScroll()
  jQuery(document).on('click', '.size-meter_btn', function () {
    let input = jQuery(this).parent().find('input')
    let oldVal = parseInt(input.val())
    let noload = input.data('noload')
    let unit = input.data('unit') ? ' ' + input.data('unit') : ''
    if (jQuery(this).hasClass('minus') == true) {
      oldVal--
    }
    if (jQuery(this).hasClass('plus') == true) {
      oldVal++
    }
    if (oldVal < 1) {
      oldVal = 1
    }
    input.data('value', oldVal)
    input.val(oldVal + unit)
    load_price(input, oldVal, noload)
    input.trigger('change')
  })
  jQuery(document).on('keyup', '.size-meter input', function () {
    let input = jQuery(this)
    let oldVal = parseInt(input.val())
    let noload = input.data('noload')
    if (oldVal < 1) {
      oldVal = 1
    }
    load_price(input, oldVal, noload)
    input.trigger('change')
  })
  jQuery(document).on('focus', '.size-meter input', function () {
    let input = jQuery(this)
    let oldVal = parseInt(input.val())
    input.val(oldVal)
  })
  jQuery(document).on('blur', '.size-meter input', function () {
    let input = jQuery(this)
    let oldVal = parseInt(input.val())
    let unit = input.data('unit') ? ' ' + input.data('unit') : ''
    if (oldVal < 1) {
      oldVal = 1
    }
    input.val(oldVal + unit)
  })
  jQuery(document).on('keypress', '.size-meter input', function () {
    var key, keyChar
    if (!event) var event = window.event
    if (event.keyCode) key = event.keyCode
    else if (event.which) key = event.which
    if (key >= 48 && key <= 57) {
      return true
    } else {
      return false
    }
  })
  jQuery('.size-meter input').each(function () {
    let noload = jQuery(this).data('noload')
    let oldVal = jQuery(this).data('value')
    let unit = jQuery(this).data('unit') ? ' ' + jQuery(this).data('unit') : ''
    jQuery(this).data('value', oldVal)
    jQuery(this).val(oldVal + unit)
    let input = jQuery(this)
    load_price(input, oldVal, noload)
  })
  function load_price(input, oldVal, noload = false) {
    let specialPrice = input.data('special')
    let price = input.data('price')
    let horizontal = input.data('horizontal')
    let specialVal = oldVal * parseInt(specialPrice)
    let priceVal = oldVal * parseInt(price)
    let html = ''
    if (!horizontal) {
      if (specialVal) {
        html +=
          '<span class="new">' +
          new Intl.NumberFormat('ru-RU').format(specialVal) +
          ' руб.' +
          '</span><span class="old">' +
          new Intl.NumberFormat('ru-RU').format(priceVal) +
          ' руб.' +
          '</span>'
      } else {
        html +=
          '<span class="new">' + new Intl.NumberFormat('ru-RU').format(priceVal) + ' руб.</span>'
      }
      if (!noload) {
        input.parents('.pr-about-product').find('.btn-load').html(html)
        input.parents('.pr-small').find('a.btn').html(html)
      }
    } else {
      if (specialVal) {
        html += new Intl.NumberFormat('ru-RU').format(specialVal) + ' руб.'
      } else {
        html += new Intl.NumberFormat('ru-RU').format(priceVal) + ' руб.'
      }
      if (!noload) {
        input.parents('.horizontal-item').find('.horizontal-item__price span').html(html)
      }
    }
    if (input.parents('.pr-small').find('.catalog-item__bottom__prices')) {
      html = ''
      if (specialVal) {
        html +=
          '<span class="catalog-item__bottom__prices__price">' +
          new Intl.NumberFormat('ru-RU').format(specialVal) +
          ' руб.' +
          '</span>' +
          '<span class="catalog-item__bottom__prices__old-price">' +
          new Intl.NumberFormat('ru-RU').format(priceVal) +
          ' руб.' +
          '</span>'
      } else {
        html +=
          '<span class="catalog-item__bottom__prices__price">' +
          new Intl.NumberFormat('ru-RU').format(priceVal) +
          ' руб.</span>'
      }
      input.parents('.pr-small').find('.catalog-item__bottom__prices').html(html)
    }
  }
  jQuery(document).on('click', '.cab-col-btn', function () {
    if (jQuery('body').hasClass('show-cab-col') != true) {
      jQuery(this).text('СКРЫТЬ')
    } else {
      jQuery(this).text('ВЫБРАНО')
    }
    jQuery('body').toggleClass('show-cab-col')
    return false
  })
  jQuery(document).on('click', '.featured', function (e) {
    console.log(e.target)
  })
  jQuery(document).on('click', '.cab-order__sbmts.w-btn', function () {
    jQuery('.js-btn').addClass('cab-order__sbmts')
    jQuery('.js-btn').css('height', 'auto')
    jQuery('.js-btn').css('box-sizing', 'border-box')
  })
  jQuery('.form-submit-lk').submit(function () {
    var th = $(this)
    $('.load__preloader').fadeIn('', function () {
      $.ajax({
        type: 'POST',
        url: '/index.php?route=checkout/cart/order',
        data: th.serialize(),
        dataType: 'json',
      }).done(function (json) {
        if (json['error']) {
          alert(json['error'])
        }
        if (json['success']) {
          alert('Ваш заказ оформлен! Мы свяжемся с вами и детальнее обсудим заказ')
          setTimeout(function () {
            th.trigger('reset')
            $('.load__preloader').fadeOut('slow')
          }, 1000)
        }
      })
    })
    return false
  })
  new Swiper('.horizontal-item .swiper:not(.swiper-initialized)', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.horizontal-slider__next',
      prevEl: '.horizontal-slider__prev',
    },
    pagination: {
      el: '.horizontal-slider__dots',
      type: 'bullets',
    },
  })
  $(document).on('click', '.open-modal', function (event) {
    event.stopPropagation()
    console.log('open-modal')
    const id = $(this).data('id')
    const form = $(this).data('form')
    if (id) {
      if (form) {
        $(id).find('input[name="form"]').val(form)
      } else {
        $(id).find('input[name="form"]').val('')
      }
      $(id).addClass('show')
      $(id).addClass('active')
      $('body').addClass('hidden')
    }
  })
  $('body').mouseup(function (e) {
    const modal = $('.modal-block__content')
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      $('.modal-block').removeClass('modal-block_active')
    }
  })
  $(document).on('click', '.modal-block__close_btn', function () {
    $('.modal-block').removeClass('modal-block_active')
  })
  $(document).on('keydown', function (e) {
    if (e.keyCode === 27) {
      $('.modal-block').removeClass('modal-block_active')
    }
  })
})
jQuery(window).scroll(function () {
  cabColScroll()
})
jQuery(window).on('resize', function () {
  cabColScroll()
})
;(() => {
  'use strict'
  var __webpack_exports__ = {}
  class Popup {
    constructor(options) {
      let config = {
        logging: true,
        init: true,
        attributeOpenButton: 'data-popup',
        attributeCloseButton: 'data-close',
        fixElementSelector: '[data-lp]',
        youtubeAttribute: 'data-youtube',
        youtubePlaceAttribute: 'data-youtube-place',
        setAutoplayYoutube: true,
        classes: {
          popup: 'popup',
          popupWrapper: 'popup__wrapper',
          popupContent: 'popup__content',
          popupActive: 'popup_show',
          bodyActive: 'popup-show',
        },
        closeEsc: true,
        bodyLock: true,
        bodyLockDelay: 500,
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {
            let link = document.querySelectorAll('._video-yt-link')
            let button = document.querySelectorAll('._video-yt-btn')
            const videoBlock = document.querySelector('#youtube-slide')
            if (videoBlock) {
              button.forEach((element) => {
                element.style.display = 'block'
              })
              link.forEach((element) => {
                element.style.display = 'block'
              })
              videoBlock.remove()
            }
          },
          afterClose: function () {},
        },
      }
      this.isOpen = false
      this.targetOpen = {
        selector: false,
        element: false,
      }
      this.previousOpen = {
        selector: false,
        element: false,
      }
      this.lastClosed = {
        selector: false,
        element: false,
      }
      this._dataValue = false
      this.hash = false
      this._reopen = false
      this._selectorOpen = false
      this.lastFocusEl = false
      this._focusEl = [
        'a[href]',
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        'button:not([disabled]):not([aria-hidden])',
        'select:not([disabled]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])',
        'area[href]',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])',
      ]
      this.options = {
        ...config,
        ...options,
        classes: {
          ...config.classes,
          ...options?.classes,
        },
        on: {
          ...config.on,
          ...options?.on,
        },
      }
      this.options.init ? this.initPopups() : null
    }
    initPopups() {
      this.eventsPopup()
    }
    eventsPopup() {
      document.addEventListener(
        'click',
        function (e) {
          const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`)
          if (buttonOpen) {
            e.preventDefault()
            this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton)
              ? buttonOpen.getAttribute(this.options.attributeOpenButton)
              : 'error'
            if (this._dataValue !== 'error') {
              if (!this.isOpen) this.lastFocusEl = buttonOpen
              this.targetOpen.selector = `${this._dataValue}`
              this._selectorOpen = true
              this.open()
              return
            }
            return
          }
          const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`)
          console.log()
          if (
            buttonClose ||
            (!e.target.closest(`.submitted__slider-navigation-next`) &&
              !e.target.closest(`.submitted__slider-navigation-prev`) &&
              !e.target.closest(`.popup-reels__slide`) &&
              !e.target.closest(`.popup-video__slide`) &&
              this.isOpen)
          ) {
            e.preventDefault()
            this.close()
            return
          }
        }.bind(this),
      )
      document.addEventListener(
        'keydown',
        function (e) {
          if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
            e.preventDefault()
            this.close()
            return
          }
          if (this.options.focusCatch && e.which == 9 && this.isOpen) {
            this._focusCatch(e)
            return
          }
        }.bind(this),
      )
    }
    open(selectorValue) {
      if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
        this.targetOpen.selector = selectorValue
        this._selectorOpen = true
      }
      if (this.isOpen) {
        this._reopen = true
        this.close()
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector
      if (!this._reopen) this.previousActiveElement = document.activeElement
      this.targetOpen.element = document.querySelector(this.targetOpen.selector)
      if (this.targetOpen.element) {
        this.options.on.beforeOpen(this)
        this.targetOpen.element.classList.add(this.options.classes.popupActive)
        document.body.classList.add(this.options.classes.bodyActive)
        if (!this._reopen) bodyLockToggle()
        else this._reopen = false
        this.targetOpen.element.setAttribute('aria-hidden', 'false')
        this.previousOpen.selector = this.targetOpen.selector
        this.previousOpen.element = this.targetOpen.element
        this._selectorOpen = false
        this.isOpen = true
        document.dispatchEvent(
          new CustomEvent('afterPopupOpen', {
            detail: {
              popup: this,
            },
          }),
        )
      }
    }
    close(selectorValue) {
      if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
        this.previousOpen.selector = selectorValue
      }
      if (!this.isOpen || !bodyLockStatus) {
        return
      }
      this.options.on.beforeClose(this)
      if (this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)) {
        if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`,
          ).innerHTML = ''
      }
      this.previousOpen.element.classList.remove(this.options.classes.popupActive)
      this.previousOpen.element.setAttribute('aria-hidden', 'true')
      if (!this._reopen) {
        document.body.classList.remove(this.options.classes.bodyActive)
        bodyLockToggle()
        this.isOpen = false
      }
      if (this._selectorOpen) {
        this.lastClosed.selector = this.previousOpen.selector
        this.lastClosed.element = this.previousOpen.element
      }
      this.options.on.afterClose(this)
    }
  }
  let bodyLockStatus = true
  let bodyLockToggle = (delay = 1) => {
    if (document.documentElement.classList.contains('lock')) {
      bodyUnlock(delay)
    } else {
      bodyLock(delay)
    }
  }
  let bodyUnlock = (delay = 1) => {
    let body = document.querySelector('body')
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index]
          el.style.paddingRight = '0px'
        }
        body.style.paddingRight = '0px'
        document.documentElement.classList.remove('lock')
      }, delay)
      bodyLockStatus = false
      setTimeout(function () {
        bodyLockStatus = true
      }, delay)
    }
  }
  let bodyLock = (delay = 1) => {
    let body = document.querySelector('body')
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index]
        el.style.paddingRight =
          window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
      }
      body.style.paddingRight =
        window.innerWidth - document.querySelector('body').offsetWidth + 'px'
      document.documentElement.classList.add('lock')
      bodyLockStatus = false
      setTimeout(function () {
        bodyLockStatus = true
      }, delay)
    }
  }
  function bildSliders() {
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper):not(.swiper)')
    if (sliders) {
      sliders.forEach((slider) => {
        if (slider.querySelector('.swiper-wrapper')) return
        slider.parentElement.classList.add('swiper')
        slider.classList.add('swiper-wrapper')
        for (const slide of slider.children) {
          slide.classList.add('swiper-slide')
        }
      })
    }
  }
  function initSliders() {
    bildSliders()
  }
  window.addEventListener('load', function (e) {
    initSliders()
    initPopupSlider()
  })
  function initPopupSlider() {
    const initPopups = new Popup()
    const containerSlider = document.querySelector('.submitted__swiper-yt')
    if (containerSlider) {
      containerSlider.addEventListener('click', function (event) {
        if (!event.target.closest('.submitted__slide-yt_video')) return
        let slideTargetVideo = event.target.closest('.submitted__slide-yt_video').dataset.slide
        bildSliders()
        if (document.querySelector('.popup-video__slider')) {
          const swiper = new Swiper('.popup-video__slider:not(.swiper-initialized)', {
            observer: true,
            observeParents: true,
            spaceBetween: 30,
            autoHeight: false,
            speed: 500,
            pagination: {
              el: '',
              clickable: true,
            },
            slideToClickedSlide: true,
            navigation: {
              nextEl: '#slider-popup-video_navigation #slider-popup-video_next',
              prevEl: '#slider-popup-video_navigation #slider-popup-video_prev',
            },
            breakpoints: {
              320: {
                spaceBetween: 15,
                centeredSlides: true,
                slidesPerView: '1.3',
              },
              430: {
                centeredSlides: true,
                spaceBetween: 15,
                slidesPerView: '1.2',
                initialSlide: 0,
              },
              768: {
                spaceBetween: 25,
                centeredSlides: false,
                slidesPerView: '1',
              },
              992: {
                slidesPerView: '1',
                spaceBetween: 30,
              },
            },
            on: {},
          })
          swiper.on('update', function () {
            swiper.slideTo(slideTargetVideo, 1, false)
          })
          swiper.on('slideChange', function () {
            initPopups.options.on.beforeClose()
          })
          swiper.update()
        }
      })
    }
    function findVideos() {
      let videos = document.querySelectorAll('._video-yt')
      for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i])
      }
    }
    findVideos()
    function setupVideo(video) {
      let link = video.querySelector('._video-yt-link')
      let button = video.querySelector('._video-yt-btn')
      let id = parseIdFromUrl(link.href)
      video.addEventListener('click', () => {
        let iframe = createIframe(id)
        link.style.display = 'none'
        button.style.display = 'none'
        video.appendChild(iframe)
      })
      link.removeAttribute('href')
      video.classList.add('video--enabled')
    }
    function parseIdFromUrl(url) {
      const regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)\?*/i
      const match = url.match(regexp)
      return match ? match[1] : ''
    }
    function createIframe(id) {
      let iframe = document.createElement('iframe')
      iframe.setAttribute('allowfullscreen', '')
      iframe.setAttribute('allow', 'autoplay')
      iframe.setAttribute('id', 'youtube-slide')
      iframe.setAttribute('src', generateURL(id))
      iframe.classList.add('popup-video__media')
      return iframe
    }
    function generateURL(id) {
      let query = '?enablejsapi=1&rel=0&showinfo=0&autoplay=1'
      return 'https://www.youtube.com/embed/' + id + query
    }
  }
})()
;(() => {
  'use strict'
  var __webpack_exports__ = {}
  function bildSliders() {
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper):not(.swiper)')
    if (sliders) {
      sliders.forEach((slider) => {
        if (slider.querySelector('.swiper-wrapper')) return
        slider.parentElement.classList.add('swiper')
        slider.classList.add('swiper-wrapper')
        for (const slide of slider.children) {
          slide.classList.add('swiper-slide')
        }
      })
    }
  }
  function initSliders() {
    bildSliders()
    if (document.querySelector('.submitted__slider-post')) {
      new Swiper('.submitted__slider-post:not(.swiper-initialized)', {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 800,
        pagination: {
          el: '.submitted__slider-pagging',
          clickable: true,
        },
        navigation: {
          nextEl: '.submitted__slider-navigation-main .submitted__slider-navigation-next',
          prevEl: '.submitted__slider-navigation-main .submitted__slider-navigation-prev',
        },
        breakpoints: {
          320: {
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            initialSlide: 1,
          },
          430: {
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            initialSlide: 1,
          },
          768: {
            spaceBetween: 20,
          },
          1024: {
            spaceBetween: 30,
          },
        },
        on: {},
      })
    }
  }
  window.addEventListener('load', function (e) {
    initSliders()
  })
})()
!(function (e) {
  'function' == typeof define && define.amd
    ? define(['jquery'], e)
    : 'object' == typeof exports
      ? e(require('jquery'))
      : e(jQuery)
})(function (R) {
  var a,
    e = navigator.userAgent,
    S = /iphone/i.test(e),
    i = /chrome/i.test(e),
    T = /android/i.test(e)
  ;(R.mask = {
    definitions: {
      9: '[0-9]',
      a: '[A-Za-z]',
      '*': '[A-Za-z0-9]',
    },
    autoclear: !0,
    dataName: 'rawMaskFn',
    placeholder: '_',
  }),
    R.fn.extend({
      caret: function (e, t) {
        var n
        if (0 !== this.length && !this.is(':hidden') && this.get(0) === document.activeElement)
          return 'number' == typeof e
            ? ((t = 'number' == typeof t ? t : e),
              this.each(function () {
                this.setSelectionRange
                  ? this.setSelectionRange(e, t)
                  : this.createTextRange &&
                    ((n = this.createTextRange()).collapse(!0),
                    n.moveEnd('character', t),
                    n.moveStart('character', e),
                    n.select())
              }))
            : (this[0].setSelectionRange
                ? ((e = this[0].selectionStart), (t = this[0].selectionEnd))
                : document.selection &&
                  document.selection.createRange &&
                  ((n = document.selection.createRange()),
                  (e = 0 - n.duplicate().moveStart('character', -1e5)),
                  (t = e + n.text.length)),
              {
                begin: e,
                end: t,
              })
      },
      unmask: function () {
        return this.trigger('unmask')
      },
      mask: function (t, v) {
        var n, b, k, y, x, j, A
        if (!t && 0 < this.length) {
          var e = R(this[0]).data(R.mask.dataName)
          return e ? e() : void 0
        }
        return (
          (v = R.extend(
            {
              autoclear: R.mask.autoclear,
              placeholder: R.mask.placeholder,
              completed: null,
            },
            v,
          )),
          (n = R.mask.definitions),
          (b = []),
          (k = j = t.length),
          (y = null),
          (t = String(t)),
          R.each(t.split(''), function (e, t) {
            '?' == t
              ? (j--, (k = e))
              : n[t]
                ? (b.push(new RegExp(n[t])),
                  null === y && (y = b.length - 1),
                  e < k && (x = b.length - 1))
                : b.push(null)
          }),
          this.trigger('unmask').each(function () {
            var o = R(this),
              c = R.map(t.split(''), function (e, t) {
                if ('?' != e) return n[e] ? f(t) : e
              }),
              l = c.join(''),
              r = o.val()
            function u() {
              if (v.completed) {
                for (var e = y; e <= x; e++) if (b[e] && c[e] === f(e)) return
                v.completed.call(o)
              }
            }
            function f(e) {
              return e < v.placeholder.length ? v.placeholder.charAt(e) : v.placeholder.charAt(0)
            }
            function s(e) {
              for (; ++e < j && !b[e]; );
              return e
            }
            function h(e, t) {
              var n, a
              if (!(e < 0)) {
                for (n = e, a = s(t); n < j; n++)
                  if (b[n]) {
                    if (!(a < j && b[n].test(c[a]))) break
                    ;(c[n] = c[a]), (c[a] = f(a)), (a = s(a))
                  }
                d(), o.caret(Math.max(y, e))
              }
            }
            function g(e) {
              p(), o.val() != r && o.change()
            }
            function m(e, t) {
              var n
              for (n = e; n < t && n < j; n++) b[n] && (c[n] = f(n))
            }
            function d() {
              o.val(c.join(''))
            }
            function p(e) {
              var t,
                n,
                a,
                i = o.val(),
                r = -1
              for (a = t = 0; t < j; t++)
                if (b[t]) {
                  for (c[t] = f(t); a++ < i.length; )
                    if (((n = i.charAt(a - 1)), b[t].test(n))) {
                      ;(c[t] = n), (r = t)
                      break
                    }
                  if (a > i.length) {
                    m(t + 1, j)
                    break
                  }
                } else c[t] === i.charAt(a) && a++, t < k && (r = t)
              return (
                e
                  ? d()
                  : r + 1 < k
                    ? v.autoclear || c.join('') === l
                      ? (o.val() && o.val(''), m(0, j))
                      : d()
                    : (d(), o.val(o.val().substring(0, r + 1))),
                k ? t : y
              )
            }
            o.data(R.mask.dataName, function () {
              return R.map(c, function (e, t) {
                return b[t] && e != f(t) ? e : null
              }).join('')
            }),
              o
                .one('unmask', function () {
                  o.off('.mask').removeData(R.mask.dataName)
                })
                .on('focus.mask', function () {
                  var e
                  o.prop('readonly') ||
                    (clearTimeout(a),
                    (r = o.val()),
                    (e = p()),
                    (a = setTimeout(function () {
                      o.get(0) === document.activeElement &&
                        (d(), e == t.replace('?', '').length ? o.caret(0, e) : o.caret(e))
                    }, 10)))
                })
                .on('blur.mask', g)
                .on('keydown.mask', function (e) {
                  if (!o.prop('readonly')) {
                    var t,
                      n,
                      a,
                      i = e.which || e.keyCode
                    ;(A = o.val()),
                      8 === i || 46 === i || (S && 127 === i)
                        ? ((n = (t = o.caret()).begin),
                          (a = t.end) - n == 0 &&
                            ((n =
                              46 !== i
                                ? (function (e) {
                                    for (; 0 <= --e && !b[e]; );
                                    return e
                                  })(n)
                                : (a = s(n - 1))),
                            (a = 46 === i ? s(a) : a)),
                          m(n, a),
                          h(n, a - 1),
                          e.preventDefault())
                        : 13 === i
                          ? g.call(this, e)
                          : 27 === i && (o.val(r), o.caret(0, p()), e.preventDefault())
                  }
                })
                .on('keypress.mask', function (e) {
                  if (!o.prop('readonly')) {
                    var t,
                      n,
                      a,
                      i = e.which || e.keyCode,
                      r = o.caret()
                    e.ctrlKey ||
                      e.altKey ||
                      e.metaKey ||
                      i < 32 ||
                      !i ||
                      13 === i ||
                      (r.end - r.begin != 0 && (m(r.begin, r.end), h(r.begin, r.end - 1)),
                      (t = s(r.begin - 1)) < j &&
                        ((n = String.fromCharCode(i)), b[t].test(n)) &&
                        ((function (e) {
                          var t, n, a, i
                          for (n = f((t = e)); t < j; t++)
                            if (b[t]) {
                              if (((a = s(t)), (i = c[t]), (c[t] = n), !(a < j && b[a].test(i))))
                                break
                              n = i
                            }
                        })(t),
                        (c[t] = n),
                        d(),
                        (a = s(t)),
                        T
                          ? setTimeout(function () {
                              R.proxy(R.fn.caret, o, a)()
                            }, 0)
                          : o.caret(a),
                        r.begin <= x && u()),
                      e.preventDefault())
                  }
                })
                .on('input.mask paste.mask', function () {
                  o.prop('readonly') ||
                    setTimeout(function () {
                      var e = p(!0)
                      o.caret(e), u()
                    }, 0)
                }),
              i &&
                T &&
                o.off('input.mask').on('input.mask', function (e) {
                  var t = o.val(),
                    n = o.caret()
                  if (A && A.length && A.length > t.length) {
                    for (p(!0); 0 < n.begin && !b[n.begin - 1]; ) n.begin--
                    if (0 === n.begin) for (; n.begin < y && !b[n.begin]; ) n.begin++
                    o.caret(n.begin, n.begin)
                  } else {
                    p(!0)
                    var a = t.charAt(n.begin)
                    n.begin < j && (b[n.begin] || n.begin++, b[n.begin].test(a) && n.begin++),
                      o.caret(n.begin, n.begin)
                  }
                  u()
                }),
              p()
          })
        )
      },
    })
})
;(() => {
  'use strict'
  var __webpack_exports__ = {}
  let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = `${target.offsetHeight}px`
      target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = showmore ? `${showmore}px` : `0px`
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      window.setTimeout(() => {
        target.hidden = !showmore ? true : false
        !showmore ? target.style.removeProperty('height') : null
        target.style.removeProperty('padding-top')
        target.style.removeProperty('padding-bottom')
        target.style.removeProperty('margin-top')
        target.style.removeProperty('margin-bottom')
        !showmore ? target.style.removeProperty('overflow') : null
        target.style.removeProperty('transition-duration')
        target.style.removeProperty('transition-property')
        target.classList.remove('_slide')
      }, duration)
    }
  }
  let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.hidden = target.hidden ? false : null
      showmore ? target.style.removeProperty('height') : null
      let height = target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = showmore ? `${showmore}px` : `0px`
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      target.offsetHeight
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = height + 'px'
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      window.setTimeout(() => {
        target.style.removeProperty('height')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-duration')
        target.style.removeProperty('transition-property')
        target.classList.remove('_slide')
      }, duration)
    }
  }
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration)
    } else {
      return _slideUp(target, duration)
    }
  }
  function tabs() {
    const tabs = document.querySelectorAll('[data-tabs]')
    let tabsActiveHash = ['']
    if (tabs.length > 0) {
      const hash = '#tab-0-1'
      if (hash.startsWith('tab-')) {
        tabsActiveHash = '#tab-0-1'
      }
      setTimeout(() => {
        tabs.forEach((tabsBlock, index) => {
          tabsBlock.classList.add('_tab-init')
          tabsBlock.setAttribute('data-tabs-index', index)
          tabsBlock.addEventListener('click', setTabsAction)
          initTabs(tabsBlock)
        })
      }, 30)
    }
    function initTabs(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*')
      const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*')
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex
      if (tabsActiveHashBlock) {
        const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active')
        tabsActiveTitle.classList.remove('_tab-active')
      }
      if (tabsContent.length > 0) {
        tabsContent.forEach((tabsContentItem, index) => {
          tabsTitles[index].setAttribute('data-tabs-title', '')
          tabsContentItem.setAttribute('data-tabs-item', '')
          if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
            tabsTitles[index].classList.add('_tab-active')
          }
          tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active')
        })
      }
    }
    function setTabsStatus(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]')
      const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]')
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex
      function isTabsAnamate(tabsBlock) {
        if (tabsBlock.hasAttribute('data-tabs-animate')) {
          return tabsBlock.dataset.tabsAnimate > 0 ? tabsBlock.dataset.tabsAnimate : 500
        }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock)
      if (tabsContent.length > 0) {
        tabsContent.forEach((tabsContentItem, index) => {
          if (tabsTitles[index].classList.contains('_tab-active')) {
            if (tabsBlockAnimate) {
              _slideDown(tabsContentItem, tabsBlockAnimate)
            } else {
              tabsContentItem.hidden = false
            }
            if (!tabsContentItem.closest('.popup')) {
              location.hash = `tab-${tabsBlockIndex}-${index}`
            }
          } else {
            if (tabsBlockAnimate) {
              _slideUp(tabsContentItem, tabsBlockAnimate)
            } else {
              tabsContentItem.hidden = true
            }
          }
        })
      }
    }
    function setTabsAction(e) {
      const el = e.target
      if (el.closest('.block__more')) {
        return
      }
      if (el.closest('[data-tabs-title]')) {
        setTimeout(() => {
          showMore()
        }, 10)
        const tabTitle = el.closest('[data-tabs-title]')
        const tabsBlock = tabTitle.closest('[data-tabs]')
        if (
          !tabTitle.classList.contains('_tab-active') &&
          !tabsBlock.querySelectorAll('._slide').length
        ) {
          const tabActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active')
          if (tabActiveTitle) {
            tabActiveTitle.classList.remove('_tab-active')
          }
          tabTitle.classList.add('_tab-active')
          setTabsStatus(tabsBlock)
        }
        e.preventDefault()
      }
    }
  }
  function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
        return item.dataset[dataSetValue].split(',')[0]
      }
    })
    if (media.length) {
      const breakpointsArray = []
      media.forEach((item) => {
        const params = item.dataset[dataSetValue]
        const breakpoint = {}
        const paramsArray = params.split(',')
        breakpoint.value = paramsArray[0]
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
        breakpoint.item = item
        breakpointsArray.push(breakpoint)
      })
      let mdQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
      })
      mdQueries = uniqArray(mdQueries)
      const mdQueriesArray = []
      if (mdQueries.length) {
        mdQueries.forEach((breakpoint) => {
          const paramsArray = breakpoint.split(',')
          const mediaBreakpoint = paramsArray[1]
          const mediaType = paramsArray[2]
          const matchMedia = window.matchMedia(paramsArray[0])
          const itemsArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
              return true
            }
          })
          mdQueriesArray.push({
            itemsArray,
            matchMedia,
          })
        })
        return mdQueriesArray
      }
    }
  }
  function uniqArray(array) {
    return array.filter(function (item, index, self) {
      return self.indexOf(item) === index
    })
  }
  const isShowOneCard = (hiddenHeight, selector) => {
    const blocksSM = document.querySelectorAll(selector)
    if (blocksSM.length !== 0) {
      blocksSM.forEach((block) => {
        if (block.parentElement.classList.contains('_showmore-active')) {
          _slideUp(block, 0, hiddenHeight)
          block.parentElement.classList.remove('_showmore-active')
        }
      })
    }
  }
  function showMore() {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]')
    let showMoreBlocksRegular
    let mdQueriesArray
    if (showMoreBlocks.length) {
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
        return !item.dataset.showmoreMedia
      })
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null
      document.querySelectorAll('[data-showmore-button]').forEach((element) => {
        element.addEventListener('click', showMoreActions, true)
      })
      mdQueriesArray = dataMediaQueries(showMoreBlocks, 'showmoreMedia')
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          mdQueriesItem.matchMedia.addEventListener('change', function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
          })
        })
        initItemsMedia(mdQueriesArray)
      }
    }
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
      })
    }
    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach((showMoreBlock) => {
        initItem(showMoreBlock, matchMedia)
      })
    }
    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock
      const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]')
      const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]')
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent)
      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, hiddenHeight)
          showMoreButton.hidden = false
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight)
          showMoreButton.hidden = true
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight)
        showMoreButton.hidden = true
      }
    }
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0
      const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size'
      if (showMoreType === 'items') {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 3
        const showMoreItems = showMoreContent.children
        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1]
          hiddenHeight += showMoreItem.offsetHeight
          if (index === showMoreTypeValue) break
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 150
        hiddenHeight = showMoreTypeValue
      }
      return hiddenHeight
    }
    function getOriginalHeight(showMoreContent) {
      let hiddenHeight = showMoreContent.offsetHeight
      showMoreContent.style.removeProperty('height')
      let originalHeight = showMoreContent.offsetHeight
      showMoreContent.style.height = `${hiddenHeight}px`
      return originalHeight
    }
    function showMoreActions(e) {
      const targetEvent = e.target
      const targetType = e.type
      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]')
          const showMoreBlock = showMoreButton.closest('[data-showmore]')
          const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]')
          getOriginalHeight(showMoreContent)
          const showMoreSpeed =
            showMoreBlock.dataset.showmoreButton || showMoreButton.dataset.showmoreButton
              ? showMoreBlock.dataset.showmoreButton || showMoreButton.dataset.showmoreButton
              : '500'
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent)
          if (!showMoreContent.classList.contains('_slide')) {
            if (!e.target.closest('._showmore-active')) {
              isShowOneCard(hiddenHeight, '.brand-carusel__content')
            }
            showMoreBlock.classList.contains('_showmore-active')
              ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
              : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight)
            showMoreBlock.classList.toggle('_showmore-active')
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null
        mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null
      }
      if (document.querySelector('.ya-map__tab') && targetType === 'click') {
        if (!e.target.matches('.ya-map__tab')) {
          e.stopImmediatePropagation()
        }
      }
    }
  }
  var PipsMode
  ;(function (PipsMode) {
    PipsMode['Range'] = 'range'
    PipsMode['Steps'] = 'steps'
    PipsMode['Positions'] = 'positions'
    PipsMode['Count'] = 'count'
    PipsMode['Values'] = 'values'
  })(PipsMode || (PipsMode = {}))
  var PipsType
  ;(function (PipsType) {
    PipsType[(PipsType['None'] = -1)] = 'None'
    PipsType[(PipsType['NoValue'] = 0)] = 'NoValue'
    PipsType[(PipsType['LargeValue'] = 1)] = 'LargeValue'
    PipsType[(PipsType['SmallValue'] = 2)] = 'SmallValue'
  })(PipsType || (PipsType = {}))
  function isValidFormatter(entry) {
    return isValidPartialFormatter(entry) && typeof entry.from === 'function'
  }
  function isValidPartialFormatter(entry) {
    return typeof entry === 'object' && typeof entry.to === 'function'
  }
  function removeElement(el) {
    el.parentElement.removeChild(el)
  }
  function isSet(value) {
    return value !== null && value !== undefined
  }
  function preventDefault(e) {
    e.preventDefault()
  }
  function unique(array) {
    return array.filter(function (a) {
      return !this[a] ? (this[a] = true) : false
    }, {})
  }
  function closest(value, to) {
    return Math.round(value / to) * to
  }
  function offset(elem, orientation) {
    var rect = elem.getBoundingClientRect()
    var doc = elem.ownerDocument
    var docElem = doc.documentElement
    var pageOffset = getPageOffset(doc)
    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
      pageOffset.x = 0
    }
    return orientation
      ? rect.top + pageOffset.y - docElem.clientTop
      : rect.left + pageOffset.x - docElem.clientLeft
  }
  function isNumeric(a) {
    return typeof a === 'number' && !isNaN(a) && isFinite(a)
  }
  function addClassFor(element, className, duration) {
    if (duration > 0) {
      addClass(element, className)
      setTimeout(function () {
        removeClass(element, className)
      }, duration)
    }
  }
  function limit(a) {
    return Math.max(Math.min(a, 100), 0)
  }
  function asArray(a) {
    return Array.isArray(a) ? a : [a]
  }
  function countDecimals(numStr) {
    numStr = String(numStr)
    var pieces = numStr.split('.')
    return pieces.length > 1 ? pieces[1].length : 0
  }
  function addClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
      el.classList.add(className)
    } else {
      el.className += ' ' + className
    }
  }
  function removeClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' ',
      )
    }
  }
  function hasClass(el, className) {
    return el.classList
      ? el.classList.contains(className)
      : new RegExp('\\b' + className + '\\b').test(el.className)
  }
  function getPageOffset(doc) {
    var supportPageOffset = window.pageXOffset !== undefined
    var isCSS1Compat = (doc.compatMode || '') === 'CSS1Compat'
    var x = supportPageOffset
      ? window.pageXOffset
      : isCSS1Compat
        ? doc.documentElement.scrollLeft
        : doc.body.scrollLeft
    var y = supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
        ? doc.documentElement.scrollTop
        : doc.body.scrollTop
    return {
      x: x,
      y: y,
    }
  }
  function getActions() {
    return window.navigator.pointerEnabled
      ? {
          start: 'pointerdown',
          move: 'pointermove',
          end: 'pointerup',
        }
      : window.navigator.msPointerEnabled
        ? {
            start: 'MSPointerDown',
            move: 'MSPointerMove',
            end: 'MSPointerUp',
          }
        : {
            start: 'mousedown touchstart',
            move: 'mousemove touchmove',
            end: 'mouseup touchend',
          }
  }
  function getSupportsPassive() {
    var supportsPassive = false
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true
        },
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
    return supportsPassive
  }
  function getSupportsTouchActionNone() {
    return window.CSS && CSS.supports && CSS.supports('touch-action', 'none')
  }
  function subRangeRatio(pa, pb) {
    return 100 / (pb - pa)
  }
  function fromPercentage(range, value, startRange) {
    return (value * 100) / (range[startRange + 1] - range[startRange])
  }
  function toPercentage(range, value) {
    return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0)
  }
  function isPercentage(range, value) {
    return (value * (range[1] - range[0])) / 100 + range[0]
  }
  function getJ(value, arr) {
    var j = 1
    while (value >= arr[j]) {
      j += 1
    }
    return j
  }
  function toStepping(xVal, xPct, value) {
    if (value >= xVal.slice(-1)[0]) {
      return 100
    }
    var j = getJ(value, xVal)
    var va = xVal[j - 1]
    var vb = xVal[j]
    var pa = xPct[j - 1]
    var pb = xPct[j]
    return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb)
  }
  function fromStepping(xVal, xPct, value) {
    if (value >= 100) {
      return xVal.slice(-1)[0]
    }
    var j = getJ(value, xPct)
    var va = xVal[j - 1]
    var vb = xVal[j]
    var pa = xPct[j - 1]
    var pb = xPct[j]
    return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb))
  }
  function getStep(xPct, xSteps, snap, value) {
    if (value === 100) {
      return value
    }
    var j = getJ(value, xPct)
    var a = xPct[j - 1]
    var b = xPct[j]
    if (snap) {
      if (value - a > (b - a) / 2) {
        return b
      }
      return a
    }
    if (!xSteps[j - 1]) {
      return value
    }
    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1])
  }
  var Spectrum = (function () {
    function Spectrum(entry, snap, singleStep) {
      this.xPct = []
      this.xVal = []
      this.xSteps = []
      this.xNumSteps = []
      this.xHighestCompleteStep = []
      this.xSteps = [singleStep || false]
      this.xNumSteps = [false]
      this.snap = snap
      var index
      var ordered = []
      Object.keys(entry).forEach(function (index) {
        ordered.push([asArray(entry[index]), index])
      })
      ordered.sort(function (a, b) {
        return a[0][0] - b[0][0]
      })
      for (index = 0; index < ordered.length; index++) {
        this.handleEntryPoint(ordered[index][1], ordered[index][0])
      }
      this.xNumSteps = this.xSteps.slice(0)
      for (index = 0; index < this.xNumSteps.length; index++) {
        this.handleStepPoint(index, this.xNumSteps[index])
      }
    }
    Spectrum.prototype.getDistance = function (value) {
      var distances = []
      for (var index = 0; index < this.xNumSteps.length - 1; index++) {
        distances[index] = fromPercentage(this.xVal, value, index)
      }
      return distances
    }
    Spectrum.prototype.getAbsoluteDistance = function (value, distances, direction) {
      var xPct_index = 0
      if (value < this.xPct[this.xPct.length - 1]) {
        while (value > this.xPct[xPct_index + 1]) {
          xPct_index++
        }
      } else if (value === this.xPct[this.xPct.length - 1]) {
        xPct_index = this.xPct.length - 2
      }
      if (!direction && value === this.xPct[xPct_index + 1]) {
        xPct_index++
      }
      if (distances === null) {
        distances = []
      }
      var start_factor
      var rest_factor = 1
      var rest_rel_distance = distances[xPct_index]
      var range_pct = 0
      var rel_range_distance = 0
      var abs_distance_counter = 0
      var range_counter = 0
      if (direction) {
        start_factor =
          (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index])
      } else {
        start_factor =
          (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index])
      }
      while (rest_rel_distance > 0) {
        range_pct =
          this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter]
        if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
          rel_range_distance = range_pct * start_factor
          rest_factor =
            (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter]
          start_factor = 1
        } else {
          rel_range_distance =
            ((distances[xPct_index + range_counter] * range_pct) / 100) * rest_factor
          rest_factor = 0
        }
        if (direction) {
          abs_distance_counter = abs_distance_counter - rel_range_distance
          if (this.xPct.length + range_counter >= 1) {
            range_counter--
          }
        } else {
          abs_distance_counter = abs_distance_counter + rel_range_distance
          if (this.xPct.length - range_counter >= 1) {
            range_counter++
          }
        }
        rest_rel_distance = distances[xPct_index + range_counter] * rest_factor
      }
      return value + abs_distance_counter
    }
    Spectrum.prototype.toStepping = function (value) {
      value = toStepping(this.xVal, this.xPct, value)
      return value
    }
    Spectrum.prototype.fromStepping = function (value) {
      return fromStepping(this.xVal, this.xPct, value)
    }
    Spectrum.prototype.getStep = function (value) {
      value = getStep(this.xPct, this.xSteps, this.snap, value)
      return value
    }
    Spectrum.prototype.getDefaultStep = function (value, isDown, size) {
      var j = getJ(value, this.xPct)
      if (value === 100 || (isDown && value === this.xPct[j - 1])) {
        j = Math.max(j - 1, 1)
      }
      return (this.xVal[j] - this.xVal[j - 1]) / size
    }
    Spectrum.prototype.getNearbySteps = function (value) {
      var j = getJ(value, this.xPct)
      return {
        stepBefore: {
          startValue: this.xVal[j - 2],
          step: this.xNumSteps[j - 2],
          highestStep: this.xHighestCompleteStep[j - 2],
        },
        thisStep: {
          startValue: this.xVal[j - 1],
          step: this.xNumSteps[j - 1],
          highestStep: this.xHighestCompleteStep[j - 1],
        },
        stepAfter: {
          startValue: this.xVal[j],
          step: this.xNumSteps[j],
          highestStep: this.xHighestCompleteStep[j],
        },
      }
    }
    Spectrum.prototype.countStepDecimals = function () {
      var stepDecimals = this.xNumSteps.map(countDecimals)
      return Math.max.apply(null, stepDecimals)
    }
    Spectrum.prototype.hasNoSize = function () {
      return this.xVal[0] === this.xVal[this.xVal.length - 1]
    }
    Spectrum.prototype.convert = function (value) {
      return this.getStep(this.toStepping(value))
    }
    Spectrum.prototype.handleEntryPoint = function (index, value) {
      var percentage
      if (index === 'min') {
        percentage = 0
      } else if (index === 'max') {
        percentage = 100
      } else {
        percentage = parseFloat(index)
      }
      if (!isNumeric(percentage) || !isNumeric(value[0])) {
        throw new Error("noUiSlider: 'range' value isn't numeric.")
      }
      this.xPct.push(percentage)
      this.xVal.push(value[0])
      var value1 = Number(value[1])
      if (!percentage) {
        if (!isNaN(value1)) {
          this.xSteps[0] = value1
        }
      } else {
        this.xSteps.push(isNaN(value1) ? false : value1)
      }
      this.xHighestCompleteStep.push(0)
    }
    Spectrum.prototype.handleStepPoint = function (i, n) {
      if (!n) {
        return
      }
      if (this.xVal[i] === this.xVal[i + 1]) {
        this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i]
        return
      }
      this.xSteps[i] =
        fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) /
        subRangeRatio(this.xPct[i], this.xPct[i + 1])
      var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i]
      var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1)
      var step = this.xVal[i] + this.xNumSteps[i] * highestStep
      this.xHighestCompleteStep[i] = step
    }
    return Spectrum
  })()
  var defaultFormatter = {
    to: function (value) {
      return value === undefined ? '' : value.toFixed(2)
    },
    from: Number,
  }
  var cssClasses = {
    target: 'target',
    base: 'base',
    origin: 'origin',
    handle: 'handle',
    handleLower: 'handle-lower',
    handleUpper: 'handle-upper',
    touchArea: 'touch-area',
    horizontal: 'horizontal',
    vertical: 'vertical',
    background: 'background',
    connect: 'connect',
    connects: 'connects',
    ltr: 'ltr',
    rtl: 'rtl',
    textDirectionLtr: 'txt-dir-ltr',
    textDirectionRtl: 'txt-dir-rtl',
    draggable: 'draggable',
    drag: 'state-drag',
    tap: 'state-tap',
    active: 'active',
    tooltip: 'tooltip',
    pips: 'pips',
    pipsHorizontal: 'pips-horizontal',
    pipsVertical: 'pips-vertical',
    marker: 'marker',
    markerHorizontal: 'marker-horizontal',
    markerVertical: 'marker-vertical',
    markerNormal: 'marker-normal',
    markerLarge: 'marker-large',
    markerSub: 'marker-sub',
    value: 'value',
    valueHorizontal: 'value-horizontal',
    valueVertical: 'value-vertical',
    valueNormal: 'value-normal',
    valueLarge: 'value-large',
    valueSub: 'value-sub',
  }
  var INTERNAL_EVENT_NS = {
    tooltips: '.__tooltips',
    aria: '.__aria',
  }
  function testStep(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'step' is not numeric.")
    }
    parsed.singleStep = entry
  }
  function testKeyboardPageMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.")
    }
    parsed.keyboardPageMultiplier = entry
  }
  function testKeyboardMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.")
    }
    parsed.keyboardMultiplier = entry
  }
  function testKeyboardDefaultStep(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.")
    }
    parsed.keyboardDefaultStep = entry
  }
  function testRange(parsed, entry) {
    if (typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error("noUiSlider: 'range' is not an object.")
    }
    if (entry.min === undefined || entry.max === undefined) {
      throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.")
    }
    parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep)
  }
  function testStart(parsed, entry) {
    entry = asArray(entry)
    if (!Array.isArray(entry) || !entry.length) {
      throw new Error("noUiSlider: 'start' option is incorrect.")
    }
    parsed.handles = entry.length
    parsed.start = entry
  }
  function testSnap(parsed, entry) {
    if (typeof entry !== 'boolean') {
      throw new Error("noUiSlider: 'snap' option must be a boolean.")
    }
    parsed.snap = entry
  }
  function testAnimate(parsed, entry) {
    if (typeof entry !== 'boolean') {
      throw new Error("noUiSlider: 'animate' option must be a boolean.")
    }
    parsed.animate = entry
  }
  function testAnimationDuration(parsed, entry) {
    if (typeof entry !== 'number') {
      throw new Error("noUiSlider: 'animationDuration' option must be a number.")
    }
    parsed.animationDuration = entry
  }
  function testConnect(parsed, entry) {
    var connect = [false]
    var i
    if (entry === 'lower') {
      entry = [true, false]
    } else if (entry === 'upper') {
      entry = [false, true]
    }
    if (entry === true || entry === false) {
      for (i = 1; i < parsed.handles; i++) {
        connect.push(entry)
      }
      connect.push(false)
    } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
      throw new Error("noUiSlider: 'connect' option doesn't match handle count.")
    } else {
      connect = entry
    }
    parsed.connect = connect
  }
  function testOrientation(parsed, entry) {
    switch (entry) {
      case 'horizontal':
        parsed.ort = 0
        break
      case 'vertical':
        parsed.ort = 1
        break
      default:
        throw new Error("noUiSlider: 'orientation' option is invalid.")
    }
  }
  function testMargin(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'margin' option must be numeric.")
    }
    if (entry === 0) {
      return
    }
    parsed.margin = parsed.spectrum.getDistance(entry)
  }
  function testLimit(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'limit' option must be numeric.")
    }
    parsed.limit = parsed.spectrum.getDistance(entry)
    if (!parsed.limit || parsed.handles < 2) {
      throw new Error(
        "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.",
      )
    }
  }
  function testPadding(parsed, entry) {
    var index
    if (!isNumeric(entry) && !Array.isArray(entry)) {
      throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.")
    }
    if (
      Array.isArray(entry) &&
      !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))
    ) {
      throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.")
    }
    if (entry === 0) {
      return
    }
    if (!Array.isArray(entry)) {
      entry = [entry, entry]
    }
    parsed.padding = [parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1])]
    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
      if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
        throw new Error("noUiSlider: 'padding' option must be a positive number(s).")
      }
    }
    var totalPadding = entry[0] + entry[1]
    var firstValue = parsed.spectrum.xVal[0]
    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1]
    if (totalPadding / (lastValue - firstValue) > 1) {
      throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.")
    }
  }
  function testDirection(parsed, entry) {
    switch (entry) {
      case 'ltr':
        parsed.dir = 0
        break
      case 'rtl':
        parsed.dir = 1
        break
      default:
        throw new Error("noUiSlider: 'direction' option was not recognized.")
    }
  }
  function testBehaviour(parsed, entry) {
    if (typeof entry !== 'string') {
      throw new Error("noUiSlider: 'behaviour' must be a string containing options.")
    }
    var tap = entry.indexOf('tap') >= 0
    var drag = entry.indexOf('drag') >= 0
    var fixed = entry.indexOf('fixed') >= 0
    var snap = entry.indexOf('snap') >= 0
    var hover = entry.indexOf('hover') >= 0
    var unconstrained = entry.indexOf('unconstrained') >= 0
    var dragAll = entry.indexOf('drag-all') >= 0
    var smoothSteps = entry.indexOf('smooth-steps') >= 0
    if (fixed) {
      if (parsed.handles !== 2) {
        throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles")
      }
      testMargin(parsed, parsed.start[1] - parsed.start[0])
    }
    if (unconstrained && (parsed.margin || parsed.limit)) {
      throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit")
    }
    parsed.events = {
      tap: tap || snap,
      drag: drag,
      dragAll: dragAll,
      smoothSteps: smoothSteps,
      fixed: fixed,
      snap: snap,
      hover: hover,
      unconstrained: unconstrained,
    }
  }
  function testTooltips(parsed, entry) {
    if (entry === false) {
      return
    }
    if (entry === true || isValidPartialFormatter(entry)) {
      parsed.tooltips = []
      for (var i = 0; i < parsed.handles; i++) {
        parsed.tooltips.push(entry)
      }
    } else {
      entry = asArray(entry)
      if (entry.length !== parsed.handles) {
        throw new Error('noUiSlider: must pass a formatter for all handles.')
      }
      entry.forEach(function (formatter) {
        if (typeof formatter !== 'boolean' && !isValidPartialFormatter(formatter)) {
          throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")
        }
      })
      parsed.tooltips = entry
    }
  }
  function testHandleAttributes(parsed, entry) {
    if (entry.length !== parsed.handles) {
      throw new Error('noUiSlider: must pass a attributes for all handles.')
    }
    parsed.handleAttributes = entry
  }
  function testAriaFormat(parsed, entry) {
    if (!isValidPartialFormatter(entry)) {
      throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.")
    }
    parsed.ariaFormat = entry
  }
  function testFormat(parsed, entry) {
    if (!isValidFormatter(entry)) {
      throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")
    }
    parsed.format = entry
  }
  function testKeyboardSupport(parsed, entry) {
    if (typeof entry !== 'boolean') {
      throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.")
    }
    parsed.keyboardSupport = entry
  }
  function testDocumentElement(parsed, entry) {
    parsed.documentElement = entry
  }
  function testCssPrefix(parsed, entry) {
    if (typeof entry !== 'string' && entry !== false) {
      throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.")
    }
    parsed.cssPrefix = entry
  }
  function testCssClasses(parsed, entry) {
    if (typeof entry !== 'object') {
      throw new Error("noUiSlider: 'cssClasses' must be an object.")
    }
    if (typeof parsed.cssPrefix === 'string') {
      parsed.cssClasses = {}
      Object.keys(entry).forEach(function (key) {
        parsed.cssClasses[key] = parsed.cssPrefix + entry[key]
      })
    } else {
      parsed.cssClasses = entry
    }
  }
  function testOptions(options) {
    var parsed = {
      margin: null,
      limit: null,
      padding: null,
      animate: true,
      animationDuration: 300,
      ariaFormat: defaultFormatter,
      format: defaultFormatter,
    }
    var tests = {
      step: {
        r: false,
        t: testStep,
      },
      keyboardPageMultiplier: {
        r: false,
        t: testKeyboardPageMultiplier,
      },
      keyboardMultiplier: {
        r: false,
        t: testKeyboardMultiplier,
      },
      keyboardDefaultStep: {
        r: false,
        t: testKeyboardDefaultStep,
      },
      start: {
        r: true,
        t: testStart,
      },
      connect: {
        r: true,
        t: testConnect,
      },
      direction: {
        r: true,
        t: testDirection,
      },
      snap: {
        r: false,
        t: testSnap,
      },
      animate: {
        r: false,
        t: testAnimate,
      },
      animationDuration: {
        r: false,
        t: testAnimationDuration,
      },
      range: {
        r: true,
        t: testRange,
      },
      orientation: {
        r: false,
        t: testOrientation,
      },
      margin: {
        r: false,
        t: testMargin,
      },
      limit: {
        r: false,
        t: testLimit,
      },
      padding: {
        r: false,
        t: testPadding,
      },
      behaviour: {
        r: true,
        t: testBehaviour,
      },
      ariaFormat: {
        r: false,
        t: testAriaFormat,
      },
      format: {
        r: false,
        t: testFormat,
      },
      tooltips: {
        r: false,
        t: testTooltips,
      },
      keyboardSupport: {
        r: true,
        t: testKeyboardSupport,
      },
      documentElement: {
        r: false,
        t: testDocumentElement,
      },
      cssPrefix: {
        r: true,
        t: testCssPrefix,
      },
      cssClasses: {
        r: true,
        t: testCssClasses,
      },
      handleAttributes: {
        r: false,
        t: testHandleAttributes,
      },
    }
    var defaults = {
      connect: false,
      direction: 'ltr',
      behaviour: 'tap',
      orientation: 'horizontal',
      keyboardSupport: true,
      cssPrefix: 'noUi-',
      cssClasses: cssClasses,
      keyboardPageMultiplier: 5,
      keyboardMultiplier: 1,
      keyboardDefaultStep: 10,
    }
    if (options.format && !options.ariaFormat) {
      options.ariaFormat = options.format
    }
    Object.keys(tests).forEach(function (name) {
      if (!isSet(options[name]) && defaults[name] === undefined) {
        if (tests[name].r) {
          throw new Error("noUiSlider: '" + name + "' is required.")
        }
        return
      }
      tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name])
    })
    parsed.pips = options.pips
    var d = document.createElement('div')
    var msPrefix = d.style.msTransform !== undefined
    var noPrefix = d.style.transform !== undefined
    parsed.transformRule = noPrefix ? 'transform' : msPrefix ? 'msTransform' : 'webkitTransform'
    var styles = [
      ['left', 'top'],
      ['right', 'bottom'],
    ]
    parsed.style = styles[parsed.dir][parsed.ort]
    return parsed
  }
  function scope(target, options, originalOptions) {
    var actions = getActions()
    var supportsTouchActionNone = getSupportsTouchActionNone()
    var supportsPassive = supportsTouchActionNone && getSupportsPassive()
    var scope_Target = target
    var scope_Base
    var scope_Handles
    var scope_Connects
    var scope_Pips
    var scope_Tooltips
    var scope_Spectrum = options.spectrum
    var scope_Values = []
    var scope_Locations = []
    var scope_HandleNumbers = []
    var scope_ActiveHandlesCount = 0
    var scope_Events = {}
    var scope_Document = target.ownerDocument
    var scope_DocumentElement = options.documentElement || scope_Document.documentElement
    var scope_Body = scope_Document.body
    var scope_DirOffset = scope_Document.dir === 'rtl' || options.ort === 1 ? 0 : 100
    function addNodeTo(addTarget, className) {
      var div = scope_Document.createElement('div')
      if (className) {
        addClass(div, className)
      }
      addTarget.appendChild(div)
      return div
    }
    function addOrigin(base, handleNumber) {
      var origin = addNodeTo(base, options.cssClasses.origin)
      var handle = addNodeTo(origin, options.cssClasses.handle)
      addNodeTo(handle, options.cssClasses.touchArea)
      handle.setAttribute('data-handle', String(handleNumber))
      if (options.keyboardSupport) {
        handle.setAttribute('tabindex', '0')
        handle.addEventListener('keydown', function (event) {
          return eventKeydown(event, handleNumber)
        })
      }
      if (options.handleAttributes !== undefined) {
        var attributes_1 = options.handleAttributes[handleNumber]
        Object.keys(attributes_1).forEach(function (attribute) {
          handle.setAttribute(attribute, attributes_1[attribute])
        })
      }
      handle.setAttribute('role', 'slider')
      handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal')
      if (handleNumber === 0) {
        addClass(handle, options.cssClasses.handleLower)
      } else if (handleNumber === options.handles - 1) {
        addClass(handle, options.cssClasses.handleUpper)
      }
      origin.handle = handle
      return origin
    }
    function addConnect(base, add) {
      if (!add) {
        return false
      }
      return addNodeTo(base, options.cssClasses.connect)
    }
    function addElements(connectOptions, base) {
      var connectBase = addNodeTo(base, options.cssClasses.connects)
      scope_Handles = []
      scope_Connects = []
      scope_Connects.push(addConnect(connectBase, connectOptions[0]))
      for (var i = 0; i < options.handles; i++) {
        scope_Handles.push(addOrigin(base, i))
        scope_HandleNumbers[i] = i
        scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]))
      }
    }
    function addSlider(addTarget) {
      addClass(addTarget, options.cssClasses.target)
      if (options.dir === 0) {
        addClass(addTarget, options.cssClasses.ltr)
      } else {
        addClass(addTarget, options.cssClasses.rtl)
      }
      if (options.ort === 0) {
        addClass(addTarget, options.cssClasses.horizontal)
      } else {
        addClass(addTarget, options.cssClasses.vertical)
      }
      var textDirection = getComputedStyle(addTarget).direction
      if (textDirection === 'rtl') {
        addClass(addTarget, options.cssClasses.textDirectionRtl)
      } else {
        addClass(addTarget, options.cssClasses.textDirectionLtr)
      }
      return addNodeTo(addTarget, options.cssClasses.base)
    }
    function addTooltip(handle, handleNumber) {
      if (!options.tooltips || !options.tooltips[handleNumber]) {
        return false
      }
      return addNodeTo(handle.firstChild, options.cssClasses.tooltip)
    }
    function isSliderDisabled() {
      return scope_Target.hasAttribute('disabled')
    }
    function isHandleDisabled(handleNumber) {
      var handleOrigin = scope_Handles[handleNumber]
      return handleOrigin.hasAttribute('disabled')
    }
    function disable(handleNumber) {
      if (handleNumber !== null && handleNumber !== undefined) {
        scope_Handles[handleNumber].setAttribute('disabled', '')
        scope_Handles[handleNumber].handle.removeAttribute('tabindex')
      } else {
        scope_Target.setAttribute('disabled', '')
        scope_Handles.forEach(function (handle) {
          handle.handle.removeAttribute('tabindex')
        })
      }
    }
    function enable(handleNumber) {
      if (handleNumber !== null && handleNumber !== undefined) {
        scope_Handles[handleNumber].removeAttribute('disabled')
        scope_Handles[handleNumber].handle.setAttribute('tabindex', '0')
      } else {
        scope_Target.removeAttribute('disabled')
        scope_Handles.forEach(function (handle) {
          handle.removeAttribute('disabled')
          handle.handle.setAttribute('tabindex', '0')
        })
      }
    }
    function removeTooltips() {
      if (scope_Tooltips) {
        removeEvent('update' + INTERNAL_EVENT_NS.tooltips)
        scope_Tooltips.forEach(function (tooltip) {
          if (tooltip) {
            removeElement(tooltip)
          }
        })
        scope_Tooltips = null
      }
    }
    function tooltips() {
      removeTooltips()
      scope_Tooltips = scope_Handles.map(addTooltip)
      bindEvent('update' + INTERNAL_EVENT_NS.tooltips, function (values, handleNumber, unencoded) {
        if (!scope_Tooltips || !options.tooltips) {
          return
        }
        if (scope_Tooltips[handleNumber] === false) {
          return
        }
        var formattedValue = values[handleNumber]
        if (options.tooltips[handleNumber] !== true) {
          formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber])
        }
        scope_Tooltips[handleNumber].innerHTML = formattedValue
      })
    }
    function aria() {
      removeEvent('update' + INTERNAL_EVENT_NS.aria)
      bindEvent(
        'update' + INTERNAL_EVENT_NS.aria,
        function (values, handleNumber, unencoded, tap, positions) {
          scope_HandleNumbers.forEach(function (index) {
            var handle = scope_Handles[index]
            var min = checkHandlePosition(scope_Locations, index, 0, true, true, true)
            var max = checkHandlePosition(scope_Locations, index, 100, true, true, true)
            var now = positions[index]
            var text = String(options.ariaFormat.to(unencoded[index]))
            min = scope_Spectrum.fromStepping(min).toFixed(1)
            max = scope_Spectrum.fromStepping(max).toFixed(1)
            now = scope_Spectrum.fromStepping(now).toFixed(1)
            handle.children[0].setAttribute('aria-valuemin', min)
            handle.children[0].setAttribute('aria-valuemax', max)
            handle.children[0].setAttribute('aria-valuenow', now)
            handle.children[0].setAttribute('aria-valuetext', text)
          })
        },
      )
    }
    function getGroup(pips) {
      if (pips.mode === PipsMode.Range || pips.mode === PipsMode.Steps) {
        return scope_Spectrum.xVal
      }
      if (pips.mode === PipsMode.Count) {
        if (pips.values < 2) {
          throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.")
        }
        var interval = pips.values - 1
        var spread = 100 / interval
        var values = []
        while (interval--) {
          values[interval] = interval * spread
        }
        values.push(100)
        return mapToRange(values, pips.stepped)
      }
      if (pips.mode === PipsMode.Positions) {
        return mapToRange(pips.values, pips.stepped)
      }
      if (pips.mode === PipsMode.Values) {
        if (pips.stepped) {
          return pips.values.map(function (value) {
            return scope_Spectrum.fromStepping(
              scope_Spectrum.getStep(scope_Spectrum.toStepping(value)),
            )
          })
        }
        return pips.values
      }
      return []
    }
    function mapToRange(values, stepped) {
      return values.map(function (value) {
        return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value)
      })
    }
    function generateSpread(pips) {
      function safeIncrement(value, increment) {
        return Number((value + increment).toFixed(7))
      }
      var group = getGroup(pips)
      var indexes = {}
      var firstInRange = scope_Spectrum.xVal[0]
      var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1]
      var ignoreFirst = false
      var ignoreLast = false
      var prevPct = 0
      group = unique(
        group.slice().sort(function (a, b) {
          return a - b
        }),
      )
      if (group[0] !== firstInRange) {
        group.unshift(firstInRange)
        ignoreFirst = true
      }
      if (group[group.length - 1] !== lastInRange) {
        group.push(lastInRange)
        ignoreLast = true
      }
      group.forEach(function (current, index) {
        var step
        var i
        var q
        var low = current
        var high = group[index + 1]
        var newPct
        var pctDifference
        var pctPos
        var type
        var steps
        var realSteps
        var stepSize
        var isSteps = pips.mode === PipsMode.Steps
        if (isSteps) {
          step = scope_Spectrum.xNumSteps[index]
        }
        if (!step) {
          step = high - low
        }
        if (high === undefined) {
          high = low
        }
        step = Math.max(step, 0.0000001)
        for (i = low; i <= high; i = safeIncrement(i, step)) {
          newPct = scope_Spectrum.toStepping(i)
          pctDifference = newPct - prevPct
          steps = pctDifference / (pips.density || 1)
          realSteps = Math.round(steps)
          stepSize = pctDifference / realSteps
          for (q = 1; q <= realSteps; q += 1) {
            pctPos = prevPct + q * stepSize
            indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0]
          }
          type =
            group.indexOf(i) > -1
              ? PipsType.LargeValue
              : isSteps
                ? PipsType.SmallValue
                : PipsType.NoValue
          if (!index && ignoreFirst && i !== high) {
            type = 0
          }
          if (!(i === high && ignoreLast)) {
            indexes[newPct.toFixed(5)] = [i, type]
          }
          prevPct = newPct
        }
      })
      return indexes
    }
    function addMarking(spread, filterFunc, formatter) {
      var _a, _b
      var element = scope_Document.createElement('div')
      var valueSizeClasses =
        ((_a = {}),
        (_a[PipsType.None] = ''),
        (_a[PipsType.NoValue] = options.cssClasses.valueNormal),
        (_a[PipsType.LargeValue] = options.cssClasses.valueLarge),
        (_a[PipsType.SmallValue] = options.cssClasses.valueSub),
        _a)
      var markerSizeClasses =
        ((_b = {}),
        (_b[PipsType.None] = ''),
        (_b[PipsType.NoValue] = options.cssClasses.markerNormal),
        (_b[PipsType.LargeValue] = options.cssClasses.markerLarge),
        (_b[PipsType.SmallValue] = options.cssClasses.markerSub),
        _b)
      var valueOrientationClasses = [
        options.cssClasses.valueHorizontal,
        options.cssClasses.valueVertical,
      ]
      var markerOrientationClasses = [
        options.cssClasses.markerHorizontal,
        options.cssClasses.markerVertical,
      ]
      addClass(element, options.cssClasses.pips)
      addClass(
        element,
        options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical,
      )
      function getClasses(type, source) {
        var a = source === options.cssClasses.value
        var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses
        var sizeClasses = a ? valueSizeClasses : markerSizeClasses
        return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type]
      }
      function addSpread(offset, value, type) {
        type = filterFunc ? filterFunc(value, type) : type
        if (type === PipsType.None) {
          return
        }
        var node = addNodeTo(element, false)
        node.className = getClasses(type, options.cssClasses.marker)
        node.style[options.style] = offset + '%'
        if (type > PipsType.NoValue) {
          node = addNodeTo(element, false)
          node.className = getClasses(type, options.cssClasses.value)
          node.setAttribute('data-value', String(value))
          node.style[options.style] = offset + '%'
          node.innerHTML = String(formatter.to(value))
        }
      }
      Object.keys(spread).forEach(function (offset) {
        addSpread(offset, spread[offset][0], spread[offset][1])
      })
      return element
    }
    function removePips() {
      if (scope_Pips) {
        removeElement(scope_Pips)
        scope_Pips = null
      }
    }
    function pips(pips) {
      removePips()
      var spread = generateSpread(pips)
      var filter = pips.filter
      var format = pips.format || {
        to: function (value) {
          return String(Math.round(value))
        },
      }
      scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format))
      return scope_Pips
    }
    function baseSize() {
      var rect = scope_Base.getBoundingClientRect()
      var alt = 'offset' + ['Width', 'Height'][options.ort]
      return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt]
    }
    function attachEvent(events, element, callback, data) {
      var method = function (event) {
        var e = fixEvent(event, data.pageOffset, data.target || element)
        if (!e) {
          return false
        }
        if (isSliderDisabled() && !data.doNotReject) {
          return false
        }
        if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
          return false
        }
        if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
          return false
        }
        if (data.hover && e.buttons) {
          return false
        }
        if (!supportsPassive) {
          e.preventDefault()
        }
        e.calcPoint = e.points[options.ort]
        callback(e, data)
        return
      }
      var methods = []
      events.split(' ').forEach(function (eventName) {
        element.addEventListener(
          eventName,
          method,
          supportsPassive
            ? {
                passive: true,
              }
            : false,
        )
        methods.push([eventName, method])
      })
      return methods
    }
    function fixEvent(e, pageOffset, eventTarget) {
      var touch = e.type.indexOf('touch') === 0
      var mouse = e.type.indexOf('mouse') === 0
      var pointer = e.type.indexOf('pointer') === 0
      var x = 0
      var y = 0
      if (e.type.indexOf('MSPointer') === 0) {
        pointer = true
      }
      if (e.type === 'mousedown' && !e.buttons && !e.touches) {
        return false
      }
      if (touch) {
        var isTouchOnTarget = function (checkTouch) {
          var target = checkTouch.target
          return (
            target === eventTarget ||
            eventTarget.contains(target) ||
            (e.composed && e.composedPath().shift() === eventTarget)
          )
        }
        if (e.type === 'touchstart') {
          var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget)
          if (targetTouches.length > 1) {
            return false
          }
          x = targetTouches[0].pageX
          y = targetTouches[0].pageY
        } else {
          var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget)
          if (!targetTouch) {
            return false
          }
          x = targetTouch.pageX
          y = targetTouch.pageY
        }
      }
      pageOffset = pageOffset || getPageOffset(scope_Document)
      if (mouse || pointer) {
        x = e.clientX + pageOffset.x
        y = e.clientY + pageOffset.y
      }
      e.pageOffset = pageOffset
      e.points = [x, y]
      e.cursor = mouse || pointer
      return e
    }
    function calcPointToPercentage(calcPoint) {
      var location = calcPoint - offset(scope_Base, options.ort)
      var proposal = (location * 100) / baseSize()
      proposal = limit(proposal)
      return options.dir ? 100 - proposal : proposal
    }
    function getClosestHandle(clickedPosition) {
      var smallestDifference = 100
      var handleNumber = false
      scope_Handles.forEach(function (handle, index) {
        if (isHandleDisabled(index)) {
          return
        }
        var handlePosition = scope_Locations[index]
        var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition)
        var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100
        var isCloser = differenceWithThisHandle < smallestDifference
        var isCloserAfter =
          differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition
        if (isCloser || isCloserAfter || clickAtEdge) {
          handleNumber = index
          smallestDifference = differenceWithThisHandle
        }
      })
      return handleNumber
    }
    function documentLeave(event, data) {
      if (
        event.type === 'mouseout' &&
        event.target.nodeName === 'HTML' &&
        event.relatedTarget === null
      ) {
        eventEnd(event, data)
      }
    }
    function eventMove(event, data) {
      if (
        navigator.appVersion.indexOf('MSIE 9') === -1 &&
        event.buttons === 0 &&
        data.buttonsProperty !== 0
      ) {
        return eventEnd(event, data)
      }
      var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint)
      var proposal = (movement * 100) / data.baseSize
      moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect)
    }
    function eventEnd(event, data) {
      if (data.handle) {
        removeClass(data.handle, options.cssClasses.active)
        scope_ActiveHandlesCount -= 1
      }
      data.listeners.forEach(function (c) {
        scope_DocumentElement.removeEventListener(c[0], c[1])
      })
      if (scope_ActiveHandlesCount === 0) {
        removeClass(scope_Target, options.cssClasses.drag)
        setZindex()
        if (event.cursor) {
          scope_Body.style.cursor = ''
          scope_Body.removeEventListener('selectstart', preventDefault)
        }
      }
      if (options.events.smoothSteps) {
        data.handleNumbers.forEach(function (handleNumber) {
          setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false)
        })
        data.handleNumbers.forEach(function (handleNumber) {
          fireEvent('update', handleNumber)
        })
      }
      data.handleNumbers.forEach(function (handleNumber) {
        fireEvent('change', handleNumber)
        fireEvent('set', handleNumber)
        fireEvent('end', handleNumber)
      })
    }
    function eventStart(event, data) {
      if (data.handleNumbers.some(isHandleDisabled)) {
        return
      }
      var handle
      if (data.handleNumbers.length === 1) {
        var handleOrigin = scope_Handles[data.handleNumbers[0]]
        handle = handleOrigin.children[0]
        scope_ActiveHandlesCount += 1
        addClass(handle, options.cssClasses.active)
      }
      event.stopPropagation()
      var listeners = []
      var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
        target: event.target,
        handle: handle,
        connect: data.connect,
        listeners: listeners,
        startCalcPoint: event.calcPoint,
        baseSize: baseSize(),
        pageOffset: event.pageOffset,
        handleNumbers: data.handleNumbers,
        buttonsProperty: event.buttons,
        locations: scope_Locations.slice(),
      })
      var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
        target: event.target,
        handle: handle,
        listeners: listeners,
        doNotReject: true,
        handleNumbers: data.handleNumbers,
      })
      var outEvent = attachEvent('mouseout', scope_DocumentElement, documentLeave, {
        target: event.target,
        handle: handle,
        listeners: listeners,
        doNotReject: true,
        handleNumbers: data.handleNumbers,
      })
      listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent))
      if (event.cursor) {
        scope_Body.style.cursor = getComputedStyle(event.target).cursor
        if (scope_Handles.length > 1) {
          addClass(scope_Target, options.cssClasses.drag)
        }
        scope_Body.addEventListener('selectstart', preventDefault, false)
      }
      data.handleNumbers.forEach(function (handleNumber) {
        fireEvent('start', handleNumber)
      })
    }
    function eventTap(event) {
      event.stopPropagation()
      var proposal = calcPointToPercentage(event.calcPoint)
      var handleNumber = getClosestHandle(proposal)
      if (handleNumber === false) {
        return
      }
      if (!options.events.snap) {
        addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration)
      }
      setHandle(handleNumber, proposal, true, true)
      setZindex()
      fireEvent('slide', handleNumber, true)
      fireEvent('update', handleNumber, true)
      if (!options.events.snap) {
        fireEvent('change', handleNumber, true)
        fireEvent('set', handleNumber, true)
      } else {
        eventStart(event, {
          handleNumbers: [handleNumber],
        })
      }
    }
    function eventHover(event) {
      var proposal = calcPointToPercentage(event.calcPoint)
      var to = scope_Spectrum.getStep(proposal)
      var value = scope_Spectrum.fromStepping(to)
      Object.keys(scope_Events).forEach(function (targetEvent) {
        if ('hover' === targetEvent.split('.')[0]) {
          scope_Events[targetEvent].forEach(function (callback) {
            callback.call(scope_Self, value)
          })
        }
      })
    }
    function eventKeydown(event, handleNumber) {
      if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
        return false
      }
      var horizontalKeys = ['Left', 'Right']
      var verticalKeys = ['Down', 'Up']
      var largeStepKeys = ['PageDown', 'PageUp']
      var edgeKeys = ['Home', 'End']
      if (options.dir && !options.ort) {
        horizontalKeys.reverse()
      } else if (options.ort && !options.dir) {
        verticalKeys.reverse()
        largeStepKeys.reverse()
      }
      var key = event.key.replace('Arrow', '')
      var isLargeDown = key === largeStepKeys[0]
      var isLargeUp = key === largeStepKeys[1]
      var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown
      var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp
      var isMin = key === edgeKeys[0]
      var isMax = key === edgeKeys[1]
      if (!isDown && !isUp && !isMin && !isMax) {
        return true
      }
      event.preventDefault()
      var to
      if (isUp || isDown) {
        var direction = isDown ? 0 : 1
        var steps = getNextStepsForHandle(handleNumber)
        var step = steps[direction]
        if (step === null) {
          return false
        }
        if (step === false) {
          step = scope_Spectrum.getDefaultStep(
            scope_Locations[handleNumber],
            isDown,
            options.keyboardDefaultStep,
          )
        }
        if (isLargeUp || isLargeDown) {
          step *= options.keyboardPageMultiplier
        } else {
          step *= options.keyboardMultiplier
        }
        step = Math.max(step, 0.0000001)
        step = (isDown ? -1 : 1) * step
        to = scope_Values[handleNumber] + step
      } else if (isMax) {
        to = options.spectrum.xVal[options.spectrum.xVal.length - 1]
      } else {
        to = options.spectrum.xVal[0]
      }
      setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true)
      fireEvent('slide', handleNumber)
      fireEvent('update', handleNumber)
      fireEvent('change', handleNumber)
      fireEvent('set', handleNumber)
      return false
    }
    function bindSliderEvents(behaviour) {
      if (!behaviour.fixed) {
        scope_Handles.forEach(function (handle, index) {
          attachEvent(actions.start, handle.children[0], eventStart, {
            handleNumbers: [index],
          })
        })
      }
      if (behaviour.tap) {
        attachEvent(actions.start, scope_Base, eventTap, {})
      }
      if (behaviour.hover) {
        attachEvent(actions.move, scope_Base, eventHover, {
          hover: true,
        })
      }
      if (behaviour.drag) {
        scope_Connects.forEach(function (connect, index) {
          if (connect === false || index === 0 || index === scope_Connects.length - 1) {
            return
          }
          var handleBefore = scope_Handles[index - 1]
          var handleAfter = scope_Handles[index]
          var eventHolders = [connect]
          var handlesToDrag = [handleBefore, handleAfter]
          var handleNumbersToDrag = [index - 1, index]
          addClass(connect, options.cssClasses.draggable)
          if (behaviour.fixed) {
            eventHolders.push(handleBefore.children[0])
            eventHolders.push(handleAfter.children[0])
          }
          if (behaviour.dragAll) {
            handlesToDrag = scope_Handles
            handleNumbersToDrag = scope_HandleNumbers
          }
          eventHolders.forEach(function (eventHolder) {
            attachEvent(actions.start, eventHolder, eventStart, {
              handles: handlesToDrag,
              handleNumbers: handleNumbersToDrag,
              connect: connect,
            })
          })
        })
      }
    }
    function bindEvent(namespacedEvent, callback) {
      scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || []
      scope_Events[namespacedEvent].push(callback)
      if (namespacedEvent.split('.')[0] === 'update') {
        scope_Handles.forEach(function (a, index) {
          fireEvent('update', index)
        })
      }
    }
    function isInternalNamespace(namespace) {
      return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips
    }
    function removeEvent(namespacedEvent) {
      var event = namespacedEvent && namespacedEvent.split('.')[0]
      var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent
      Object.keys(scope_Events).forEach(function (bind) {
        var tEvent = bind.split('.')[0]
        var tNamespace = bind.substring(tEvent.length)
        if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
          if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
            delete scope_Events[bind]
          }
        }
      })
    }
    function fireEvent(eventName, handleNumber, tap) {
      Object.keys(scope_Events).forEach(function (targetEvent) {
        var eventType = targetEvent.split('.')[0]
        if (eventName === eventType) {
          scope_Events[targetEvent].forEach(function (callback) {
            callback.call(
              scope_Self,
              scope_Values.map(options.format.to),
              handleNumber,
              scope_Values.slice(),
              tap || false,
              scope_Locations.slice(),
              scope_Self,
            )
          })
        }
      })
    }
    function checkHandlePosition(
      reference,
      handleNumber,
      to,
      lookBackward,
      lookForward,
      getValue,
      smoothSteps,
    ) {
      var distance
      if (scope_Handles.length > 1 && !options.events.unconstrained) {
        if (lookBackward && handleNumber > 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber - 1],
            options.margin,
            false,
          )
          to = Math.max(to, distance)
        }
        if (lookForward && handleNumber < scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber + 1],
            options.margin,
            true,
          )
          to = Math.min(to, distance)
        }
      }
      if (scope_Handles.length > 1 && options.limit) {
        if (lookBackward && handleNumber > 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber - 1],
            options.limit,
            false,
          )
          to = Math.min(to, distance)
        }
        if (lookForward && handleNumber < scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber + 1],
            options.limit,
            true,
          )
          to = Math.max(to, distance)
        }
      }
      if (options.padding) {
        if (handleNumber === 0) {
          distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false)
          to = Math.max(to, distance)
        }
        if (handleNumber === scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true)
          to = Math.min(to, distance)
        }
      }
      if (!smoothSteps) {
        to = scope_Spectrum.getStep(to)
      }
      to = limit(to)
      if (to === reference[handleNumber] && !getValue) {
        return false
      }
      return to
    }
    function inRuleOrder(v, a) {
      var o = options.ort
      return (o ? a : v) + ', ' + (o ? v : a)
    }
    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
      var proposals = locations.slice()
      var firstHandle = handleNumbers[0]
      var smoothSteps = options.events.smoothSteps
      var b = [!upward, upward]
      var f = [upward, !upward]
      handleNumbers = handleNumbers.slice()
      if (upward) {
        handleNumbers.reverse()
      }
      if (handleNumbers.length > 1) {
        handleNumbers.forEach(function (handleNumber, o) {
          var to = checkHandlePosition(
            proposals,
            handleNumber,
            proposals[handleNumber] + proposal,
            b[o],
            f[o],
            false,
            smoothSteps,
          )
          if (to === false) {
            proposal = 0
          } else {
            proposal = to - proposals[handleNumber]
            proposals[handleNumber] = to
          }
        })
      } else {
        b = f = [true]
      }
      var state = false
      handleNumbers.forEach(function (handleNumber, o) {
        state =
          setHandle(
            handleNumber,
            locations[handleNumber] + proposal,
            b[o],
            f[o],
            false,
            smoothSteps,
          ) || state
      })
      if (state) {
        handleNumbers.forEach(function (handleNumber) {
          fireEvent('update', handleNumber)
          fireEvent('slide', handleNumber)
        })
        if (connect != undefined) {
          fireEvent('drag', firstHandle)
        }
      }
    }
    function transformDirection(a, b) {
      return options.dir ? 100 - a - b : a
    }
    function updateHandlePosition(handleNumber, to) {
      scope_Locations[handleNumber] = to
      scope_Values[handleNumber] = scope_Spectrum.fromStepping(to)
      var translation = transformDirection(to, 0) - scope_DirOffset
      var translateRule = 'translate(' + inRuleOrder(translation + '%', '0') + ')'
      scope_Handles[handleNumber].style[options.transformRule] = translateRule
      updateConnect(handleNumber)
      updateConnect(handleNumber + 1)
    }
    function setZindex() {
      scope_HandleNumbers.forEach(function (handleNumber) {
        var dir = scope_Locations[handleNumber] > 50 ? -1 : 1
        var zIndex = 3 + (scope_Handles.length + dir * handleNumber)
        scope_Handles[handleNumber].style.zIndex = String(zIndex)
      })
    }
    function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
      if (!exactInput) {
        to = checkHandlePosition(
          scope_Locations,
          handleNumber,
          to,
          lookBackward,
          lookForward,
          false,
          smoothSteps,
        )
      }
      if (to === false) {
        return false
      }
      updateHandlePosition(handleNumber, to)
      return true
    }
    function updateConnect(index) {
      if (!scope_Connects[index]) {
        return
      }
      var l = 0
      var h = 100
      if (index !== 0) {
        l = scope_Locations[index - 1]
      }
      if (index !== scope_Connects.length - 1) {
        h = scope_Locations[index]
      }
      var connectWidth = h - l
      var translateRule =
        'translate(' + inRuleOrder(transformDirection(l, connectWidth) + '%', '0') + ')'
      var scaleRule = 'scale(' + inRuleOrder(connectWidth / 100, '1') + ')'
      scope_Connects[index].style[options.transformRule] = translateRule + ' ' + scaleRule
    }
    function resolveToValue(to, handleNumber) {
      if (to === null || to === false || to === undefined) {
        return scope_Locations[handleNumber]
      }
      if (typeof to === 'number') {
        to = String(to)
      }
      to = options.format.from(to)
      if (to !== false) {
        to = scope_Spectrum.toStepping(to)
      }
      if (to === false || isNaN(to)) {
        return scope_Locations[handleNumber]
      }
      return to
    }
    function valueSet(input, fireSetEvent, exactInput) {
      var values = asArray(input)
      var isInit = scope_Locations[0] === undefined
      fireSetEvent = fireSetEvent === undefined ? true : fireSetEvent
      if (options.animate && !isInit) {
        addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration)
      }
      scope_HandleNumbers.forEach(function (handleNumber) {
        setHandle(
          handleNumber,
          resolveToValue(values[handleNumber], handleNumber),
          true,
          false,
          exactInput,
        )
      })
      var i = scope_HandleNumbers.length === 1 ? 0 : 1
      if (isInit && scope_Spectrum.hasNoSize()) {
        exactInput = true
        scope_Locations[0] = 0
        if (scope_HandleNumbers.length > 1) {
          var space_1 = 100 / (scope_HandleNumbers.length - 1)
          scope_HandleNumbers.forEach(function (handleNumber) {
            scope_Locations[handleNumber] = handleNumber * space_1
          })
        }
      }
      for (; i < scope_HandleNumbers.length; ++i) {
        scope_HandleNumbers.forEach(function (handleNumber) {
          setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput)
        })
      }
      setZindex()
      scope_HandleNumbers.forEach(function (handleNumber) {
        fireEvent('update', handleNumber)
        if (values[handleNumber] !== null && fireSetEvent) {
          fireEvent('set', handleNumber)
        }
      })
    }
    function valueReset(fireSetEvent) {
      valueSet(options.start, fireSetEvent)
    }
    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
      handleNumber = Number(handleNumber)
      if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
        throw new Error('noUiSlider: invalid handle number, got: ' + handleNumber)
      }
      setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput)
      fireEvent('update', handleNumber)
      if (fireSetEvent) {
        fireEvent('set', handleNumber)
      }
    }
    function valueGet(unencoded) {
      if (unencoded === void 0) {
        unencoded = false
      }
      if (unencoded) {
        return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0)
      }
      var values = scope_Values.map(options.format.to)
      if (values.length === 1) {
        return values[0]
      }
      return values
    }
    function destroy() {
      removeEvent(INTERNAL_EVENT_NS.aria)
      removeEvent(INTERNAL_EVENT_NS.tooltips)
      Object.keys(options.cssClasses).forEach(function (key) {
        removeClass(scope_Target, options.cssClasses[key])
      })
      while (scope_Target.firstChild) {
        scope_Target.removeChild(scope_Target.firstChild)
      }
      delete scope_Target.noUiSlider
    }
    function getNextStepsForHandle(handleNumber) {
      var location = scope_Locations[handleNumber]
      var nearbySteps = scope_Spectrum.getNearbySteps(location)
      var value = scope_Values[handleNumber]
      var increment = nearbySteps.thisStep.step
      var decrement = null
      if (options.snap) {
        return [
          value - nearbySteps.stepBefore.startValue || null,
          nearbySteps.stepAfter.startValue - value || null,
        ]
      }
      if (increment !== false) {
        if (value + increment > nearbySteps.stepAfter.startValue) {
          increment = nearbySteps.stepAfter.startValue - value
        }
      }
      if (value > nearbySteps.thisStep.startValue) {
        decrement = nearbySteps.thisStep.step
      } else if (nearbySteps.stepBefore.step === false) {
        decrement = false
      } else {
        decrement = value - nearbySteps.stepBefore.highestStep
      }
      if (location === 100) {
        increment = null
      } else if (location === 0) {
        decrement = null
      }
      var stepDecimals = scope_Spectrum.countStepDecimals()
      if (increment !== null && increment !== false) {
        increment = Number(increment.toFixed(stepDecimals))
      }
      if (decrement !== null && decrement !== false) {
        decrement = Number(decrement.toFixed(stepDecimals))
      }
      return [decrement, increment]
    }
    function getNextSteps() {
      return scope_HandleNumbers.map(getNextStepsForHandle)
    }
    function updateOptions(optionsToUpdate, fireSetEvent) {
      var v = valueGet()
      var updateAble = [
        'margin',
        'limit',
        'padding',
        'range',
        'animate',
        'snap',
        'step',
        'format',
        'pips',
        'tooltips',
      ]
      updateAble.forEach(function (name) {
        if (optionsToUpdate[name] !== undefined) {
          originalOptions[name] = optionsToUpdate[name]
        }
      })
      var newOptions = testOptions(originalOptions)
      updateAble.forEach(function (name) {
        if (optionsToUpdate[name] !== undefined) {
          options[name] = newOptions[name]
        }
      })
      scope_Spectrum = newOptions.spectrum
      options.margin = newOptions.margin
      options.limit = newOptions.limit
      options.padding = newOptions.padding
      if (options.pips) {
        pips(options.pips)
      } else {
        removePips()
      }
      if (options.tooltips) {
        tooltips()
      } else {
        removeTooltips()
      }
      scope_Locations = []
      valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent)
    }
    function setupSlider() {
      scope_Base = addSlider(scope_Target)
      addElements(options.connect, scope_Base)
      bindSliderEvents(options.events)
      valueSet(options.start)
      if (options.pips) {
        pips(options.pips)
      }
      if (options.tooltips) {
        tooltips()
      }
      aria()
    }
    setupSlider()
    var scope_Self = {
      destroy: destroy,
      steps: getNextSteps,
      on: bindEvent,
      off: removeEvent,
      get: valueGet,
      set: valueSet,
      setHandle: valueSetHandle,
      reset: valueReset,
      disable: disable,
      enable: enable,
      __moveHandles: function (upward, proposal, handleNumbers) {
        moveHandles(upward, proposal, scope_Locations, handleNumbers)
      },
      options: originalOptions,
      updateOptions: updateOptions,
      target: scope_Target,
      removePips: removePips,
      removeTooltips: removeTooltips,
      getPositions: function () {
        return scope_Locations.slice()
      },
      getTooltips: function () {
        return scope_Tooltips
      },
      getOrigins: function () {
        return scope_Handles
      },
      pips: pips,
    }
    return scope_Self
  }
  function initialize(target, originalOptions) {
    if (!target || !target.nodeName) {
      throw new Error('noUiSlider: create requires a single element, got: ' + target)
    }
    if (target.noUiSlider) {
      throw new Error('noUiSlider: Slider was already initialized.')
    }
    var options = testOptions(originalOptions)
    var api = scope(target, options, originalOptions)
    target.noUiSlider = api
    return api
  }
  const nouislider = {
    __spectrum: Spectrum,
    cssClasses: cssClasses,
    create: initialize,
  }
  function spollers() {
    const spollersArray = document.querySelectorAll('[data-spollers]')
    if (spollersArray.length > 0) {
      const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(',')[0]
      })
      if (spollersRegular.length) {
        initSpollers(spollersRegular)
      }
      function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach((spollersBlock) => {
          spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
          if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_spoller-init')
            initSpollerBody(spollersBlock)
            spollersBlock.addEventListener('click', setSpollerAction)
          } else {
            spollersBlock.classList.remove('_spoller-init')
            initSpollerBody(spollersBlock, false)
            spollersBlock.removeEventListener('click', setSpollerAction)
          }
        })
      }
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
        if (spollerTitles.length > 0) {
          spollerTitles.forEach((spollerTitle) => {
            if (hideSpollerBody) {
              spollerTitle.removeAttribute('tabindex')
              if (!spollerTitle.classList.contains('_spoller-active')) {
                spollerTitle.nextElementSibling.hidden = true
              }
            } else {
              spollerTitle.setAttribute('tabindex', '-1')
              spollerTitle.nextElementSibling.hidden = false
            }
          })
        }
      }
      function setSpollerAction(e) {
        const el = e.target
        if (el.closest('[data-spoller]')) {
          const spollerTitle = el.closest('[data-spoller]')
          const spollersBlock = spollerTitle.closest('[data-spollers]')
          const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false
          if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
              hideSpollersBody(spollersBlock)
            }
            spollerTitle.classList.toggle('_spoller-active')
            if (e.target.closest('.site-selection-accord__header')) {
              _slideToggle(spollerTitle.nextElementSibling, 0)
            } else {
              _slideToggle(spollerTitle.nextElementSibling, 500)
            }
          }
          e.preventDefault()
        }
      }
      function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active')
        if (spollerActiveTitle) {
          spollerActiveTitle.classList.remove('_spoller-active')
          _slideUp(spollerActiveTitle.nextElementSibling, 500)
        }
      }
    }
  }
  function bildSliders() {
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper):not(.swiper)')
    if (sliders) {
      sliders.forEach((slider) => {
        if (slider.querySelector('.swiper-wrapper') || slider.querySelector('.swiper')) return
        slider.parentElement.classList.add('swiper')
        slider.classList.add('swiper-wrapper')
        for (const slide of slider.children) {
          slide.classList.add('swiper-slide')
        }
      })
    }
  }
  function toggleNavigation(swiper) {
    const totalSlides = swiper.slides.length
    const slidesPerView = swiper.params.slidesPerView
    if (totalSlides <= slidesPerView) {
      swiper.navigation.disable()
      swiper.navigation.nextEl.hidden = true
      swiper.navigation.prevEl.hidden = true
    } else {
      swiper.navigation.enable()
      swiper.navigation.nextEl.hidden = false
      swiper.navigation.prevEl.hidden = false
    }
  }
  function initSliders() {
    bildSliders()
    if (document.querySelector('#type-service-big__slider')) {
      const swiper = new Swiper('#type-service-big__slider', {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: '.type-service-big__nav .type-service-big__next',
          prevEl: '.type-service-big__nav .type-service-big__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          767.98: {
            autoplay: false,
            spaceBetween: 15,
            slidesPerView: 1.4,
          },
          1023.98: {
            slidesPerView: 2,
            spaceBetween: 30,
            autoplay: false,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this)
          },
          resize: function () {
            toggleNavigation(this)
          },
        },
      })
    }
    if (document.querySelector('#type-service-big__slider_other')) {
      const swiper = new Swiper('#type-service-big__slider_other', {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: '.type-service-big__nav #type-service-big__next_other',
          prevEl: '.type-service-big__nav #type-service-big__prev_other',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          767.98: {
            autoplay: false,
            spaceBetween: 15,
            slidesPerView: 1.4,
          },
          1023.98: {
            slidesPerView: 2,
            spaceBetween: 30,
            autoplay: false,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this)
          },
          resize: function () {
            toggleNavigation(this)
          },
        },
      })
    }
    if (document.querySelector('.advantages-katok__slider')) {
      new Swiper('.advantages-katok__slider', {
        breakpoints: {
          320: {
            slidesPerView: 1.28,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.slider-services-katok__slider')) {
      new Swiper('.slider-services-katok__slider', {
        breakpoints: {
          320: {
            slidesPerView: 1.28,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 2.5,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.our-advantages__slider')) {
      new Swiper('.our-advantages__slider', {
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.form-qwiz__slider')) {
      new Swiper('.form-qwiz__slider', {
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        breakpoints: {
          320: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 0,
            slidesPerView: 0,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.slider-type__slider')) {
      new Swiper('.slider-type__slider', {
        navigation: {
          nextEl: '.slider-type__nav .slider-type__next',
          prevEl: '.slider-type__nav .slider-type__prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 1.2,
          },
          1023.98: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          1279.98: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.slider-services-katok__slider')) {
      new Swiper('.slider-services-katok__slider', {
        navigation: {
          nextEl: '.slider-services-katok__nav .slider-services-katok__next',
          prevEl: '.slider-services-katok__nav .slider-services-katok__prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.28,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 2.5,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.cooperation__slider')) {
      new Swiper('.cooperation__slider', {
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.our-partners__slider')) {
      new Swiper('.our-partners__slider', {
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.slider-type-service__slider')) {
      const swiper = new Swiper('.slider-type-service__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 300,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        autoHeight: true,
        navigation: {
          nextEl: '.slider-type-service__nav .slider-type-service__next',
          prevEl: '.slider-type-service__nav .slider-type-service__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
            spaceBetween: 15,
            autoHeight: false,
          },
          767.98: {
            slidesPerView: 1.5,
            spaceBetween: 15,
            autoHeight: false,
          },
          1023.98: {
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: true,
          },
        },
        on: {},
      })
      swiper.on('slideChange', function () {
        isShowOneCard(190, '.slider-type-service__sm-content ')
      })
    }
    if (document.querySelector('.carousel-gallery__slider')) {
      new Swiper('.carousel-gallery__slider', {
        slidesPerView: 4.5,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: '.carousel-gallery__nav .carousel-gallery__next',
          prevEl: '.carousel-gallery__nav .carousel-gallery__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          429.98: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          529.98: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          767.98: {
            slidesPerView: 3.2,
            spaceBetween: 10,
          },
          1023.98: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          1279.98: {
            slidesPerView: 4.5,
            spaceBetween: 15,
          },
        },
        on: {},
      })
    }
    const insideSliderAll = document.querySelectorAll('.inside-slider__slider')
    if (insideSliderAll) {
      insideSliderAll.forEach((element, indx) => {
        const navSlider = element.querySelector('.inside-slider__nav')
        if (navSlider) {
          navSlider.classList.add(`inside-slider__nav_${indx + 1}`)
        }
        element.classList.forEach((elClass) => {
          if (elClass.startsWith('inside-slider__slider_')) {
            element.classList.remove(elClass)
          }
        })
      })
      insideSliderAll.forEach((slider, indx) => {
        slider.classList.add(`inside-slider__slider_${indx + 1}`)
        if (document.querySelector(`.inside-slider__slider_${indx + 1}`)) {
          const swiper = new Swiper(`.inside-slider__slider_${indx + 1}`, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 300,
            autoHeight: false,
            navigation: {
              nextEl: `.inside-slider__nav_${indx + 1} .inside-slider__next`,
              prevEl: `.inside-slider__nav_${indx + 1} .inside-slider__prev`,
            },
            effect: 'fade',
            observer: true,
            observeParents: true,
            pagination: {
              el: '.inside-slider__pagination ',
              clickable: true,
            },
            breakpoints: {
              319.98: {
                loop: true,
              },
              429.98: {
                spaceBetween: 0,
                loop: true,
              },
              1023.98: {
                loop: false,
              },
            },
            on: {},
          })
          const paginationSelector = slider.querySelector('.inside-slider__pagination')
          paginationSelector.classList.add(`inside-slider__pagination_${indx}`)
          const bullets = slider.querySelectorAll(`.inside-slider__pagination_${indx} span`)
          bullets.forEach((pagination, i) => {
            pagination.addEventListener('mouseover', (event) => {
              swiper.slideTo(i, 300, true)
            })
          })
        }
      })
    }
    if (document.querySelector('.popolar-services__slider')) {
      new Swiper('.popolar-services__slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: '.popolar-services__nav .popolar-services__next',
          prevEl: '.popolar-services__nav .popolar-services__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
            spaceBetween: 15,
          },
          767.98: {
            slidesPerView: 1.7,
            spaceBetween: 15,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this)
          },
          resize: function () {
            toggleNavigation(this)
          },
        },
      })
    }
    if (window.innerWidth < 767.98) {
      if (document.querySelector('.slider-septic__slider')) {
        new Swiper('.slider-septic__slider', {
          slidesPerView: 3,
          spaceBetween: 30,
          speed: 300,
          autoHeight: false,
          observer: true,
          watchSlidesProgress: true,
          observeParents: true,
          breakpoints: {
            319.98: {
              slidesPerView: 1.3,
              spaceBetween: 15,
            },
            767.98: {},
          },
          on: {},
        })
      }
    }
    if (document.querySelector('.stories__wrapper')) {
      document.querySelectorAll('.stories__wrapper').forEach((slider) => {
        new Swiper(slider.querySelector('.swiper:not(.swiper-initialized)'), {
          loop: false,
          allowTouchMove: false,
          breakpoints: {
            319.98: {
              allowTouchMove: true,
              slidesPerView: 1.2,
            },
            429.98: {
              slidesPerView: 1.2,
              allowTouchMove: false,
            },
            1023.98: {
              slidesPerView: 1,
            },
            320: {},
            577: {},
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return (
                `<span class="${currentClass}"></span>` +
                ' из ' +
                `<span class="${totalClass}"></span>`
              )
            },
          },
          navigation: {
            nextEl: slider.querySelector('.stories__nav-btn.next'),
            prevEl: slider.querySelector('.stories__nav-btn.prev'),
          },
        })
      })
      function videoModal() {
        const linksList = document.querySelectorAll('.stories__link')
        const modal = document.querySelector('.video-modal')
        const btnClose = document.querySelector('.video-modal__close')
        const player = document.querySelector('.video-block__player')
        const btnSound = document.querySelector('.video-modal__sound')
        const iconMute = document.querySelector('.video-modal__icon-muted')
        const iconLoud = document.querySelector('.video-modal__icon-loud')
        const btnPlayPause = document.querySelector('.video-block__button')
        const playerLineProgress = document.querySelector('.video-modal__navigation-line-progress')
        function toggleClassOpen() {
          modal.classList.toggle('open')
        }
        function addSrcVideo(srcVideo) {
          player.src = srcVideo
        }
        function playVideo() {
          player.play()
        }
        function stopVideo() {
          player.pause()
        }
        function updatelLoading() {
          const percent = (player.currentTime / player.duration) * 100
          playerLineProgress.style.flexBasis = `${percent}%`
        }
        function openModal() {
          let srcVideo = this.dataset.video
          toggleClassOpen()
          addSrcVideo(srcVideo)
          playVideo()
        }
        function closeModal() {
          stopVideo()
          OffSound()
          player.currentTime = 0
          playerLineProgress.style.flexBasis = `0%`
          toggleClassOpen()
        }
        function toggleSound() {
          if (player.muted === true) {
            player.muted = false
            iconMute.style.display = 'none'
            iconLoud.style.display = 'block'
          } else {
            player.muted = true
            iconMute.style.display = 'block'
            iconLoud.style.display = 'none'
          }
        }
        function OffSound() {
          player.muted = true
          iconMute.style.display = 'block'
          iconLoud.style.display = 'none'
        }
        linksList.forEach((link) => link.addEventListener('click', openModal))
        player.addEventListener('timeupdate', updatelLoading)
        btnClose.addEventListener('click', closeModal)
        btnSound.addEventListener('click', toggleSound)
        player.addEventListener('ended', closeModal)
        btnPlayPause.addEventListener('mousedown', stopVideo)
        btnPlayPause.addEventListener('touchstart', stopVideo)
        btnPlayPause.addEventListener('mouseup', playVideo)
        btnPlayPause.addEventListener('touchend', playVideo)
        document.addEventListener('keydown', (event) => {
          if (event.code == 'Space' && modal.classList.contains('open')) {
            player.paused !== true ? stopVideo() : playVideo()
          }
        })
        document.addEventListener('keydown', (event) => {
          if (event.code == 'Escape' && modal.classList.contains('open')) closeModal()
        })
      }
      videoModal()
    }
    if (document.querySelector('#slider-stories')) {
      const swiper = new Swiper('#slider-stories', {
        slidesPerView: 1,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,
        watchSlidesProgress: true,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: '.stories__nav .stories__next',
          prevEl: '.stories__nav .stories__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.2,
          },
          1023.98: {
            slidesPerView: 1,
          },
        },
        on: {},
      })
      swiper.on('slideChange', function () {
        isShowOneCard(66, '.stories__sh-content')
      })
    }
    if (document.querySelector('.offer-services__slider')) {
      new Swiper('.offer-services__slider', {
        slidesPerView: 3,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
          },
          429.98: {
            slidesPerView: 1.17,
            spaceBetween: 15,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.offer-services__slider')) {
      new Swiper('.offer-services__slider', {
        slidesPerView: 3,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,
        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
          },
          429.98: {
            slidesPerView: 1.17,
            spaceBetween: 15,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.stages-work__slider')) {
      const swiper = new Swiper('.stages-work__slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 300,
        autoHeight: false,
        navigation: {
          nextEl: '.stages-work__nav .stages-work__next',
          prevEl: '.stages-work__nav .stages-work__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          767.98: {
            autoplay: false,
            slidesPerView: 2.2,
            spaceBetween: 15,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('#types-wells__slider-one')) {
      const swiper = new Swiper('#types-wells__slider-one', {
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          767.98: {
            autoplay: false,
            slidesPerView: 1.6,
          },
          1023.98: {
            slidesPerView: 2.2,
            spaceBetween: 20,
            autoplay: false,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {},
      })
      swiper.on('slideChange', function () {
        isShowOneCard(0, '.types-wells__content')
      })
    }
    if (document.querySelector('.popular-models-obsrtv__slider')) {
      new Swiper('.popular-models-obsrtv__slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 300,
        loop: false,
        navigation: {
          nextEl: '.popular-models__nav .popular-models__next',
          prevEl: '.popular-models__nav .popular-models__prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            centeredSlides: false,
          },
          374.98: {
            slidesPerView: 1.4,
          },
          768: {
            centeredSlides: false,
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
            initialSlide: 0,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.types-arrangement__slider')) {
      new Swiper('.types-arrangement__slider', {
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,
        breakpoints: {
          319.98: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          529.98: {
            slidesPerView: 1.6,
            spaceBetween: 10,
          },
          767.98: {
            autoplay: false,
            slidesPerView: 2.1,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.completed-work__slider')) {
      new Swiper('.completed-work__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 300,
        navigation: {
          nextEl: '.completed-work__nav .completed-work__next',
          prevEl: '.completed-work__nav .completed-work__prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          430: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1023.98: {
            slidesPerView: 1,
          },
          1279.98: {
            slidesPerView: 2,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.brand-carusel__slider')) {
      const swiper = new Swiper('.brand-carusel__slider', {
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 300,
        autoHeight: false,
        navigation: {
          nextEl: '.brand-carusel__nav .brand-carusel__next',
          prevEl: '.brand-carusel__nav .brand-carusel__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          767.98: {
            autoplay: false,
            slidesPerView: 2.2,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this)
          },
          resize: function () {
            toggleNavigation(this)
          },
        },
      })
      swiper.on('slideChange', function () {
        isShowOneCard(0, '.brand-carusel__content')
      })
    }
    if (document.querySelector('.popular-models__slider')) {
      let pop = new Swiper('.popular-models__slider', {
        watchSlidesProgress: true,
        slidesPerView: 4,
        spaceBetween: 0,
        speed: 300,
        loop: false,
        navigation: {
          nextEl: '.popular-models__nav .popular-models__next',
          prevEl: '.popular-models__nav .popular-models__prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
          },
          374.98: {
            slidesPerView: 1.4,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
            initialSlide: 0,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.submitted__slider-post')) {
      new Swiper('.submitted__slider-post', {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        navigation: {
          nextEl: '.submitted__nav .submitted__next',
          prevEl: '.submitted__nav .submitted__prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.4,
            spaceBetween: 15,
          },
          430: {
            slidesPerView: 1.4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: '2.5',
          },
          1023.98: {
            spaceBetween: 30,
            slidesPerView: '3',
          },
        },
        on: {},
      })
    }
    if (document.querySelector('#slider-video')) {
      new Swiper('#slider-video', {
        observer: true,
        observeParents: true,
        slidesPerView: '2',
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        navigation: {
          nextEl: '.submitted__youtube-nav .submitted__youtube-next',
          prevEl: '.submitted__youtube-nav .submitted__youtube-prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          430: {
            centeredSlides: false,
            slidesPerView: 1.6,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.5,
            centeredSlides: false,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('#magazine-slide')) {
      new Swiper('#magazine-slide', {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        speed: 300,
        navigation: {
          nextEl: '.submitted__magazine-nav .submitted__magazine-next',
          prevEl: '.submitted__magazine-nav .submitted__magazine-prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          430: {
            centeredSlides: false,
            slidesPerView: 1.6,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.water-analysis__slider')) {
      new Swiper('.water-analysis__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        breakpoints: {
          319.98: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          767.98: {
            slidesPerView: 1.2,
            spaceBetween: 30,
          },
          1023.98: {
            slidesPerView: 2,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('#we-doing')) {
      new Swiper('#we-doing', {
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        spaceBetween: 25,
        autoHeight: false,
        speed: 300,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        navigation: {
          nextEl: '.we-doing__nav .we-doing__next',
          prevEl: '.we-doing__nav .we-doing__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 15,
            loop: true,
            autoplay: {
              delay: 3000,
            },
            centeredSlides: true,
          },
          429.98: {
            slidesPerView: 1.1,
          },
          767.98: {
            slidesPerView: 2.3,
            spaceBetween: 15,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1439.98: {
            spaceBetween: 24,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('#work-examples')) {
      new Swiper('#work-examples', {
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        spaceBetween: 25,
        autoHeight: false,
        speed: 300,
        loop: true,
        autoplay: {
          delay: 4000,
        },
        navigation: {
          nextEl: '.work-examples__nav .work-examples__next',
          prevEl: '.work-examples__nav .work-examples__prev',
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 15,
            loop: true,
            autoplay: {
              delay: 3000,
            },
            centeredSlides: true,
          },
          429.98: {
            slidesPerView: 1.2,
          },
          529.98: {
            slidesPerView: 1.8,
          },
          767.98: {
            slidesPerView: 2.3,
            spaceBetween: 15,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1439.98: {
            spaceBetween: 24,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.lawn-options__slider')) {
      new Swiper('.lawn-options__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        pagination: {
          el: '.so-discount__pagging',
          clickable: true,
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 30,
          },
          429.98: {
            slidesPerView: 1.28,
          },
          767.98: {
            slidesPerView: 2.25,
            spaceBetween: 30,
          },
          1023.98: {
            slidesPerView: 3,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.so-discount__slider')) {
      new Swiper('.so-discount__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        pagination: {
          el: '.so-discount__pagging',
          clickable: true,
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 30,
          },
          429.98: {
            slidesPerView: 1.28,
          },
          767.98: {
            slidesPerView: 2.25,
            spaceBetween: 30,
          },
          1023.98: {
            slidesPerView: 3,
          },
        },
        on: {},
      })
    }
    if (document.querySelector('.banner-gallery__slider:not(.swiper-initialized)')) {
      new Swiper('.banner-gallery__slider:not(.swiper-initialized)', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: false,
        speed: 300,
        autoplay: {
          delay: 3000,
        },
        loop: true,
        navigation: {
          prevEl: '.banner-gallery__navigation .banner-gallery__btn_prev',
          nextEl: '.banner-gallery__navigation .banner-gallery__btn_next',
        },
        pagination: {
          el: '.banner-gallery__pagination',
          clickable: true,
        },
        breakpoints: {},
        on: {},
      })
    }
    if (document.querySelector('.drilling-price__slider')) {
      new Swiper('.drilling-price__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 2,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.3,
          },
          767.98: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          1023.98: {
            slidesPerView: 2,
          },
        },
        on: {},
      })
    }
  }
  function createPaginationBullet() {
    const paginationll = document.querySelectorAll('.inside-slider__pagination')
    if (paginationll.length !== 0) {
      paginationll.forEach((el) => {
        if (el.children.length === 1) {
          el.hidden = true
          return
        }
        let sum = 100 / +el.children.length
        Array.from(el.children).forEach((bullet) => {
          bullet.style.flex = `0 1 ${sum}%`
        })
      })
    }
  }
  initSliders()
  createPaginationBullet()
  function switchTabClass() {
    const slectorBtn = document.querySelectorAll('.ya-map__tab')
    if (slectorBtn) {
      slectorBtn.forEach((element) => {
        element.addEventListener('click', (e) => {
          if (element.closest('._active-tab-map')) {
            return
          }
          slectorBtn.forEach((el) => el.classList.remove('_active-tab-map'))
          element.classList.add('_active-tab-map')
        })
      })
    }
  }
  function initMap() {
    const cityList = [
      {
        city: 'москва',
        center: [55.73, 37.6],
        zoom: 8,
        polygon: [],
      },
      {
        city: 'питер',
        center: [59.93, 30.31],
        zoom: 7,
        polygon: [
          [61.106088074302846, 28.84990729821095],
          [60.54048161644306, 27.852634950925818],
          [60.75790210590904, 28.70283621526761],
          [60.71577485205364, 28.815934690349366],
          [60.36998777034415, 28.591678325406576],
          [60.16918067335956, 29.40829044088855],
          [60.211534546111665, 29.565211415079403],
          [60.187888023113686, 29.76919931592809],
          [60.15288724263536, 29.946358034169208],
          [60.12523238261545, 30.01739461918757],
          [60.0423242615806, 29.96706282242633],
          [59.98493140629839, 30.238787111520338],
          [59.93232002134522, 30.232711129552428],
          [59.84017052918489, 30.131823462708525],
          [59.885551817464716, 29.780468838045408],
          [59.93961408752628, 29.49723475289224],
          [59.964616467662836, 29.19559571694552],
          [59.91991225984697, 29.093497700881187],
          [59.83296746003299, 29.087954398797308],
          [59.78396907811887, 28.914027896498567],
          [59.75631501176312, 28.72500164979357],
          [59.800093425856545, 28.60943866524633],
          [59.80224973132346, 28.510190763084665],
          [59.73798583871411, 28.485433522283643],
          [59.66933873971914, 28.443601343301964],
          [59.6455402380044, 28.376395134689574],
          [59.65854803135656, 28.293968754917074],
          [59.69130561691546, 28.200415788977097],
          [59.74283516453832, 28.176907105205913],
          [59.767886802293845, 28.119769460495604],
          [59.671623961424615, 28.052389391540657],
          [59.53828823226743, 28.139961089731088],
          [59.35798953936603, 28.280648261698502],
          [59.02248117220134, 27.802166784452368],
          [59.00045046566632, 28.16716353323224],
          [58.90325564969078, 28.305782371843577],
          [58.892541977172385, 28.547145432234146],
          [58.839964234623864, 28.845593925558575],
          [58.81921766186278, 29.117229752723944],
          [58.71702324975635, 29.25362211337176],
          [58.61141214319082, 29.417761707109804],
          [58.52810610714258, 29.61583387713702],
          [58.45004102025334, 29.77698972302713],
          [58.47175326366724, 30.057070714286084],
          [58.528177693429086, 30.078493270758997],
          [58.670382603306024, 30.045047415771506],
          [58.784750929872246, 30.172568775367296],
          [58.77110172497413, 30.343612119793363],
          [58.74393741340788, 30.50480117892272],
          [58.76087846060315, 30.64903410782111],
          [58.89266306882436, 30.720318055999343],
          [58.931775319679105, 30.87541133018749],
          [59.08920426528445, 31.001107474298152],
          [59.05199909544481, 31.247310598952225],
          [59.16120182948734, 31.46040108683397],
          [59.24601344328124, 31.51924861119312],
          [59.3841107762172, 31.519650608045566],
          [59.37453535197764, 31.743859355535903],
          [59.41319939652709, 31.895892426683588],
          [59.4229337327242, 32.06818148171814],
          [59.35859553485514, 32.20693837199164],
          [59.28307118884456, 32.32414465705074],
          [59.17916450331086, 32.39505501883892],
          [59.15220746691128, 32.516090367786234],
          [59.16411241403188, 32.67707713805814],
          [59.25209559211132, 32.704493920109],
          [59.34898953782607, 32.772563410771056],
          [59.396925101876036, 32.86750784159898],
          [59.44235324548666, 33.07951705642466],
          [59.413053844884786, 33.23037247596619],
          [59.42351502348515, 33.46150882912565],
          [59.3621493877059, 33.71617224039184],
          [59.28076198027452, 33.85555732820072],
          [59.18093545333778, 34.07927365350611],
          [59.218446738264504, 34.31479262566086],
          [59.18449031867098, 34.46167119790215],
          [59.15756557610953, 34.569028458632886],
          [59.134213013591875, 34.74295902207777],
          [59.19477306563164, 34.801078803116695],
          [59.2564359565597, 34.97977799727809],
          [59.2912162694453, 35.12579135405289],
          [59.32989570283232, 35.26304437874467],
          [59.394126305198824, 35.282047170349756],
          [59.44494765499957, 35.336190323574385],
          [59.527887428452004, 35.279241905261756],
          [59.55491865313289, 35.38593012930545],
          [59.56172289354441, 35.45519752319393],
          [59.63727521994343, 35.448287025471046],
          [59.65468260646398, 35.555353868864756],
          [59.686264326387004, 35.562483180192146],
          [59.703950761999664, 35.42163323598487],
          [59.76838546078838, 35.34683149778368],
          [59.85256037133368, 35.3567480923831],
          [59.92369691755857, 35.406137191942264],
          [59.9805250889039, 35.28730686193509],
          [60.017895388841026, 35.10473292452272],
          [60.08351447005737, 35.16532530607367],
          [60.18264270143564, 35.12041199589066],
          [60.25167418889458, 35.135359361852636],
          [60.33731700421731, 35.225018017333184],
          [60.599637668599655, 35.24198481129656],
          [60.66614517771396, 35.19836887519892],
          [60.73404500750823, 35.14189036348486],
          [60.860688754947546, 35.23361484311272],
          [60.88857627351911, 35.38923417605841],
          [60.93444654114589, 35.52607157330945],
          [61.02021458655281, 35.63697856871454],
          [61.1083074214377, 35.66627786728151],
          [61.15697755043698, 35.65753483388153],
          [61.138111449137995, 35.513698102849844],
          [61.12318207774868, 35.36526337298682],
          [61.1832439172974, 35.335165607609014],
          [61.23909327326484, 35.34306604636703],
          [61.228582198408304, 35.19403076257794],
          [61.22860626645772, 35.028774374516416],
          [61.26035502030351, 34.80014854115669],
          [61.228371912248804, 34.62740677860907],
          [61.16914050333483],
          34.521057796999315,
          [61.1381625782991, 34.375724845099],
          [61.193136211572295, 34.274744102545526],
          [61.207127022717884, 34.01546202975132],
          [61.203757474773255, 33.698387119373336],
          [61.16566629145257, 33.56353423301232],
          [61.15193178960703, 33.495864964454626],
          [61.10094639830956, 33.57979779688657],
          [61.14509680547397, 33.76467751366431],
          [61.12465903378748, 33.91802782223414],
          [61.008016691462956, 33.941252627795365],
          [60.9144170484949, 33.816468775562356],
          [60.92079313266953, 33.67582168857538],
          [60.95277608109717, 33.57544502404991],
          [60.99486230036612, 33.50047914244152],
          [60.9656518934932, 33.47746318511602],
          [60.920762010627215, 33.49682021768072],
          [60.88595190808354, 33.39188123480494],
          [60.8360574570367, 33.341192219070024],
          [60.753586881331614, 33.26077873445362],
          [60.696863877704004, 33.128608162644554],
          [60.66744942292257, 33.013157521200924],
          [60.47643160894205, 32.82599005653793],
          [60.50472927233986, 32.65483755366424],
          [60.396308853622884, 32.74780061241211],
          [60.31819019883031, 32.66598898975374],
          [60.245199187531796, 32.65909996699057],
          [60.161066458141306, 32.61444214580604],
          [60.12614806592467, 32.495855101856904],
          [60.09471699316654, 32.301778825749864],
          [60.11039252448461, 32.18459263609901],
          [60.16749132430087, 32.070916239492675],
          [60.18998264893045, 31.889161919783447],
          [60.18675966797986, 31.73410743459536],
          [60.119836209160354, 31.65017367415598],
          [60.0605217394008, 31.6046419601648],
          [59.99324259600215, 31.610785530865854],
          [59.93335651991168, 31.59401443688691],
          [59.880472446391366, 31.50763516198711],
          [59.886351135496454, 31.27940617403553],
          [59.90097354234132, 31.142684758149613],
          [59.91566408008279, 30.99993686742772],
          [59.95660389144942, 30.951398418986003],
          [60.00105689222647, 31.02619414415352],
          [60.07363677987078, 31.053152954550058],
          [60.151108957508114, 30.981435482398467],
          [60.22734836046297, 30.91402784967906],
          [60.375430876166945, 30.82185987239356],
          [60.49908511402646, 30.692137455248258],
          [60.58062586990846, 30.57597504845583],
          [60.64945709096361, 30.443091178705856],
          [60.73859746306803, 30.47682683528842],
          [60.806970681028275, 30.462987825587703],
          [61.00722789319536, 30.257720710362037],
          [61.0946869940374, 30.081598200023848],
          [61.151348903426424, 29.830549834254754],
          [61.15529478015222, 29.613444318104058],
          [61.212959857671194, 29.516226783570488],
          [61.263060270690886, 29.348334364957054],
          [61.25454458553398, 29.24086735976627],
          [61.106088074302846, 28.84990729821095],
        ],
      },
    ]
    const tabsMap = document.querySelectorAll('button[data-city-map]')
    const btnTabs = document.querySelector('nav[data-tabs-titles].ya-map__navigation')
    switchTabClass()
    if (document.getElementById('map')) {
      var myMap = new ymaps.Map(
        'map',
        {
          center: cityList[0].center,
          zoom: 8,
        },
        {
          searchControlProvider: 'yandex#search',
        },
      )
      if (tabsMap.length !== 0) {
        tabsMap.forEach((element) => {
          const dataCity = element.dataset.cityMap
          let objCity = cityList.find((el) => dataCity === el.city)
          let myPolygon = new ymaps.Polygon(
            [objCity.polygon],
            {
              hintContent: 'Многоугольник',
            },
            {
              fillColor: '#009CD9',
              strokeWidth: 1,
              strokeColor: '#0067A0',
              strokeOpacity: 1,
              fillOpacity: 0.2,
            },
          )
          myMap.geoObjects.add(myPolygon)
          myMap.geoObjects.add(new ymaps.Placemark(objCity.center, {}))
          element.addEventListener('click', (e) => {
            myMap.setCenter(objCity.center, objCity.zoom)
          })
        })
        var myCircle = new ymaps.Circle(
          [[55.76, 37.6], 160000],
          {
            balloonContent: 'Радиус круга - 165 км',
            hintContent: 'Подвинь меня',
          },
          {
            draggable: false,
            fillColor: '#009CD9',
            strokeColor: '#0067A0',
            strokeOpacity: 1,
            strokeWidth: 1,
            fillOpacity: 0.2,
          },
        )
        myMap.geoObjects.add(myCircle)
      }
      if (!btnTabs && tabsMap.length === 0) {
        myMap.geoObjects.add(new ymaps.Placemark([55.73, 37.6], {}))
        let myPolygon = new ymaps.Polygon(
          [
            [
              [54.80831947994278, 38.18433433925412],
              [54.87945876925923, 38.52995859405644],
              [55.122011885673516, 38.67767483903884],
              [55.37773639221365, 38.95005546337981],
              [55.69101620830514, 39.06854923170738],
              [55.962220037403114, 39.09331426601756],
              [56.118493229997256, 38.83962697728742],
              [56.38328535103986, 38.538312268742686],
              [56.72694946754399, 38.84094055277811],
              [56.54218234666476, 37.45911829335503],
              [56.484269925944716, 36.55340126947627],
              [56.082994973012944, 35.26044765213379],
              [55.528582146509564, 35.79574540554199],
              [54.886906159423376, 36.2751232506904],
              [54.80831947994278, 38.18433433925412],
            ],
          ],
          {
            hintContent: 'Многоугольник',
          },
          {
            fillColor: '#009CD9',
            strokeWidth: 1,
            strokeColor: '#0067A0',
            strokeOpacity: 1,
            fillOpacity: 0.2,
          },
        )
        myMap.geoObjects.add(myPolygon)
      }
      myMap.controls.remove('geolocationControl')
      myMap.controls.remove('searchControl')
      myMap.controls.remove('trafficControl')
      myMap.controls.remove('typeSelector')
      myMap.controls.remove('fullscreenControl')
      myMap.controls.remove('rulerControl')
      myMap.behaviors.disable(['scrollZoom'])
    }
  }
  if (typeof ymaps !== 'undefined') {
    ymaps.ready(initMap)
  }
  function tabModificationModel() {
    const infoModelBtn = document.querySelectorAll('.card-model__info-btn')
    if (infoModelBtn) {
      infoModelBtn.forEach((element) => {
        element.addEventListener('click', function (e) {
          element.classList.toggle('_show')
        })
        document.addEventListener('click', (e) => {
          let target = e.target
          if (element.contains(target)) return
          if (!element.firstChild.contains(target)) {
            element.classList.remove('_show')
          }
        })
      })
    }
    const slidesModel = document.querySelector('.popular-models__swiper')
    if (slidesModel) {
      slidesModel.addEventListener('click', function (e) {
        let target = e.target
        selectTab(target, '.card-model__top-btn')
        selectTab(target, '.card-model__bottom-btn')
        const slideModel = document.querySelectorAll('.popular-models__slide')
        if (target.closest('[data-slide-id]')) {
          let actvSlide = target.closest('[data-slide-id]').dataset.slideId
          const nameModel = slideModel[actvSlide].querySelector('.card-model__name')
          const listModel = slideModel[actvSlide].querySelectorAll('.card-model__list li')
          const priceModel = slideModel[actvSlide].querySelector('.card-model__current-price')
          const discModel = slideModel[actvSlide].querySelector('.card-model__discount-price')
          const butBtnModel = slideModel[actvSlide].querySelector('.card-model__btn')
          const imgModel = slideModel[actvSlide].querySelector('.card-model__img img')
          const topBtn = slideModel[actvSlide].querySelector('.card-model__top-btns')
          const bottomBtn = slideModel[actvSlide].querySelector('.card-model__bottom-btns')
          if (target.closest('[data-top-sm]')) {
            let objPropModif
            if (target.hasAttribute('data-top-sm')) {
              objPropModif = Object.assign(target.closest('[data-top-sm]').dataset)
            }
            if (bottomBtn) {
              objPropModif = searchActiveBtn(topBtn, bottomBtn)
            }
            editPropModel(objPropModif)
          }
          if (target.closest('[data-top-pr]')) {
            let objPropModif
            if (target.hasAttribute('data-top-pr')) {
              objPropModif = Object.assign(target.closest('[data-top-pr]').dataset)
            }
            if (bottomBtn) {
              objPropModif = searchActiveBtn(topBtn, bottomBtn)
            }
            editPropModel(objPropModif)
          }
          if (target.closest('[data-bottom-btn]')) {
            let objPropModif = searchActiveBtn(topBtn, bottomBtn)
            editPropModel(objPropModif)
          }
          function searchActiveBtn(selectorTopBtn, selectorBottomBtn = '') {
            let objData
            let topKey
            Array.from(selectorTopBtn.children).forEach((el) => {
              if (el.closest('._active-btn')) {
                topKey = Object.keys(el.dataset)[0]
              }
            })
            if (selectorBottomBtn) {
              Array.from(selectorBottomBtn.children).forEach((el) => {
                if (el.closest('._active-btn')) {
                  objData = el.dataset
                }
              })
            }
            return getDataBottomProp(topKey, objData)
          }
          function getDataBottomProp(keyValue, obj) {
            let newObj = {}
            for (const key in obj) {
              if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key]
                if (element) {
                  let propData = element.split('|')
                  if (propData.length == 1) {
                    newObj[key] = propData[0]
                    continue
                  }
                  propData = keyValue === 'topSm' ? propData[0] : propData[1]
                  newObj[key] = propData
                }
              }
            }
            return newObj
          }
          function editPropModel(objPropModif) {
            nameModel.setAttribute('href', `https://sewera.ru/products/${objPropModif.link}`)
            slideModel[actvSlide]
              .querySelector('.card-model__top')
              .setAttribute('href', `https://sewera.ru/products/${objPropModif.link}`)
            if (objPropModif.img) {
              createImgSrc(imgModel, objPropModif.img)
            }
            nameModel.innerHTML = objPropModif.name ? objPropModif.name : ''
            listModel[0].firstElementChild.innerHTML = objPropModif.prop1
              ? objPropModif.prop1
              : listModel[1].firstElementChild.innerHTML
            listModel[1].firstElementChild.innerHTML = objPropModif.prop2
              ? objPropModif.prop2
              : listModel[1].firstElementChild.innerHTML
            listModel[2].firstElementChild.innerHTML = objPropModif.prop3
              ? objPropModif.prop3
              : listModel[2].firstElementChild.innerHTML
            listModel[3].firstElementChild.innerHTML = objPropModif.prop4
              ? objPropModif.prop4
              : listModel[3].firstElementChild.innerHTML
            priceModel.firstElementChild.innerHTML = objPropModif.priceCrnt
              ? objPropModif.priceCrnt
              : priceModel.firstElementChild.innerHTML
            if (discModel) {
              if (!objPropModif.priceDisc) {
                discModel.style.display = 'none'
                slideModel[actvSlide].querySelector('.card-model__dicount').style.display = 'none'
              } else {
                discModel.style.display = 'inline'
                slideModel[actvSlide].querySelector('.card-model__dicount').style.display = 'inline'
              }
              discModel.firstElementChild.innerHTML = ''
              discModel.firstElementChild.innerHTML = objPropModif.priceDisc
            }
            butBtnModel.dataset.form = nameModel.innerText
            butBtnModel.dataset.price = `${priceModel.firstElementChild.innerText} руб.`
          }
        }
      })
    }
    function selectTab(target, selectorBtn) {
      if (target.closest(selectorBtn) && !target.closest('._active-btn')) {
        Array.from(target.parentElement.children).forEach((el, i) => {
          el.classList.remove('_active-btn')
        })
        target.classList.add('_active-btn')
      }
    }
    function createImgSrc(img, btn) {
      if (btn) {
        const endIndxSrc = img.src.lastIndexOf('/')
        img.src = img.src.slice(0, endIndxSrc + 1) + btn + '.png'
      }
    }
  }
  tabModificationModel()
  function rangeInit() {
    const arbitraryValuesForSlider = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10 +']
    const zaborValuesForSlider = [
      '10 м',
      '20 м',
      '30 м',
      '40 м',
      '50 м',
      '60 м',
      '70 м',
      '80 м',
      '90 м',
      '100 м',
      '100 +',
    ]
    const kalitkaValuesForSlider = ['1', '2', '3', '4', '5', '5 +']
    var format = {
      to: function (value) {
        return arbitraryValuesForSlider[Math.round(value)]
      },
      from: function (value) {
        return arbitraryValuesForSlider.indexOf(value)
      },
    }
    var zaborFormat = {
      to: function (value) {
        return zaborValuesForSlider[Math.round(value)]
      },
      from: function (value) {
        return zaborValuesForSlider.indexOf(value)
      },
    }
    var kalitkaFormat = {
      to: function (value) {
        return kalitkaValuesForSlider[Math.round(value)]
      },
      from: function (value) {
        return kalitkaValuesForSlider.indexOf(value)
      },
    }
    const priceSlider = document.querySelector('#range')
    const zborSlider = document.querySelector('#zaborRange')
    const kalitkaSlider = document.querySelector('#kalitkaZaborRange')
    if (kalitkaSlider) {
      initialize(kalitkaSlider, {
        start: 1,
        step: 1,
        range: {
          min: [0],
          max: [kalitkaValuesForSlider.length - 1],
        },
        tooltips: true,
        format: kalitkaFormat,
        connect: [true, false],
        pips: {
          mode: 'count',
          stepped: true,
          values: 6,
          format: kalitkaFormat,
        },
      })
    }
    if (zborSlider) {
      initialize(zborSlider, {
        start: '30 м',
        step: 1,
        range: {
          min: [0],
          max: [zaborValuesForSlider.length - 1],
        },
        tooltips: true,
        format: zaborFormat,
        connect: [true, false],
        pips: {
          mode: 'count',
          stepped: true,
          values: 11,
          format: zaborFormat,
        },
      })
    }
    if (priceSlider) {
      initialize(priceSlider, {
        start: 3,
        step: 1,
        range: {
          min: [0],
          max: [arbitraryValuesForSlider.length - 1],
        },
        tooltips: true,
        format: format,
        connect: [true, false],
        pips: {
          mode: 'count',
          stepped: true,
          values: 11,
          format: format,
        },
      })
      priceSlider.noUiSlider.on('change', function () {
        const valueRange = document.querySelector('.noUi-handle')
        const inputRange = document.querySelector('.form-qwiz__input-number')
        if (valueRange.ariaValueText === '10+') {
          inputRange.classList.add('_show')
          document.querySelector('.qwiz-section__next-btn').classList.add('_disabled')
          document.querySelector('.qwiz-section__next-btn').disabled = true
        } else {
          inputRange.classList.remove('_show')
          document.querySelector('.qwiz-section__next-btn').classList.remove('_disabled')
          document.querySelector('.qwiz-section__next-btn').disabled = false
        }
        const range_input = document.getElementById('range_input')
        if (range_input) {
          range_input.value = this.get()
          if (range_input.value == '10+') range_input.value = ''
        }
      })
    }
  }
  rangeInit()
  function showSliderMobile() {
    const desktop = document.querySelector('._desktop')
    const mobile = document.querySelector('._mobile')
    if (desktop || mobile) {
      if (window.innerWidth > 767.98) {
        mobile.checked = false
        desktop.checked = true
      } else {
        mobile.checked = true
        desktop.checked = false
      }
    }
  }
  showSliderMobile()
  function showItemOsveshhenie() {
    const itemsStepOne = document.getElementById('items-step-1')
    const itemsStepTwo = document.getElementById('items-step-2')
    if (itemsStepOne || itemsStepTwo) {
      getItemDecorQwiz(itemsStepOne, 'step-list-1')
      getItemDecorQwiz(itemsStepTwo, 'step-list-2')
    }
  }
  function getItemDecorQwiz(itemsStep, listStep) {
    const arrItemCheck = []
    const inputs = itemsStep.querySelectorAll(`input`)
    Array.from(inputs).forEach((it) => {
      if (it.checked) {
        arrItemCheck.push(it.value)
      }
    })
    createItemDecorQwiz(arrItemCheck, listStep)
  }
  function createItemDecorQwiz(arrItem, listStep) {
    const list = document.getElementById(listStep).children
    Array.from(list).forEach((it) => {
      if (arrItem.some((el) => it.textContent.trim() === el)) {
        it.classList.add('_active')
      }
    })
  }
  function initQwiz() {
    const qwizFrom = document.querySelector('#services_quiz_form')
    function eventRadio(selector, nextBtn) {
      if (selector) {
        selector.forEach((it) => {
          it.addEventListener('click', () => {
            clickRadioCheck(selector, nextBtn)
          })
        })
      }
    }
    function clickRadioCheck(slector, nextBtn) {
      checkRadioValue(slector)
      removeDisabledBtn(nextBtn)
    }
    function checkRadioValue(selector) {
      let res = false
      selector.forEach((el) => {
        if (el.checked) {
          res = true
        }
      })
      return res
    }
    if (qwizFrom) {
      const inputChecks = document.querySelectorAll('.form-qwiz__input')
      const steps = document.querySelectorAll('.form-qwiz__step')
      const prevBtn = document.querySelector('.qwiz-section__prev-btn')
      const nextBtn = document.querySelector('.qwiz-section__next-btn')
      const panelNavigate =
        document.querySelector('.qwiz-section__bottom') ||
        document.querySelector('.qwiz-section__navigate')
      const stepCurrentNumber = document.querySelector('.qwiz-section__current-step')
      const restartBtn = document.querySelector('.form-qwiz__restart-btn')
      const finishStep = document.querySelector('.qwiz-section__finish-step')
      const chekBoxInpt = document.querySelectorAll('.form-qwiz__input-check')
      const chekBoxInptService = document.querySelectorAll('.form-qwiz__input')
      let flagQ = false
      let currentStep = 0
      let isStatusQuestion = false
      nextBtn.addEventListener('click', nextStep)
      prevBtn.addEventListener('click', prevStep)
      if (document.querySelectorAll('.form-qwiz__items').length !== 0) {
        document.querySelectorAll('.form-qwiz__items').forEach((element) => {
          element.addEventListener('click', (e) => isClickCheckBox(e, true))
        })
      }
      if (finishStep) {
        finishStep.innerHTML = `/ ${document.getElementById('filter-septik') ? steps.length - 3 : document.querySelector('._additional-question') ? steps.length - 2 : steps.length - 1}`
      }
      const btnSumbmitNext = document.querySelector('.form-qwiz__btn-finish')
      if (btnSumbmitNext) {
        btnSumbmitNext.addEventListener('click', function (e) {
          nextStep()
          document.querySelector('.qwiz-section__progress-step ').style.display = 'none'
        })
      }
      if (restartBtn)
        restartBtn.addEventListener('click', function (e) {
          currentStep = 0
          nextBtn.classList.remove('_disabled')
          nextBtn.disabled = false
          isStatusQuestion = false
          stepCurrentNumber.innerHTML = 1
          prevBtn.classList.add('._disabled')
          prevBtn.disabled = true
          steps.forEach((step) => {
            step.classList.remove('_current')
          })
          steps[0].classList.add('_current')
          panelNavigate.style.display = 'flex'
          stepCurrentNumber.parentNode.style.display = 'flex'
          stepCurrentNumber.parentNode.classList.remove('_ready')
          inputChecks.forEach((inpt) => {
            inpt.checked = false
          })
        })
      const IsUrl = window.location.href.includes('/service/')
      function isClickCheckBox(e, isCheckBox) {
        let target = e.target
        let isVali = validateCheck(chekBoxInpt)
        let isValiService = validateCheck(chekBoxInptService)
        if (target.classList.contains('form-qwiz__input-check')) {
          disabledNextBtn(isVali)
        }
        if (IsUrl) {
          disabledNextBtn(isValiService)
        }
        isCheck()
      }
      function disabledNextBtn(funcBoolean) {
        if (!funcBoolean && currentStep === 2) {
          addDisabledBtn(nextBtn)
        }
        if (funcBoolean) {
          removeDisabledBtn(nextBtn)
        }
      }
      function isCheck() {
        if (document.querySelector('._active-additional-question')) {
          if (document.querySelector('._active-additional-question').checked) {
            isStatusQuestion = true
            return
          }
        }
        isStatusQuestion = false
      }
      const arrInpt = []
      steps.forEach((element) => {
        const inpt = element.querySelectorAll("input[type='radio']")
        arrInpt.push(inpt)
      })
      arrInpt.forEach((element) => {
        eventRadio(element, nextBtn)
      })
      function valditeRadiobtn(stepNumber, selector) {
        if (currentStep === stepNumber && !selector) {
          addDisabledBtn(nextBtn)
        }
      }
      function validateCheck(selectorCheckBox) {
        if (selectorCheckBox) {
          for (let i = 0; i < selectorCheckBox.length; i++) {
            const element = selectorCheckBox[i]
            if (element.checked) return true
          }
          return false
        }
      }
      function validateStepNextBtn() {
        const inputChecks = steps[currentStep].querySelectorAll('.form-qwiz__input-check')
        inputChecks.forEach((input) => {
          if (input.checked) {
            removeDisabledBtn(nextBtn)
            return
          }
        })
      }
      function nextStep(e) {
        ++currentStep
        let arrRadioBolean = []
        arrInpt.forEach((element) => {
          arrRadioBolean.push(checkRadioValue(element))
        })
        for (let i = 0; i < arrRadioBolean.length - 1; i++) {
          valditeRadiobtn(i, arrRadioBolean[i])
        }
        validateStepNextBtn()
        if (document.getElementById('qwiz-osveshhenie') && steps.length === currentStep + 3) {
          showItemOsveshhenie()
          removeDisabledBtn(nextBtn)
          nextBtn.querySelector('span').textContent = 'Всё правильно'
        }
        if (document.getElementById('qwiz-osveshhenie') && steps.length === currentStep + 2) {
          document.querySelector('.qwiz-section__progress-step ').style.display = 'none'
        }
        if (steps.length === currentStep + 5 && document.getElementById('filter-septik')) {
          removeDisabledBtn(nextBtn)
        }
        if (steps.length === currentStep + 3 && document.getElementById('filter-septik')) {
          filterSeptik()
          panelNavigate.style.display = 'none'
          stepCurrentNumber.parentNode.classList.add('_ready')
        }
        if (currentStep === 1) {
          prevBtn.style.display = 'flex'
          panelNavigate.style.justifyContent = 'space-between'
        }
        if (currentStep === steps.length - 2) {
          stepCurrentNumber.parentNode.classList.add('_ready')
        }
        if (steps.length - 1 === currentStep) {
          stepCurrentNumber.parentNode.style.display = 'none'
        }
        if (finishStep.hidden && !steps[currentStep].closest('._additional-question')) {
          finishStep.hidden = false
        }
        if (flagQ || isStatusQuestion) {
          stepCurrentNumber.innerHTML = `${currentStep}`
        } else {
          stepCurrentNumber.innerHTML = `${currentStep + 1}`
        }
        if (steps[currentStep].closest('._additional-question')) {
          flagQ = true
        }
        if (steps[currentStep].closest('._additional-question') && !isStatusQuestion) {
          switchCurrentClassName(steps, currentStep - 1, currentStep + 1)
          currentStep = currentStep + 1
          return
        }
        if (steps[currentStep].closest('._additional-question') && isStatusQuestion) {
          stepCurrentNumber.innerHTML = 'Доп. вопрос'
          finishStep.hidden = true
          switchCurrentClassName(steps, currentStep - 1, currentStep)
          if (steps[currentStep].closest('.form-qwiz__step_range')) {
            removeDisabledBtn(nextBtn)
          }
          return
        }
        if (steps.length - 1 === currentStep) {
          if (document.querySelector('.qwiz-section__navigate')) {
            document.querySelector('.qwiz-section__progress-step ').style.display = 'none'
          }
        }
        if (steps.length - 2 === currentStep) {
          let nav = panelNavigate || document.querySelector('.qwiz-section__navigate')
          nav.style.display = 'none'
        }
        if (steps.length === currentStep) {
          steps[currentStep - 1].style.display = 'none'
          return
        }
        if (steps[currentStep - 1].closest('._additional-question') && isStatusQuestion) {
          stepCurrentNumber.innerHTML = `${currentStep}`
          switchCurrentClassName(steps, currentStep - 1, currentStep)
          removeDisabledBtn(nextBtn)
          return
        }
        prevBtn.classList.remove('_disabled')
        prevBtn.disabled = false
        if (steps[currentStep].closest('.form-qwiz__step_range')) {
          removeDisabledBtn(nextBtn)
        }
        switchCurrentClassName(steps, currentStep - 1, currentStep)
      }
      function prevStep(e) {
        if (document.getElementById('radioQwiz') || document.getElementById('filter-septik')) {
          removeDisabledBtn(nextBtn)
        }
        if (currentStep === steps.length - 3) {
          nextBtn.classList.remove('_disabled')
        }
        if (prevBtn.classList.contains('_disabled')) {
          return
        }
        if (steps[currentStep].closest('._additional-question') && isStatusQuestion) {
          finishStep.hidden = false
          flagQ = false
          isStatusQuestion = false
        }
        currentStep--
        if (
          currentStep === steps.length - 3 &&
          steps[currentStep - 1].querySelector('.form-qwiz__items-validate')
        ) {
          finishStep.hidden = false
          flagQ = false
          isStatusQuestion = true
        }
        if (flagQ) {
          stepCurrentNumber.innerHTML = `${currentStep}`
        } else {
          stepCurrentNumber.innerHTML = `${currentStep + 1}`
        }
        if (steps[currentStep].closest('._additional-question') && isStatusQuestion) {
          stepCurrentNumber.innerHTML = 'Доп. вопрос'
          finishStep.hidden = true
          flagQ = false
        }
        if (steps[currentStep].closest('._additional-question') && !isStatusQuestion) {
          stepCurrentNumber.innerHTML = `${currentStep}`
          switchCurrentClassName(steps, currentStep + 1, currentStep - 1)
          currentStep = currentStep - 1
          flagQ = false
          return
        }
        if (currentStep === 0) {
          addDisabledBtn(prevBtn)
        }
        switchCurrentClassName(steps, currentStep + 1, currentStep)
        if (steps[currentStep + 1].closest('._additional-question') && !isStatusQuestion) {
          switchCurrentClassName(steps, currentStep + 2, currentStep)
        }
      }
      qwizFrom.addEventListener('submit', function (e) {
        e.preventDefault()
        var th = $('#services_quiz_form')
        $('.load__preloader').fadeIn('', function () {
          $.ajax({
            type: 'POST',
            url: '/index.php?route=common/footer/quiz_submit',
            data: th.serialize(),
            dataType: 'json',
          }).done(function (json) {
            if (json['success']) {
              $('.load__preloader').fadeOut('slow')
              window.location.href = 'https://sewera.ru/sent/'
            }
          })
        })
        return false
      })
    }
    function removeDisabledBtn(seclectorBtn) {
      seclectorBtn.classList.remove('_disabled')
      seclectorBtn.disabled = false
    }
    function addDisabledBtn(seclectorBtn) {
      seclectorBtn.classList.add('_disabled')
      seclectorBtn.disabled = true
    }
    function switchCurrentClassName(steps, stepRemove, stepAdd) {
      steps[stepRemove].classList.remove('_current')
      steps[stepAdd].classList.add('_current')
    }
  }
  initQwiz()
  function getValueAdditionalQuestion(selector) {
    let value = 0
    selector.forEach((element) => {
      if (element.checked) {
        value = element.value
      }
    })
    return Number(value)
  }
  function validateUserValueInput() {
    const inputRange = document.querySelector('.form-qwiz__input-number  input')
    if (inputRange) {
      inputRange.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault()
      })
      inputRange.addEventListener('input', (e) => {
        const nextBtn = document.querySelector('.qwiz-section__next-btn')
        const num = 50
        if (e.target.value > num) {
          e.target.value = num
          e.target.max = num
        }
        inputRange.value = inputRange.value.replace(/[^0-9]/g, '')
        if (inputRange.value.length !== 0) {
          nextBtn.classList.remove('_disabled')
          nextBtn.disabled = false
        } else {
          nextBtn.classList.add('_disabled')
          nextBtn.disabled = true
        }
      })
    }
  }
  validateUserValueInput()
  function countPlumbingItems(params) {
    const plusBtn = document.querySelectorAll('.form-qwiz__btns-plumbing')
    if (plusBtn) {
      plusBtn.forEach((element) => {
        element.addEventListener('click', function (e) {
          let target = e.target
          if (target.closest('._plus-plumbing')) {
            if (element.children[1].value >= 5) return
            element.children[1].value++
          }
          if (target.closest('._minus-plumbing')) {
            if (element.children[1].value <= 0) return
            element.children[1].value--
          }
        })
      })
    }
  }
  countPlumbingItems()
  function filterSeptik() {
    const dataSeptic = [
      {
        linkSeptik: 'septik-akvalos-2',
        nameSeptik: 'Септик Аквалос 2',
        pipeDepth: '30',
        userValue: '2',
        salvoReleaseVolume: '120',
        energyConsumption: '1,37',
        productivity: '0.4',
        price: '82 800',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-akvalos-3',
        nameSeptik: 'Аквалос 3',
        pipeDepth: '50',
        userValue: '2',
        salvoReleaseVolume: '220',
        energyConsumption: '1,37',
        productivity: '0.6',
        price: '93 150',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-akvalos-4',
        nameSeptik: 'Аквалос 4',
        pipeDepth: '60',
        userValue: '4',
        salvoReleaseVolume: '250',
        energyConsumption: '1,37',
        productivity: '0.8',
        price: '106 200',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-akvalos-4-gorizontalnij',
        nameSeptik: 'Аквалос 4 Гориз.',
        pipeDepth: '30',
        userValue: '4',
        salvoReleaseVolume: '250',
        energyConsumption: '0,9',
        productivity: '0.8',
        price: '120 600',
        mounting: '32 000',
      },
      {
        linkSeptik: 'septik-akvalos-5',
        nameSeptik: 'Аквалос 5',
        pipeDepth: '60',
        userValue: '5',
        salvoReleaseVolume: '390',
        energyConsumption: '1,37',
        productivity: '0.9',
        price: '116 100',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-akvalos-5-gorizontalnij',
        nameSeptik: 'Аквалос 5 Гориз.',
        pipeDepth: '30',
        userValue: '5',
        salvoReleaseVolume: '300',
        energyConsumption: '0,9',
        productivity: '0.9',
        price: '130 050',
      },
      {
        linkSeptik: 'septik-akvalos-7',
        nameSeptik: 'Аквалос 7',
        pipeDepth: '60',
        userValue: '7',
        salvoReleaseVolume: '550',
        energyConsumption: '1,37',
        productivity: '1.2',
        price: '140 400',
        mounting: '38 000',
      },
      {
        linkSeptik: 'septik-akvalos-7-gorizontalnij',
        nameSeptik: 'Аквалос 7 Гориз.',
        pipeDepth: '30',
        userValue: '7',
        salvoReleaseVolume: '550',
        energyConsumption: '0,9',
        productivity: '1.2',
        price: '158 400',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-akvalos-8',
        nameSeptik: 'Аквалос 8',
        pipeDepth: '60',
        userValue: '8',
        salvoReleaseVolume: '700',
        energyConsumption: '1,57',
        productivity: '1.6',
        price: '148 500',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-akvalos-10',
        nameSeptik: 'Аквалос 10',
        pipeDepth: '60',
        userValue: '10',
        salvoReleaseVolume: '900',
        energyConsumption: '2,57',
        productivity: '2.0',
        price: '194 400',
        mounting: '49 000',
      },
      {
        linkSeptik: 'septik-akvalos-10-gorizontalnij',
        nameSeptik: 'Аквалос 10 Гориз.',
        pipeDepth: '30',
        userValue: '10',
        salvoReleaseVolume: '800',
        energyConsumption: '0,9',
        productivity: '2.0',
        price: '201 600',
        mounting: '51 000',
      },
      {
        linkSeptik: 'septik-akvalos-15',
        nameSeptik: 'Аквалос 15',
        pipeDepth: '60',
        userValue: '15',
        salvoReleaseVolume: '1125',
        energyConsumption: '2,57',
        productivity: '3.0',
        price: '253 800',
        mounting: '55 000',
      },
      {
        linkSeptik: 'septik-akvalos-20',
        nameSeptik: 'Аквалос 20',
        pipeDepth: '60',
        userValue: '20',
        salvoReleaseVolume: '1350',
        energyConsumption: '1,5',
        productivity: '4.0',
        price: '323 100',
        mounting: '60 000',
      },
      {
        linkSeptik: 'septik-topas-4',
        nameSeptik: 'Топас 4',
        pipeDepth: '60',
        userValue: '4',
        salvoReleaseVolume: '175',
        energyConsumption: '1',
        productivity: '0.8',
        price: '122 310',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-topas-5',
        nameSeptik: 'Топас 5',
        pipeDepth: '60',
        userValue: '5',
        salvoReleaseVolume: '220',
        energyConsumption: '1',
        productivity: '1',
        price: '143 550',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-topas-6',
        nameSeptik: 'Топас 6',
        pipeDepth: '60',
        userValue: '6',
        salvoReleaseVolume: '250',
        energyConsumption: '1',
        productivity: '1.15',
        price: '144 810',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-topas-8',
        nameSeptik: 'Топас 8',
        pipeDepth: '60',
        userValue: '8',
        salvoReleaseVolume: '440',
        energyConsumption: '1',
        productivity: '1.5',
        price: '166 410',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-topas-9',
        nameSeptik: 'Топас 9',
        pipeDepth: '60',
        userValue: '9',
        salvoReleaseVolume: '510',
        energyConsumption: '1',
        productivity: '1.7',
        price: '168 390',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-topas-10',
        nameSeptik: 'Топас 10',
        pipeDepth: '60',
        userValue: '10',
        salvoReleaseVolume: '760',
        energyConsumption: '2',
        productivity: '2',
        price: '226 710',
        mounting: '49 000',
      },
      {
        linkSeptik: 'septik-topas-12',
        nameSeptik: 'Топас 12',
        pipeDepth: '60',
        userValue: '12',
        salvoReleaseVolume: '830',
        energyConsumption: '2',
        productivity: '2.2',
        price: '228 870',
        mounting: '55 000',
      },
      {
        linkSeptik: 'septik-astra-3',
        nameSeptik: 'Астра 3',
        pipeDepth: '60',
        userValue: '3',
        salvoReleaseVolume: '130',
        energyConsumption: '1',
        productivity: '0.6',
        price: '102 000',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-astra-4',
        nameSeptik: 'Астра 4',
        pipeDepth: '60',
        userValue: '4',
        salvoReleaseVolume: '150',
        energyConsumption: '1',
        productivity: '0.8',
        price: '106 250',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-astra-5',
        nameSeptik: 'Астра 5',
        pipeDepth: '60',
        userValue: '5',
        salvoReleaseVolume: '250',
        energyConsumption: '1.5',
        productivity: '1',
        price: '123 250',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-astra-6',
        nameSeptik: 'Астра 6',
        pipeDepth: '60',
        userValue: '6',
        salvoReleaseVolume: '280',
        energyConsumption: '1.5',
        productivity: '1.2',
        price: '130 050',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-astra-7',
        nameSeptik: 'Астра 7',
        pipeDepth: '60',
        userValue: '8',
        salvoReleaseVolume: '300',
        energyConsumption: '1.5',
        productivity: '1.4',
        price: '136 850',
        mounting: '38 000',
      },
      {
        linkSeptik: 'septik-astra-8',
        nameSeptik: 'Астра 8',
        pipeDepth: '60',
        userValue: '8',
        salvoReleaseVolume: '350',
        energyConsumption: '1.5',
        productivity: '1.6',
        price: '148 699',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-astra-9',
        nameSeptik: 'Астра 9',
        pipeDepth: '60',
        userValue: '9',
        salvoReleaseVolume: '450',
        energyConsumption: '1.5',
        productivity: '1.8',
        price: '169 150',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-astra-10',
        nameSeptik: 'Астра 10',
        pipeDepth: '60',
        userValue: '10',
        salvoReleaseVolume: '550',
        energyConsumption: '1.5',
        productivity: '2',
        price: '196 350',
        mounting: '49 000',
      },
      {
        linkSeptik: 'septik-astra-15',
        nameSeptik: 'Астра 15',
        pipeDepth: '60',
        userValue: '15',
        salvoReleaseVolume: '600',
        energyConsumption: '2.4',
        productivity: '3',
        price: '255 000',
        mounting: '55 000',
      },
      {
        linkSeptik: 'septik-malahit-4',
        nameSeptik: 'Малахит 4',
        pipeDepth: '60',
        userValue: '4',
        salvoReleaseVolume: '220',
        energyConsumption: '1.2',
        productivity: '0.9',
        price: '116 494',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-malahit-5',
        nameSeptik: 'Малахит 5',
        pipeDepth: '60',
        userValue: '5',
        salvoReleaseVolume: '263',
        energyConsumption: '1.5',
        productivity: '1',
        price: '137 694',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-malahit-6',
        nameSeptik: 'Малахит 6',
        pipeDepth: '60',
        userValue: '6',
        salvoReleaseVolume: '290',
        energyConsumption: '1.5',
        productivity: '1.2',
        price: '153 594',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-malahit-8',
        nameSeptik: 'Малахит 8',
        pipeDepth: '60',
        userValue: '8',
        salvoReleaseVolume: '420',
        energyConsumption: '1.7',
        productivity: '1.6',
        price: '185 394',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-malahit-10',
        nameSeptik: 'Малахит 10',
        pipeDepth: '60',
        userValue: '10',
        salvoReleaseVolume: '500',
        energyConsumption: '1.7',
        productivity: '2',
        price: '222 494',
        mounting: '49 000',
      },
      {
        linkSeptik: 'septik-malahit-12',
        nameSeptik: 'Малахит 12',
        pipeDepth: '60',
        userValue: '12',
        salvoReleaseVolume: '645',
        energyConsumption: '1.7',
        productivity: '2.5',
        price: '243 694',
        mounting: '55 000',
      },
      {
        linkSeptik: 'septik-evrolos-bio-3',
        nameSeptik: 'Евролос БИО 3',
        pipeDepth: '60',
        userValue: '3',
        salvoReleaseVolume: '150',
        energyConsumption: '1',
        productivity: '0.6',
        price: '116 900',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-evrolos-bio-4',
        nameSeptik: 'Евролос БИО 4',
        pipeDepth: '60',
        userValue: '4',
        salvoReleaseVolume: '180',
        energyConsumption: '1.2',
        productivity: '0.8',
        price: '122 300',
        mounting: '27 000',
      },
      {
        linkSeptik: 'septik-evrolos-bio-5',
        nameSeptik: 'Евролос БИО 5',
        pipeDepth: '60',
        userValue: '5',
        salvoReleaseVolume: '210',
        energyConsumption: '1.5',
        productivity: '1',
        price: '129 400',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-evrolos-bio-6',
        nameSeptik: 'Евролос БИО 6',
        pipeDepth: '60',
        userValue: '6',
        salvoReleaseVolume: '270',
        energyConsumption: '1.5',
        productivity: '1.3',
        price: '142 500',
        mounting: '34 000',
      },
      {
        linkSeptik: 'septik-evrolos-bio-8',
        nameSeptik: 'Евролос БИО 8',
        pipeDepth: '60',
        userValue: '8',
        salvoReleaseVolume: '370',
        energyConsumption: '1.5',
        productivity: '1.6',
        price: '166 800',
        mounting: '40 000',
      },
      {
        linkSeptik: 'septik-evrolos-bio-10',
        nameSeptik: 'Евролос БИО 10',
        pipeDepth: '60',
        userValue: '10',
        salvoReleaseVolume: '550',
        energyConsumption: '1.7',
        productivity: '2',
        price: '208 700',
        mounting: '49 000',
      },
      {
        linkSeptik: 'septik-malahit-12',
        nameSeptik: 'Евролос БИО 12',
        pipeDepth: '60',
        userValue: '12',
        salvoReleaseVolume: '680',
        energyConsumption: '1.7',
        productivity: '2.4',
        price: '228 600',
        mounting: '55 000',
      },
    ]
    const inputRange = document.querySelector('.form-qwiz__input-number  input')
    function getAmountUserValue() {
      let res = (Number(getQuantityUser()) * 150 * 1.2) / 1000
      if (res <= 0.4) {
        res = 0.4
      }
      return res
    }
    function getQuantityUser() {
      const valueRange = document.querySelector('.noUi-handle')
      return valueRange.ariaValueText === '10+' ? inputRange.value : valueRange.ariaValueText
    }
    function getValueItemPlumbing() {
      const selectorsCount = document.querySelectorAll('.form-qwiz__count-plumbing')
      let resSum = 0
      let currentSum = 0
      selectorsCount.forEach((element) => {
        let dataValue = element.dataset.plumbingValue
        currentSum = dataValue * element.value
        resSum += currentSum
      })
      return resSum
    }
    function resultSeptic() {
      let sum = (getAmountUserValue() + getValueItemPlumbing() / 1000 / 2).toFixed(1)
      if (sum >= 4) {
        sum = 4
      }
      const resFilterRange = filterRange(dataSeptic, +sum, +sum, [])
      showReusltSeptik(resFilterRange.slice(0, 3))
    }
    resultSeptic()
    function filterRange(septikArr, min, max, resArr) {
      for (let i = 0; i < septikArr.length; i++) {
        if (min <= septikArr[i].productivity && septikArr[i].productivity <= max) {
          resArr.push(septikArr[i])
          septikArr.splice(i, 1)
        }
      }
      if (max >= 4) {
        return resArr
      }
      return filterRange(septikArr, min, max + 0.1, resArr)
    }
    function showReusltSeptik(res) {
      const listResSelector = document.querySelectorAll('.form-qwiz__content-finish')
      const sumNameSelector = document.querySelector('.form-qwiz__sum-finish')
      let objRes = createObjRes(res)
      const [arrRes, sumRes] = objRes
      sumNameSelector.innerHTML = sumRes
      const sumInput = document.getElementById('finish-sum_input')
      if (sumInput) sumInput.value = sumRes
      if (objRes) {
        for (let indx = 0; indx < listResSelector.length; indx++) {
          const element = listResSelector[indx]
          if (indx === 0) {
            createNewLinkSeptick(element, res)
            continue
          }
          element.innerHTML =
            arrRes[indx] +
            '<input type="hidden" name="' +
            element.previousElementSibling.innerText +
            '" value="' +
            arrRes[indx] +
            '">'
        }
      }
    }
    function createObjRes(res) {
      if (res.length === 0) return
      const resObj = {}
      resObj.link = ''
      resObj.userValue = getQuantityUser()
      resObj.plannedSalvoRelease = `${getValueItemPlumbing()} л.`
      resObj.salvoReleaseVolume = `${res[0].salvoReleaseVolume} л.`
      resObj.price = `~${res[0].price} руб.`
      resObj.pipeDepth = `от ${res[0].pipeDepth} см`
      resObj.deliveryPrice = '9100 руб.'
      resObj.productivity = `${res[0].productivity} м³`
      resObj.mounting = `${res[0].mounting} руб.`
      resObj.energyConsumption = `${res[0].energyConsumption} кВт/сутки`
      const threeRadioBtns = document.querySelectorAll('input[name="Количество колец"]')
      let wellRingsPrice = 0
      let checkedWellRing = document.querySelector('input[name="Количество колец"]:checked')
      if (checkedWellRing) wellRingsPrice = checkedWellRing.dataset.price
      let sumName = new Intl.NumberFormat('ru', {}).format(
        Number(res[0].price.replace(/\s+/g, '')) +
          Number(res[0].mounting.replace(/\s+/g, '')) +
          9100 +
          Number(wellRingsPrice),
      )
      console.log(getValueAdditionalQuestion(threeRadioBtns))
      let arrRes = Object.values(resObj)
      return [arrRes, `${sumName} руб.`]
    }
    function createNewLinkSeptick(listLink, res) {
      let inputValue = ''
      let inputName = listLink.previousElementSibling.innerText
      let theFirstChild = listLink.firstChild
      for (let i = 0; i < 3; i++) {
        let newLink = document.createElement('a')
        if (res[i]) {
          newLink.setAttribute('href', `https://sewera.ru/products/${res[i].linkSeptik}`)
          newLink.setAttribute('target', '_blank')
          if (i < 2) {
            inputValue += `${res[i].nameSeptik}, `
            newLink.innerHTML = `${res[i].nameSeptik}, `
          } else {
            inputValue += `${res[i].nameSeptik}`
            newLink.innerHTML = `${res[i].nameSeptik}`
          }
          listLink.insertBefore(newLink, theFirstChild)
        }
      }
      listLink.insertAdjacentHTML(
        'beforeend',
        '<input type="hidden" name="' + inputName + '" value="' + inputValue + '">',
      )
    }
  }
  class SelectConstructor {
    constructor(props, data = null) {
      let defaultConfig = {
        init: true,
        logging: true,
      }
      this.config = Object.assign(defaultConfig, props)
      this.selectClasses = {
        classSelect: 'select',
        classSelectBody: 'select__body',
        classSelectTitle: 'select__title',
        classSelectValue: 'select__value',
        classSelectLabel: 'select__label',
        classSelectInput: 'select__input',
        classSelectText: 'select__text',
        classSelectLink: 'select__link',
        classSelectOptions: 'select__options',
        classSelectOptionsScroll: 'select__scroll',
        classSelectOption: 'select__option',
        classSelectContent: 'select__content',
        classSelectRow: 'select__row',
        classSelectData: 'select__asset',
        classSelectDisabled: '_select-disabled',
        classSelectTag: '_select-tag',
        classSelectOpen: '_select-open',
        classSelectActive: '_select-active',
        classSelectFocus: '_select-focus',
        classSelectMultiple: '_select-multiple',
        classSelectCheckBox: '_select-checkbox',
        classSelectOptionSelected: '_select-selected',
      }
      this._this = this
      if (this.config.init) {
        const selectItems = data
          ? document.querySelectorAll(data)
          : document.querySelectorAll('select')
        if (selectItems.length) {
          this.selectsInit(selectItems)
        } else {
        }
      }
    }
    getSelectClass(className) {
      return `.${className}`
    }
    getSelectElement(selectItem, className) {
      return {
        originalSelect: selectItem.querySelector('select'),
        selectElement: selectItem.querySelector(this.getSelectClass(className)),
      }
    }
    selectsInit(selectItems) {
      selectItems.forEach((originalSelect, index) => {
        this.selectInit(originalSelect, index + 1)
      })
      document.addEventListener(
        'click',
        function (e) {
          this.selectsActions(e)
        }.bind(this),
      )
      document.addEventListener(
        'keydown',
        function (e) {
          this.selectsActions(e)
        }.bind(this),
      )
      document.addEventListener(
        'focusin',
        function (e) {
          this.selectsActions(e)
        }.bind(this),
      )
      document.addEventListener(
        'focusout',
        function (e) {
          this.selectsActions(e)
        }.bind(this),
      )
      document.addEventListener(
        'input',
        function (e) {
          this.selectsActions(e)
        }.bind(this),
      )
    }
    selectInit(originalSelect, index) {
      const _this = this
      let selectItem = document.createElement('div')
      selectItem.classList.add(this.selectClasses.classSelect)
      originalSelect.parentNode.insertBefore(selectItem, originalSelect)
      selectItem.appendChild(originalSelect)
      originalSelect.hidden = true
      index ? (originalSelect.dataset.id = index) : null
      selectItem.insertAdjacentHTML(
        'beforeend',
        `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
      )
      this.selectBuild(originalSelect)
      if (this.getSelectPlaceholder(originalSelect)) {
        originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value
        if (this.getSelectPlaceholder(originalSelect).label.show) {
          const selectItemTitle = this.getSelectElement(
            selectItem,
            this.selectClasses.classSelectTitle,
          ).selectElement
          selectItemTitle.insertAdjacentHTML(
            'afterbegin',
            `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`,
          )
        }
      }
      originalSelect.dataset.speed = originalSelect.dataset.speed
        ? originalSelect.dataset.speed
        : '150'
      originalSelect.addEventListener('change', function (e) {
        _this.selectChange(e)
      })
    }
    selectBuild(originalSelect) {
      const selectItem = originalSelect.parentElement
      selectItem.dataset.id = originalSelect.dataset.id
      selectItem.classList.add(
        originalSelect.getAttribute('class')
          ? `select_${originalSelect.getAttribute('class')}`
          : '',
      )
      originalSelect.multiple
        ? selectItem.classList.add(this.selectClasses.classSelectMultiple)
        : selectItem.classList.remove(this.selectClasses.classSelectMultiple)
      originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple
        ? selectItem.classList.add(this.selectClasses.classSelectCheckBox)
        : selectItem.classList.remove(this.selectClasses.classSelectCheckBox)
      this.setSelectTitleValue(selectItem, originalSelect)
      this.setOptions(selectItem, originalSelect)
      originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null
      originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null
      this.selectDisabled(selectItem, originalSelect)
    }
    selectsActions(e) {
      const targetElement = e.target
      const targetType = e.type
      if (
        targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const selectItem = targetElement.closest('.select')
          ? targetElement.closest('.select')
          : document.querySelector(
              `.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`,
            )
        const originalSelect = this.getSelectElement(selectItem).originalSelect
        if (targetType === 'click') {
          if (!originalSelect.disabled) {
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
              const targetTag = targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTag),
              )
              const optionItem = document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`,
              )
              this.optionAction(selectItem, originalSelect, optionItem)
            } else if (
              targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))
            ) {
              this.selectAction(selectItem)
            } else if (
              targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))
            ) {
              const optionItem = targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectOption),
              )
              const inputTitle = document.querySelectorAll(
                '.calc-vodosnabzhenie .calc-wells__title-block',
              )
              const selectTitle = document.getElementById('calc')
              const inputVodosnabzhenie = document.querySelector(
                '.calc-vodosnabzhenie .calc-wells__inpt ',
              )
              const selectVodosnabzhenie = document.querySelector('.calc-wells__select')
              if (inputTitle !== 0) {
                if (optionItem.innerText === 'Скважина') {
                  inputTitle[0].innerHTML = 'Глубина скважины, м'
                  inputTitle[0].classList.remove('_active')
                  inputTitle[1].classList.remove('_active')
                  inputTitle[0].classList.add('_active')
                  inputVodosnabzhenie.value = ''
                  inputVodosnabzhenie.placeholder = 'Глубина скважины, м'
                  selectTitle.hidden = false
                  selectVodosnabzhenie.hidden = true
                  inputVodosnabzhenie.hidden = false
                }
                if (optionItem.innerText === 'Колодец') {
                  inputTitle[0].innerHTML = 'Количество колец, шт'
                  inputTitle[0].classList.add('_active')
                  inputVodosnabzhenie.placeholder = 'Количество колец, шт'
                  inputVodosnabzhenie.value = ''
                  selectVodosnabzhenie.hidden = true
                  inputVodosnabzhenie.hidden = false
                  selectTitle.hidden = true
                }
              }
              this.optionAction(selectItem, originalSelect, optionItem)
            }
          }
        } else if (targetType === 'focusin') {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
            const selectOptions = this.getSelectElement(
              selectItem,
              this.selectClasses.classSelectOptions,
            ).selectElement
            const selectOptionsItems = selectOptions.querySelectorAll(
              `.${this.selectClasses.classSelectOption}`,
            )
            selectItem.classList.add(this.selectClasses.classSelectFocus)
          }
        } else if (targetType === 'focusout') {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
            selectItem.classList.remove(this.selectClasses.classSelectFocus)
          }
        } else if (targetType === 'keydown' && e.code === 'Escape') {
          this.selectsСlose()
        } else if (targetType === 'input') {
          this.searchActions(selectItem)
        }
      } else {
        this.selectsСlose()
      }
    }
    selectsСlose() {
      const selectActiveItems = document.querySelectorAll(
        `${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`,
      )
      if (selectActiveItems.length) {
        selectActiveItems.forEach((selectActiveItem) => {
          this.selectAction(selectActiveItem)
        })
      }
    }
    selectAction(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect
      const selectOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions,
      ).selectElement
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen)
        _slideToggle(selectOptions, originalSelect.dataset.speed)
      }
    }
    setSelectTitleValue(selectItem, originalSelect) {
      const selectItemBody = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectBody,
      ).selectElement
      const selectItemTitle = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectTitle,
      ).selectElement
      if (selectItemTitle) selectItemTitle.remove()
      selectItemBody.insertAdjacentHTML(
        'afterbegin',
        this.getSelectTitleValue(selectItem, originalSelect),
      )
    }
    getSelectTitleValue(selectItem, originalSelect) {
      let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html
      if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
        selectTitleValue = this.getSelectedOptionsData(originalSelect)
          .elements.map(
            (option) =>
              `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`,
          )
          .join('')
        if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
          document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue
          if (originalSelect.hasAttribute('data-search')) selectTitleValue = false
        }
      }
      selectTitleValue = selectTitleValue.length
        ? selectTitleValue
        : originalSelect.dataset.placeholder
      this.getSelectedOptionsData(originalSelect).values.length
        ? selectItem.classList.add(this.selectClasses.classSelectActive)
        : selectItem.classList.remove(this.selectClasses.classSelectActive)
      if (originalSelect.hasAttribute('data-search')) {
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input  autocomplete="off" type="text" placeholder="${selectTitleValue}"  data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`
      } else {
        const customClass =
          this.getSelectedOptionsData(originalSelect).elements.length &&
          this.getSelectedOptionsData(originalSelect).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}`
            : ''
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`
      }
    }
    getSelectElementContent(selectOption) {
      const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : ''
      const selectOptionDataHTML =
        selectOptionData.indexOf('img') >= 0
          ? `<img src="${selectOptionData}" alt="">`
          : selectOptionData
      let selectOptionContentHTML = ``
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectRow}">`
        : ''
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectData}">`
        : ''
      selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : ''
      selectOptionContentHTML += selectOptionData ? `</span>` : ''
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectText}">`
        : ''
      selectOptionContentHTML += selectOption.textContent
      selectOptionContentHTML += selectOptionData ? `</span>` : ''
      selectOptionContentHTML += selectOptionData ? `</span>` : ''
      return selectOptionContentHTML
    }
    getSelectPlaceholder(originalSelect) {
      const selectPlaceholder = Array.from(originalSelect.options).find((option) => !option.value)
      if (selectPlaceholder) {
        return {
          value: selectPlaceholder.textContent,
          show: selectPlaceholder.hasAttribute('data-show'),
          label: {
            show: selectPlaceholder.hasAttribute('data-label'),
            text: selectPlaceholder.dataset.label,
          },
        }
      }
    }
    getSelectedOptionsData(originalSelect, type) {
      let selectedOptions = []
      if (originalSelect.multiple) {
        selectedOptions = Array.from(originalSelect.options)
          .filter((option) => option.value)
          .filter((option) => option.selected)
      } else {
        selectedOptions.push(originalSelect.options[originalSelect.selectedIndex])
      }
      return {
        elements: selectedOptions.map((option) => option),
        values: selectedOptions.filter((option) => option.value).map((option) => option.value),
        html: selectedOptions.map((option) => this.getSelectElementContent(option)),
      }
    }
    getOptions(originalSelect) {
      let selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : ''
      let selectOptionsScrollHeight = originalSelect.dataset.scroll
        ? `style="max-height:${originalSelect.dataset.scroll}px"`
        : ''
      let selectOptions = Array.from(originalSelect.options)
      if (selectOptions.length > 0) {
        let selectOptionsHTML = ``
        if (
          (this.getSelectPlaceholder(originalSelect) &&
            !this.getSelectPlaceholder(originalSelect).show) ||
          originalSelect.multiple
        ) {
          selectOptions = selectOptions.filter((option) => option.value)
        }
        selectOptionsHTML += selectOptionsScroll
          ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">`
          : ''
        selectOptions.forEach((selectOption) => {
          selectOptionsHTML += this.getOption(selectOption, originalSelect)
        })
        selectOptionsHTML += selectOptionsScroll ? `</div>` : ''
        return selectOptionsHTML
      }
    }
    getOption(selectOption, originalSelect) {
      const selectOptionSelected =
        selectOption.selected && originalSelect.multiple
          ? ` ${this.selectClasses.classSelectOptionSelected}`
          : ''
      const selectOptionHide =
        selectOption.selected && !originalSelect.hasAttribute('data-show-selected') ? `hidden` : ``
      const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : ''
      const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false
      const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank')
        ? `target="_blank"`
        : ''
      let selectOptionHTML = ``
      selectOptionHTML += selectOptionLink
        ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">`
        : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`
      selectOptionHTML += this.getSelectElementContent(selectOption)
      selectOptionHTML += selectOptionLink ? `</a>` : `</button>`
      return selectOptionHTML
    }
    setOptions(selectItem, originalSelect) {
      const selectItemOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions,
      ).selectElement
      selectItemOptions.innerHTML = this.getOptions(originalSelect)
    }
    optionAction(selectItem, originalSelect, optionItem) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected)
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements
        originalSelectSelectedItems.forEach((originalSelectSelectedItem) => {
          originalSelectSelectedItem.removeAttribute('selected')
        })
        const selectSelectedItems = selectItem.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected),
        )
        selectSelectedItems.forEach((selectSelectedItems) => {
          originalSelect
            .querySelector(`option[value="${selectSelectedItems.dataset.value}"]`)
            .setAttribute('selected', 'selected')
        })
      } else {
        if (!originalSelect.hasAttribute('data-show-selected')) {
          if (
            selectItem.querySelector(
              `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
            )
          ) {
            selectItem.querySelector(
              `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
            ).hidden = false
          }
          optionItem.hidden = true
        }
        originalSelect.value = optionItem.hasAttribute('data-value')
          ? optionItem.dataset.value
          : optionItem.textContent
        this.selectAction(selectItem)
      }
      this.setSelectTitleValue(selectItem, originalSelect)
      this.setSelectChange(originalSelect)
    }
    selectChange(e) {
      const originalSelect = e.target
      this.selectBuild(originalSelect)
      this.setSelectChange(originalSelect)
    }
    setSelectChange(originalSelect) {
      const btnSum = document.querySelector('.calc-wells__btn')
      const oneSelect = document.querySelector('select[data-id="1"]')
      const calcObustroystva = document.getElementById('obustroystva-calc')
      let valueDepth
      const vodosnabzhenieSelect = document.querySelector('select[name="Источник водоснабжения"]')
      if (document.querySelector('.select__input') && document.querySelector('.calc-wells__inpt')) {
        valueDepth =
          document.querySelector('.calc-wells__inpt').value ||
          document.querySelector('.select__input').dataset.placeholder
      }
      if (
        !calcObustroystva &&
        originalSelect.dataset.id == 1 &&
        oneSelect.value &&
        valueDepth &&
        !vodosnabzhenieSelect
      ) {
        btnSum.classList.remove('_disable')
        btnSum.disabled = false
      }
      if (
        calcObustroystva &&
        originalSelect.dataset.id == 2 &&
        btnSum &&
        document.querySelector('.calc-wells__inpt').value
      ) {
        btnSum.classList.remove('_disable')
        btnSum.disabled = false
      }
      if (
        !calcObustroystva &&
        originalSelect.dataset.id == 3 &&
        btnSum &&
        document.querySelector('.select__input').dataset.placeholder &&
        oneSelect.value
      ) {
        btnSum.classList.remove('_disable')
        btnSum.disabled = false
      }
      if (originalSelect.hasAttribute('data-validate')) {
      }
      if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
        let tempButton = document.createElement('button')
        tempButton.type = 'submit'
        originalSelect.closest('form').append(tempButton)
        tempButton.click()
        tempButton.remove()
      }
      const selectItem = originalSelect.parentElement
      this.selectCallback(selectItem, originalSelect)
    }
    selectDisabled(selectItem, originalSelect) {
      if (originalSelect.disabled) {
        selectItem.classList.add(this.selectClasses.classSelectDisabled)
        this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle,
        ).selectElement.disabled = true
      } else {
        selectItem.classList.remove(this.selectClasses.classSelectDisabled)
        this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle,
        ).selectElement.disabled = false
      }
    }
    searchActions(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect
      const selectInput = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectInput,
      ).selectElement
      const selectOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions,
      ).selectElement
      const selectOptionsItems = selectOptions.querySelectorAll(
        `.${this.selectClasses.classSelectOption}`,
      )
      const _this = this
      selectOptionsItems.forEach((selectOptionsItem) => {
        if (
          selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0
        ) {
          selectOptionsItem.hidden = false
        } else {
          selectOptionsItem.hidden = true
        }
      })
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null
    }
    selectCallback(selectItem, originalSelect) {
      document.dispatchEvent(
        new CustomEvent('selectCallback', {
          detail: {
            select: originalSelect,
          },
        }),
      )
    }
  }
  const selectCalc = new SelectConstructor()
  function initCalcWells() {
    const imgBlock = document.querySelector('.calc-wells__bg-img')
    const finishBlock = document.querySelector('.calc-wells__finish')
    const sumBtn = document.querySelector('.calc-wells__btn')
    const inputsCalcWells = document.querySelectorAll(
      '.calc-wells input[type=text],.calc-wells input[type=number]',
    )
    const inputHiddenSum = document.getElementById('calc-wells__sum')
    const sumBlock = document.querySelector('.calc-wells__sum')
    inputsCalcWells.forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.keyCode == 13 || event.keyCode === 9) {
          event.preventDefault()
          return false
        }
      })
    })
    function sumPriceKolodec(valueRings, valueObustroystva) {
      let priceRings = getPriceRings(valueRings)
      let krykiPrice = (valueRings - 1) * 4000
      let sum = priceRings + valueObustroystva + krykiPrice
      return String(new Intl.NumberFormat('ru', {}).format(sum)) + ' руб.'
    }
    function getPriceRings(valueRings) {
      if (valueRings <= 9) {
        return valueRings * 11000
      } else if (valueRings <= 15) {
        return (valueRings - 9) * 12500 + 11000 * 9
      } else {
        return (valueRings - 15) * 14000 + 12500 * 6 + 11000 * 9
      }
    }
    function valideInput(selector, max = 250, select) {
      selector.addEventListener('input', (event) => {
        const vidVodosnabzhenie = findValueOption(select).innerText === 'Скважина' ? 250 : 50
        const numMax = vidVodosnabzhenie
        if (event.target.value > numMax) {
          event.target.value = numMax
          event.target.max = numMax
        }
        if (selector.value === '') {
          sumBtn.disabled = true
          sumBtn.classList.add('_disable')
        } else {
          sumBtn.disabled = false
          sumBtn.classList.remove('_disable')
        }
      })
    }
    const inptCalc = document.querySelector('.calc-wells__inpt')
    const slectAreaCalc = document.querySelector('.calc-wells__select')
    const inptBtn = document.querySelector('#int')
    const calcBtn = document.querySelector('#calc')
    let isActiv = true
    function isShowCaclTab(calcBtn, inptBtn, inptCalc, slectAreaCalc) {
      if (inptBtn) {
        inptBtn.addEventListener('click', (e) =>
          cliclBtn(calcBtn, inptBtn, inptCalc, slectAreaCalc, true),
        )
      }
      if (calcBtn) {
        calcBtn.addEventListener('click', (e) =>
          cliclBtn(inptBtn, calcBtn, slectAreaCalc, inptCalc, false),
        )
      }
      function cliclBtn(removeSelector, addSelector, isHiddenCalc, isHiddenInpt, booleanValue) {
        removeSelector.classList.remove('_active')
        addSelector.classList.add('_active')
        isHiddenInpt.hidden = true
        isHiddenCalc.hidden = false
        isActiv = booleanValue
        inptCalc.value = ''
        sumBtn.classList.add('_disable')
        sumBtn.disabled = true
        if (document.querySelector('.select__input')) {
          document.querySelector('.select__input').placeholder = 'Район бурения'
          document.querySelector('.select__input').dataset.placeholder = ''
        }
      }
    }
    if (document.querySelector('.calc-wells-kolodec')) {
      const oneSelect = document.querySelector('select[data-id="1"]')
      const inputRings = document.getElementById('rings')
      sumBtn.addEventListener('click', function (e) {
        let valueObustroystva = Number(oneSelect.value)
        let valueRings = Number(inputRings.value)
        sumBlock.innerHTML = sumPriceKolodec(valueRings, valueObustroystva)
        inputHiddenSum.value = sumBlock.innerText
        if (windowSizeUser()) {
          animatBlcok()
        } else {
          finishBlock.classList.add('_animat-mob')
        }
      })
      valideInput(inputRings, 50)
    }
    if (
      !document.querySelector('.calc-vodosnabzhenie') &&
      !document.querySelector('.calc-wells-kolodec') &&
      document.querySelector('.calc-wells')
    ) {
      const oneSelect = document.querySelector('select[data-id="1"]')
      const twoSelect = document.querySelector('select[name="Вид обустройства"]')
      const threeSelect = document.querySelector('select[name="Район бурения"]')
      const calcObustroystva = document.getElementById('obustroystva-calc')
      const calcMgbu = document.getElementById('mgbu')
      const sumBlock = document.querySelector('.calc-wells__sum')
      let res = 0
      if (document.querySelector('.select__input')) {
        document.querySelector('.select__input').dataset.placeholder = ''
      }
      isShowCaclTab(calcBtn, inptBtn, inptCalc, slectAreaCalc)
      sumBtn.addEventListener('click', resultCalc)
      function resultCalc(e) {
        let depthValue = isActiv ? inptCalc.value : findValueOption(threeSelect).dataset.valueDepth
        let wellsValue = calcMgbu ? 4000 : 3650
        if (depthValue < 40) {
          depthValue = 40
        }
        if (calcObustroystva) {
          let cablePrice = 300 + 100 + 170
          let vidObustroistva = document.querySelector(
            'select[name="Вид обустройства"] option:checked',
          )
          let vidObustroistvaPrice = 0
          if (vidObustroistva) vidObustroistvaPrice = vidObustroistva.dataset.price
          let arrangementPrice = vidObustroistvaPrice
          depthValue = +depthValue / 2
          if (depthValue > 70) {
            cablePrice = 470 + 100 + 170
          }
          res = String(+depthValue * +cablePrice + +arrangementPrice)
        } else {
          let vidObustroistva = document.querySelector(
            'select[name="Вид обустройства"] option:checked',
          )
          let arrangementPrice = vidObustroistva.dataset.price ? vidObustroistva.dataset.price : 0
          if (depthValue > 80) {
            wellsValue = wellsValue + 100
          }
          res = String(+wellsValue * +depthValue + +arrangementPrice)
        }
        const newRes = res
          .split('')
          .reverse()
          .map((it, indx) => {
            if (indx == 0) return it
            if (indx % 3 == 0) {
              return `${it} `
            }
            return it
          })
          .reverse()
          .join('')
        if (newRes) {
          if (windowSizeUser()) {
            animatBlcok()
          } else {
            finishBlock.classList.add('_animat-mob')
          }
          finishBlock.hidden = false
          sumBlock.innerHTML = `${newRes} руб.`
          inputHiddenSum.value = newRes
        }
      }
      inptCalc.addEventListener('input', (event) => {
        const numMax = calcMgbu ? 150 : 250
        if (event.target.value > numMax) {
          event.target.value = numMax
          event.target.max = numMax
        }
        if (calcObustroystva && twoSelect.value) {
          sumBtn.disabled = inptCalc.value.trim().length === 0
          sumBtn.classList.remove('_disable')
        }
        if (inptCalc.value !== '' && oneSelect.value) {
          sumBtn.disabled = false
          sumBtn.classList.remove('_disable')
          return
        }
        if (inptCalc.value === '') {
          sumBtn.disabled = true
          sumBtn.classList.add('_disable')
        }
      })
    }
    function findValueOption(select, dataName = '') {
      const option = select.querySelector(`option[value="${select.value}"]`)
      return option
    }
    if (document.querySelector('.calc-vodosnabzhenie')) {
      const oneSelect = document.querySelector('select[data-id="1"]')
      const inputClacl = document.getElementById('len')
      const twoSelect = document.querySelector('select[data-id="2"]')
      isShowCaclTab(calcBtn, inptBtn, inptCalc, slectAreaCalc)
      valideInput(inputClacl, 250, oneSelect)
      sumBtn.addEventListener('click', function (e) {
        let valueObustroystva = Number(oneSelect.value)
        let valueInput = Number(inputClacl.value)
        let twoValueSelect = Number(twoSelect.value)
        const threeSelect = document.querySelector('select[name="Район бурения"]')
        const isObustroistva = Number(twoValueSelect) ? Number(valueObustroystva) : 0
        const vidObustroistva = findValueOption(oneSelect).dataset.obustroystva
        const areaWellsValue = findValueOption(threeSelect).dataset.valueDepth
        if (vidObustroistva === 'Скважина') {
          let priceMeter = 3650
          let meterWellsValue = Number(valueInput) ? valueInput : areaWellsValue
          if (meterWellsValue <= 40) {
            meterWellsValue = 40
          }
          if (meterWellsValue > 80) {
            priceMeter = priceMeter + 100
          }
          let sum =
            String(
              new Intl.NumberFormat('ru', {}).format(meterWellsValue * priceMeter + isObustroistva),
            ) + ' руб.'
          sumBlock.innerHTML = sum
          inputHiddenSum.value = sum
        }
        if (vidObustroistva === 'Колодец') {
          let sum = sumPriceKolodec(valueInput, isObustroistva)
          sumBlock.innerHTML = sum
          inputHiddenSum.value = sum
        }
        if (windowSizeUser()) {
          animatBlcok()
        } else {
          finishBlock.classList.add('_animat-mob')
        }
      })
    }
    function animatBlcok() {
      imgBlock.classList.add('_animat')
      finishBlock.classList.add('_animat')
    }
    const calcWellsBtnSubmit = document.getElementById('calc-wells__finish')
    if (calcWellsBtnSubmit) {
      calcWellsBtnSubmit.addEventListener('submit', function (e) {
        e.preventDefault()
        var th = $(calcWellsBtnSubmit)
        $('.load__preloader').fadeIn('', function () {
          $.ajax({
            type: 'POST',
            url: '/index.php?route=common/footer/quiz_submit',
            data: th.serialize(),
            dataType: 'json',
          }).done(function (json) {
            if (json['success']) {
              window.location.href = 'https://sewera.ru/sent/'
              $('.load__preloader').fadeOut('slow')
            }
          })
        })
        return false
      })
    }
    function windowSizeUser() {
      if (window.matchMedia('(min-width: 1023.98px)').matches) {
        return true
      } else {
        pageNavigation()
        return false
      }
    }
    window.addEventListener('resize', windowSizeUser)
  }
  initCalcWells()
  function pageNavigation() {
    document.addEventListener('click', pageNavigationAction)
    document.addEventListener('watcherCallback', pageNavigationAction)
    function pageNavigationAction(e) {
      if (e.type === 'click') {
        const targetElement = e.target
        if (targetElement.closest('[data-goto]')) {
          const gotoLink = targetElement.closest('[data-goto]')
          const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : ''
          const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false
          const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : '500'
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed)
          e.preventDefault()
        }
      } else if (e.type === 'watcherCallback') {
        if (e.detail) {
          const entry = e.detail.entry
          const targetElement = entry.target
          if (targetElement.dataset.watch === 'navigator') {
            const navigatorItem = targetElement.id
            const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`)
            const navigatorCurrentItem = document.querySelector(`[data-goto="${navigatorItem}"]`)
            if (entry.isIntersecting) {
              navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null
            } else {
              navigatorCurrentItem
                ? navigatorCurrentItem.classList.remove('_navigator-active')
                : null
            }
          }
        }
      }
    }
  }
  let gotoBlock = (targetBlock, noHeader = false, speed = 500, offset = 0) => {
    const targetBlockElement = document.querySelector(targetBlock)
    if (targetBlockElement) {
      let headerItem = ''
      let headerItemHeight = 0
      if (noHeader) {
        headerItem = 'header.header'
        headerItemHeight = document.querySelector(headerItem).offsetHeight
      }
      let options = {
        speedAsDuration: true,
        speed: speed,
        header: headerItem,
        offset: offset,
        easing: 'easeOutQuad',
      }
      document.documentElement.classList.contains('menu-open') ? menuClose() : null
      if (typeof SmoothScroll !== 'undefined') {
        new SmoothScroll().animateScroll(targetBlockElement, '', options)
      } else {
        let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY
        window.scrollTo({
          top: headerItemHeight
            ? targetBlockElementPosition - headerItemHeight
            : targetBlockElementPosition,
          behavior: 'smooth',
        })
      }
    } else {
    }
  }
  function hiddenFooterMargin() {
    const footer = document.querySelector('.footer')
    const wrapperSite = document.querySelector('#wrapper-page')
    if (!document.querySelector('.banner-bottom')) return
    if (wrapperSite.lastElementChild.classList.contains('banner-bottom')) {
      document.querySelector('.banner-bottom').classList.remove('section')
      footer.style.marginTop = 0
    }
  }
  hiddenFooterMargin()
  spollers()
  tabs()
  showMore()
  $(window).on('load', function () {
    ;(function (window) {
      function SplitPic(element) {
        var el = $(element)
        var leftPane = $('.splitpic-left-image', el)
        var rightPane = $('.splitpic-right-image', el)
        var bar = $('.splitpic-bar', el)
        var infoHidden = false
        function updateSplit(x, isRelative) {
          var relativeX
          if (!isRelative) {
            var elOffset = el.offset()
            relativeX = x - elOffset.left
          } else {
            relativeX = x
          }
          leftPane.css('clip', 'rect(0px, ' + relativeX + 'px, auto, 0px)')
          bar.css('left', relativeX - bar.width() / 2 + 'px')
        }
        var startPercentage = parseInt(el.attr('data-start-percent'))
        if (isNaN(startPercentage)) {
          startPercentage = 50
        }
        startPercentage /= 100
        updateSplit(el.width() * startPercentage, true)
        var isMoving = false
        var lastX = 0,
          lastY = 0
        el.on('touchmove touchstart', function (event) {
          if (!infoHidden) {
            $('.splitpic-info', el).fadeOut(200)
            infoHidden = true
          }
          var touches
          if (event.touches) {
            touches = event.touches
          } else if (event.originalEvent && event.originalEvent.touches) {
            touches = event.originalEvent.touches
          }
          if (touches) {
            var touch = touches[0]
            var dx = 0,
              dy = 0
            if (isMoving) {
              dx = touch.pageX - lastX
              dy = touch.pageY - lastY
            } else {
              isMoving = true
            }
            if (Math.abs(dx) > Math.abs(dy)) {
              event.preventDefault()
              updateSplit(touches[0].pageX)
            }
            lastX = touch.pageX
            lastY = touch.pageY
          }
        })
        el.on('touchend', function (event) {
          isMoving = false
        })
        el.on('mouseenter mousemove mouseleave', function (event) {
          if (!infoHidden) {
            $('.splitpic-info', el).fadeOut(200)
            infoHidden = true
          }
          updateSplit(event.pageX)
        })
      }
      window.SplitPic = SplitPic
      window.SplitPic = SplitPic
    })(window)
    $('.splitpic-horizontal .splitpic-images').each(function (i, v) {
      var sp = new SplitPic(v)
    })
  })
  function rangePartnerInit() {
    const priceSlider = document.querySelector('#range-partner')
    var formatForSlider = {
      from: function (formattedValue) {
        return Number(formattedValue)
      },
      to: function (numericValue) {
        return Math.round(numericValue)
      },
    }
    if (priceSlider) {
      nouislider.create(priceSlider, {
        start: 450000,
        step: 50000,
        range: {
          min: 50000,
          max: 1000000,
        },
        format: formatForSlider,
        tooltips: {
          to: function (numericValue) {
            return String(new Intl.NumberFormat('ru', {}).format(numericValue)) + ' р.'
          },
        },
        connect: [true, false],
        pips: {
          mode: 'count',
          stepped: true,
          values: 6,
          format: {
            to: function (value) {
              return String(new Intl.NumberFormat('ru', {}).format(value)) + ' р.'
            },
            from: function (value) {
              return Number(value.replace(',-', ''))
            },
          },
        },
      })
      priceSlider.noUiSlider.on('update', () => {
        const clientsSelector = document.querySelector('.calc-profit__number').innerText
        getSumPartner(clientsSelector)
      })
    }
  }
  rangePartnerInit()
  inintCalcPartners()
  function inintCalcPartners() {
    getSumPartner()
    getClientsValue()
    function getClientsValue() {
      const clientsSelector = document.querySelector('.calc-profit__number')
      let countClient = 2
      if (clientsSelector) {
        document.querySelector('.calc-profit__minus').addEventListener('click', () => {
          countClient--
          if (countClient < 1) {
            countClient = 1
            return
          }
          clientsSelector.innerHTML = countClient
          getSumPartner(countClient)
        })
        document.querySelector('.calc-profit__plus').addEventListener('click', () => {
          if (countClient === 25) {
            countClient = 25
            return
          }
          countClient++
          clientsSelector.innerHTML = countClient
          getSumPartner(countClient)
        })
      }
    }
  }
  function getSumPartner(countClient = 2) {
    const sumSelector = document.querySelector('.calc-profit__sum')
    if (sumSelector) {
      let sum = new Intl.NumberFormat('ru', {}).format(
        ((countClient * document.querySelector('.noUi-handle').ariaValueText) / 100) * 7,
      )
      sumSelector.innerHTML = ' ' + sum
    }
  }
  if (document.querySelector('.form-realization')) {
    document.querySelector('.form-realization').addEventListener('submit', postEmail)
    function postEmail(e) {
      e.preventDefault()
      let data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        msg: document.getElementById('msg').value,
      }
      $('.load__preloader').fadeIn()
      let response = fetch('/index.php?route=common/footer/form_submit_realization', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = 'https://sewera.ru/sent/'
            $('.load__preloader').fadeOut('slow')
          }
        })
        .catch((err) => {
          alert(err.message)
          $('.load__preloader').fadeOut('slow')
        })
    }
  }
  editLogoFooter()
  function editLogoFooter() {
    const bgBlock = document.querySelector('.sewera-osveshhenie')
    if (bgBlock) {
      if (bgBlock.parentElement.parentElement.classList.contains('page-width', 'bg-black')) {
        const foooterLogoImg = document.querySelector('.footer__logo  .logo__img')
        foooterLogoImg.src = '/srv/assets/images/ykrashenie-doma/icon/logo-dark.svg'
      }
    }
  }
})()
