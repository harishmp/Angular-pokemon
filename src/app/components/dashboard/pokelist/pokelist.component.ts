import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss']
})
export class PokelistComponent implements OnInit {
  // material paginator
  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  // paginator
  pageEvent: PageEvent;
  page = 1;
  totalPokemons: number;

  offset = 0;
  result = [];
  wishlist = [];
  personallist = []
  searchkey;
  filterkey;
  enablePagination = false;
  enableView = false;
  enablelistView = false;
  isLoading = false;
  errorMessage;

  constructor(public dataService: DataService, private router: Router, public snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.callApi(this.pageSize, this.offset);
  }

  callApi(limit, offset) {
    this.isLoading = true;
    this.dataService.getPokeApiList(limit, offset).subscribe((listresponse: any) => {   
      let listresponsedata = listresponse.json();
      this.length = listresponsedata.count;
      this.enableView = true;
      this.isLoading = false;
      this.enablelistView = true;
      if(this.length > 0) {
        this.enablePagination = true;
      }
      listresponsedata.results.forEach(result => {
        this.dataService.getPokeApiDetail(result.name).subscribe((detailresponse: any) => this.result.push(detailresponse.json()),
        err => {
          console.log('In Error Block---', err._body + ' ' + err.status);
        });
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
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex * 10;
    this.result = [];
    this.callApi(this.pageSize, this.offset);
  }

   // Search through API
   applySearch(event: Event) {
    this.searchkey = '';
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.result = [];
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
        this.errorMessage = err.status + ': ' + err._body;
        console.log('In Error Block---', err._body + ' ' + err.status);
      });
    } else {
      this.pageSize = 10;
      this.offset = 0;
      this.callApi(this.pageSize, this.offset);
    }
  }

  clearSearch(){
    this.filterkey = '';
    this.result = [];
    this.pageSize = 10;
    this.offset = 0;
    this.callApi(this.pageSize, this.offset);
  }

  // Filter result view handler
  applyfilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if(filterValue.length > 0) {
      this.enablePagination = false;
    } else {
      this.enablePagination = true;
    }
  }

  redirecttoDetailPage(data){
    this.router.navigate([`/dashboard/poke-detail/${data.id}?${this.pageSize}?${this.offset}`]);
  }

  addtoWishlist(data) {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist'));
    if(this.wishlist != null){
      let val = this.wishlist.filter(item => item.id == data.id);
      if(val.length == 0){
        this.wishlist.push(data)
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist)); 
        this.openSnackBar('Succussfully added to Wishlist', 'pizza-party');
      } else {
        this.openSnackBar('Already added to Wishlist', 'pizza-party');
      }
    } else {
      this.wishlist = [];
      this.wishlist.push(data)
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist)); 
      this.openSnackBar('Succussfully added to Wishlist', 'pizza-party');
    }
  }

  addtoPersonallist(data){
    this.personallist = JSON.parse(localStorage.getItem('personallist'));
    if(this.personallist != null){
      let val = this.personallist.filter(item => item.id == data.id);
      if(val.length == 0){
        this.personallist.push(data)
        localStorage.setItem('personallist', JSON.stringify(this.personallist)); 
        this.openSnackBar('Succussfully added to Personal list', 'pizza-party');
      } else {
        this.openSnackBar('Already added to Personal list', 'pizza-party');
      }
    } else {
      this.personallist = [];
      this.personallist.push(data)
      localStorage.setItem('personallist', JSON.stringify(this.personallist)); 
      this.openSnackBar('Succussfully added to Personal list', 'pizza-party');
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
