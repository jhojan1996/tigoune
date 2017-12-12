const yo = require('yo-yo');
const empty = require('empty-element');

const el = yo`
	<nav class='header'>
		<div class='nav-wrapper'>
			<div class='container'>
				<div class='row'>
					<div class='col s1 m6'>
						<a href='#' class='btn btn-large btn-flat dropdown-button btn-nb'>
							<i class="fa fa-bars blue-icons" aria-hidden="true"></i>
						</a>
						<a href='/' class='brand-logo'><img src='images/tigo.png' class='tigoune'/></a>
					</div>
					<div class='col s1 m2 push-s5 push-m4'>
						<a href='#' class='btn btn-large btn-flat dropdown-button btn-nb' data-activates='drop-user'>
							<i class='fa fa-user-o blue-icons' aria-hidden='true'></i>
						</a>
						<ul id='drop-user' class='dropdown-content'>
							<li><a href='#'>Salir</a></li>
						</ul>
						<a href='/listen/0' class='btn btn-large btn-flat btn-nb'>
							<i class="fa fa-microphone blue-icons" aria-hidden="true"></i>
						</a>
					</div>
				</div>
			</div>
		</div>'
	</nav>`;

module.exports = function(ctx, next){
	var container = document.getElementById("header-container");
	empty(container).appendChild(el);
	next();
}
