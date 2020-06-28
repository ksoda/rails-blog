/// JSON fixture file can be loaded directly using
// the built-in JavaScript bundler
// @ts-ignore
const requiredExample = require("../../fixtures/example");

context.skip("Misc", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/misc");
  });

  it(".end() - end the command chain", () => {
    // https://on.cypress.io/end

    // cy.end is useful when you want to end a chain of commands
    // and force Cypress to re-query from the root element
    cy.get(".misc-table").within(() => {
      // ends the current chain and yields null
      cy.contains("Cheryl").click().end();

      // queries the entire table again
      cy.contains("Charles").click();
    });
  });

  it("cy.exec() - execute a system command", () => {
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    // https://on.cypress.io/exec

    // we can use Cypress.platform string to
    // select appropriate command
    // https://on.cypress/io/platform
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);

    // on CircleCI Windows build machines we have a failure to run bash shell
    // https://github.com/cypress-io/cypress/issues/5169
    // so skip some of the tests by passing flag "--env circle=true"
    const isCircleOnWindows =
      Cypress.platform === "win32" && Cypress.env("circle");

    if (isCircleOnWindows) {
      cy.log("Skipping test on CircleCI");

      return;
    }

    // cy.exec problem on Shippable CI
    // https://github.com/cypress-io/cypress/issues/6718
    const isShippable =
      Cypress.platform === "linux" && Cypress.env("shippable");

    if (isShippable) {
      cy.log("Skipping test on ShippableCI");

      return;
    }

    cy.exec("echo Jane Lane").its("stdout").should("contain", "Jane Lane");

    if (Cypress.platform === "win32") {
      cy.exec("print cypress.json").its("stderr").should("be.empty");
    } else {
      cy.exec("cat cypress.json").its("stderr").should("be.empty");

      cy.exec("pwd").its("code").should("eq", 0);
    }
  });

  it("cy.focused() - get the DOM element that has focus", () => {
    // https://on.cypress.io/focused
    cy.get(".misc-form").find("#name").click();
    cy.focused().should("have.id", "name");

    cy.get(".misc-form").find("#description").click();
    cy.focused().should("have.id", "description");
  });

  context("Cypress.Screenshot", function () {
    it("cy.screenshot() - take a screenshot", () => {
      // https://on.cypress.io/screenshot
      cy.screenshot("my-image");
    });

    it("Cypress.Screenshot.defaults() - change default config of screenshots", function () {
      Cypress.Screenshot.defaults({
        blackout: [".foo"],
        capture: "viewport",
        clip: { x: 0, y: 0, width: 200, height: 200 },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        // TODO: remove this when Cypress typedefs are fixed
        // https://github.com/cypress-io/cypress/pull/7445
        // @ts-ignore
        onBeforeScreenshot() {},
        onAfterScreenshot() {},
      });
    });
  });

  it("cy.wrap() - wrap an object", () => {
    // https://on.cypress.io/wrap
    cy.wrap({ foo: "bar" })
      .should("have.property", "foo")
      .and("include", "bar");
  });
});

