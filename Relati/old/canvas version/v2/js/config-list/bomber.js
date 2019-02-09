createList(
    "bomber", {
        id: "use",
        description: "可調整項目"
    }, [
        {
            id: "bomber",
            type: "checkbox",
            checked: true,
            description: "使用轟炸"
        }
    ]
);

createList(
    "bomber", {
        id: "bomber-source",
        name: "bomber-source",
        description: "標記符號時，轟炸來源"
    }, [
        {
            id: "normal",
            type: "checkbox",
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
            id: "shield",
            type: "checkbox",
            checked: true,
            description: "防盾"
        }
    ]
);

createList(
    "bomber", {
        id: "bomber-target",
        name: "bomber-target",
        description: "轟炸符號時，轟炸對象"
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