describe("To Do List App", () => {
  beforeEach(() => {
    // Visit the page
    cy.visit("/");

    // Intercept the GET request to the tasks endpoint
    cy.intercept("GET", "http://localhost:5000/tasks", {
      fixture: "../fixtures/landingSuccess.json",
    }).as("landingSuccess");

    // Wait for response
    cy.wait(["@landingSuccess"]);
  });

  it("Loads the page and confirms basic elements exist", () => {
    // Verify the page title
    cy.get("[data-cy=to-do-list-heading-main]").should("contain", "To Do List");

    // Verify the count of tasks
    cy.get("[data-cy=to-do-list-header-count]").should("contain", "7 Tasks");

    // Verify the first task in the list
    cy.get("[data-cy=task-container-0]").should("exist");
    cy.get("[data-cy=task-checkbox-0]").should("exist");
    cy.get("[data-cy=task-title-0]").should(
      "contain",
      "animate checking and hiding"
    );

    // Verify the second task in the list
    cy.get("[data-cy=task-container-1]").should("exist");
    cy.get("[data-cy=task-checkbox-1]").should("exist");
    cy.get("[data-cy=task-title-1]").should("contain", "Updated Title");
    cy.get("[data-cy=task-description-1]").should(
      "contain",
      "Updated Description"
    );
  });

  it("Adds a new task", () => {
    // Intercept the POST request to the tasks endpoint
    cy.intercept("POST", "http://localhost:5000/createTask", {
      fixture: "../fixtures/createTaskSuccess.json",
    }).as("createTaskSuccess");

    // Click the add task button
    cy.get("[data-cy=create-new-task-button]").click();

    // Verify the form is visible
    cy.get("[data-cy=new-task-form-container]").should("exist");

    // Verify the error handling works by clicking the button first
    cy.get("[data-cy=new-task-form-create-button]").click();

    // Verify the error message is visible
    cy.get("[data-cy=new-task-form-error-message]").should("exist");

    // Enter a title
    cy.get("[data-cy=new-task-form-title-input]").type("New Task Title");

    // Enter a description
    cy.get("[data-cy=new-task-form-description-input]").type(
      "New Task Description"
    );

    // Click the create button
    cy.get("[data-cy=new-task-form-create-button]").click();

    // Wait for response
    cy.wait(["@createTaskSuccess"]);

    // Verify the banner message
    cy.get("[data-cy=banner-message]").should(
      "contain",
      "Task Created Successfully"
    );
  });

  it("Marks a task as complete", () => {
    // Intercept the PUT request to the tasks endpoint
    cy.intercept("PUT", "http://localhost:5000/updateTask/**", {
      fixture: "../fixtures/updateTaskStatusSuccess.json",
    }).as("updateTaskStatusSuccess");

    // Verify the task is visible in the active list
    cy.get("[data-cy=task-container-0]").should("exist");
    cy.get("[data-cy=task-title-0]").should(
      "contain",
      "animate checking and hiding"
    );

    // Click the checkbox of the first task
    cy.get("[data-cy=task-checkbox-0]").click();

    // Wait for response
    cy.wait(["@updateTaskStatusSuccess"]);

    // Verify the banner message
    cy.get("[data-cy=banner-message]").should(
      "contain",
      "Task Updated Successfully"
    );

    // Click the completed link
    cy.get("[data-cy=to-do-list-header-completed-link]").click();

    // Verify the task is visible in the completed list
    cy.get("[data-cy=task-container-0]").should("exist");
    cy.get("[data-cy=task-title-0]").should(
      "contain",
      "animate checking and hiding"
    );

    // Verify the checkbox is checked
    cy.get("[data-cy=task-checkbox-completed-check]").should("exist");
  });
});
