# ContentCourseOnline

ContentCourseOnline on Node.js

## Setup Environment

```bash
# Copy Example ENV
$ cp .env.example .env

# Update ENV & Save
$ nano .env
```

## Build Setup

```bash
# Install api dependencies
$ npm install
```

## Database Migration

```bash

# Migrate your database
#(require global "npx" if not, please install $ npm install -g npx )
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```

## Start

```bash
# Serve with hot reload at localhost:5000
$ npm start
```
