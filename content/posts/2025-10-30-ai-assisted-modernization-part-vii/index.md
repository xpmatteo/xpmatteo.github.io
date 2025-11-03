+++
title = 'AI-assisted modernization part VII: season finale'
slug = 'ai-assisted-modernization-part-vii'
date = 2025-10-30T15:39:24+01:00
tags = [
    "AI",
    "java",
    "modernization",
    "plants-by-websphere",
]
+++

Disclaimer: This series of articles is about solving an exercise; actual work is going to be more difficult than this. However, by practicing like this, I believe **we can build skills** that will enable us to deal with the more complicated challenges in real life.

Setup:

- Claude Code with Claude Sonnet 4.5
- My global CLAUDE.md is a variant of [Harper Reed's](https://github.com/harperreed/dotfiles/blob/35c2d5508f36b7ad6a845f605c12bcdb16fb15a3/.claude/CLAUDE.md "dotfiles/.claude/CLAUDE.md at 35c2d5508f36b7ad6a845f605c12bcdb16fb15a3 · harperreed/dotfiles · GitHub")
- The repo for the exercise [starting state](https://github.com/xpmatteo/app-modernization-plants-by-websphere-jee6/tree/86e078ba6a54ff5e18e1d6edbad6afc794c29449): no tests
- The repo [at the end of this session](https://github.com/xpmatteo/app-modernization-plants-by-websphere-jee6/tree/2a3b8008aa299b94fab868038a7e9dc87efc4fe5): two smoke tests, several unit tests


# Continued from part VI

In the previous part, we continued work on the in-place JEE modernization by deciding on a good testing strategy.  In this session, we will begin the implementation of the testing strategy, and we'll come to a conclusion for the series, with a discussion of the two approaches we tried: re-engineering with Spring Boot, and upgrade in place.

## Implementing smoke tests

This was **not** an easy task. CC took a very long time, and I had to help it along the way.  Getting started with Playwright on a project is usually not easy, in my experience, and JSF code conventions made it harder for the AI: submit buttons that are not *real* HTML submit buttons that only work thanks to JavaScript; the content changes but the browser location does not, etc.  

I trimmed down CC's plan to a very short flow: the login flow.  It took an hour, more or less, to get it working, and I suggested an improvement on the original UI: show the name of the logged in user in the header, so that we can prove in the test if the login was successful.  It's an improvement for human users too.

**The Observable Design heuristic**: it makes no sense to write overcomplicated and fragile testing code, when small changes in application behaviour could fix that. The changes might benefit non-automatic users too.

<figure>
  <img src='login-screen.jpg' alt='Screenshot of the login page' style='border: 1px solid black'>
</figure>

This is the final test for the ok case: it uses a [page object](https://martinfowler.com/bliki/PageObject.html "Page Object") to centralize the part of the logic that's specific for the particular HTML of this page.

```java
@Test
@DisplayName("User can successfully log in with valid credentials")
void testSuccessfulLogin() {
    // Navigate directly to login page
    loginPage.navigate(TestConfig.getBaseUrl());

    // Verify we're on the login page
    assertThat(loginPage.isOnLoginPage())
            .as("Should be on login page")
            .isTrue();

    // Fill in the login credentials
    loginPage.fillEmail(TEST_USER_EMAIL);
    loginPage.fillPassword(TEST_USER_PASSWORD);

    // Click the sign in button
    loginPage.clickSignIn();

    // Wait for navigation to complete (JSF pages may take a moment)
    page.waitForLoadState();

    // Verify no error message is displayed
    String errorMessage = loginPage.getErrorMessage();
    assertThat(errorMessage)
            .as("Should not have error message after successful login")
            .isEmpty();

    // After successful login, verify the header shows "Logged in as:" with the user's name
    // This text only appears when user is logged in (LOGIN link is replaced)
    assertThat(page.locator("text=/Logged in as:/i").isVisible())
            .as("Header should show 'Logged in as:' after successful login")
            .isTrue();

    // Verify the page title indicates we're on the promo page
    assertThat(page.title())
            .as("Page title should indicate promo page after successful login")
            .contains("Plants By WebSphere Promo");
}
```

Of course there's a corresponding negative test.

**The Multiple Test Cases heuristic**: good tests check for more than one behaviour in the code under test. If we only have one test case for a particular part of the application, chances are good that we missed some interesting behaviour in either the tests, or in the production code.  Interesting code has more than one behaviour!

So much for the smoke tests; now let's see what we should do for the unit tests.

## The unit tests dilemma

It's fairly easy to point an AI agent to a bit of code and ask it to cover it with tests: it will usually do a great job of identifying and testing all the behaviours.  Warning: rhetorical question coming!  But is this going to give us **good tests**?

Let's start from the beginning.  The starting point was trying to understand where the interesting business logic happens.  I had spent a little time earlier asking CC to write a Python utility that will visualize which "beans" are executed in response to user actions.

<figure>
  <img src='dependencies.png' alt='A diagram of "beans" being invoked by user actions'>
</figure>

It turns out that on completion of an order, in page `checkout_final`, the `AccountBean#performCompleteCheckout` method is executed (see above) and this in turn invokes the `ShoppingCartBean#checkInventory` method, which will update the current inventory levels of the products being ordered, and this will create a new `BackOrder`, that (I suppose) can be sent to fictional suppliers to replenish our fictional warehouse.  If there is already a backorder for a particular product, the backorder is updated instead of being created. This is very interesting behaviour.

<blockquote>
  <b>take a look at performCompleteCheckout in AccountBean.  We'd like to write a pure unit test for it.  Can you start out by analyzing all the things it does and what we would like to test about it? </b>
  
---

⏺ Excellent! Now I have a comprehensive understanding of the performCompleteCheckout method. Let me provide Captain Matt with a detailed analysis.

---
   Unit Test Suite: AccountBeanTest.java

   Create comprehensive unit tests using JUnit 5 + Mockito with one test per concern:

   Test cases:

   1. testPerformCompleteCheckout_CreatesOrderSuccessfully - verify order creation with correct parameters
   2. testPerformCompleteCheckout_StoresLastOrderNumber - verify lastOrderNum is captured
   3. testPerformCompleteCheckout_ChecksInventoryForAllItems - verify checkInventory called for each cart item
   4. testPerformCompleteCheckout_SendsConfirmationEmail - verify email sent with correct customer and order ID
   5. testPerformCompleteCheckout_ClearsOrderInfo - verify orderInfo nulled after completion
   6. testPerformCompleteCheckout_EmptiesShoppingCart - verify cart cleared
   7. testPerformCompleteCheckout_ReturnsCorrectAction - verify returns "orderdone"
   8. testPerformCompleteCheckout_ContinuesWhenMailerThrowsMailerAppException - verify completion despite email failure
   9. testPerformCompleteCheckout_ContinuesWhenMailerThrowsGenericException - verify completion despite generic exception
   10. testPerformCompleteCheckout_SkipsInventoryCheckWhenCartIsNull - edge case for null cart
   11. testPerformCompleteCheckout_HandlesEmptyCart - edge case for empty cart
 
</blockquote>

It wasn't straightforward.  At some point, the AI found it very difficult to create mocks with Mockito for the other "beans" that the `AccountBean` depends on, because of some technical issue with Mockito not being able to mock classes from a "sealed module".  Rather than going through convoluted hacks to make it work, I asked CC to create "hand-rolled" mocks for the dependencies.

And, bang! In a short while, it wrote all these 11 tests.  These tests are fast, they depend on nothing, they exercise exactly one class, and each test has a single assertion!  Sounds good.  But what about the important backorder logic mentioned above?  This is the test that deals with it:

```java
@Test
@DisplayName("should check inventory for all items in cart")
void testPerformCompleteCheckout_ChecksInventoryForAllItems() throws Exception {
  // When
  accountBean.performCompleteCheckout();

  // Then
  assertThat(shoppingCart.getTotalCheckInventoryCallCount()).isEqualTo(2);

  // Verify each specific item was checked
  for (Inventory item : testCartItems) {
    assertThat(shoppingCart.getCheckInventoryCallCount(item)).isEqualTo(1);
  }
}
```

This test verifies that the ShoppingCart#checkInventory method is invoked
for every item in the cart.  The tests for the backorder logic will be written in a separate test suite for the <code>ShoppingCart</code>.  Hmmm.

The thing that leaves me uneasy about these tests is that they look very much like [change detector tests](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html "Google Testing Blog: Testing on the Toilet: Change-Detector Tests Considered Harmful").  This test will break when code in the `AccountBean#performCompleteCheckout` is changed. A valid and an invalid change might break this code with equal likelihood.  

OK Matteo, if this test is not good, what should we be doing differently then?  I think that difficulty in testing comes from poor production code design.  We have that when the customer submits an order, a number of things should be done:

1. Create an order object in the DB
2. Send a confirmation email (but continue if there's any problem sending it)
3. Check inventory for each item being purchased

It seems likely that, as the business evolves, this list is likely to change.  It seems an unstable list of things to do. The first thing that comes to my mind is for `performCompleteCheckout` to generate a [Domain Event](https://martinfowler.com/eaaDev/DomainEvent.html "Domain Event"), and move the mailer and inventory check concerns in separate listeners.  I would like to make this change, but the tests are not covering me!  Yes it's true that we just wrote 11 tests, but if I change the implementation, some tests will likely break, even though I'm preserving the behaviour: that's the problem.  I would have to make the refactoring, breaking the tests, and then writing new tests for the new untested code.  We could do that, but there's a better way: let's write better tests for this functionality.

**The Testing Important Things heuristic**: our tests should be testing important behaviour, not implementation. We should be very suspicious of tests that mirror the implementation, and of tests that seem not very related to the business logic that we care about.

<blockquote>
  <b>check @.../AccountBeanTest.java , method testPerformCompleteCheckout_ChecksInventoryForAllItems.  I don't like it, as it seems it's testing implementation details, and not checking the important logic that is executed in @.../ShoppingCartBean.java.  Can
we replace it with a series of tests that check that, for different types of orders, and different items with different inventory configuration, the updating of inventory levels and
 creation or update of back orders?  Yes yes I know we should be decoupling the inventory levels logic from this method, but for the moment I would like a good test that checks the
business logic; once we have it, it will be safe to refactor.  What do you think?</b>

⏺ Captain Matt, I completely agree with your assessment! The current test testPerformCompleteCheckout_ChecksInventoryForAllItems is definitely testing implementation details
  (counting method calls) rather than verifying the actual business logic that matters.

---  

⏺ Captain Matt, we're running into issues with Mockito not being able to mock EntityManager on Java 21 with Jakarta EE. The problem is that the jakarta.persistence classes are in  sealed modules that Mockito can't instrument.

  Instead of fighting with Mockito's limitations, let me create a simpler manual mock implementation of EntityManager that we can control directly. This will be more reliable and
  actually aligns with your original request to "use a mocked entity manager" rather than a full mocking framework.

  Let me create a manual EntityManager test double:  
</blockquote>

Good, I like this.  It's picking up the design strategy of manual mocks from the other test. 

<blockquote>
⏺ Perfect, Captain Matt! I've successfully completed the task. Here's a summary of what was accomplished:

  Summary

  I replaced the implementation-detail test (testPerformCompleteCheckout_ChecksInventoryForAllItems) with a comprehensive suite of 12 business logic tests that verify the actual
  inventory management behavior.

  What Was Created:

  1. TestEntityManager (pbw-web/src/test/java/com/ibm/websphere/samples/pbw/war/TestEntityManager.java):
    - Manual mock implementation of EntityManager that stores entities in memory
    - Avoids Mockito compatibility issues with Java 21 and Jakarta EE modules
    - Tracks Inventory, BackOrder, and Customer entities
  2. AccountBeanInventoryTest (pbw-web/src/test/java/com/ibm/websphere/samples/pbw/war/AccountBeanInventoryTest.java):
    - 12 comprehensive tests covering:
        - Basic inventory scenarios (4 tests): sufficient stock, exact match, insufficient stock, zero inventory
      - Threshold-based scenarios (3 tests): dropping below/staying above minThreshold, already below threshold
      - BackOrder management (2 tests): creating new BackOrders, updating existing BackOrders
      - Multiple items (3 tests): mixed scenarios, all sufficient, all requiring backorders

  Key Business Logic Tested:

  - ✅ Inventory quantities decrease correctly after checkout
  - ✅ BackOrders created when inventory falls below minThreshold
  - ✅ BackOrder quantity = unfilled portion of order (not total order amount)
  - ✅ Existing BackOrders updated with additional unfilled quantities
  - ✅ Multiple cart items processed correctly with different inventory states
  - ✅ Edge cases: zero inventory, exact matches, partial fulfillment

  Changes to Existing Tests:

  - Removed testPerformCompleteCheckout_ChecksInventoryForAllItems from AccountBeanTest.java (pbw-web/src/test/java/com/ibm/websphere/samples/pbw/war/AccountBeanTest.java:120-133)
  - All 10 remaining tests in AccountBeanTest still pass  
</blockquote>

OK, I'm almost satisfied with these new tests.  Here's a sample:

```java
@Test
@DisplayName("should decrease inventory when sufficient stock is available")
void testSufficientInventory() throws Exception {
  // Given - plenty of stock, well above minThreshold
  createInventory("ITEM-001", 100, 50, 10.0f);
  addItemToCart("ITEM-001", 10);

  // When
  accountBean.performCompleteCheckout();

  // Then - inventory decreased correctly
  Inventory inv = testEntityManager.find(Inventory.class, "ITEM-001");
  assertThat(inv.getQuantity()).isEqualTo(90);

  // No backorder created (still above minThreshold)
  BackOrder backOrder = testEntityManager.getBackOrder("ITEM-001");
  assertThat(backOrder).isNull();
}
```

The `createInventory` call is opaque, because as I read the test, it's not clear what the 100, 50, 10.0 numbers mean.  This is easily fixed by CC with a builder:

```java
void testSufficientInventory() throws Exception {
  // Given - plenty of stock, well above minThreshold
  inventory("ITEM-001")
    .withQuantity(100)
    .withMinThreshold(50)
    .create();
  addItemToCart("ITEM-001", 10);

  // ...
}
```

The test we have just written covers the behaviour.  **Now** I'm confident that we can apply a refactoring to the production code, to decouple it and improve testability.  And this exercise is left to the reader...


## Aside: change detector tests

In the previous section, I complained against one of the tests being written by Claude, because I think it's a "change detector test".  But what does that mean?  It means that the test will break when *the implementation* is changed: it's a "change in implementation code" detector.  The problem with this is that this test will not provide a safety net for refactoring, because whatever change we make to the implementation, be it good or bad, will break the test.  On the contrary, this type of test will make refactoring more expensive!

What we want are tests that detect changes in behaviour, not implementation.  This sounds sensible, right?  But there is some nuance here.

The term "change detector test" was introduced in [this post from the Google testing blog](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html).  The typical change detector test uses mocks to fix the implementation behaviour.  The example reported in the article is worth a little discussion, so I translated it from Python to Java, because seeing the types makes my point easier to see.

```java
// Production code:
public class Processor {
    private FirstPart firstPart;
    private SecondPart secondPart;
    
    public Processor(FirstPart firstPart, SecondPart secondPart) {
        this.firstPart = firstPart;
        this.secondPart = secondPart;
    }
    
    public void process(Work w) {
        firstPart.process(w);
        secondPart.process(w);
    }
}

// Test code (using Mockito):
@Test
public void testProcess() {
    FirstPart part1 = mock(FirstPart.class);
    SecondPart part2 = mock(SecondPart.class);
    Work w = new Work();
    
    new Processor(part1, part2).process(w);
    
    InOrder inOrder = inOrder(part1, part2);
    inOrder.verify(part1).process(w);
    inOrder.verify(part2).process(w);
}
```

Why is this test bad?  It's bad because it is just repeating the implementation.  It's basically fixing forever that to achieve some business objective, you need to invoke two specific procedures in order: `FirstPart#process` and `SecondPart#process`.  What would make better sense here?  I see these options.

1. Write business-oriented tests for `FirstPart` and `SecondPart`.  Rely on a cheap, fast integration smoke test to ensure that the `Processor` isn't broken
2. Write business-oriented integration test for `Processor`, `FirstPart` and `SecondPart`
3. Change `Processor` so that it's not tightly coupled to `FirstPart` and `SecondPart`.

My preference?  If this bit of code is likely going to be subject to maintenance and evolution, it's surely the third option.

One way of decoupling `Processor` is to have it publish domain events, that will be acted upon by something that then calls `FirstPart` and `SecondPart`.  This implies that there's some other code that receives the domain events and distributes them to the interested parties.  In JEE, you could do this using CDI services provided by the application server:

```java
// Production code:
public class Processor {
    @Inject
    private Event<Work> workEvent;
    
    public void process(Work w) {
        workEvent.fire(w);
    }
}

// Event observers:
public class FirstPart {
    public void process(@Observes @Priority(1) Work w) {
        // process work
    }
}

public class SecondPart {
    public void process(@Observes @Priority(2) Work w) {
        // process work
    }
}

// Test code:
@Test
public void testProcess() {
    Work w = new Work();
    
    Processor processor = new Processor();
    ReflectionTestUtils.setField(processor, "workEvent", workEvent);
    
    processor.process(w);
    
    verify(workEvent).fire(w);
}
```

I don't particulary like this, because it couples business logic to the CDI technology, but then again, it might be a good idea in some situations.  I would rather have `Processor` return a list of `DomainEvent`s: much simpler.

An alternative idea for decoupling `Processor` from the bits that it invokes is to make `Processor` an [abstract parts combinator](https://softwareengineering.stackexchange.com/questions/344555/change-detector-tests-considered-harmful/344695#344695).

```java
// Production code:
public interface ComputationPart {
    void process(Work w);
}

public class Processor {
    private List<ComputationPart> parts;
    
    public Processor(List<ComputationPart> parts) {
        this.parts = parts;
    }
    
    public void process(Work w) {
        for (ComputationPart part : parts) {
            part.process(w);
        }
    }
}

// Test code:
@Test
public void testProcess() {
    ComputationPart part1 = mock(ComputationPart.class);
    ComputationPart part2 = mock(ComputationPart.class);
    Work w = new Work();
    
    new Processor(List.of(part1, part2)).process(w);
    
    InOrder inOrder = inOrder(part1, part2);
    inOrder.verify(part1).process(w);
    inOrder.verify(part2).process(w);
}
```

This test looks superficially similar to the one we started with, but is in fact a completely different situation.  From the software design point of view, where before class `Processor` knew about the collaborators it needed to call and in which order, now it only knows it has to execute a list of things, and it does not know exactly what it is executing.  

From the testing point of view, the original test was a mirror of the production code, and now it's much different, so it's no longer a change detector test.  Now the `Processor` logic is about executing an arbitrary list of `ComputationPart`s, and the test proves that the Processor is doing just that.  If we refactor `Processor`, eg to use `Stream`s, the test will not break.

```java
public class Processor {
    // ...    
    public void process(Work w) {
        parts.stream().forEach(part -> part.process(w));
    }
}
```

**The Avoid Change Detector Test heuristic**: when the test mirrors the production code, look for ways to change production code so that it's less coupled, or change the test code to focus on the business outcomes and not the implementation, or both.  Domain events and abstract parts combinators are two useful techniques decoupling techniques.

Further readings on change detector tests in [this thoughtful article](https://explosionduck.com/wp/change-detectors-versus-unit-tests/) and in this [Stackoverflow answer](https://softwareengineering.stackexchange.com/questions/344555/change-detector-tests-considered-harmful/344695#344695) 


# Conclusion of the series

This series explored how AI helps in modernizing old software, in the context of business software.  As most business software is the private property of some business, and thus is not available to us for public experimentation, we adopted a sample codebase that was written for the purposes of demonstration and training. 

The goals of the series are:

 - identify broadly applicable techniques that leverage AI to help with modernization
 - build skills through a repeatable and shareable exercise
 - assess how and where the AI is helping.

## We tried two approaches

### Spring Boot port (parts I-IV)

In the first approach, we looked to significantly change the tech stack, moving from JEE to Spring Boot with Mustache templates. The strategy was:

- Start with the legacy app running locally
- Document and understand the application structure
- Port pages one-by-one to Spring Boot using TDD/ATDD
- Build modern REST endpoints and Mustache templates

We successfully ported the promotional landing page and product detail page, with full test coverage.  The work that remains is to complete the porting, page by page, and as the port grows, I expect the AI agent to be able to complete the steps with increasing accuracy, having a growing set of exemplar code, in the growing Spring Boot app, to take inspiration from.


### In-place JEE modernization (parts V-VII)

Having received a challenge on the idea that JEE is not a viable platform, we tried a completely different technique: upgrade the JEE stack in place.

What we achieved:
- Upgraded Java 6 to Java 21
- Migrated JEE 6 to Jakarta EE 10
- Consolidated EAR packaging → single WAR (modern cloud-native approach)
- Implemented smoke tests with Playwright
- Created business-logic focused unit tests

We got fully functional, modernized application running on current technology.  The work that remains is to complete the test coverage, at both unit and smoke level.  What I would do next is to evolve the technology, making the application less dependent on JEE features:

- move from JSF to Mustache + HTMX
- move from the JEE application server to Jetty embedded

## What we learned

The AI was good at:
- **Tedious technical translations**: Namespace migrations, dependency updates, configuration conversions
- **Technology expertise**: Finding compatible versions, debugging cryptic errors, understanding JEE/Jakarta EE specifics
- **Rapid prototyping**: Creating test data, writing initial test suites, generating template code
- **Iterative debugging**: When given clear goals and fast feedback mechanisms (like Puppeteer MCP)

Where human judgment is required:
- **Strategic decisions**: Choosing the target technology stacks
- **Step sizing**: Knowing when to commit, when to reset, when to try smaller steps
- **Quality standards**: Pushing back on change-detector tests, insisting on business-logic focused tests
- **Context management**: Keeping the AI focused, preventing context window overflow
- **Automated testing strategy**: Decide which types tests we want to have

## The Testing Dilemma Resolution

The unit testing discussion in this episode revealed an important insight: **production code design determines test quality more than testing technique**.

The initial AI-generated tests for `AccountBean#performCompleteCheckout` were change-detector tests—they would break on any refactoring, valid or not. But the problem wasn't the tests; it was that the production code was difficult to test well because it:
- Mixed different concerns (order creation, email, inventory)
- Had unclear business logic boundaries
- Was tightly coupled to the framework

By creating hand-rolled mocks and focusing on business logic (inventory levels, backorder creation), we got tests that actually enable refactoring rather than prevent it.

**Key insight**: When testing is hard, the problem is usually in the production code design, not the test design.

## Which approach won?

Both approaches, the port to a separate Spring Boot app, or the port in-place to modern JEE, seem viable.  Which one you choose depends on which tech stack is better in your context.  One important thing is to release incrementally, which is easier to achieve with the in-place port.  With the separate Spring Boot app, we could change the links in the Spring Boot app to point to the legacy app, so that the user is able to navigate seamlessly from one app to the other; but it would be challenging to keep the same session in both apps, as JEE and Spring Boot use incompatible technology for session management.

Which tech stack we choose depends on our context: what is the common tech stack in our company? What are the skills of our colleagues?  Much as I dislike JEE, if the company I work for bets on JEE, and I really want to stay in this company, I would make JEE work well.

Anyways, having learned all this, if I were to do it again, I would probably start with the in-place port.  If we really wanted Spring Boot, we could probably achieve if with incremental in-place refactoring, from JEE to embedded Jetty to Spring Boot. On the other hand, this is a small project: while the AI in October 2025 is quite capable to upgrade the JEE versions in this project, it will likely find it harder in real-life, much larger projects.  If this were the case, we'd need to look for ways to slice the work in thinner slices, and porting pages one by one in a fresh project is a way to do it.

So my advice would be: start with an in-place port, if you can make it work.  If you can't make it work, either because the codebase is too large, or because the tech jump is too large, then go with page-by-page port to a fresh project.


## Broader Implications

This series demonstrates that AI hasn't just made us faster at coding: it's changing **what strategies are viable**:

- **Technical migrations are much cheaper**: Upgrading 4 framework versions in one go would be reckless without AI, but with AI assistance providing rapid iteration and debugging, it became manageable
- **The rewrite calculus changes**: Even with AI making rewrites faster, [Port &amp; Mend](https://www.youtube.com/watch?v=ndLnqwL9Ies "My presentation at XConf 2025 (video)") is ever more attractive
- **Continuous modernization is much cheaper**: We can delegate AI agent to fix minor (and not-so-minor) framework version updates
- **AI can be a valuable training tool** Discussion with AI helps learn about what is possible, and develop our own thoughts
- **Engineering skills are ever more valuable** The AI didn't replace the need for engineering skill: it amplified it, as AI recommendations are very often bad.  In <abbr title="Dungeons &amp; Dragons">D&amp;D</abbr> terms, AI agents have high <abbr title="Intelligence">INT</abbr> and no <abbr title="Wisdom">WIS</abbr>

**Thanks for reading along. Hope it comes handy!**


*Want to leave a comment? Please do so on LinkedIn!*
