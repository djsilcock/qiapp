import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { Form,InputField } from '../../'
describe('Form component', () => {
  it('works', () => {
    mount(<Form><InputField name="hello"/></Form>)
    // now use standard Cypress commands
    cy.contains('Hello World!').should('be.visible')
  })
})