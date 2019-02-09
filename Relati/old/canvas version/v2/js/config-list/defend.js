createList(
    "defend", {
        id: "use",
        description: "可調整項目"
    }, [
        {
            id: "defend",
            type: "checkbox",
            checked: true,
            description: "使用防禦"
        }
    ]
);

createList(
    "defend", {
        id: "defend-source",
        name: "defend-source",
        description: "標記符號時，防禦來源"
    }, [
        {
            id: "normal",
            type: "checkbox",
            checked: true,
            description: "一般"
        }, {
            id: "source",
            type: "checkbox",
            description: "來源"
        }, {
            id: "forbid",
            type: "checkbox",
            description: "阻斷"
        }, {
            id: "broken",
            type: "checkbox",
            description: "死亡"
        }
    ]
);