context.skip("Cookies", () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);

    cy.visit("https://example.cypress.io/commands/cookies");

    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies();
  });

  it("cy.getCookie() - get a browser cookie", () => {
    // https://on.cypress.io/getcookie
    cy.get("#getCookie .set-a-cookie").click();

    // cy.getCookie() yields a cookie object
    cy.getCookie("token").should("have.property", "value", "123ABC");
  });

  it("cy.getCookies() - get browser cookies", () => {
    // https://on.cypress.io/getcookies
    cy.getCookies().should("be.empty");

    cy.get("#getCookies .set-a-cookie").click();

    // cy.getCookies() yields an array of cookies
    cy.getCookies()
      .should("have.length", 1)
      .should((cookies) => {
        // each cookie has these properties
        expect(cookies[0]).to.have.property("name", "token");
        expect(cookies[0]).to.have.property("value", "123ABC");
        expect(cookies[0]).to.have.property("httpOnly", false);
        expect(cookies[0]).to.have.property("secure", false);
        expect(cookies[0]).to.have.property("domain");
        expect(cookies[0]).to.have.property("path");
      });
  });

  it("cy.setCookie() - set a browser cookie", () => {
    // https://on.cypress.io/setcookie
    cy.getCookies().should("be.empty");

    cy.setCookie("foo", "bar");

    // cy.getCookie() yields a cookie object
    cy.getCookie("foo").should("have.property", "value", "bar");
  });

  it("cy.clearCookie() - clear a browser cookie", () => {
    // https://on.cypress.io/clearcookie
    cy.getCookie("token").should("be.null");

    cy.get("#clearCookie .set-a-cookie").click();

    cy.getCookie("token").should("have.property", "value", "123ABC");

    // cy.clearCookies() yields null
    cy.clearCookie("token").should("be.null");

    cy.getCookie("token").should("be.null");
  });

  it("cy.clearCookies() - clear browser cookies", () => {
    // https://on.cypress.io/clearcookies
    cy.getCookies().should("be.empty");

    cy.get("#clearCookies .set-a-cookie").click();

    cy.getCookies().should("have.length", 1);

    // cy.clearCookies() yields null
    cy.clearCookies();

    cy.getCookies().should("be.empty");
  });
});

context.skip("Files", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/files");
  });

  beforeEach(() => {
    // load example.json fixture file and store
    // in the test context object
    cy.fixture("example.json").as("example");
  });

  it("cy.fixture() - load a fixture", () => {
    // https://on.cypress.io/fixture

    // Instead of writing a response inline you can
    // use a fixture file's content.

    cy.server();
    cy.fixture("example.json").as("comment");
    // when application makes an Ajax request matching "GET comments/*"
    // Cypress will intercept it and reply with object
    // from the "comment" alias
    cy.route("GET", "comments/*", "@comment").as("getComment");

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get(".fixture-btn").click();

    cy.wait("@getComment")
      .its("responseBody")
      .should("have.property", "name")
      .and("include", "Using fixtures to represent data");

    // you can also just write the fixture in the route
    cy.route("GET", "comments/*", "fixture:example.json").as("getComment");

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get(".fixture-btn").click();

    cy.wait("@getComment")
      .its("responseBody")
      .should("have.property", "name")
      .and("include", "Using fixtures to represent data");

    // or write fx to represent fixture
    // by default it assumes it's .json
    cy.route("GET", "comments/*", "fx:example").as("getComment");

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get(".fixture-btn").click();

    cy.wait("@getComment")
      .its("responseBody")
      .should("have.property", "name")
      .and("include", "Using fixtures to represent data");
  });

  it("cy.fixture() or require - load a fixture", function () {
    // we are inside the "function () { ... }"
    // callback and can use test context object "this"
    // "this.example" was loaded in "beforeEach" function callback
    expect(this.example, "fixture in the test context").to.deep.equal(
      requiredExample
    );

    // or use "cy.wrap" and "should('deep.equal', ...)" assertion
    // @ts-ignore
    cy.wrap(this.example, "fixture vs require").should(
      "deep.equal",
      requiredExample
    );
  });

  it("cy.readFile() - read file contents", () => {
    // https://on.cypress.io/readfile

    // You can read a file and yield its contents
    // The filePath is relative to your project's root.
    cy.readFile("cypress.json").then((json) => {
      expect(json).to.be.an("object");
    });
  });

  it("cy.writeFile() - write to a file", () => {
    // https://on.cypress.io/writefile

    // You can write to a file

    // Use a response from a request to automatically
    // generate a fixture file for use later
    cy.request("https://jsonplaceholder.cypress.io/users").then((response) => {
      cy.writeFile("cypress/fixtures/users.json", response.body);
    });

    cy.fixture("users").should((users) => {
      expect(users[0].name).to.exist;
    });

    // JavaScript arrays and objects are stringified
    // and formatted into text.
    cy.writeFile("cypress/fixtures/profile.json", {
      id: 8739,
      name: "Jane",
      email: "jane@example.com",
    });

    cy.fixture("profile").should((profile) => {
      expect(profile.name).to.eq("Jane");
    });
  });
});

