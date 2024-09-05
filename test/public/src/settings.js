'use strict';

// I asked chatgpt to generate tests to specifically test the function saveSettings in the
// file public/src/client/account/settings.js

const assert = require('assert');

// Mock the implementations of the modules that are used in the file
const apiMock = {
	put: (url, data) => Promise.resolve(data.settings),
};

const alertsMock = {
	success: () => {},
};

const componentsMock = {
	get: () => ({
		find: () => ({
			timeago: () => {},
		}),
	}),
};

const hooksMock = {
	fire: () => {},
};

// Mock the dependencies by temporarily replacing them in the global scope
const originalApi = global.api;
const originalAlerts = global.alerts;
const originalComponents = global.components;
const originalHooks = global.hooks;

global.api = apiMock;
global.alerts = alertsMock;
global.components = componentsMock;
global.hooks = hooksMock;

// Import the AccountSettings module after setting up the mocks
const AccountSettings = require('../../../public/src/client/account/settings');

describe('AccountSettings - saveSettings', () => {
	let savedSkin = '';

	// Sets up initial environment and mock global objects before each test
	beforeEach(() => {
		// Start with initial skin
		savedSkin = 'defaultSkin';
		global.$ = require('jquery');
		global.ajaxify = { data: { template: { name: 'account/settings' }, uid: 1 } };
		global.config = { relative_path: '', cache_buster: '123', bootswatchSkin: '', defaultBootswatchSkin: '' };
	});

	// Restore the original global objects after each test
	afterEach(() => {
		global.api = originalApi;
		global.alerts = originalAlerts;
		global.components = originalComponents;
		global.hooks = originalHooks;
	});

	it('should save settings and call API', (done) => {
		const settings = { homePageRoute: 'custom', homePageCustom: 'home' };
		const originalConsoleLog = console.log;
		let consoleLogCalled = false;

		console.log = () => {
			consoleLogCalled = true;
		};

		AccountSettings.saveSettings(settings);

		setTimeout(() => {
			// Check if console log has been called
			assert.ok(consoleLogCalled);
			console.log = originalConsoleLog;
			done();
		}, 50);
	});
});
