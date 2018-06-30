# drumwriter

[![CircleCI](https://circleci.com/gh/bennigraf/drumwriter.svg?style=shield)](https://circleci.com/gh/bennigraf/drumwriter)

Early draft of a text-only drum machine. Deployed with CircleCI to http://lab.bennigraf.de/drumwriter/

## Usage

Open http://lab.bennigraf.de/drumwriter/ and check the description!

## Development

### ToDo for now:

 - Add tests for `PlayableSequence` parsing
 - Add tests for the Sequencer
 - Add tests for the InputController (check if events are thrown correctly)
 - Add more "instruments"/samples
 - Add some effects (reverb/delay, crunch, compression, ...) and come up with some syntax to control them
 - Maybe add some way to "mix" parallel tracks
 - Currently, any sample can apparently only be played once in parallel, because that's how Tone.js "Players" work. Maybe find a way to be more polyphonic...
 - *Make it look better!*

### Runtime environment:

Because such things seldomly run nicely directly from the filesystem, there's a small script that starts a docker container with a light http deamon that hosts the actual html & JS app. After running it via `app/run-with-docker.sh`, the app is accessible at http://localhost:8090/.

The building is done by webpack. To install the requirements, run `$ yarn install`. To make a build once, run `$ yarn run build`. To watch files for changes, run `$ yarn run watch`. 

HTML, CSS and some JS libraries are still "statically" included/copied from `/src` to `/dist` – this should be migrated to webpack at some point.

### The DSL 

...is supposed to be live-code-friendly, simple to learn, reactive. The syntax is work in progress. The current features are described in `index.html`.

The main idea was to mimic http://typedrummer.com/, but improve some shortcomings, which are (to me)

 * Not being able to set the tempo
 * not being able to write multiple patterns/rhythms in the same document and switch between them
 * not being able to run multiple lines/rhythms in parallel ("polyphonic")

But: The textarea doesn't react immediatly to input but only on a special command (currently ctrl+enter) – differently than on http://typedrummer.com/!

Note: There's also http://rustleworks.com/textxox/, but this also doesn't allow multiple rhythms per document and uses one line per "instrument".

### The audio engine

I use Tone.js (https://tonejs.github.io/) for now.

Alternatives were:

 * Flocking (http://flockingjs.org/, paper: file:///Users/bennigraf/Desktop/flockingicmc2014.pdf) 
 * Timbre.js (https://github.com/mohayonao/timbre.js/) – not maintained anymore, but probably still okay

Tone.js has been chosen because it has the most github stars (and thus seems to be the most used one), because it's apparently the most actively developed one, for it's apparently very solid scheduling (based on bpms) and lastly because it's syntax is a bit nicer than in Flocking, where one has to write json objects for everything. 

In Flocking, complex audio processing seems to be easier, but for now and for this project this isn't neccessary.

### Other:

 * Uses Zepto.js (http://zeptojs.com/) as lightweight jQuery replacement
 * Uses webpack for JS packing; static resources (HTML, CSS and JS libraries) are copied statically for now.
 * CI with CircleCI, which deploys to http://lab.bennigraf.de/drumwriter/ – configuration in `/.circleci/`
 * Maybe migrate to http://codemirror.net/ from the current native TextArea
 
### Roadmap:

*For now*: Get it working with the minimal syntax as defined in `Controller.js`. Basically make it output audio. *Then*: Put it on github.io or something like that.

*Later*: 

 1. Transfer it to other platforms (android/ios to make it, well, mobile – phonegap ftw.?!)
 2. Build a nice vintage standalone drummachine from it using an old keyboard, a Raspberry Pi or similar and one of those old micro-tvs I have laying around.
 3. On web & mobile: Maybe add some sharing/collaboration to it, i.e. share to facebook for fame and glory.
 4. ?
 5. Profit!
