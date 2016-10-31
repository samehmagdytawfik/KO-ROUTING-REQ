define(["knockout", "crossroads", "hasher",'jquery'], function(ko, crossroads, hasher,$) {

    // This module configures crossroads.js, a routing library. If you prefer, you
    // can use any other routing library (or none at all) as Knockout is designed to
    // compose cleanly with external libraries.
    //
    // You *don't* have to follow the pattern established here (each route entry
    // specifies a 'page', which is a Knockout component) - there's nothing built into
    // Knockout that requires or even knows about this technique. It's just one of
    // many possible ways of setting up client-side routes.

    return new Router({
        routes: [
            { url: '',          params: { page: 'home-page' } },
            { url: 'about',     params: { page: 'about-page' } },
            { url: 'contact',     params: { page: 'ContactUs-page' } },
            { url: 'nav',     params: { page: 'Navigation-page' } }

                ]
    });
    



    function isUserAuthenticated() {
        return false;
    }
    
    function Router(config) {
        
        var currentRoute = this.currentRoute = ko.observable({});

        ko.utils.arrayForEach(config.routes, function(route) {
            crossroads.addRoute(route.url, function(requestParams) {
                currentRoute(ko.utils.extend(requestParams, route.params));
                 //authenticate code should be here
                 if(!isUserAuthenticated())
                 {
                 window.location.href = "login";
                 }  
                 });

            
        });
crossroads.routed.add(console.log, console); //log all routes
crossroads.addRoute('/login', isUserAuthenticated());
crossroads.addRoute('/contact/{id}', function(id){
  console.log(id);
});


        activateCrossroads();
    }




    function activateCrossroads() {
        function parseHash(newHash, oldHash) { crossroads.parse(newHash); }
        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();
    }
});