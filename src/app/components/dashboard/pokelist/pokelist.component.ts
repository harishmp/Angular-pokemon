import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { PokemonList, PokemonDetailbyName, PokemonDetailLocalStorage } from 'src/app/typed';
import { DataService } from 'src/services/data.service';
import { UrlService } from 'src/services/url.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss']
})
export class PokelistComponent implements OnInit {
  // material paginator
  length: number;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageIndex: number;

  offset: number = 0;
  result = new Array<PokemonList>();
  resultFinal= new Array<PokemonDetailbyName>();
  wishlist: Array<PokemonDetailLocalStorage> = [];
  personallist: Array<PokemonDetailLocalStorage> = []
  searchkey: string = null;
  filterkey: string = null;
  enablePagination: boolean = false;
  enableView: boolean = false;
  enablelistView: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = null;
  previousUrl: string = null;

  constructor(public dataService: DataService, private router: Router, public snackBar: MatSnackBar, private urlService: UrlService) { 
  }

  ngOnInit(): void {
    this.parseUrl();
  }

  // for maintaining page state
  parseUrl(){
    this.urlService.previousUrl$.subscribe(url => {
      if(url != undefined){
        let parseUrl = url.split("/");
        if(parseUrl[3] != undefined){
          var finalParseUrl = parseUrl[3].split("%3F");
          if(finalParseUrl[1] != undefined) {
            this.pageIndex = Number(finalParseUrl[2])/10;
            this.pageSize = Number(finalParseUrl[1]);
            this.offset = Number(finalParseUrl[2]);
            this.callApi(this.pageSize, this.offset);
          } else this.callApi(this.pageSize, this.offset);
        } else this.callApi(this.pageSize, this.offset);
      } else this.callApi(this.pageSize, this.offset);
    })
  }

  callApi(limit: number, offset: number) {
    this.isLoading = true;
    this.dataService.getPokeApiList(limit, offset).subscribe((listresponse: any) => {   
      this.length = listresponse.count;
      this.enableView = true;
      this.isLoading = false;
      this.enablelistView = true;
      if(this.length > 0) this.enablePagination = true;
      listresponse.results.map(item => {
        return new PokemonList( 
          item.name,
          item.url
        )
      });
      listresponse.results.map(item => {
        this.dataService.getPokeApiDetail(item.name).subscribe((detailresponse: any) => { 
          this.resultFinal.push(new PokemonDetailbyName( 
            detailresponse.name,
            detailresponse.id,
            detailresponse.sprites)
          );
        }, err => console.log('In Error Block---', err._body + ' ' + err.status));
      });
    },
    err => {
      this.enablelistView = false;
      this.enableView = false;
      this.isLoading = false;
      console.log('In Error Block---', err, err._body.type, err._body + ' ' + err.status);
    });
  }

  // pagination event
  getServerData(event?:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex * 10;
    this.result = [];
    this.resultFinal = [];
    this.callApi(this.pageSize, this.offset);
  }

   // Search through API
   applySearch(event: Event) {
    this.searchkey = '';
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.result = [];
    this.resultFinal = [];
    if(searchValue.length > 0) {
      this.dataService.getPokeApiDetail(searchValue).subscribe((detailresponse: any) => { 
        let detailresponsedata = detailresponse.json();
        this.result.push(detailresponsedata);
        this.length = this.result.length;
        this.enablePagination = false;
        this.enablelistView = true;
      },
      err => {
        this.enablelistView = false;
        this.enablePagination = false;
        this.errorMessage = err._body;
        console.log('In Error Block---', err._body + ' ' + err.status);
      });
    } else {
      this.pageSize = 10;
      this.offset = 0;
      this.callApi(this.pageSize, this.offset);
    }
  }

  clearSearch(){
    this.pageIndex = 0;
    this.filterkey = '';
    this.result = [];
    this.resultFinal = [];
    this.pageSize = 10;
    this.offset = 0;
    this.callApi(this.pageSize, this.offset);
  }

  // Filter result view handler
  applyfilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if(filterValue.length > 0) this.enablePagination = false;
    else this.enablePagination = true;
  }

  redirecttoDetailPage(data: PokemonDetailLocalStorage){
    this.router.navigate([`/dashboard/poke-detail/${data.id}?${this.pageSize}?${this.offset}`]);
    // this.router.navigate([`/dashboard/poke-detail/${data.id}`]);
  }

  addtoWishlist(data: PokemonDetailLocalStorage) {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist'));
    if(this.wishlist != null){
      let val = this.wishlist.filter(item => item.id == data.id);
      if(val.length == 0){
        this.wishlist.push(data)
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist)); 
        this.openSnackBar('Successfully added to Wishlist', 'pizza-party');
      } else this.openSnackBar('Already added to Wishlist', 'pizza-party');
    } else {
      this.wishlist = [];
      this.wishlist.push(data)
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist)); 
      this.openSnackBar('Successfully added to Wishlist', 'pizza-party');
    }
  }

  addtoPersonallist(data: PokemonDetailLocalStorage){
    this.personallist = JSON.parse(localStorage.getItem('personallist'));
    if(this.personallist != null){
      let val = this.personallist.filter(item => item.id == data.id);
      if(val.length == 0){
        this.personallist.push(data)
        localStorage.setItem('personallist', JSON.stringify(this.personallist)); 
        this.openSnackBar('Successfully added to Personal list', 'pizza-party');
      } else this.openSnackBar('Already added to Personal list', 'pizza-party');
    } else {
      this.personallist = [];
      this.personallist.push(data)
      localStorage.setItem('personallist', JSON.stringify(this.personallist)); 
      this.openSnackBar('Successfully added to Personal list', 'pizza-party');
    }
  }

  // toast message
  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 10000
    });
  }

}