context.skip("Local Storage", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/local-storage");
  });
  // Although local storage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear the local storage manually

  it("cy.clearLocalStorage() - clear all data in local storage", () => {
    // https://on.cypress.io/clearlocalstorage
    cy.get(".ls-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("prop1")).to.eq("red");
        expect(localStorage.getItem("prop2")).to.eq("blue");
        expect(localStorage.getItem("prop3")).to.eq("magenta");
      });

    // clearLocalStorage() yields the localStorage object
    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem("prop1")).to.be.null;
      expect(ls.getItem("prop2")).to.be.null;
      expect(ls.getItem("prop3")).to.be.null;
    });

    // Clear key matching string in Local Storage
    cy.get(".ls-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("prop1")).to.eq("red");
        expect(localStorage.getItem("prop2")).to.eq("blue");
        expect(localStorage.getItem("prop3")).to.eq("magenta");
      });

    cy.clearLocalStorage("prop1").should((ls) => {
      expect(ls.getItem("prop1")).to.be.null;
      expect(ls.getItem("prop2")).to.eq("blue");
      expect(ls.getItem("prop3")).to.eq("magenta");
    });

    // Clear keys matching regex in Local Storage
    cy.get(".ls-btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("prop1")).to.eq("red");
        expect(localStorage.getItem("prop2")).to.eq("blue");
        expect(localStorage.getItem("prop3")).to.eq("magenta");
      });

    cy.clearLocalStorage(/prop1|2/).should((ls) => {
      expect(ls.getItem("prop1")).to.be.null;
      expect(ls.getItem("prop2")).to.be.null;
      expect(ls.getItem("prop3")).to.eq("magenta");
    });
  });
});

