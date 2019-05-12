createList(
    "relati", {
        id: "use",
        description: "可調整項目"
    }, [
        {
            id: "relati-normal",
            type: "checkbox",
            checked: true,
            description: "使用一般連結"
        }, {
            id: "relati-remote",
            type: "checkbox",
            checked: true,
            description: "使用遠程連結"
        }, {
            id: "relati-remote-stable",
            type: "checkbox",
            checked: true,
            description: "使用遠程穩定連結"
        }, {
            id: "relati-forbid",
            type: "checkbox",
            checked: true,
            description: "使用連結阻斷"
        }
    ]
);

createList(
    "relati", {
        id: "relati-route",
        name: "relati-route",
        description: "連結經過的格子為"
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
            description: "我方符號"
        }, {
            id: "other",
            type: "checkbox",
            description: "對方符號"
        }
    ]
);

createList(
    "relati", {
        id: "relati-source",
        name: "relati-source",
        description: "標記符號時，連結來源"
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