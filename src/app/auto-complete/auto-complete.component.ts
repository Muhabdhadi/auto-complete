import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap, tap} from "rxjs";

@Component({
    selector: 'app-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements AfterViewInit {
    @ViewChild('carSearchInput') carInput!: ElementRef;
    cars: any = [];
    showSearches: boolean = false;
    isLoading: boolean = false;
    searchedCars: any = [];
    @Output() carNameSelected = new EventEmitter<{name: string}>();
    constructor() {
        this.cars = [
            "Toyota Corolla", "Honda Accord", "Ford F-150", "Chevrolet Silverado",
            "Nissan Sentra", "Volkswagen Golf", "Hyundai Elantra", "Kia Optima",
            "Subaru Outback", "Tesla Model 3", "BMW X3", "Mercedes-Benz C-Class",
            "Audi A4", "Lexus ES", "Volvo S60", "Mazda MX-5", "Toyota RAV4", "Honda CR-V"
        ];
    }

    ngAfterViewInit() {
        this.carSearch();

        document.addEventListener('click', () => {
            this.showSearches = false;
        });
    }

    carSearch() {

        const onSearch$: Observable<any> = fromEvent(this.carInput.nativeElement, 'keyup').pipe(
            map((event: any) => event.target.value),
            debounceTime(500),
            distinctUntilChanged(),
            tap(()=> {
                this.isLoading = true;
                this.showSearches = true;
            }),
            switchMap((term) => term ? this.getCars(term) : of<any>(this.cars)),
            tap(() => {
                this.isLoading = false;
            }))

        onSearch$.subscribe(data => {
            this.isLoading = false;
            this.searchedCars = data;
        })
    }

    getCars(name: string): Observable<any> {
        return of(this.filterCars(name));
    }

    filterCars(name: string) {
        return this.cars.filter((val: string) => val.toLowerCase().includes(name.toLowerCase()) )
    }

    setCarName(name: string) {
        this.searchedCars = this.filterCars(name);
        this.carNameSelected.emit({name});
        this.carInput.nativeElement.value = name;
        this.showSearches = false;
    }

    trackById(index: number,item: any):void{
        return item._id;
    }

}
