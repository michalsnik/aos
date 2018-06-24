module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {
    console.log(browser, args); // see what all is in here!

    if (browser.name === 'chrome') {
      args.push('--disable-gpu');
      return args;
    }
  });
};
