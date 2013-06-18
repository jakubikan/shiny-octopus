(function($) {
    $(document).ready(function() {
        var $page = $('body'),
            application = new Tc.Application($page);

        application.registerModules();
        application.start();
		
    });
})(Tc.$);



