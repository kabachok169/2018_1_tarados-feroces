'use strict';

class Router {

    constructor() {
        this.lastView = null;
        this.urls = {};
        this.insertionElement = document.querySelector('.root');

    }

    addUrl(url, view, callback = () => null, context = {}) {
        this.urls[url] = {
            view,
            context,
            callback,
            loaded: false,
        };

        return this;
    }

    go(url, insertionElement = this.insertionElement) {
        if (!this.urls[url]) {
            return false;
        }

        const callbackResult = this.urls[url].callback();

        if (callbackResult) {
            this.urls[url].context = callbackResult;
        }

        history.pushState({path: url}, '', url);

        if (!this.urls[url].loaded) {
            this.urls[url].loaded = true;
            this.urls[url].view.__render(this.urls[url].context);
            insertionElement.appendChild(this.urls[url].view.element);
        }

        this.hideLast();

        this.lastView = this.urls[url].view;

        this.showPage(url);

        return true;
    }

    showPage(url) {
        this.urls[url].view.show();
    }

    hideLast() {
        this.lastView && this.lastView.hide();
    }
}
