# Bliss Recruitment App Requirements Specification

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functional Requirements

### FREQ-01: Loading Screen

The frontend application must show a loading screen while the server health is checked. The server health is checked via the appropriate endpoint on the API.

-   If the server health is OK then the application should proceed to the “List Screen”.
-   If the server health is NOT OK then the application should display a “Retry Action” widget.

### FREQ-02: Questions List Screen

The frontend application must show the List Screen in two cases:

-   The loading screen managed to contact and check the server health
-   The app was opened with an URL with the format

    -   http://HOST:PORT/questions?filter=FILTER

        -   Notice that this format contains a query parameter which should be used to fill the search box and trigger the search functionality.

            -   If the filter parameter is missing, the user should simply be placed at the listing.
            -   If the filter parameter is present but has an empty value the user should be placed at the filter variant with no input inserted but with the input box focused.

The frontend application must fetch list data from the appropriate endpoint taking the following requirements into account:

-   The app should fetch 10 records at a time
-   There is no sorting functionality. The list will follow the order returned from the API.
-   The app should start loading 10 additional records if the user shows intent to browse additional records
-   The app should present a search box at the top of the list that allows the user to filter the results. Results should be shown on the same screen as a list. Searching implies hitting the appropriate endpoint and this variation must comply with the 2 requirements defined above.
    -   If a search result is being shown (empty or not) the user must be allowed to share this with other users via the “Share Screen”. The app must send an appropriate URL that, when opened, drives the user to the appropriate screen.
    -   The app must present a dismiss button to get out of the Search variant.

Each list element is selectable and whenever the user selects one record the app must show the “Detail Screen”.

### FREQ-03: Detail Screen

The frontend application must show the detail screen in two cases:

-   A row was selected in “List Screen”
-   The application was opened with the detail screen URL from outside the app:
    -   http://HOST:PORT/questions/QUESTION_ID/

The “Detail Screen” must allow the user to navigate back to the listing.

The “Detail Screen” must convey all the information of the object using appropriate visualization widgets.

The “Detail Screen” must allow the user to share this content with other users via the “Share Screen”.
The app must send an appropriate URL that, when opened, drives the user to the appropriate screen.
The “Detail Screen” must allow the user to vote on a particular answer via the use of a button. This should trigger an appropriate call to the API endpoint devoted to updating Questions

### Share Screen

This screen must allow the users to share this content with others via email.

The sharing mechanism should invoke the appropriate service on the back-end.

### FREQ-05: No Connectivity Screen

The app must monitor connectivity with the Internet and show an appropriate screen whenever the connection is lost. This screen should remain visible as long as the device has no connection to the Internet. When a connection is regained then the user should be at the state where it was before.

## Instructions

    0. Clone or download project
    1. npm i
    2. npm start
    3. ???
    4. profit
