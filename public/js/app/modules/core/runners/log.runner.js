

define (['./module'], function(runners) {
	runners
		.run(['$log'], function($log) {
			$log.info('core module: started');
		});
});