# AOS - Animate on scroll library

Small library to animate elements on your page as you scroll.

You may say it's like WOWJS, yeah - you're right, effect is similar to WOWJS, but i had different idea how to make such a plugin, so here it is. CSS3 driven scroll animation library. It's even smaller than already small WOWJS library.

AOS allows you to animate elements as you scroll down, and up.
If you scroll back to top, element will animate to it's previous state and is ready to animate again if you scroll down.

## Requirements

* Jquery >= 1.8.3

## Setup

### Link styles

```html
  <link rel="stylesheet" href="css/aos.css" />
```

### Add scripts

```html
  <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="js/aos.js"></script>
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

  Down below is a list of all available animations for now :)

### Advanced settings

| Attribute | Description | Example value | Default value |
|---------------------------|-------------|---------------|---------|
| *`aos-offset`* | Change offset to trigger animations sooner or later (px) | 200 | 120 |
| *`aos-duration`* | *Duration of animation (ms) | 600 | 400 |
| *`aos-easing`* | Choose timing function to ease elements in different ways | ease-in-sine | ease |
| *`aos-delay`* | Delay animation (ms) | 300 | 0 |
| *`aos-anchor`* | Anchor element, whose offset will be counted to trigger animation instead of actual elements offset | #selector | null |

*Duration accept values from 50 to 3000, with step 50ms, it's because duration of animation is handled by css, and to not make css longer than it is already I created implementations only in this range. I think this should be good for almost all cases.

If not, you may write simple CSS on your page that will add another duration option value available, for example:

```css
  body[aos-duration='4000'] [aos], [aos][aos][aos-duration='4000']{
    transition-duration: 4000ms;
  }
```

This code will add 4000ms duration available for you to set on AOS elements, or to set as global duration while initializing AOS script.

Notice that double `[aos][aos]` - it's not a mistake, it is a trick, to make individual settings more important than global, without need to write ugly "!important" there :)

####Examples:

```html
  <div aos="fade-zoom-in" aos-offset="200" aos-easing="ease-in-sine" aos-duration="600">
```
```html
  <div aos="flip-left" aos-delay="100" aos-anchor=".example-selector">
```

### Global settings

If you don't want to change setting for each element separately, you can change it globally.

To do this, pass options object to `init()` function, like so:

```javascript
  <script>
    AOS.init({
      offset: 200,
      duration: 600
      easing: 'ease-in-sine',
      delay: 100,
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

And run gulp, to start localhost with livereload:

```
gulp
```

Now you're ready to roll.

Head into `/demo` in your browser folder to test your code in real environment.

## TODO

* [x] ~~Expanding API with refresh function~~
* [x] ~~Duration customization with global and individual settings~~
* [ ] Handle asynchronously loaded elements
* [ ] Watch nodes to recalculate offsets if their position changed
* [ ] Anchor placement option - to choose which place of element in vieport should trigger animation
  i.e. top, bottom, center, center-top, center-bottom