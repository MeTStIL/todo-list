function createElement(tag, attributes, children, callbacks) {
    const element = document.createElement(tag);

    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
        });
    }

    if (callbacks) {
        for (const [action, func] of Object.entries(callbacks)) {
            element[action] = func;
        }
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

        this.inputValue = '';

        this.state = [
            'Сделать домашку',
            'Сделать практику',
            'Пойти домой'
        ];
    }

    render() {
        const todoItems = this.state.map(task =>
            createElement("li", {}, [
                createElement("input", { type: "checkbox" }),
                createElement("label", {}, task),
                createElement("button", {}, "🗑️")
            ])
        );

        return createElement("div", { class: "todo-list" }, [
            createElement("h1", {}, "TODO List"),
            createElement("div", { class: "add-todo" }, [
                createElement("input", {
                    id: "new-todo",
                    type: "text",
                    placeholder: "Задание",
                }, {}, {
                    oninput : this.onAddInputChange.bind(this)
                }),
                createElement("button", { id: "add-btn" }, "+", {
                    onclick: this.onAddTask.bind(this)
                }),
            ]),
            createElement("ul", { id: "todos" }, todoItems),
        ]);
    }

    onAddTask() {
        this.state.push(this.inputValue);
        this.inputValue = '';
    }

    onAddInputChange(element) {
        this.inputValue = element.target.value;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(new TodoList().getDomNode());
});
