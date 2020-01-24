/// <reference types="cypress" />
/* eslint-disable react/jsx-filename-extension */
//import 'cypress-react-unit-test'
import React from 'react'
//import { render } from '@testing-library/react'
/* global chai */
import Adapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'
import { configure, shallow } from 'enzyme'

import AppFrame from '../../../../../src/AppFrame/AppFrame'

const dataUrl = Cypress.env('dataUrl');

// HACK: chai-enzyme does not play nice with chai-jquery, so remove the
// problem-causing assertions that collide with chai-jquery
'visible hidden selected checked enabled disabled'.split(' ').forEach((selector) => {
    Object.defineProperty(chai.Assertion.prototype, selector, { get: () => {} })
  })
  
  // Cypress automatically exposes the 'chai'
  // global to all spec files. This enables us
  // to extend chai with enzyme specific assertions
  // for this one spec file.
  //
  // Alternatively we could move this configuration
  // into cypress/support/assertions to enable all
  // spec files to use these chai-enzyme assertions
  chai.use(chaiEnzyme())
  
  // This could also be moved under cypress/support if
  // using enzyme in multiple tests
  configure({ adapter: new Adapter() })

describe('app-frame-unit-test', function () {
    context('<AppFrame />', function () {
        beforeEach(() => {
            //cy.visit('/');
            cy.fixture('instance/get.json').as('instanceJSON');

            cy.login()
            .then((resp) => {
            return resp.body;
            })
            .then((body) => {
            const {access_token, expires_in, id_token} = body;
            const auth0State = {
                nonce: '',
                state: 'some-random-state'
            };
            //const callbackUrl = `/callback#access_token=${ access_token }&scope=openid&id_token=${ id_token }&expires_in=${ expires_in }&token_type=Bearer&state=${ auth0State.state }`;
            const callbackUrl = `/callback#access_token=${ access_token }&scope=openid%20profile%20email&id_token=${ id_token }&expires_in=${ expires_in }&token_type=Bearer&state=${ auth0State.state }`;
            cy.visit(callbackUrl, {
                onBeforeLoad(win) {
                win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
                }
            });
            });
        
            cy.server();
            //cy.route('GET', `${ dataUrl }/instance/abc123`, '@instanceJSON').as('getInstance');
            cy.route('GET', `${ dataUrl }/instance/auth0|C5c95bb5c35fe964ea01ca7d3`, '@instanceJSON').as('getInstance');
            cy.visit('/');
            cy.wait('@getInstance');

            cy.on('uncaught:exception', (err, runnable) => {
                console.log(err);
                //expect(err.message).to.include('something about the error')
            
                // using mocha's async done callback to finish
                // this test so we prove that an uncaught exception
                // was thrown
                //done()
            
                // return false to prevent the error from
                // failing this test
                return false
            })
        })

        it('hides App Frame on mount', () => {
            //cy.mount(<AppFrame handleLogOut={() => {}} pathname="/" />)
            const component = shallow(<AppFrame handleLogOut={() => {}} pathname="/" />)
            expect(component.find('.MuiDrawer-modal')).to.have.length(0)
            //component.get('.MuiDrawer-modal')
            //.should('have.length', 0)
        })    
        /*it('shows App Frame on menu button click', () => {
            cy.mount(<AppFrame />)
            .get('.makeStyles-menuButton-5')
            .click()
            .get('.MuiDrawer-modal')
            .should('have.length', 1)
        })
        it('hides App Frame on click', () => {
            cy.mount(<AppFrame />)
            .get('.makeStyles-menuButton-5')
            .click()
            .get('.MuiDrawer-modal')
            .should('have.length', 1)
            .get('.makeStyles-menuButton-5')
            .click()
            .get('.MuiDrawer-modal')
            .should('have.length', 0)
        })*/
    })
})