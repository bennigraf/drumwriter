# drumwriter

Early draft of a text-only drum machine.

## Usage

TBD(-efined & -ocumented)

## Development thoughts

### Runtime environment:

Because such things seldomly run nicely directly from the filesystem, there's a small script that starts a docker container with a light http deamon that hosts the actual html & JS app. After running it via `app/run-with-docker.sh`, the app is accessible at http://localhost:8090/.

### The DSL 

...is supposed to be live-code-friendly, simple to learn, reactive.

The main idea was to mimic http://typedrummer.com/, but improve some shortcomings, which are (to me)

 * Not being able to set the tempo
 * not being able to write multiple patterns/rhythms in the same document and switch between them
 * not being able to run multiple lines/rhythms in parallel ("polyphinc")

But: The textarea doesn't react immediatly to input but only on a special command (currently ctrl+enter) – differently than 
     on http://typedrummer.com/!

*Todo*: Define syntax!

### The audio engine

I use Tone.js (https://tonejs.github.io/) for now.

Alternatives were:

 * Flocking (http://flockingjs.org/, paper: file:///Users/bennigraf/Desktop/flockingicmc2014.pdf) 
 * Timbre.js (https://github.com/mohayonao/timbre.js/) – not maintained anymore, but probably still okay

Tone.js has been chosen because it has the most github stars (and thus seems to be the most used one), because it's apparently the most actively developed one, for it's apparently very solid scheduling (based on bpms) and lastly because it's syntax is a bit nicer than in Flocking, where one has to write json objects for everything. 

In Flocking, complex audio processing seems to be easier, but for now and for this project this isn't neccessary.

### Other:

 * Uses Zepto.js (http://zeptojs.com/) as lightweight jQuery replacement
 