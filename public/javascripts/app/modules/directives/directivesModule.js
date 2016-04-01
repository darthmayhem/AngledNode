
define(function() {
	var directivesModule = angular.module('directivesModule', []);

	directivesModule.directive('checkStrength', function () {

		return {
			replace: false,
			restrict: 'EACM',
			scope: { model: '=checkStrength' },
			link: function (scope, element, attrs) {
				var strength = {
					colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
                    labels: ['very weak', 'weak', 'medium', 'strong', 'very strong'],
					mesureStrength: function (p) {
						var _force = 0;
						var _regex = /[$-/:-?{-~!"^_`\[\]]/g; //" (Commentaire juste là pour pas pourrir la coloration sous Sublime...)

						var _lowerLetters = /[a-z]+/.test(p);
						var _upperLetters = /[A-Z]+/.test(p);
						var _numbers = /[0-9]+/.test(p);
						var _symbols = _regex.test(p);

						var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
						var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;

						_force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
						_force += _passedMatches * 10;

						// penality (short password)
						_force = (p.length <= 6) ? Math.min(_force, 10) : _force;

						// penality (poor variety of characters)
						_force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
						_force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
						_force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;

						return _force;
					},
					getColor: function (s) {
						var idx = 0;
						if (s <= 10) { idx = 0; }
						else if (s <= 20) { idx = 1; }
						else if (s <= 30) { idx = 2; }
						else if (s <= 40) { idx = 3; }
						else { idx = 4; }

						return { idx: idx + 1, col: this.colors[idx] };
					},
                    getLabel: function (s) {
                        var idx = 0;
                        if (s <= 10) { idx = 0; }
                        else if (s <= 20) { idx = 1; }
                        else if (s <= 30) { idx = 2; }
                        else if (s <= 40) { idx = 3; }
                        else { idx = 4; }

                        return { idx: idx + 1, col: this.labels[idx] };
                    }
				};

				scope.$watch('model', function (newValue, oldValue) {
					if (!newValue || newValue === '') {
						element.css({ "display": "none"  });
					} else {
                        var s = strength.mesureStrength(newValue);
						var c = strength.getColor(s);
                        var l = strength.getLabel(s);
						element.css({ "display": "inline" });
						element.children('ul').children('li')
							.css({ "background": "#DDD" })
							.slice(0, c.idx)
							.css({ "background": c.col });
                        element.children('ul').children('li')
                            .slice(0, s.idx)
                            .text(l.col);
					}
				});

			},
			template: '<ul style="display:inline"><li class="label">strength</li></ul>'
		};

	});

	directivesModule.run(['$log', function($log) {
		$log.info('Initialized the directivesModule');
	}]);
});