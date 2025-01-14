import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('four-oh-four');
  this.route('denali-loader');
  this.route('denali-title');
  this.route('denali-radio');
  this.route('denali-toggle');
  this.route('denali-radio-toggle');
  this.route('denali-menu');
  this.route('denali-link');
  this.route('denali-modal');
  this.route('denali-switch');
  this.route('denali-tabs');
  this.route('denali-tag');
  this.route('denali-select');
  this.route('denali-input-group');
  this.route('denali-text-area');
});
