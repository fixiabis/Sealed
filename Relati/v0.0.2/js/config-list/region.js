createList(
    "region", {
        id: "use",
        description: "可調整項目"
    }, [
        {
            id: "region",
            type: "checkbox",
            checked: true,
            description: "使用區域"
        },
        {
            id: "region-forbid",
            type: "checkbox",
            description: "區域封閉"
        },
        {
            id: "region-forbid-attack",
            type: "checkbox",
            checked: true,
            description: "區域封閉攻擊"
        }
    ]
);

createList(
    "region", {
        id: "region-source",
        name: "region-source",
        description: "圍成區域時，矩型四端來源"
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
            checked: true,
            description: "防盾"
        }
    ]
);

createList(
    "region", {
        id: "region-rule",
        name: "region-rule",
        description: "圍成區域時，矩型四端來源"
    }, [
        {
            id: "first",
            type: "radio",
            checked: true,
            description: "優先"
        },
        {
            id: "final",
            type: "radio",
            description: "佔有"
        },
        {
            id: "share",
            type: "radio",
            description: "共有"
        },
        {
            id: "split",
            type: "radio",
            description: "分隔"
        }
    ]
);