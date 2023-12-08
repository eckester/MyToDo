# MyToDo

Product Vision: For college students who need to be organized, OnTrack is a to do list that caters to a college student’s schedule. Unlike reminders, paper to-do lists, google calendar, etc, our product allows for prioritization, tasks categorization, and filtration.

Description: Users have the ability to add tasks with name, priority, category (Work, School, Other), optional label (like class) and due date. These tasks appear as cards sorted by due date into three columns and can be filtered by priority using the drop down, or by category using the sidebar navigation. Users can cross out tasks by clicking the text or delete them from view entirely by clicking the checkmark icon. Each user can keep their tasks saved with logging in. OnTrack functions as a useful organization tool for students to keep track of their assignemnts, work tasks, and other responsibilities.

## UI Prototype

[Link](https://www.figma.com/proto/Zbvx0ihzM9d1PSOnWdikep/OnTrack?type=design&node-id=68-811&t=NdmSOxs5GdzR3Yce-1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=68%3A811&mode=design) to our UI prototype (last updated Nov 8)

# Contributing

## Code Standards

We are following the default Prettier code style, with no changes to the default guidelines.

We are using the eslint/recommmended.

- in the eslintrc.json file, under the "extends" section, include "plugin:react/recommended" and "plugin:prettier/recommended".

To connect eslint and prettier, on command line run:

- npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev

## IDE Plugins

The only IDE used by some members of this project is VS Code, please refer to official documentations for other IDE's.

For VS Code:

- Install Prettier, Search for "Prettier - Code formatter" in the VS Code Extensions marketplace and install it.
- Under Preferences: Search "Open User Settings", then search and check "format on save"
- If you have other formatters: Search "Format Document", then select prettier as default

Note: if you are not using an IDE, please refer to official documentation for running eslint and prettier on the command line.

# Development

## React and Node JS
- Clone our repository onto you local computer: git clone https://github.com/eckester/MyToDo.git
- Run npm install 
- Run npm install bcryptjs
- Run npm install react-big-calendar
- Run npm install @mui/material @emotion/react @emotion/styled

## CI/CD

## Mongo DB
This environment utilizes mongoDB. 
There is nothing to do to be connected to the database. 

