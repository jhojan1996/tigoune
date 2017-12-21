import page from 'page';
import title from 'title';
import empty from 'empty-element';
import header from '../header';
import template from './template';

page('/plan', header, (ctx,next)=>{
	//ctx.params.action
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.params.action));
});