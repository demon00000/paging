(function($) {
	$.fn.Paging = function(count) {
		var s = document.createElement('div');
		s.id = 'test';
		var opts = $.fn.Paging.defaults;
		var self = this;
		var attrs = self[0].attributes;
		for (var i in attrs) {
			if (opts[i]) {
				opts[i] = attrs[i];
			}
		}
		opts.CurrentPageIndex = getPage();
		var self = this;
		var length = opts.Count / opts.PageSize;
		if (length <= 1) {
			return false;
		}
		var start = 1;
		if (opts.NumericButtonCount % 2 === 1) {
			start = opts.CurrentPageIndex - (opts.NumericButtonCount / 2);
			if (start <= 0) {
				start = 1;
			}
		}
		if (opts.Count % opts.PageSize > 0) {
			length++;
		}
		/*self.addClass(opts.CssClass);*/
		s.className = opts.CssClass;
		if (opts.ShowFirstLast) {
			if (opts.CurrentPageIndex === 1) {
				var first = document.createElement('button');
				first.innerHTML = opts.FirstPageText;
				first.disabled = true;
				s.appendChild(first);
			} else {
				var first = document.createElement('a');
				first.href = createHref('page', 1);
				first.innerHTML = opts.FirstPageText;
				s.appendChild(first);
			}
		}
		if (opts.CurrentPageIndex === 1) {
			var prev = document.createElement('button');
			prev.innerHTML = opts.PrevPageText;
			prev.disabled = true;
			s.appendChild(prev);
		} else {
			var prev = document.createElement('a');
			prev.href = createHref('page', (opts.CurrentPageIndex - 1));
			prev.innerHTML = opts.PrevPageText;
			s.appendChild(prev);
		}

		for (var i = start; i < opts.NumericButtonCount + start; i++) {
			if (i === opts.CurrentPageIndex) {
				var number = document.createElement('a');
				number.href = 'javascript:void(0);';
				number.innerHTML = i;

				s.appendChild(number);
			} else {
				if (length < i) {
					break;
				}
				var number = document.createElement('a');
				number.href = createHref('page', i);
				number.innerHTML = i;
				number.setAttribute('data-value', i);
				s.appendChild(number);
			}
		}
		if (opts.CurrentPageIndex === length) {
			var next = document.createElement('button');
			next.innerHTML = opts.NextPageText;
			next.disabled = true;
			s.appendChild(next);
		} else {
			var next = document.createElement('a');
			next.href = createHref('page', (parseInt(opts.CurrentPageIndex) + 1));
			next.innerHTML = opts.NextPageText;
			s.appendChild(next);
		}
		if (opts.ShowFirstLast) {
			if (opts.CurrentPageIndex === length) {
				var last = document.createElement('button');
				last.innerHTML = opts.LastPageText;
				last.disabled = true;
				s.appendChild(last);
			} else {
				var last = document.createElement('a');
				last.href = createHref('page', length);
				last.innerHTML = opts.LastPageText;
				s.appendChild(last);
			}
		}
		$('script[type="text/paging"]').after(s);
	}

	function createHref(name, val) {
		var params = getQueryString();
		if (!params[name]) {
			params[name] = {};
			params[name].value = val;
		} else {
			params[name].value = val;
		}
		var href = location.pathname + '?';
		for (var i in params) {
			href += i + '=' + params[i].value + '&';
		}
		return href.substring(0, href.length - 1);
	}

	function getQueryString() {
		var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
		var r = {};
		for (var i = 0; i < result.length; i++) {
			var temp = result[i].substring(1);
			r[temp.split('=')[0]] = {};
			r[temp.split('=')[0]].value = temp.split('=')[1];
		}
		return r;
	}
	$.fn.Paging.defaults = {
		FirstPageText: '首页',
		LastPageText: '尾页',
		PageSize: 15,
		Count: 0,
		CssClass: 'cssclass',
		NextPageText: '下一页',
		PrevPageText: '上一页',
		ShowFirstLast: true,
		NumericButtonCount: 10,
		CurrentageButtonPosition: 'Beginning,End,Center,Fixec',
		Target: '',
		CurrentPageIndex: 1
	};
})(jQuery);

function getPage() {
	var page = $cd.getQueryStringByName('page');
	if (page === '') {
		page = 1;
	}
	return page;
}