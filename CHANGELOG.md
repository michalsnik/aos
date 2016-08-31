# Change Log

## [2.1.0]
- Attach event listener to window instead of document for event `load`

## [2.0.4]

### Fixed
- Fix device detector (tablet setting)

### Changed
- Disable AOS on not supported browsers (<= IE9)
- Clean code around `disable` option
- Rewrite device detector using ES6 Class

## [2.0.3]

### Added
- Add `transform-object-assign` plugin for babel, so Object.assign works in IE

## [2.0.2]

### Fixed
- Fix include in arrays, so it works in IE

## [2.0.1]

### Fixed
- Add easings, after they were accidentaly ignored

## [2.0.0]

### Added
- Add new CHANGELOG
- Add contribution guide
- Add emojis in README
- Add map file for styles

### Changed
- Make `data-aos` attributes the default and only proper ones
- Use maps and loops in Sass
- Replace gulp with webpack
- Rewrite Karma config and use webpack to bundle tests
- Upgrade to ES6
- Update documentation
- Update demos

### Removed
- Remove `aos` attributes
- Remove gulp from build tools

### Fixed
- Improve animations performance
- Fix styles loading in tests

## [1.2.2]
### Fixed
- Fix AOS refreshing on asynchronously loaded elements

## [1.2.1]
### Fixed
- Fix problem with using AOS as node package by setting main file in package.json

## [1.2.0]
### Added
- Add compatibility with module systems

### Fixed
- Fix AOS initializing when DOM is already loaded
