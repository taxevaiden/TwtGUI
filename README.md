# twtGUI

twtGUI is a twtxt GUI client that helps using twtxt a little easier for people who don't want to use the command prompt. it also may be more convenient for people like me who don't wan't to open cmd everytime and type

`twtxt timeline`

everytime. they can just open this app, look, and be done.

(i actually just made it because i was bored)

## requirements

you need,,,

- **[python](https://www.python.org/) >= 3.4.1**: needed to install twtxt
- **recent version of [pip](https://pip.pypa.io/en/stable/)**: also needed to install twtxt
- **[twtxt](https://twtxt.readthedocs.io/en/stable/), with everything set up properly**: to use the app
- **internet**: it's kinda obvious why

### compatibility

| OS | Version | Status |
|----|---------|--------|
| Windows | Windows 7 and later | Fully supported |
| macOS | Unknown | Haven't tested yet |
| Linux | Unknown | Haven't tested yet  |

## status

you can tweet and look at your timeline. everything works correctly! i still haven't done like settings yet but i will soon! ;)

commands executed internally on windows may not work as well on macOS/Linux? idk i have neither OS (unless you count the terrible macbook i have)

i'll work on macOS/Linux when i finish the app in general (and it functions)

## testing + PLEASE help me

if you'd like to help me test this app out and maybe help out with compatibility for macOS/Linux:

1. **get everything you need installed on your machine**: you'll need
    - **[git](https://git-scm.com/downloads)**: cloning the repo
    - **[node.js](https://nodejs.org/en)**: dev servering,, npm, blah blah blah blah...
2. **clone the repo**: first, clone the repo to your machine:

        git clone https://github.com/taxevaiden/twtexe.git

3. **install dependencies**: make sure you have  installed. then, navigate to the project folder and run:

        npm install

4. **start testing**:
   1. **development server**: to start the app locally, run:

            npm run dev

        this will start the development server. then it'll open up an electron window and you can mess around with it

        if you would like to just host the development server to run in your browser, run:

            npm run start:dev

        the default port is `8080`. in your browser, go to

            http://localhost:8080/

        you can change the default port in `astro.config.mjs`.

        > [!WARNING]
        > if you find
        >
        >       "electron:dev": "cross-env NODE_ENV=development electron ."
        >
        > in the scripts in `package.json`, using it will open a new electron window, but it also won't display anything since the development server hasn't started,, and it'll also error because of that
   2. **building and then testing**: you also have an option to build the astro site first, then open the electron window. it functions the same as the development server, but changes you make won't be live. to build and then test, run:

            npm run build

        (yes ik this is not the command for testing i'll change it someday)

        when executed, the astro site will be built and then an electron window will open. if you would like to just open a window since the astro site is already built, run

            npm run electron

        this will just open an electron window, no building here!
5. **and if you want to help out**: edit the code as needed and open a pull request. i probably won't check the pull requests often but i'll still check. changes that are kind of pointless won't be merged (which will probably be unlikely since my code is terrible. pls someone help me :pray:)
