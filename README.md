# AOS - Animate on scroll library
[![Build Status](https://travis-ci.org/michalsnik/aos.svg)](https://travis-ci.org/michalsnik/aos)

Small library to animate elements on your page as you scroll.

You may say it's like WOWJS, yeah - you're right, effect is similar to WOWJS, but i had different idea how to make such a plugin, so here it is. CSS3 driven scroll animation library. It's even smaller than already small WOWJS library.

AOS allows you to animate elements as you scroll down, and up.
If you scroll back to top, element will animate to it's previous state and is ready to animate again if you scroll down.

### DEMO
[Click here](http://michalsnik.github.io/aos/)

## Requirements

* None -> from version 0.4.x AOS doesn't rely on jQuery anymore

## Setup

You can download AOS [directly](https://github.com/michalsnik/aos/archive/master.zip), but I recommend you to use `bower`:

```bash
  bower install aos --save
```

### Link styles

```html
  <link rel="stylesheet" href="bower_components/aos/dist/aos.css" />
```

### Add scripts

```html
  <script src="bower_components/aos/dist/aos.js"></script>
```

### Init AOS

```javascript
  <script>
    AOS.init();
  </script>
```

## How to use it?

### Basic usage

  All you have to do is to add "aos" attribute to html element, like so:

```html
  <div aos="animation_name">
```

  Script will trigger "animation_name" animation on this element, if you scroll to it.

  [Down below](https://github.com/michalsnik/aos#animations) is a list of all available animations for now :)

### Advanced settings

These settings can be set both on certain elements, or as default while initializing script (in options object).

| Attribute | Description | Example value | Default value |
|---------------------------|-------------|---------------|---------|
| *`aos-offset`* | Change offset to trigger animations sooner or later (px) | 200 | 120 |
| *`aos-duration`* | *Duration of animation (ms) | 600 | 400 |
| *`aos-easing`* | Choose timing function to ease elements in different ways | ease-in-sine | ease |
| *`aos-delay`* | Delay animation (ms) | 300 | 0 |
| *`aos-anchor`* | Anchor element, whose offset will be counted to trigger animation instead of actual elements offset | #selector | null |
| *`aos-anchor-placement`* | Anchor placement - which one position of element on the screen should trigger animation | top-center | top-bottom |
| *`aos-once`* | Choose wheter animation should fire once, or every time you scroll up/down to element | true | false |

*Duration accept values from 50 to 3000, with step 50ms, it's because duration of animation is handled by css, and to not make css longer than it is already I created implementations only in this range. I think this should be good for almost all cases.

If not, you may write simple CSS on your page that will add another duration option value available, for example:

```css
  body[aos-duration='4000'] [aos], [aos][aos][aos-duration='4000']{
    transition-duration: 4000ms;
  }
```

This code will add 4000ms duration available for you to set on AOS elements, or to set as global duration while initializing AOS script.

Notice that double `[aos][aos]` - it's not a mistake, it is a trick, to make individual settings more important than global, without need to write ugly "!important" there :)

`aos-anchor-placement` - You can set different placement option on each element, the principle is pretty simple, each anchor-placement option contains two words i.e. `top-center`. This means that animation will be triggered when `top` of element will reach `center` of the window.
`bottom-top` means that animation will be triggered when `bottom` of an element reach `top` of the window, and so on.
Down below you can find list of all anchor-placement options.

####Examples:

```html
  <div aos="fade-zoom-in" aos-offset="200" aos-easing="ease-in-sine" aos-duration="600">
```
```html
  <div aos="flip-left" aos-delay="100" aos-anchor=".example-selector">
```
```html
  <div aos="fade-up" aos-anchor-placement="top-center">
```
####API

AOS object is exposed as global variable, for now there are only two methods available:

  * init
  * refresh

Running:
```javascript
  AOS.refresh();
```
will recalculate all offsets and positions of elements.
It could be handy in older browsers which don't support mutation observer.
By default AOS is watching for DOM changes and if there are any new elements loaded asynchronously or when something is removed from DOM it calls refresh automatically. In older browsers like IE you might need to call `AOS.refresh()` by yourself.

### Global settings

If you don't want to change setting for each element separately, you can change it globally.

To do this, pass options object to `init()` function, like so:

```javascript
  <script>
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  </script>
```

#### Additional configuration

These settings can be set only in options object while initializing AOS.

| Setting | Description | Example value | Default value |
|---------------------------|-------------|---------------|---------|
| *`disable`* | Condition when AOS should be disabled | mobile | false |
| *`startEvent`* | Name of event, on which AOS should be initialized | exampleEvent | DOMContentLoaded |

##### Disabling AOS

If you want to disable AOS on certain device or under any statement you can set `disable` option. Like so:

```javascript
  <script>
    AOS.init({
      disable: 'mobile'
    });
  </script>
```

There are several options that you can use to fit AOS perfectly into your project, you can pass one of three device types:
`mobile` (phones and tablets), `phone` or `tablet`. This will disable AOS on those certains devices. But if you want make your own condition, simple type your statement instead of device type name:

```javascript
  disable: window.innerWidth < 1024
```

There is also posibility to pass a `function`, which should at the end return `true` or `false`:

```javascript
  disable: function () {
    var maxWidth = 1024;
    return window.innerWidth < maxWidth;
  }
```

##### Start event

If you don't want to initialize AOS on `DOMContentLoaded` event, you can pass your own event name and trigger it whenever you want. AOS is listening for this event on `document` element.

```javascript
  <script>
    AOS.init({
      startEvent: 'someCoolEvent'
    });
  </script>
```


### Animations

There are serveral predefined animations you can use already:

  * Fade animations:
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

## Contribution

I use gulp to concatenate JS & CSS and minify it.

First install all gulp dependencies:

```
npm install
```

And run gulp, to start localhost with livereload and tests:

```
gulp
```

Now you're ready to roll.

Head into `/demo` in your browser folder to test your code in real environment.

## Questions

If you have any questions, ideas or whatsoever, please let me know in `issues` or message me directly.

## TODO

* [x] ~~Expanding API with refresh function~~
* [x] ~~Duration customization with global and individual settings~~
* [x] ~~Handle asynchronously loaded elements~~
* [x] ~~Anchor placement option - to choose which place of element in vieport should trigger animation
  i.e. top, bottom, center, center-top, center-bottom~~
