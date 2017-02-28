# YouTube style progress bar for ReactJS

![Demo](https://raw.githubusercontent.com/milworm/react-progress-2/master/images/demo.gif)



[![Support](https://supporter.60devs.com/api/b/399936c021d5111d90001de85283a4b5)](https://supporter.60devs.com/give/399936c021d5111d90001de85283a4b5)

## Installation

#### NPM
    npm install react-progress-2

#### JSPM
    jspm install npm:react-progress-2

## Usage

Accepted props:

`refreshTimeout`: The milisecond you want to refresh your progress, it will stop and start again.

`className`: Your custom class name

Include `react-progress-2/main.css` to your project. With [SystemJS CSS plugin](https://github.com/systemjs/plugin-css) you simply need to write this line:
```js
import "react-progress-2/main.css!"
```
Include `react-progress-2` and put it somewhere in the top-component, for example:
```js
import React from "react";
import Progress from "react-progress-2";

var Layout = React.createClass({
    render: function() {
        return (
            <div className="layout">
                <Progress.Component/>
                {/* other components go here*/}
            </div>
        );
    }
});
```
Now, whenever you need to show an indicator, just call `Progress#show`, for example:
```js
loadFeed: function() {
    Progress.show();
    // do your ajax thing.
},

onLoadFeedCallback: function() {
    Progress.hide();
    // render feed.
}
```

Please note, that `show` and `hide` calls are stacked, so after *n*-consecutive `show` calls, you need to do *n* `hide` calls to hide an indicator.

## Styling

```css
.loader-60devs .loader-60devs-progress {
    background: #ff6f00;
}
```
## Examples
[Examples](http://milworm.github.io/react-progress-2/example.html)

## Contribution
Do the following steps if you have the willing to fix a bug or just add some features to `react-progress-2`
```
cd dev
npm install
jspm install
gulp watch
# change the world!
```

## Authors and Contributors
Created in 2015 by Ruslan Prytula (@milworm).
