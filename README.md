[![AOS - Animate on scroll library](https://s32.postimg.org/ktvt59hol/aos_header.png)](http://michalsnik.github.io/aos/)

[![NPM version](https://img.shields.io/npm/v/aos.svg?style=flat)](https://npmjs.org/package/aos)
[![NPM downloads](https://img.shields.io/npm/dm/aos.svg?style=flat)](https://npmjs.org/package/aos)
[![Build Status](https://travis-ci.org/michalsnik/aos.svg?branch=master)](https://travis-ci.org/michalsnik/aos)
[![Gitter](https://badges.gitter.im/michalsnik/aos.svg)](https://gitter.im/michalsnik/aos?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[![Twitter Follow](https://img.shields.io/twitter/follow/michalsnik.svg?style=social)](https://twitter.com/michalsnik) [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/home?status=AOS%20-%20Animate%20on%20Scroll%20library%0Ahttps%3A//github.com/michalsnik/aos)

👉 To get a better understanding how this actually works, I encourage you to check [my post on CSS-tricks](https://css-tricks.com/aos-css-driven-scroll-animation-library/).

---

### 🚀 [Demo](http://michalsnik.github.io/aos/)

### 🌟 Codepen Examples
- [Different build in animations](http://codepen.io/michalsnik/pen/WxNdvq)
- [With anchor setting in use](http://codepen.io/michalsnik/pen/jrOYVO)
- [With anchor-placement and different easing](http://codepen.io/michalsnik/pen/EyxoNm)
- [With simple custom animations](http://codepen.io/michalsnik/pen/WxvNvE)

---

## ⚙ Installation

Add styles in `<head>`:

```html
  <link rel="stylesheet" href="https://unpkg.com/aos/dist/aos.css" />
```

Add script right before closing `</body>` tag:
```html
  <script src="https://unpkg.com/aos/dist/aos.js"></script>
```

You can also use:

* `yarn add aos`
* `npm install --save aos`

## 🤔 How to use it?

### 1. Initialize AOS:

```html
<script>
  AOS.init();
  
  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    duration: 400, // values from 0 to 3000, with step 50ms
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    animatedClassName: 'aos-animate', // class applied on animation
    initClassName: 'aos-init', // class applied after initialization
    useClassNames: false // if true, will add content of `data-aos` as classes on scroll
  });
</script>
```

### 2. Add attributes on HTML elements:

```html
  <div data-aos="fade-in"></div>
```

[See full list of all animations, easings and anchor placements](https://github.com/michalsnik/aos#-animations)


#### Available attributes

You can overwrite some of the global settings on per-element basis by using following attributes:
* `data-aos-offset`
* `data-aos-duration`
* `data-aos-easing`
* `data-aos-delay`
* `data-aos-once`
* `data-aos-mirror`

There are also few settings that can be used only on per-element basis:
* `data-aos-anchor` - element whose offset will be used to trigger animation instead of an actual one
* `data-aos-anchor-placement` (default `top-bottom`) - defines which position of the element regarding to window should trigger the animation. `top-bottom` means that the animation will be triggered once top of the element hits bottom of the screen.

Examples:
```html
<div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"></div>
  
<div data-aos="flip-left" data-aos-delay="100" data-aos-anchor=".example-selector"></div>

<div data-aos="fade-up" data-aos-anchor-placement="top-center"></div>
```

### API

AOS object is exposed as a global variable, for now there are three methods available:

  * `init` - initialize AOS
  * `refresh` - recalculate all offsets and positions of elements (called on window resize)
  * `refreshHard` - reinit array with AOS elements and trigger `refresh` (called on DOM changes that are related to `aos` elements)

Example execution:
```javascript
  AOS.refresh();
```

By default AOS is watching for DOM changes and if there are any new elements loaded asynchronously or when something is removed from DOM it calls `refreshHard` automatically. In browsers that don't support `MutationObserver` like IE you might need to call `AOS.refreshHard()` by yourself.

`refresh` method is called on window resize and so on, as it doesn't require to build new store with AOS elements and should be as light as possible.


### JS Events

AOS dispatches two events on document: `aos:in` and `aos:out` whenever any element animates in our our, so that you can do extra stuff in JS:
```
document.addEventListener('aos:in', ({ detail }) => {
  console.log('animated in', detail);
});

document.addEventListener('aos:out', ({ detail }) => {
  console.log('animated out', detail);
});
```

You can also tell AOS to trigger custom event on specific element, by setting `data-aos-id` attribute:
```html
<div data-aos="fade-in" data-aos-id="super-duper"></div>
```

Then you'll be able to listen for two custom events `aos:in:super-duper` and `aos:out:super-duper`.

### Recepies:

#### Animate.CSS (or any other) integration:
Use `animatedClassName` to change default behaviour of AOS, and apply classes placed inside `data-aos` on scroll.

```html
<div data-aos="fadeInUp"></div>
```

```js
AOS.init({
  useClassNames: true,
  initClassName: false,
  animatedClassName: 'animated',
});
```

On scroll the above element will get two classes: `animated` and `fadeInUp`. Using different combinations of the three above settings, you should be able to integrate any external CSS animation library.

External libraries however don't care too much about animation state before the actual animation. So if you want those elements to be not visible before scrolling to them, you might need to adress it yourself, by for example adding the following styles:
```css
[data-aos] {
  visibility: hidden;
}
[data-aos].animated {
  visibility: visible;
}
```

### Caveats:

#### setting: duration:
*Duration accept values from 50 to 3000, with step 50ms, it's because duration of animation is handled by css, and to not make css longer than it is already I created implementations only in this range. I think this should be good for almost all cases.

If not, you may write simple CSS on your page that will add another duration option value available, for example:

```css
  body[data-aos-duration='4000'] [data-aos], [data-aos][data-aos][data-aos-duration='4000']{
    transition-duration: 4000ms;
  }
```

This code will add 4000ms duration available for you to set on AOS elements, or to set as global duration while initializing AOS script.

Notice that double `[data-aos][data-aos]` - it's not a mistake, it is a trick, to make individual settings more important than global, without need to write ugly "!important" there :)

#### setting: startEvent:
If you set `startEvent: 'load'` it will add event listener on `window` instead of `document`.

### 👻 Animations

There are serveral predefined animations you can use already:

  * Fade animations:
    * fade
    * fade-up
    * fade-down
    * fade-left
    * fade-right
    * fade-up-right
    * fade-up-left
    * fade-down-right
    * fade-down-left

  * Flip animations:
    * flip-up
    * flip-down
    * flip-left
    * flip-right

  * Slide animations:
    * slide-up
    * slide-down
    * slide-left
    * slide-right

  * Zoom animations:
    * zoom-in
    * zoom-in-up
    * zoom-in-down
    * zoom-in-left
    * zoom-in-right
    * zoom-out
    * zoom-out-up
    * zoom-out-down
    * zoom-out-left
    * zoom-out-right

### Anchor placement:

  * top-bottom
  * top-center
  * top-top
  * center-bottom
  * center-center
  * center-top
  * bottom-bottom
  * bottom-center
  * bottom-top


### Easing functions:

You can choose one of these timing function to animate elements nicely:

  * linear
  * ease
  * ease-in
  * ease-out
  * ease-in-out
  * ease-in-back
  * ease-out-back
  * ease-in-out-back
  * ease-in-sine
  * ease-out-sine
  * ease-in-out-sine
  * ease-in-quad
  * ease-out-quad
  * ease-in-out-quad
  * ease-in-cubic
  * ease-out-cubic
  * ease-in-out-cubic
  * ease-in-quart
  * ease-out-quart
  * ease-in-out-quart

## ✌️ [Contributing](CONTRIBUTING.md)

## ❔Questions

If you have any questions, ideas or whatsoever, please check [AOS contribution guide](CONTRIBUTING.md) and don't hesitate to create new issues.
