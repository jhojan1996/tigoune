import page from 'page';
import title from 'title';
import empty from 'empty-element';
import template from './template';

page('/listen/:action', (ctx,next)=>{
	//ctx.params.action
	title(ctx.params.action);
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.params.action));
});