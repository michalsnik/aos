/**
 * Calculate offset
 * basing on element's settings like:
 * - anchor
 * - offset
 *
 * @param  {Node} el [Dom element]
 * @return {Integer} [Final offset that will be used to trigger animation in good position]
 */

import getOffset from './../libs/offset';
import getInlineOption from './getInlineOption';

export const getPositionIn = (el, defaultOffset, defaultAnchorPlacement) => {
  const windowHeight = window.innerHeight;
  const anchor = getInlineOption(el, 'anchor');
  const inlineAnchorPlacement = getInlineOption(el, 'anchor-placement');
  const additionalOffset = Number(
    getInlineOption(el, 'offset', inlineAnchorPlacement ? 0 : defaultOffset)
  );
  const anchorPlacement = inlineAnchorPlacement || defaultAnchorPlacement;
  let finalEl = el;

  if (anchor && document.querySelectorAll(anchor)) {
    finalEl = document.querySelectorAll(anchor)[0];
  }

  let triggerPoint = getOffset(finalEl).top - windowHeight;

  switch (anchorPlacement) {
    case 'top-bottom':
      // Default offset
      break;
    case 'center-bottom':
      triggerPoint += finalEl.offsetHeight / 2;
      break;
    case 'bottom-bottom':
      triggerPoint += finalEl.offsetHeight;
      break;
    case 'top-center':
      triggerPoint += windowHeight / 2;
      break;
    case 'center-center':
      triggerPoint += windowHeight / 2 + finalEl.offsetHeight / 2;
      break;
    case 'bottom-center':
      triggerPoint += windowHeight / 2 + finalEl.offsetHeight;
      break;
    case 'top-top':
      triggerPoint += windowHeight;
      break;
    case 'bottom-top':
      triggerPoint += windowHeight + finalEl.offsetHeight;
      break;
    case 'center-top':
      triggerPoint += windowHeight + finalEl.offsetHeight / 2;
      break;
  }

  return triggerPoint + additionalOffset;
};

export const getPositionOut = (el, defaultOffset) => {
  const windowHeight = window.innerHeight;
  const anchor = getInlineOption(el, 'anchor');
  const additionalOffset = getInlineOption(el, 'offset', defaultOffset);
  let finalEl = el;

  if (anchor && document.querySelectorAll(anchor)) {
    finalEl = document.querySelectorAll(anchor)[0];
  }

  const elementOffsetTop = getOffset(finalEl).top;

  return elementOffsetTop + finalEl.offsetHeight - additionalOffset;
};
