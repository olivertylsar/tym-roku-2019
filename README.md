<h1 align="center">
  Tým roku 2019 / Team of the year 2019
</h1>
<p align="center"><a href="https://tymroku.olivertylsar.cz">Live demo</a></p>
<p align="center">
A concept for a Team of the year selection built with <a href="https://www.reactjs.org/" target="_blank">React</a> and deployed on <a href="https://www.netlify.com/" target="_blank">Netlify</a>
</p>
<p align="center">
  Language: Czech <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emojione/211/flag-for-czech-republic_1f1e8-1f1ff.png" alt="Czech flag" width=15 />
</p>
<p align="center">
  <img src="https://api.netlify.com/api/v1/badges/6f9479ad-bd2c-4fae-b26f-b6cd524df704/deploy-status" alt="Netlify Status" />
</p>


This project is based on [Create React App](https://github.com/facebook/create-react-app).
> For personal purposes only.

A few things I have used to build it and why:
- React 16.12.0
  - create-react-app allowed me to start really quickly without having to deal with all the boilerplate and ecosystem around React manually
- CSS3
  - I decided not to include Bootstrap or other "CSS framework" for this project, why? 
    - to keep the visuals clean and unique to this project
    - to challenge my CSS skills and practice using CSS Grid and Flex for layout
    - I wanted to define all my CSS classes and use [BEM](http://getbem.com/introduction/) notation adjusted to React components' naming whenever possible
- Sass preprocessor using SCSS syntax
  - great way to style an application from scratch, if you're not familiar with CSS-in-JS libraries (i.e. styled-components) yet
  - I prefer SCSS syntax over Sass syntax all day long due to its readability
- Netlify
  - Deploying a basic FE application from github can't get any easier than this
