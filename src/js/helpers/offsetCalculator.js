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
import { getElementHeight, getElementOffset } from './container';

export const getPositionIn = (
  el,
  container,
  defaultOffset,
  defaultAnchorPlacement
) => {
  const containerHeight = getElementHeight(container);
  const anchor = getInlineOption(el, 'anchor');
  const inlineAnchorPlacement = getInlineOption(el, 'anchor-placement');
  const additionalOffset = Number(
    getInlineOption(el, 'offset', inlineAnchorPlacement ? 0 : defaultOffset)
  );
  const anchorPlacement = inlineAnchorPlacement || defaultAnchorPlacement;
  let finalEl = el;

  if (anchor && container === window && document.querySelector(anchor)) {
    finalEl = document.querySelector(anchor);
  } else if (anchor && container.querySelector(anchor)) {
    finalEl = container.querySelector(anchor);
  }

  let triggerPoint = getOffset(finalEl, container).top - containerHeight;

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
      triggerPoint += containerHeight / 2;
      break;
    case 'center-center':
      triggerPoint += containerHeight / 2 + finalEl.offsetHeight / 2;
      break;
    case 'bottom-center':
      triggerPoint += containerHeight / 2 + finalEl.offsetHeight;
      break;
    case 'top-top':
      triggerPoint += containerHeight;
      break;
    case 'bottom-top':
      triggerPoint += containerHeight + finalEl.offsetHeight;
      break;
    case 'center-top':
      triggerPoint += containerHeight + finalEl.offsetHeight / 2;
      break;
  }

  return triggerPoint + additionalOffset;
};

export const getPositionOut = (el, container, defaultOffset) => {
  const anchor = getInlineOption(el, 'anchor');
  const additionalOffset = getInlineOption(el, 'offset', defaultOffset);
  let finalEl = el;

  if (anchor && container === window && document.querySelector(anchor)) {
    finalEl = document.querySelector(anchor);
  } else if (anchor && container.querySelector(anchor)) {
    finalEl = container.querySelector(anchor);
  }

  const elementOffsetTop = getOffset(finalEl, container).top;

  return elementOffsetTop + finalEl.offsetHeight - additionalOffset;
};
