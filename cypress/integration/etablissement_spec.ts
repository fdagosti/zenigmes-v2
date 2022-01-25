describe("The etablissement options", () => {
    beforeEach(() => cy.logout())
    it("should be correctly displayed in the register page", () => {
        cy.visit("/register-enseignant")
        cy.get('#pays').children().should('have.length', 3)
        cy.get('#pays').select(1).should("have.value", "USA")
        cy.get('#pays').select(2).should("have.value", "CANADA")
        cy.get('#pays').select('CANADA')
        cy.get('#ville').select(1).should("have.value", "Calgary")
        cy.get('#etablissement').select(1).should("have.value", "Lycée international de Calgary")

    }),
    it("should be correctly displayed in the teacher profile page", () => {
        cy.login()
        cy.visit("/profile")
        cy.get('#pays').children().should('have.length', 3)
        cy.get('#pays').select(1).should("have.value", "USA")
        cy.get('#pays').select(2).should("have.value", "CANADA")
        cy.get('#pays').select('CANADA')
        cy.get('#ville').select(1).should("have.value", "Calgary")
        cy.get('#etablissement').select(1).should("have.value", "Lycée international de Calgary")
    })
})