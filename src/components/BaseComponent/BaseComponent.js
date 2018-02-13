class BaseComponent {
    constructor(tagName) {
        this.component = document.createElement(tagName);
    }

    setInner(data) {
        this.component.innerHTML = data;
    }

    hide() {
        this.component.classList.add('hidden');
    }

    makeVisible() {
        this.component.classList.remove('hidden');
    }

    remove() {
        this.component.children.clear();
        document.removeChild(this.component);
    }

    removeChild(childNode) {
        this.component.removeChild(childNode);
    }
}