describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Bienvenue')
    cy.contains('Favero')
  })
})
