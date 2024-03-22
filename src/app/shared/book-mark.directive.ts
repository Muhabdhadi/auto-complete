import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[appBookMark]'
})
export class BookMarkDirective {
    colors = [
        '#FF8B64',
        '#55C2E6',
        '#FF5E7D',
        '#F1C75B',
        '#7335D2',
        '#F1C75B',
        '#4BCF82',
        '#7335D2'
    ]

    constructor(private el: ElementRef) {
        this.el.nativeElement.style.borderColor = this.colors[this.getRandomColorIndex()];
    }

    getRandomColorIndex() {
        return Math.floor(Math.random() * this.colors.length);
    }

}
