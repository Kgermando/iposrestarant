# README

## About

This is the official Wails Vanilla template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.


INFO  Wails is now using the new Go WebView2Loader. If you encounter any issues with it, please report them to https://github.com/wailsapp/wails/issues/2004. You could also use the old legacy loader with `-tags native_webview2loader`, but keep in mind this will be deprecated in the near future.

wails build -nsis -tags native_webview2loader