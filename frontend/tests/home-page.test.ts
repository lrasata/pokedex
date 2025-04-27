import { Selector } from 'testcafe';

fixture('Home Page Test')
    .page('http://localhost:5173'); // This should be the URL where your Vite app is running

test('Homepage should contain the correct title', async t => {
    // Select the <h1> element and verify its text content
    const title = Selector('h1');

    await t.expect(title.innerText).eql('Pokedex');
});