context.skip("Network Requests", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/network-requests");
  });

  // Manage AJAX / XHR requests in your app

  it("cy.server() - control behavior of network requests and responses", () => {
    // https://on.cypress.io/server

    cy.server().should((server) => {
      // the default options on server
      // you can override any of these options
      expect(server.delay).to.eq(0);
      expect(server.method).to.eq("GET");
      expect(server.status).to.eq(200);
      expect(server.headers).to.be.null;
      expect(server.response).to.be.null;
      expect(server.onRequest).to.be.undefined;
      expect(server.onResponse).to.be.undefined;
      expect(server.onAbort).to.be.undefined;

      // These options control the server behavior
      // affecting all requests

      // pass false to disable existing route stubs
      expect(server.enable).to.be.true;
      // forces requests that don't match your routes to 404
      expect(server.force404).to.be.false;
      // whitelists requests from ever being logged or stubbed
      expect(server.whitelist).to.be.a("function");
    });

    cy.server({
      method: "POST",
      delay: 1000,
      status: 422,
      response: {},
    });

    // any route commands will now inherit the above options
    // from the server. anything we pass specifically
    // to route will override the defaults though.
  });

  it("cy.request() - make an XHR request", () => {
    // https://on.cypress.io/request
    cy.request("https://jsonplaceholder.cypress.io/comments").should(
      (response) => {
        expect(response.status).to.eq(200);
        // the server sometimes gets an extra comment posted from another machine
        // which gets returned as 1 extra object
        expect(response.body)
          .to.have.property("length")
          .and.be.oneOf([500, 501]);
        expect(response).to.have.property("headers");
        expect(response).to.have.property("duration");
      }
    );
  });

  it("cy.request() - verify response using BDD syntax", () => {
    cy.request("https://jsonplaceholder.cypress.io/comments").then(
      (response) => {
        // https://on.cypress.io/assertions
        expect(response).property("status").to.equal(200);
        expect(response)
          .property("body")
          .to.have.property("length")
          .and.be.oneOf([500, 501]);
        expect(response).to.include.keys("headers", "duration");
      }
    );
  });

  it("cy.request() with query parameters", () => {
    // will execute request
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    cy.request({
      url: "https://jsonplaceholder.cypress.io/comments",
      qs: {
        postId: 1,
        id: 3,
      },
    })
      .its("body")
      .should("be.an", "array")
      .and("have.length", 1)
      .its("0") // yields first element of the array
      .should("contain", {
        postId: 1,
        id: 3,
      });
  });

  it("cy.request() - pass result to the second request", () => {
    // first, let's find out the userId of the first user we have
    cy.request("https://jsonplaceholder.cypress.io/users?_limit=1")
      .its("body") // yields the response object
      .its("0") // yields the first element of the returned list
      // the above two commands its('body').its('0')
      // can be written as its('body.0')
      // if you do not care about TypeScript checks
      .then((user) => {
        expect(user).property("id").to.be.a("number");
        // make a new post on behalf of the user
        cy.request("POST", "https://jsonplaceholder.cypress.io/posts", {
          userId: user.id,
          title: "Cypress Test Runner",
          body:
            "Fast, easy and reliable testing for anything that runs in a browser.",
        });
      })
      // note that the value here is the returned value of the 2nd request
      // which is the new post object
      .then((response) => {
        expect(response).property("status").to.equal(201); // new entity created
        expect(response).property("body").to.contain({
          title: "Cypress Test Runner",
        });

        // we don't know the exact post id - only that it will be > 100
        // since JSONPlaceholder has built-in 100 posts
        expect(response.body)
          .property("id")
          .to.be.a("number")
          .and.to.be.gt(100);

        // we don't know the user id here - since it was in above closure
        // so in this test just confirm that the property is there
        expect(response.body).property("userId").to.be.a("number");
      });
  });

  it("cy.request() - save response in the shared test context", () => {
    // https://on.cypress.io/variables-and-aliases
    cy.request("https://jsonplaceholder.cypress.io/users?_limit=1")
      .its("body")
      .its("0") // yields the first element of the returned list
      .as("user") // saves the object in the test context
      .then(function () {
        // NOTE 👀
        //  By the time this callback runs the "as('user')" command
        //  has saved the user object in the test context.
        //  To access the test context we need to use
        //  the "function () { ... }" callback form,
        //  otherwise "this" points at a wrong or undefined object!
        cy.request("POST", "https://jsonplaceholder.cypress.io/posts", {
          userId: this.user.id,
          title: "Cypress Test Runner",
          body:
            "Fast, easy and reliable testing for anything that runs in a browser.",
        })
          .its("body")
          .as("post"); // save the new post from the response
      })
      .then(function () {
        // When this callback runs, both "cy.request" API commands have finished
        // and the test context has "user" and "post" objects set.
        // Let's verify them.
        expect(this.post, "post has the right user id")
          .property("userId")
          .to.equal(this.user.id);
      });
  });

  it("cy.route() - route responses to matching requests", () => {
    // https://on.cypress.io/route

    let message = "whoa, this comment does not exist";

    cy.server();

    // Listen to GET to comments/1
    cy.route("GET", "comments/*").as("getComment");

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get(".network-btn").click();

    // https://on.cypress.io/wait
    cy.wait("@getComment").its("status").should("eq", 200);

    // Listen to POST to comments
    cy.route("POST", "/comments").as("postComment");

    // we have code that posts a comment when
    // the button is clicked in scripts.js
    cy.get(".network-post").click();
    cy.wait("@postComment").should((xhr) => {
      expect(xhr.requestBody).to.include("email");
      expect(xhr.requestHeaders).to.have.property("Content-Type");
      expect(xhr.responseBody).to.have.property(
        "name",
        "Using POST in cy.route()"
      );
    });

    // Stub a response to PUT comments/ ****
    cy.route({
      method: "PUT",
      url: "comments/*",
      status: 404,
      response: { error: message },
      delay: 500,
    }).as("putComment");

    // we have code that puts a comment when
    // the button is clicked in scripts.js
    cy.get(".network-put").click();

    cy.wait("@putComment");

    // our 404 statusCode logic in scripts.js executed
    cy.get(".network-put-comment").should("contain", message);
  });
});
