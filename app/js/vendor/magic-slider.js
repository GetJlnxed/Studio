export class Magic {
    constructor(selector, activeClass, hoverClass) {
        this.allItems = document.querySelectorAll(`.${selector}`);

        this.currentItemIndex = 0;
        this.itemslength = this.allItems.length - 1;

        this.activeClass = activeClass;
        this.hoverClass = hoverClass;

        this.allItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.disableAllItems(this.activeClass);
                item.classList.add(`${this.activeClass}`);
                this.currentItemIndex = index;
            });

            item.addEventListener('mouseover', () => {
                item.classList.add(`${this.hoverClass}`);

            });
            item.addEventListener('mouseout', () => {
                item.classList.remove(`${this.hoverClass}`);
            });
        });
    }

    activateNextItem() {
        this.disableAllItems(this.activeClass);
        this.currentItemIndex == this.itemslength ? this.currentItemIndex = 0 : this.currentItemIndex++;
        this.allItems[this.currentItemIndex].classList.add(`${this.activeClass}`);
    }

    activatePreviuosItem() {
        this.disableAllItems(this.activeClass);
        this.currentItemIndex == 0 ? this.currentItemIndex = this.itemslength : this.currentItemIndex--;
        this.allItems[this.currentItemIndex].classList.add(`${this.activeClass}`);
    }

    activateFirstItem() {
        this.disableAllItems(this.activeClass);
        this.allItems[0].classList.add(`${this.activeClass}`);
        this.currentItemIndex = 0;
    }

    disableAllItems() {
        this.allItems.forEach(element => {
            element.classList.remove(`${this.activeClass}`);
        });
    }
}

/* setInterval(() => {
    let timer = setInterval(() => {
        magic.activateNextItem();
    }, 100);
    setTimeout(() => {
        clearInterval(timer);
        magic.disableAllItems();
    }, 1100);
}, 10000); */