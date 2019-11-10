# Assignment 3

**Assignment and Code Blog Entry due at 11:59pm on Monday 11/11/2019**

**Demo due by 11:59pm on Monday 11/25/2019**

The goal of this assignment is to start using JavaScript on the client-side to add interactions to a web page, including reacting to user-generated events and manipulating the DOM.  We will build off of our work from Assignment 2.

Here, you are provided with an `index.html` file and a `style.css` file that, combined, give you the "Benny's List" page we worked on in Assignment 2 (plus a little extra that we'll use in this assignment).  You're also given an empty `index.js` file. Your job is to fill out `index.js` to add the following interactions to the page:

1. Clicking the "Update" button that accompanies the filters in the sidebar should filter the posts so that only ones that meet the filtering criteria specified by the user are displayed, while posts that don't meet the filtering criteria are removed from the DOM (not just hidden).  Specifically, the filters should have the following behaviors:

    * If the user enters text in the "text" filter, only posts that contain that text as a substring (case-insensitive) should be displayed.

    * If the user enters a price in the minimum price filter, only posts whose price is greater than or equal to the specified price should be displayed.

    * If the user enters a price in the maximum price filter, only posts whose price is less than or equal to the specified price should be displayed.  The user should be able to enter both a minimum price and a maximum price to display only posts that fall within the specified price range.

    * If the user selects a city in the filters, only posts with a matching city (case-insensitive) should be displayed.

    * If the user selects any of the "condition" options in the filters, only posts that match the selected conditions should be displayed.

    Note that to make it easier for you to filter on price, city, and condition, each post in the HTML has some `data` attributes, e.g.:
    ```
    <div class="post" data-price="20" data-city="Corvallis" data-condition="excellent">...</div>
    ```
    This is a common practice for storing extra data associated with particular elements in a web page.  You can [use the values of these attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) for filtering posts.

    Note that the user should be able to specify any combination of multiple filters (e.g. text, maximum price, and city).  If they do, only posts that match *all* of the specified filters should be displayed.

    For the purposes of this assignment, you don't need to worry about the user changing filters and clicking the "Update" button again.  Specifically, you don't need to re-display posts after they were removed if the user updates the filtering criteria.  You can rely on refreshing the page to bring all of the original posts back, though newly-entered ones will be lost this way.

2. Clicking the orange "sell something" button should display a modal that allows you to enter information to create a new post on Benny's List.  The modal (along with a backdrop that goes behind it to shade the underlying page while the modal is displayed) are both already included in the HTML code, but they are hidden. Clicking the orange "sell something" button should un-hide them.  You'll have to examine the HTML to figure out the relevant IDs/classes to use to accomplish this.

3. When the modal is open, clicking the modal close button (the small "X" in the upper-right corner) or the modal cancel button (the one in the modal footer that says "Cancel") should close the modal by re-hiding it along with the modal backdrop.  When the modal is closed, the values of all of the input fields within the modal should be cleared so they don't appear the next time the it's opened.

4. When the modal is open, clicking the modal accept button (the one in the modal footer that says "Create Post") should close the modal (clearing any user-input values in the process) and generate a new post that is placed inside the posts container *after* all of the other existing posts.  The new post should match the structure of the existing posts so it is styled correctly and can be filtered.  Here is what the structure of the new post should look like:

    ```html
    <div class="post" data-price="{{price}}" data-city="{{city}}" data-condition="{{condition}}">
      <div class="post-contents">
        <div class="post-image-container">
          <img src="{{photoURL}}" alt="{{itemDescription}}">
        </div>
        <div class="post-info-container">
          <a href="#" class="post-title">{{itemDescription}}</a> <span class="post-price">${{price}}</span> <span class="post-city">({{city}})</span>
        </div>
      </div>
    </div>
    ```

    Here, the info in curly brackets (`{{}}`) should be obtained from the corresponding input fields from the modal.

    Importantly, you should not use `innerHTML` to generate HTML content directly from user-input content, since this is a security hazard.  You must ensure that user-input content is safely added into the DOM.

5. If the user clicks the modal accept button while any of the input fields is blank, the user should be alerted (using the [`alert()` function](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)), and the modal should be kept open until the user either closes/cancels it or provides values for all input fields.  A new post should not be created if the user hasn't specified values for all fields.

## Extra credit

For extra credit, you can add these features to your page:

* **Allow re-filtering** - If the user changes the filter values and hits the filter "Update" button, the filters should be re-applied to all of the twits, including all of the original ones and all newly-added ones.  This means that posts that were removed from the DOM because of the previous filter values might need to be re-added back into the DOM.  If the user clears all of the filter values and clicks the "Update" button, all of the original posts and any newly-added ones should be displayed again.  In all cases, the posts should always remain in the same order relative to each other.

* **Allow filtering on new cities** - Right now, the user is free to enter any city name when creating a post, but there is a fixed set of city names in the "city" filter's dropdown menu.  Update the page's behavior so that if the user enters a city in a new post that doesn't already exist in the "city" filter's dropdown menu, that city is added dynamically to the dropdown menu.  After a city is added to the filter dropdown, the user should be able to select it and have the filter behave as described above.

## Code blog

Add an entry to your Code Blog reflecting on your experience with this assignment and publish the new entry.  Here are some questions you could answer (though these aren't the only ones):

* What was challenging about the assignment, and what specific kinds of problems did you have.  How did you solve those problems?

* What did you learn from the assignment?  Were there any special insights you had?  What did you find that you already knew?

* What kinds of resources were helpful for completing the assignment?  Specific websites?  Lectures?  The class Piazza forum?  The TAs?  How did you use each of these resources?

* What are one or two things you had to Google to complete the assignment?

## Submission

As always, we'll be using GitHub Classroom for this assignment, and you will submit your assignment via GitHub.  Just make sure your completed files are committed and pushed by the assignment's deadline to the master branch of the GitHub repo that was created for you by GitHub Classroom.  A good way to check whether your files are safely submitted is to look at the master branch your assignment repo on the github.com website (i.e. https://github.com/osu-cs290-f19/assignment-3-YourGitHubUsername/). If your changes show up there, you can consider your files submitted.

In addition to submitting your assignment via GitHub, you must submit the URL to your code blog entry (e.g. http://web.engr.oregonstate.edu/~YOUR_ONID_ID/cs290/blog.html) via Canvas by the due date specified above.

## Grading criteria

This assignment will be graded based only your `index.js` file, and any changes you make to `index.html` or `style.css` will be disregarded.

The assignment is worth 100 points total:

* 10 points: clicking the orange "sell something" button displays the modal and its backdrop as described above

* 10 points: clicking either the modal's close button or the modal's cancel button hides the modal and backdrop as described above

* 30 points: clicking the modal's accept button adds a new post to the end of the page as described above if the user has specified values for all required input fields

* 10 points: clicking the modal's accept button when a value is not specified by the user for any input field results in the user being alerted and the modal remaining open, as described above

* 5 points: whenever the modal is closed (either when a post is created or not), any input values the user specified are cleared so they do not appear when the modal is opened the next time

* 35 points: when the user enters values for any of the filters and clicks the "Update" button below the filters, only posts that meet the specified filtering criteria are displayed, as described above, and posts that do not meet the filtering criteria are removed from the DOM (not just hidden)

* Extra credit:
  * 10 points: allow user to apply new filters as described above
  * 10 points: dynamically add new cities to the dropdown list in the filters as described above

In addition to your programming assignment grade, you will receive a pass/fail grade for your code blog entry, included in the code blog portion of your grade.
