import { Selector } from 'testcafe';

fixture('Home Page Test')
    .page('http://localhost:5173'); // This should be the URL where your Vite app is running

test('Homepage should contain the correct title, a search bar and a multi select', async t => {
    // Select the <h1> element and verify its text content
    const title = Selector('h1');

    await t.expect(title.innerText).eql('Pokedex');

    // select search bar
    const searchBar = Selector('#search-bar');

    t.expect(searchBar.exists);

    // select multi select
    const multipleSelectCheckbox = Selector('#multiple-checkbox');
    t.expect(multipleSelectCheckbox.exists);
});

test('Homepage should show pokemon cards', async t => {
    const paragraph = Selector('p');
    await t.expect(paragraph.innerText).eql('Showing 9 results out of 40'); // assuming there are 40 cards in total

    const loadMore = Selector('button').withText("Load more");
    t.expect(loadMore.exists);

    // Select the element with the class 'MuiCard-root'
    const cards = Selector('.MuiCard-root');
    await t.expect(cards.count).eql(9);
});

test('Homepage should show more pokemon cards on load more click', async t => {
    const loadMore = Selector('button').withText("Load more");
    await t.click(loadMore);

    const cards = Selector('.MuiCard-root');
    await t.expect(cards.count).eql(18);

    const paragraph = Selector('p');
    await t.expect(paragraph.innerText).eql('Showing 18 results out of 40');
});

test('Enter text in search bar provide correct result card', async t => {
    const inputField = Selector('#search-bar');
    t.expect(inputField.exists);

    await t
        .typeText(inputField, '0001')
        .expect(inputField.value).eql('0001'); // searhc for card number 0001

    await t.wait(1000);

    const paragraph = Selector('p');
    await t.expect(paragraph.innerText).eql('Showing 1 result'); // there is only 1 card with number 0001

    const cards = Selector('.MuiCard-root');
    await t.expect(cards.count).eql(1);
});

test('Clear text from OutlinedInput', async t => {
    const searchBar = Selector('#search-bar');

    // Type text into the input field
    await t
        .typeText(searchBar, 'Some value')
        .expect(searchBar.value).eql('Some value');

    const closeButton = Selector('#clear-input-button');

    // Click the close button to clear the input
    await t
        .click(closeButton)
        .expect(searchBar.value).eql('');
});

test('Test opening the Select dropdown', async t => {
    const selectInput = Selector('#multiple-checkbox');
    const menu = Selector('.MuiMenu-paper');

    await t
        .click(selectInput)
        .expect(menu.exists).ok('Dropdown menu should be opened');
});

test('Test selecting multiple options', async t => {
    const selectInput = Selector('#multiple-checkbox');
    const option1 = Selector('li').withText('Bug');
    const option2 = Selector('li').withText('Dark');
    const inputValue = Selector('#multiple-checkbox').parent().find('input'); // Get the input field

    // Open the dropdown and select options
    await t
        .click(selectInput)
        .click(option1)
        .click(option2)

    // Assert that the options are selected
    await t
        .expect(inputValue.value).eql('Bug,Dark', 'Selected options are displayed correctly');

    await t.wait(1000);

    const paragraph = Selector('p');
    await t.expect(paragraph.innerText).eql('Showing 6 results out of 6');

    const cards = Selector('.MuiCard-root');
    await t.expect(cards.count).eql(6);
});

test('Test search input and select option combination', async t => {

    const selectInput = Selector('#multiple-checkbox');
    const option1 = Selector('li').withText('Bug');
    const inputValue = Selector('#multiple-checkbox').parent().find('input'); // Get the input field
    const inputField = Selector('#search-bar');
    t.expect(inputField.exists);

    // Open the dropdown and select options
    await t
        .click(selectInput)
        .click(option1)

    const backdrop = Selector('.MuiBackdrop-root');

    // Close the modal or backdrop if it’s present
    if (await backdrop.exists) {
        await t.click(backdrop); // Close the modal
    }

    // Assert that the options are selected
    await t
        .expect(inputValue.value).eql('Bug', 'Selected option is displayed correctly');


    await t
        .typeText(inputField, '0010')
        .expect(inputField.value).eql('0010'); // search for card number 0010

    await t.wait(1000);

    const paragraph = Selector('p');
    await t.expect(paragraph.innerText).eql('Showing 1 result');

    const cards = Selector('.MuiCard-root');
    await t.expect(cards.count).eql(1);
});