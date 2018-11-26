/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Check that URL is not empty', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Check that name exists and is not empty', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite named "The menu" */
    describe("The menu", function() {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu is hidden by default', function() {
            let menuClass = document.querySelector('body');
            expect(menuClass.classList.contains('menu-hidden')).toBe(true);
            //Get class of menu

        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is hidden by default', function() {
            let menuClass = document.querySelector('body');
            //Get class of menu
            let menuClicked = document.querySelector('.menu-icon-link');
            menuClicked.click();
            expect(menuClass.classList.contains('menu-hidden')).toBe(false);
            menuClicked.click();
            expect(menuClass.classList.contains('menu-hidden')).toBe(true);

        });
    });


    /* Test suite named "Initial Entries" */
    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                // Get content of feed container
                feedLoad = document.querySelector('.feed');
                done();
            })
        })
        it("It's not empty", function() {
            expect(feedLoad.childElementCount > 0).toBe(true);
        });
    });
    /* Test suite named "New Feed Selection" */

    /* Test ensures that when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function() {
        let feedAfterFirstLoad;
        let feedAfterSecondLoad;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // Get content of feed container
                feedAfterFirstLoad = document.querySelector('.feed');
                done();
            })
        })

        it("Content changes", function() {
            loadFeed(1, function() {
                feedAfterSecondLoad = document.querySelector('.feed');
                done();
            })
            expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
        });
    });
}());