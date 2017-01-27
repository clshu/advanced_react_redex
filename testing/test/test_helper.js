import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// Set up the environment to run like a browser in the command line
// A fake DOM (global in node is like window in browser)
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');

global.window = global.document.defaultView;
global.navigator = global.window.navigator;
// Ask jquery to initialize with fake DOM environment, not seeking browser's
const $ = jquery(window);
// Set up chai-jquery environment
chaiJquery(chai, chai.util, $);

// Build renderComponent helper that should render a given react class
// TestUtil is ReactTestUtils from react-addons-test-utils
// Provider is required to make react component work with Redux
// renderIntoDocument requires ReactDOM to render it
//
// props: the props of ComponentClass
// state: the state of Redux store,
//        which is push down to ComponentClass and become its props too

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  // produce HTML and wrapped as a jquery instance
  return $(ReactDOM.findDOMNode(componentInstance)); 
}

// Build a jquery function to simulate events
// each jquery instance can call function simulate
// e.g. $('.myclass').simulate()
// 
$.fn.simulate = function(eventName, value) {
  // this is the jquery instance that calls simulate()
  if (value) {
    this.val(value);
  }
  // 
  // TestUtils is ReactTestUtils from react-addons-test-utils
  // ReactTestUtils.Simulates simulates events
  // e.g.
  // ReactTestUtils.change
  // ReactTestUtils.click
  //
  // this[0] is the top level element of this 
  TestUtils.Simulate[eventName](this[0]);
};
// expect is directly from chai
export {renderComponent, expect};
