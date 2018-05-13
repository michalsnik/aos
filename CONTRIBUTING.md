# Contributing to AOS

## Bugs

Found a bug? Have a problem with AOS? Please check past issues, maybe someone already had that problem. If you don't find similar issue create new, but remember to add accurate informations so that I can dig into it straight away. If it's possible add CodePen example that presents called issue.

## Development process

### Setup

- Install all dependencies: 
  
  ```
  yarn
  ```

- Run rollup and dev server in watch mode:
  
  ```
  yarn dev
  ```

  This will run [local-server](http://localhost:8080), build AOS and automatically refresh page on any changes (it loads content from `demo` folder).

### Testing

Before you create Pull Request make sure all tests are passing.

In order to do so run:
```
yarn test
```

If you want to run tests while working on the plugin (when local-server is running on), run:
```
yarn test:dev
```

### Commiting changes

If all tests are passing then you're good to go. Commit your changes, but remember to **not commit `dist` folder**.
Create well described Pull Request with as many informations as possible and wait for my answer :) I'd be happy to make a code review and put some thougths.
