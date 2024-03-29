
// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

import authUser from "../fixtures/auth-user.json";

describe('The Teacher Login Page', () => {
    beforeEach(() => cy.logout())
    it('should enable login with email and password', () => {
        const { email, password} = authUser;
        cy.visit('/');
        cy.contains('Enseignants').click()
        cy.get('input[type=email]').type(email);
        cy.get('#password-enseignant').type(password);
        
        cy.get("form").contains("form",'Soumettre').submit();
        cy.get("#logged-in-user").click()
        cy.contains("Se deconnecter").click()
        cy.contains('Enseignants')
    }),
    it('should login without UI', () => {
        const { email, password} = authUser;
        cy.visit('/');
        cy.login(email, password)
        cy.get("#logged-in-user").should("exist")
    })
})
