
// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

import authUser from "../fixtures/auth-user.json";

describe('The Login Page', () => {
    beforeEach(() => cy.logout())
    it('should login with email and password', () => {
        const { email, password, username} = authUser;
        cy.visit('/');
        cy.contains('Enseignants').click()
        cy.get('input[type=email]').type(email);
        cy.get('input[type=password]').type(password);
        
        cy.get("form").contains("form",'Soumettre').submit();
        cy.contains(username).click()
        cy.contains("Se deconnecter").click()
        cy.contains('Enseignants')
    }),
    it('should login without UI', () => {
        const { email, password, username} = authUser;
        cy.visit('/');
        cy.login(email, password)
        cy.contains(username)
    })
})
