[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/umbertoDifa/empatica-dashboard)

# empatica-dashboard

A dashboard to explore and visualize real time empatica apps downloads. Click to visit
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://empatica-dashboard-2228d.web.app/)

# Demo

[Have a look!](https://youtu.be/uZjW0XZyN4A)

# Documentation

Explanation of my thought process, technologies and challenges can be found
[here](https://docs.google.com/presentation/d/1lh1E_yPY6jSWDKwv3oe0Gx6ewC-MsndIzEtsKEM5LCA/edit?usp=sharing)

# How to run

### Old-fashioned

- Download repo
- `docker-compose up`
- Visit [localhost:4000](localhost:4000)

### New trend!

- Click on the gitpod badge above
- The environment will be created and you'll be able to
  1. See the live app
  2. Make any change

## Commands

```bash
# build for production
yarn build

# development mode
yarn dev

# run frontend unit tests
yarn test

# serve the bundled dist folder in production mode
yarn serve

# run backend test from functions folder
npm run test

# deploy backend
firebase deploy --only functions

# deploy frontend
firebase deploy --only hosting
```

---
