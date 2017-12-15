const yo = require('yo-yo');
const empty = require('empty-element');

const el = yo`
<nav>
	<div class="nav-wrapper custom-bg">
  		<a href="#!" class="logo-tigo"><img src='/images/tigo.png' class='logo-tigo' /></a>
  		<ul class="right hide-on-med-and-down icon-size">
    		<li><a href="#"><i class="fa fa-question-circle-o" aria-hidden="true"></i></a></li>
    		<li><a href="#"><i class="fa fa-times" aria-hidden="true"></i></a></li>
  		</ul>
	</div>
</nav>
`;

module.exports = function(ctx, next){
	var container = document.getElementById("header-container");
	empty(container).appendChild(el);
	next();
}
