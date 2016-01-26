var parser  = require('postcss-selector-parser')(function () {});
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-to-nest', function () {
	return function (css) {
		var newcss = {
			atRule: postcss.root(),
			selectors: {}
		};

		// for each rule
		var index = -1;
		var rule;

		while (rule = css.nodes[++index]) {
			if (rule.type !== 'rule') {
				continue;
			}

			if (rule.selectors.length !== 1) {
				continue;
			}

			var selector = parser.process(rule.selector).res.nodes[0];

			// link to the original newcss root
			var combinator = '';

			// cache current newcss
			var current = newcss;

			// for each part of the selector
			selector.each(function (node) {
				// build up the selector string
				var string = node.toString();

				if (node.type === 'combinator') {
					// append combinators to the existing selector
					combinator += string;

					return;
				}

				// build up the selector string
				string = combinator + string;

				// clear the combinator
				combinator = '';

				if (!(string in current.selectors)) {
					var newrule;

					if (current === newcss) {
						newrule = postcss.rule({
							selector: string
						});

						rule.replaceWith(newrule);

						current.atRule.nodes.push(newrule);

						++index;
					} else {
						newrule = postcss.atRule({
							name: 'nest',
							params: '&' + string
						});

						current.atRule.append(newrule);
					}

					current.selectors[string] = {
						atRule: newrule,
						selectors: {}
					};
				}

				current = current.selectors[string];
			});

			rule.remove();

			--index;

			current.atRule.append(rule.nodes);
		}

		sortNestedRules(newcss.atRule);
	};
});

function sortNestedRules(atRule) {
	if (atRule.nodes) {
		if (atRule.nodes.length === 1) {
			var node = atRule.nodes[0];

			if (/^(atrule|root|rule)$/.test(node.type)) {
				sortNestedRules(node);
			}
		} else {
			atRule.nodes.sort(function (a, b) {
				var aRule = a.type === 'atrule';
				var bRule = b.type === 'atrule';

				return aRule && bRule ? 0 : aRule ? 1 : bRule ? -1 : 0;
			}).forEach(function (childNode) {
				if (childNode.type === 'atrule') {
					sortNestedRules(childNode);
				}
			});
		}
	}
}
