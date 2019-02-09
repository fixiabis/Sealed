"use strict";
var lib;
(function (lib) {
    var viewContainer = document.getElementById("view-container");
    var View = (function () {
        function View(id) {
            this.body = document.createElement("div");
            this.body.id = id;
            this.body.className = "view";
            viewContainer.appendChild(this.body);
        }
        View.prototype.active = function () {
            var childNodes = viewContainer.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var view = childNodes[i];
                if (view !== this.body)
                    view.classList.remove("active");
            }
            this.body.classList.add("active");
        };
        return View;
    }());
    lib.View = View;
})(lib || (lib = {}));
