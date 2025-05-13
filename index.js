﻿function createElement(tag, attributes, children) {
    const element = document.createElement(tag);

    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
        });
    }

    if (Array.isArray(children)) {
        children.forEach((child) => {
            if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    } else if (typeof children === "string") {
        element.appendChild(document.createTextNode(children));
    } else if (children instanceof HTMLElement) {
        element.appendChild(children);
    }

    return element;
}

class Component {
    constructor() {
    }

    getDomNode() {
        this._domNode = this.render();
        return this._domNode;
    }
}

class TodoList extends Component {
    constructor(tag, attributes, children) {
        super();

        this.state = ['Сделать домашку', 'Сделать практику', 'Пойти домой'];
    }


    render() {
        let children = [];
        for (const element of this.state) {
            children.push(
                createElement("li", {}, [
                    createElement("input", {type: "checkbox"}),
                    createElement("label", {}, element),
                    createElement("button", {}, "🗑️")
                ]),
            )
        }

        const output = [
            createElement("h1", {}, "TODO List"),
            createElement("div", {class: "add-todo"}, [
                createElement("input", {
                    id: "new-todo",
                    type: "text",
                    placeholder: "Задание",
                }),
                createElement("button", {id: "add-btn"}, "+"),
            ]),
            createElement("ul", {id: "todos"}, children),
        ]



        return createElement("div", {class: "todo-list"}, output);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(new TodoList().getDomNode());
});
