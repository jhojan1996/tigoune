import page from 'page';
import empty from 'empty-element';
import title from 'title';
import template from './template';

page('/', (ctx,next)=>{
	title('Tigo voz');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template());
});