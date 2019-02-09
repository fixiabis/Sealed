function createList(name, group, list) {
    var element = document.querySelector(`[list=${name}]`);
    var listElement = document.createElement("ul");
    var listContainer = document.createElement("li");

    listContainer.appendChild(
        document.createTextNode(group.description)
    );

    for (var item of list) {
        var li = document.createElement("li");
        var label = document.createElement("label");
        var input = document.createElement("input");

        input.id = `${group.id}-${item.id}`;
        input.type = item.type;
        input.checked = item.checked;
        input.value = item.id;
        label.innerHTML = item.description;
        label.htmlFor = `${group.id}-${item.id}`;

        li.appendChild(input);
        li.appendChild(label);

        if (group.name) {
            input.name = group.name;
        }

        listElement.appendChild(li);
    }

    listContainer.appendChild(listElement);

    element.appendChild(listContainer);
}