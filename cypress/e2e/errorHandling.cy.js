describe("To Do List App - Error Handling", () => {
  it("Should display an error banner when the initial GET request fails", () => {
    // Intercept the GET request to the tasks endpoint
    cy.intercept("GET", "http://localhost:5000/tasks", {
      statusCode: 500,
      body: {
        success: false,
      },
    });

    // Visit the page
    cy.visit("/");

    // Verify the banner message
    cy.get("[data-cy=banner-message]").should(
      "contain",
      "Error Fetching Tasks - Please Try Again"
    );
  });

  it("Should display an error banner when the POST request fails", () => {
    // Intercept the POST request to the tasks endpoint
    cy.intercept("POST", "http://localhost:5000/createTask", {
      statusCode: 500,
      body: {
        success: false,
      },
    }).as("createTaskFailure");

    // Visit the page
    cy.visit("/");

    // Intercept the GET request to the tasks endpoint
    cy.intercept("GET", "http://localhost:5000/tasks", {
      fixture: "../fixtures/landingSuccess.json",
    }).as("landingSuccess");

    // Wait for response
    cy.wait(["@landingSuccess"]);

    // Click the add task button
    cy.get("[data-cy=create-new-task-button]").click();

    // Enter a title
    cy.get("[data-cy=new-task-form-title-input]").type("New Task Title");

    // Click the create button
    cy.get("[data-cy=new-task-form-create-button]").click();

    // Verify the banner message
    cy.get("[data-cy=banner-message]").should(
      "contain",
      "Task Creation Failed"
    );
  });

  it("Should display an error banner when the PUT request fails", () => {
    // Intercept the PUT request to the tasks endpoint
    cy.intercept("PUT", "http://localhost:5000/updateTask/*", {
      statusCode: 500,
      body: {
        success: false,
      },
    }).as("updateTaskFailure");

    // Visit the page
    cy.visit("/");

    // Intercept the GET request to the tasks endpoint
    cy.intercept("GET", "http://localhost:5000/tasks", {
      fixture: "../fixtures/landingSuccess.json",
    }).as("landingSuccess");

    // Wait for response
    cy.wait(["@landingSuccess"]);

    // Click the checkbox
    cy.get("[data-cy=task-checkbox-0]").click();

    // Verify the banner message
    cy.get("[data-cy=banner-message]").should("contain", "Task Update Failed");
  });

  it("Should display an error banner when the DELETE request fails", () => {
    // Intercept the DELETE request to the tasks endpoint
    cy.intercept("DELETE", "http://localhost:5000/deleteTask/*", {
      statusCode: 500,
      body: {
        success: false,
      },
    }).as("deleteTaskFailure");

    // Visit the page
    cy.visit("/");

    // Intercept the GET request to the tasks endpoint
    cy.intercept("GET", "http://localhost:5000/tasks", {
      fixture: "../fixtures/landingSuccess.json",
    }).as("landingSuccess");

    // Wait for response
    cy.wait(["@landingSuccess"]);

    // Open the task menu
    cy.get("[data-cy=task-menu-icon-1]").click();

    // Verify the delete button is visible
    cy.get("[data-cy=task-menu-delete-button-1]").should("exist");

    // Click the delete button
    cy.get("[data-cy=task-menu-delete-button-1]").click();

    // Wait for the request to complete
    cy.wait(["@deleteTaskFailure"]);

    // Verify the banner message
    cy.get("[data-cy=banner-message]").should(
      "contain",
      "Task Deletion Failed"
    );

    // Verify the task still exists
    cy.get("[data-cy=task-container-1]").should("exist");
  });
});
