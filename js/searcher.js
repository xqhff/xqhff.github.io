const searcher = {
    init(path) {
        this.composition = false;
        window.addEventListener("load", () => {
            this.input = document.getElementsByClassName("search-bar")[0];
            this.timeline = document.getElementsByClassName("timeline");
            this.input.addEventListener("input", () => this.composition || this.update());
            this.input.addEventListener("compositionstart", () => (this.composition = true));
            this.input.addEventListener("compositionend", () => {
                this.update(), (this.composition = false);
            });
            fetch(path)
                .then(res => res.json())
                .then(data => {
                    this.data = data;
                });
        });
    },
    match(str, proc) {
        return str.indexOf(proc) != -1;
    },
    update() {
        let res = [],
            proc = this.input.value.toLowerCase().replace(/\s+/g, "");
        if (!proc) res = this.data.map(i => i.path);
        else
            this.data.map(data => {
                if (this.match(data.sdata, proc)) res.push(data.path);
            });
        for (let line of this.timeline)
            if (res.indexOf(line.getAttribute("path")) == -1) {
                line.style.opacity = 0;
                line.style.pointerEvents = "none";
                line.style.marginTop = -line.offsetHeight - 30 + "px";
            } else {
                line.style.opacity = 1;
                line.style.pointerEvents = "";
                line.style.marginTop = "";
            }
    },
};
