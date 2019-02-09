createList(
    "pincer", {
        id: "use",
        description: "可調整項目"
    }, [
        {
            id: "pincer",
            type: "checkbox",
            checked: true,
            description: "使用夾擊"
        }
    ]
);

createList(
    "pincer", {
        id: "pincer-source",
        name: "pincer-source",
        description: "標記符號時，夾擊來源"
    }, [
        {
            id: "normal",
            type: "checkbox",
            checked: true,
            description: "一般"
        }, {
            id: "source",
            type: "checkbox",
            checked: true,
            description: "來源"
        }, {
            id: "forbid",
            type: "checkbox",
            checked: true,
            description: "阻斷"
        }, {
            id: "broken",
            type: "checkbox",
            description: "死亡"
        }, {
            id: "shield",
            type: "checkbox",
            description: "防盾"
        }
    ]
);

createList(
    "pincer", {
        id: "pincer-target",
        name: "pincer-target",
        description: "夾擊符號時，夾擊對象"
    }, [
        {
            id: "normal",
            type: "checkbox",
            checked: true,
            description: "一般"
        }, {
            id: "source",
            type: "checkbox",
            checked: true,
            description: "來源"
        }, {
            id: "forbid",
            type: "checkbox",
            checked: true,
            description: "阻斷"
        }, {
            id: "shield",
            type: "checkbox",
            description: "防盾"
        }
    ]
);

createList(
    "pincer", {
        id: "pincer-dir",
        name: "pincer-dir",
        description: "夾擊符號時，夾擊方位"
    }, [
        {
            id: "T",
            type: "checkbox",
            checked: true,
            description: "正四方"
        }, {
            id: "X",
            type: "checkbox",
            checked: true,
            description: "斜四方"
        }
    ]
);