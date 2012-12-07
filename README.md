# chrome-browserid

chrome-browserid is a "native" BrowserID login/logout button for Chrome in the
form of Chrome extension.

"Native" means the functionality of login/logout is accessed via Chrome UI
(specifically an icon in address bar) in addition to usual login/logout links
provided by the websites.

## Features

If a website is using BrowserID authentication this extension displays an icon
in Chrome's address bar indicating authentication status.

When not logged in:

![not-logged-in](https://github.com/downloads/sickill/chrome-browserid/logged-out-shot.png)

When logged in:

![logged-in](https://github.com/downloads/sickill/chrome-browserid/logged-in-shot.png)

Clicking on the icon requests website's login or logout, depending on the
current state.

## Installation

So far the extension is not yet available on Chrome Web Store. Manual
installation is required.

### Get the code

Get the extension code by downloading a tarball:

    $ wget https://github.com/sickill/chrome-browserid/archive/master.tar.gz
    $ tar xf master.tar.gz

Or clone the repository:

    $ git clone https://github.com/sickill/chrome-browserid.git

### Load extension in Chrome

Go to Tools / Extensions. Enable "Developer mode". Click "Load unpacked
extension" and point Chrome to a directory with extension code.

## TODO

* Don't assume page is using BrowserID when navigator.id is present
* Display e-mail of logged in user

## Author

Marcin Kulik (@sickill)
