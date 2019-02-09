createList(
    "escape", {
        id: "use",
        description: "可調整項目"
    }, [
        {
            id: "escape",
            type: "checkbox",
            checked: true,
            description: "使用逃脫"
        }
    ]
);

createList(
    "escape", {
        id: "escape-route",
        name: "escape-route",
        description: "逃脫經過的格子為"
    }, [
        {
            id: "space",
            type: "radio",
            checked: true,
            description: "空格"
        }, {
            id: "space-none",
            type: "radio",
            description: "無空格"
        }, {
            id: "space-real",
            type: "radio",
            description: "實質空格"
        }, {
            id: "space-fake",
            type: "radio",
            description: "視為空格"
        }, {
            id: "owner",
            type: "checkbox",
            checked: true,
            description: "我方符號"
        }, {
            id: "other",
            type: "checkbox",
            description: "對方符號"
        }
    ]
);

createList(
    "escape", {
        id: "escape-source",
        name: "escape-source",
        description: "標記符號時，逃脫來源"
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