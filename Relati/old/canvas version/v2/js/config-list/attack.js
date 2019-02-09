createList(
    "attack", {
        id: "use",
        description: "可調整項目"
    }, [
        {
            id: "attack",
            type: "checkbox",
            checked: true,
            description: "使用攻擊"
        }
    ]
);

createList(
    "attack", {
        id: "attack-route",
        name: "attack-route",
        description: "攻擊經過的格子為"
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
    "attack", {
        id: "attack-medium",
        name: "attack-medium",
        description: "攻擊符號時，攻擊媒介"
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

createList(
    "attack", {
        id: "attack-bullet",
        name: "attack-bullet",
        description: "攻擊符號時，攻擊耗材"
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
            id: "shield",
            type: "checkbox",
            description: "防盾"
        }
    ]
);

createList(
    "attack", {
        id: "attack-target",
        name: "attack-target",
        description: "攻擊符號時，攻擊對象"
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