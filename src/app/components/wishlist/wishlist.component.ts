import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistData = [];
  enableView = false;

  constructor(private router: Router, public snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.wishlistData = JSON.parse(localStorage.getItem("wishlist"));
    if(this.wishlistData != null){
      if(this.wishlistData.length > 0) {
      this.enableView = true;
      }
    }
  }

  redirecttoDetailPage(data){
    this.router.navigate([`dashboard/poke-detail/${data.id}`]);
  }

  deletefromWishlist($event) {
    this.wishlistData = this.wishlistData.filter(item => item.id != $event.id);
    if(this.wishlistData.length == 0){
      this.enableView = false;
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistData));
    this.openSnackBar('Deleted from wishlist', 'pizza-party');
  }

  addtoPersonallist($event) {
    let personallist = JSON.parse(localStorage.getItem('personallist'));
    if(personallist != null){
      let afterListfilter = personallist.filter(item => item.id == $event.id);
      if(afterListfilter.length == 0){
        personallist.push($event)
        localStorage.setItem('personallist', JSON.stringify(personallist)); 
        this.openSnackBar('Successfully added to Personal list', 'pizza-party');
      } else {
        this.openSnackBar('Already added to Personal list', 'pizza-party');
      }
    } else {
      personallist = [];
      personallist.push($event)
      localStorage.setItem('personallist', JSON.stringify(personallist)); 
      this.openSnackBar('Successfully added to Personal list', 'pizza-party');
    }
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 10000
    });
  }

}
