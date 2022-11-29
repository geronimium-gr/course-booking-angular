import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-highlights',
    templateUrl: './highlights.component.html',
    styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {
    data: Record<string, string>[] = [
        {
            'title': 'Learn from Home',
            'description': 'Pariatur adipisicing aute do amet dolore cupidatat. Eu labore aliqua eiusmod commodo occaecat mollit ullamco labore minim. Minim irure fugiat anim ea sint consequat fugiat laboris id. Lorem elit irure mollit officia incididunt ea ullamco laboris excepteur amet. Cillum pariatur consequat adipisicing aute ex.'
        },
        {
            'title': 'Study Now, Pay Later',
            'description': 'Ex Lorem cillum consequat ad. Consectetur enim sunt amet sit nulla dolor exercitation est pariatur aliquip minim. Commodo velit est in id anim deserunt ullamco sint aute amet. Adipisicing est Lorem aliquip anim occaecat consequat in magna nisi occaecat consequat et. Reprehenderit elit dolore sunt labore qui.'
        },
        {
            'title': 'Be Part of Our Community',
            'description': 'Minim nostrud dolore consequat ullamco minim aliqua tempor velit amet. Officia occaecat non cillum sit incididunt id pariatur. Mollit tempor laboris commodo anim mollit magna ea reprehenderit fugiat et reprehenderit tempor. Qui ea Lorem dolor in ad nisi anim. Culpa adipisicing enim et officia exercitation adipisicing.'
        }
    ]

    constructor() { }

    ngOnInit(): void {
    }
}
