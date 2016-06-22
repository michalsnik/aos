# Contributing to AOS

## Bugs

Found a bug? Have a problem with AOS? Please check past issues, maybe someone already had that problem. If you don't find similar issue create new, but remember to add accurate informations so that I can dig into it straight away. If it's possible add CodePen example that presents called issue.

## Development process

AOS is built using webpack.

### Setup

- Install all dependencies: 
  
  ```
  npm install
  ```

- Run dev server:
  
  ```
  npm run dev
  ```

  This will run local webpack-dev-server and build AOS automatically.

- Open browser and head to: 
  [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)
  Server loads content from `demo` folder.
  
Now you are ready to play with AOS. Browser should reload automatically as you change code in `src` folder.

### Testing

Before you create Pull Request make sure all tests are passing.

In order to do so run:
```
npm test
```

### Commiting changes

If all tests are passing then you're good to go. Commit your changes, but remember to **not commit `dist` folder**.
Create well described Pull Request with as many informations as possible and wait for my answer :) I'd be happy to make a code review and put some thougths.
