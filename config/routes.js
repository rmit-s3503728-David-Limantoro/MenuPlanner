/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /////////////////////
  //// Page Routes ////
  /////////////////////

  'GET /': {
    view: 'homepage'
  },
    
  'GET /recipe': {
    controller: 'RecipeController',
    action: 'loadRecipePage'
  },
    
  'GET /upload': {
    view: 'upload'
  },    

  'GET /result': {
    view: 'result'
  },   

  'Get /login': {
    view:'login'
  },

  'Get /register': {
    view:'register'
  },

  'Get /pwdreset': {
    view:'pwdreset'
  },

  ///////////////////////////
  //// Controller Routes ////
  ///////////////////////////

  // Install routes

  'GET /init': {
    controller: 'DBInitController',
    action: 'init'
  },

  // Recipe Controller routes

  'POST /recipe': {
    controller: 'RecipeController',
    action: 'newRecipe'
  },

  // 'PUT /recipe': {
  //   controller: 'RecipeController',
  //   action: 'updateRecipe'
  // },

  // Search Controller routes

  'POST /get/specific': {
    controller: 'SearchController',
    action: 'getSpecificRecipe'
  },

  'POST /search': {
    controller: 'SearchController',
    action: 'search'
  },

  'POST /dumpAll': {
    controller: 'SearchController',
    action: 'dumpAll'
  },
  
  'POST /loadRecipe': {
    controller: 'SearchController',
    action: 'loadRecipe'
  },

  // Authentication related
  
  'POST /register': {
    controller: 'AuthenticationController',
    action: 'register'
  },
  
  'POST /login': {
    controller: 'AuthenticationController',
    action: 'login'
  },
  
  'GET /logout': {
    controller: 'AuthenticationController',
    action: 'logout'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
