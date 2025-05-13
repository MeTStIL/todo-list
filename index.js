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

    update () {
        const newNode = this.render();
        this._domNode.replaceWith(newNode);
        this._domNode = newNode;
    }
}

class AddTask extends Component {

}

class Task extends Component {

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
                createElement("input", { type: "checkbox" }, {}, {
                    onchange : this.onChangeElement.bind(this)
                }),
                createElement("label", {}, task),
                createElement("button", {}, "🗑️", {
                    onclick : this.onDeleteElement.bind(this)
                })
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
        super.update();
    }

    onAddInputChange(element) {
        this.inputValue = element.target.value;
    }

    onChangeElement(element) {
        const p = element.target.parentElement;
        const l = p.querySelector('label');

        if (l.style.color === 'gray') {
            l.style.color = 'black';
        } else {
            l.style.color = 'gray';
        }

    }

    onDeleteElement(element) {
        const p = element.target.parentElement;
        this.state = this.state.filter(task => task !== p.querySelector('label').textContent);
        super.update();

    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(new TodoList().getDomNode());
});
