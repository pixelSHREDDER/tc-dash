const dataUrl = Cypress.env('dataUrl');

describe('instance', () => {
    beforeEach(() => {
        cy.fixture('instance/getBeforeAdd.json').as('instanceJSON');
        cy.fixture('instance/add.json').as('addInstanceJSON');
        cy.fixture('instance/getAfterAdd.json').as('addedJSON');
        cy.fixture('instance/update.json').as('updateInstanceJSON');
        cy.fixture('instance/getAfterUpdate.json').as('updatedJSON');

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
          const callbackUrl = `/callback#access_token=${ access_token }&scope=openid&id_token=${ id_token }&expires_in=${ expires_in }&token_type=Bearer&state=${ auth0State.state }`;
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
      });
    it('should add a new instance', () => {
        cy.server();
        //cy.route('GET', `${ dataUrl }/instance/abc123`, '@instanceJSON').as('getInstance');
        //cy.route('POST', `${ dataUrl }/instance/abc123`, '@addInstanceJSON').as('addInstance');
        cy.route('GET', `${ dataUrl }/instance/auth0|C5c95bb5c35fe964ea01ca7d3`, '@instanceJSON').as('getInstance');
        cy.route('POST', `${ dataUrl }/instance/auth0|C5c95bb5c35fe964ea01ca7d3`, '@addInstanceJSON').as('addInstance');
    });
    it('should retrieve the newly added instance', () => {
        cy.server();
        //cy.route('GET', `${ dataUrl }/instance/abc123`, '@instanceJSON').as('getInstance');
        cy.route('GET', `${ dataUrl }/instance/auth0|C5c95bb5c35fe964ea01ca7d3`, '@instanceJSON').as('getInstance');
    });
    it('should update the instance', () => {
        cy.server();
        //cy.route('GET', `${ dataUrl }/instance/abc123`, '@addedJSON').as('getInstance');
        //cy.route('POST', `${ dataUrl }/instance/abc123`, '@updateInstanceJSON').as('updateInstance');
        cy.route('GET', `${ dataUrl }/instance/auth0|C5c95bb5c35fe964ea01ca7d3`, '@addedJSON').as('getInstance');
        cy.route('POST', `${ dataUrl }/instance/auth0|C5c95bb5c35fe964ea01ca7d3`, '@updateInstanceJSON').as('updateInstance');
    });
    it('should retrieve the newly updated instance', () => {
        cy.server();
        //cy.route('GET', `${ dataUrl }/instance/abc123`, '@updatedJSON').as('getInstance');
        cy.route('GET', `${ dataUrl }/instance/auth0|C5c95bb5c35fe964ea01ca7d3`, '@updatedJSON').as('getInstance');
    });
});
/*describe('getInstance', () => {
    beforeEach(() => {
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
          const callbackUrl = `/callback#access_token=${ access_token }&scope=openid&id_token=${ id_token }&expires_in=${ expires_in }&token_type=Bearer&state=${ auth0State.state }`;
          cy.visit(callbackUrl, {
            onBeforeLoad(win) {
              win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
            }
          });
        })
    });
    it('should successfully retrieve data for the logged in user\'s instance', () => {
      cy.request({
          method: 'get',
          followRedirect: false,
          log: true,
          url: 'http://localhost:3000/api/instance',
          headers: {
            'accept': 'application/json'
          },
          response: []
      }).then((response) => {
            cy.log(response.body);
            assert.equal(response.status, 200);
            expect(response.body).to.not.be.null;
      })
    });
  });*/