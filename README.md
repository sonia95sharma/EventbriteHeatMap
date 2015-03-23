Sonia Sharma Evenbrite Coding Challenge Option 2
_________________________________________________

This app was written in Angular.js. Extensive use was made of the leaflet.js library and its angular wrappers to generate the heatmap. I used the ng-boilerplate to accelerate my dev cycle, as its part of my normal workflow.   

A. Installation
  1. ngBoilerplate uses Grunt as its build system, so Node.js is required. In order for the built system to find Grunt, we require Karma and Bower. Once you have Node.js installed, you can run this command to install Grunt, Karma, and Bower: $ npm -g install grunt-cli karma bower
	2. To run to the app, you have to serve the build folder via an http server. I recommend the npm package http-server. Install http-server by running npm install -g http-server. (Assuming you have npm installed). If this doesn't work, try sudo install -g http-server.
B. Running the app
  1. cd into to the repository "EventbriteHeatMap" and run the commmand: grunt
	2. cd into the build folder and run http-server via the command line.
	3. Point your web browser (Chrome or Firefox is recommended) to localhost:8080

C. Important Code
  1.The key files to look at are build/src/app/home/home.js and home.tpl.html.
	
D. Using the app
  1. Type in a city name into the search bar (I recommend San Francisco)
  2. After the heat map appears, you can click on "Show Pins" in order to see all the events individually. To learn the name of an event, hover over it's pin.
D. Using the app
1. Type in a city name into the search bar (I recommend San Francisco)
2. After the heat map appears, you can click on "Show Pins" in order to see all the events individually. To learn the name of an event, hover over it's pin. 
